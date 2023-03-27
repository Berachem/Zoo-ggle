<?php


// Renvoie un JSON pour dire si l'utilisateur est connecté ou non sous la forme de JSON (success)
// $_SESSION["user"]

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

session_start();

$response = array();

if (!isset($_SESSION["user"])) {
    // pas connecté (json)
    $response["success"] = false;
    $response["errorCode"] = 603; // user not connected
    $response["redirect"] = '../index.php?notConnected=true';
} else {
    $response["success"] = true;
}

echo json_encode($response);

?>

