<?php

require_once("lib/parse.env.php");
require_once('Connexion.php');
require_once "functions.php";


$responce = array();

if(isset($_GET['login'])){

    $id = $db->getId($_GET['login']);
    if($id == null){
        $responce["retour"]="ok";
    }else{
        $responce["code"]=618;
        $responce["retour"]="not ok";
    }
}else{
    $responce["code"]=613;
    $responce["retour"]="not ok";
}
header("Content-Type: application/json");
header('Access-Control-Allow-Origin: *');
echo json_encode($responce);
