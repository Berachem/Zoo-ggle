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
        $this->login = $db;
        $this->pass = $login;
        $this->db = $pass;
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
    public function execQuery($sql,Array $cond = null){
        $stmt = $this->connec->prepare($sql);
        if($cond){
            foreach ($cond as $v) {
                $stmt->bindParam($v[0],$v[1], PDO::PARAM_STR);
            }
        }

        $stmt->execute();    
        //echo $stmt->debugDumpParams();
        return $stmt->fetchAll();
        $stmt->closeCursor();
        $stmt=NULL;
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
        return !empty($result);
    }

    public function register($login,$psw,$mail,$desc,$public){
        $query = "INSERT INTO B_Joueur (Pseudo,MotDePasse,Mail,Description,ProfilPublic,DateCreationCompte) VALUES (:login,:psw,:mail,:desc,:public,NOW()) ";
        $parameters = [[":login",$login],[":psw",hash("sha256",$psw)],[":mail",$mail],[":desc",$desc],
            [":public",$public]];
        $this->execQuery($query,$parameters);
    }

}


use Zoogle\DotEnv;

require_once("php/lib/parse.env.php");
(new DotEnv('login.env'))->load();
// mysql:host=localhost;dbname=test;


$db = new Connexion(getenv('DB_HOST'),getenv('DB_NAME'),getenv('DB_USER'),getenv('DB_PASSWORD'));

?>