<?php
session_start();
require_once("lib/parse.env.php");
require_once 'Connexion.php';
require_once 'functions.php';

$response=[];
if(isset($_POST["login"]) && !empty($_POST["login"]) && isset($_POST["desc"]) && isset($_POST["public"])){
    editPublicProfileDatas($_SESSION["user"], $_POST["login"],$_POST["desc"],$_POST["public"]);
    $response["success"]=true;
}else{
    $response["success"]=false;
    $response["errorCode"] = 613;
}


header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
echo json_encode($response);