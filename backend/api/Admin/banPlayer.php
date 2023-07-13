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
} else {
    if (isset($_SESSION["isAdmin"])&& $_SESSION["isAdmin"]==true){
        if (isset($_POST["playerId"])){
            banPlayer(intval($_POST["pattern"]));
            $response["success"]=true;
            $response["redirect"] = "../admin.php";
        }else{
            $response["success"] = false;
            $response["errorCode"] = 613; // missing player to ban
            $response["redirect"] = '../index.php';
        }
    }else{
        $response["success"] = false;
        $response["errorCode"] = 617; // user is not admin
        $response["redirect"] = '../index.php?notConnected=true';
    }
}


$response = array();
$response["success"] = true;
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
echo json_encode($response);


?>
