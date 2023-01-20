<?php

/*
Classe qui permet de configurer la connexion à la Base de données
*/
class Connexion {
    private $login;
    private $host;
    private $pass;
    private $connec;
    private $db;
    public function __construct($host, $db, $login, $pass){
        $this->host = $host;
        $this->login = $login;
        $this->pass = $pass;
        $this->db = $db;
        $this->connexion();
    }
    private function connexion(){
        try
        {
                $bdd = new PDO(
                            'mysql:host='.$this->host.';dbname='.$this->db.';charset=utf8mb4', 
                                $this->login, 
                                $this->pass
                    );
            $bdd->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_WARNING);
            $bdd->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
            $this->connec = $bdd;
        }
        catch (PDOException $e)
        {
            $msg = 'ERREUR PDO dans ' . $e->getFile() . ' L.' . $e->getLine() . ' : ' . $e->getMessage();
            die($msg);
        }
    }
    
    public function displayQuery($sql,Array $cond = null){
        $textQuery = $sql;
        if($cond){
            foreach ($cond as $v) {
                $textQuery = preg_replace('/\?/', $v[1], $textQuery, 1);
            }
        }
        echo $textQuery;
    }

    public function execCount($sql,Array $cond = null, $debug = false){
        $stmt = $this->connec->prepare($sql);
        if($cond){
            foreach ($cond as $v) {
                $stmt->bindParam($v[0],$v[1], PDO::PARAM_STR);
            }
        }

        $stmt->execute();    
        if ($debug) echo "<br><br><h1>DEBUG</h1><br>";
        if ($debug) echo $this->displayQuery($sql,$cond)."<br><br>";
        if ($debug) echo $stmt->debugDumpParams();
        return $stmt->rowCount();
        $stmt->closeCursor();
        $stmt=NULL;
    }

    public function execQuery($sql,Array $cond = null, $debug = false){
        $stmt = $this->connec->prepare($sql);
        if($cond){
            foreach ($cond as $v) {
                $stmt->bindParam($v[0],$v[1], PDO::PARAM_STR);
            }
        }

        $stmt->execute();    
        if ($debug) echo "<br><br><h1>DEBUG</h1><br>";
        if ($debug) echo $this->displayQuery($sql,$cond)."<br><br>";
        if ($debug) echo $stmt->debugDumpParams();
        return $stmt->fetchAll();
        $stmt->closeCursor();
        $stmt=NULL;
    }

    public function execOnly($sql,Array $cond = null, $debug = false){
        $stmt = $this->connec->prepare($sql);
        if($cond){
            foreach ($cond as $v) {
                $stmt->bindParam($v[0],$v[1], PDO::PARAM_STR);
            }
        }

        $stmt->execute();    
        if ($debug) echo "<br><br><h1>DEBUG</h1><br>";
        if ($debug) echo $this->displayQuery($sql,$cond)."<br><br>";
        if ($debug) echo $stmt->debugDumpParams();
        $stmt->closeCursor();
        $stmt=NULL;
    }

    public function lastInsertId(){
        return $this->connec->lastInsertId();
    }

    


    /**
     * @param $login : le login de l'utilisateur (son pseudo)
     * @param $psw : le mot de passe de l'utilisateur
     *
     * @return bool : true si l'utilisateur est authentifié, false sinon
     */
    public function login($login, $psw){
        $query = "SELECT * FROM B_Joueur WHERE Pseudo LIKE :login AND MotDePasse LIKE :psw";
        $parameters = [[":login" , $login], [":psw" , hash("sha256",$psw)] ];
        $result = $this->execQuery($query,$parameters);

        if(!empty($result)){
            // Actualisation de la DateDerniereConnexion du joueur
            $query = "UPDATE B_Joueur SET DateDerniereConnexion = NOW() WHERE IdJoueur = :id";
            $parameters = [[":id" , $result[0]->IdJoueur]];
            $this->execQuery($query,$parameters);

            return $result[0]->IdJoueur;
        }
        return null;
    }

    public function register($login,$psw,$mail,$desc,$public)
    {
        $query = "INSERT INTO B_Joueur (Pseudo,MotDePasse,Mail,Description,ProfilPublic,DateCreationCompte) VALUES (:login ,:psw,:mail,:desc,:public,NOW())";
        $parameters = [[":login", $login], [":psw", hash("sha256", $psw)], [":mail", $mail], [":desc", $desc],
            [":public", $public]];
        $this->execQuery($query, $parameters);
    }

    public function getId($pseudo){
        $query = "SELECT IdJoueur FROM B_Joueur WHERE Pseudo = :pseudo";
        $parameters = [[":pseudo",$pseudo]];
        $retour = $this->execQuery($query,$parameters);
        if(count($retour)!=0){
            return $retour[0]->IdJoueur;
        }
        return null;
    }


}


use Zoogle\DotEnv;


(new DotEnv(__DIR__.'/../.env'))->load();
// mysql:host=localhost;dbname=test;


$db = new Connexion(getenv('DB_HOST'),getenv('DB_NAME'),getenv('DB_USER'),getenv('DB_PASSWORD'));

?>