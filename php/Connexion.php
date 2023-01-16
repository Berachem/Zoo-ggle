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
    public function q($sql,Array $cond = null){
        $stmt = $this->connec->prepare($sql);
        if($cond){
            foreach ($cond as $v) {
                $stmt->bindParam($v[0],$v[1], PDO::PARAM_STR);
            }
        }
        
        $stmt->execute();    
        //$stmt->debugDumpParams();
        return $stmt->fetchAll();
        $stmt->closeCursor();
        $stmt=NULL;
    }

}


use These\DotEnv;

include("php/lib/parse.env.php");
(new DotEnv('.env'))->load();
// mysql:host=localhost;dbname=test;


$db = new Connexion(getenv('DB_HOST'),getenv('DB_NAME'),getenv('DB_USER'),getenv('DB_PASSWORD'));






?>