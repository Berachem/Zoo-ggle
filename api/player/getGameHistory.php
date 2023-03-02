<?php

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';
session_start();

$response = array();
if (!isset($_SESSION["user"])) {
    // pas connecté (json)
    $response["success"] = false;
    $response["errorCode"] = 603; // user not connected
    $response["redirect"] = '../index.php?notConnected=true';
}else{
    if (isset($_POST["profileId"])){
        $statistics = getUserStatistics(id);
        if ($statistics != null){
            $response["success"]=true;
            $response["profileInfos"]=$statistics;
        }else{
            $response["sucess"]=false;
            $response["errorCode"]=616; // No matching player
            $response["redirect"]="../index.php";
        }
    }else{
        $response["sucess"]=false;
        $response["errorCode"]=613; // No player to check given
        $response["redirect"]="../index.php";
    }
}



$response = array();
$response["success"] = true;
header('Content-Type: application/json');
echo json_encode($response);

?>