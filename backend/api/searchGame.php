<?php
session_start();

require_once("lib/parse.env.php");
require_once 'Connexion.php';
require_once 'functions.php';

$response = array();

if(isset($_POST["recherche"])){
    $response["success"]=true;
    $response["result"]=recherchePartie($_POST["recherche"]);
}else{
    $response["success"]=false;
    $response["errorCode"]=613; //missing param
}
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($response);