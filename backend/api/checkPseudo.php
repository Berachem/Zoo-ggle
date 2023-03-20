<?php

require_once("lib/parse.env.php");
require_once('Connexion.php');
require_once "functions.php";


$responce = array();

if(isset($_POST['login'])){

    $id = $db->getId($_POST['login']);
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
echo json_encode($responce);
