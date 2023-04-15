<?php

require_once("lib/parse.env.php");
require_once('Connexion.php');
require_once "functions.php";


$responce = array();

if(isset($_GET["mail"])){

    if(checkMail($_GET["mail"])){
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
header('Access-Control-Allow-Origin: *');
echo json_encode($responce);