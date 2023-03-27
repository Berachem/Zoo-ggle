<?php

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';
session_start();

$response = array();
if (isset($_GET["profileId"]) || isset($_GET["pseudo"])){
    if (isset($_GET["profileId"])){
        $profileId=$_GET["profileId"];
    }else{
        $profileId= getIdByPseudo($_GET["pseudo"]);
    }
    $statistics = getUserStatistics($profileId);
    if ($statistics != null){
        $response["success"]=true;
        $response["profileInfos"]=$statistics;
    }else{
        $response["success"]=false;
        $response["errorCode"]=616; // No matching player
        $response["redirect"]="../index.php";
    }
}else{
    $response["success"]=false;
    $response["errorCode"]=613; // No player to check given
    $response["redirect"]="../index.php";
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode($response);


?>