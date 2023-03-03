<?php

require_once("lib/parse.env.php");
require_once('Connexion.php');
require_once "functions.php";


$responce = array();

if(isset($_POST["mail"])){

    if(checkMail($_POST["mail"])){
        $responce["retour"]="ok";
    }else{
        $responce["retour"]="not ok";
        $responce["code"]=619;
    }

}else{
    $responce["code"]=613;
    $responce["retour"]="not ok";
}
header("Content-Type: application/json");
echo json_encode($responce);