<?php
require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';

$response = array();

if (!isset($_SESSION["user"])) {
    $response["success"] = false;
    $response["errorCode"] = 603; // user not connected
    $response["redirect"] = "../index.php?notConnected=true";
}else{
    $userId = intval($_SESSION["user"]);
    $gameId = getGameNotStartedYet($userId);
    if ($gameId != null){
        if (!in_array($userId, getPlayers($gameId))){ // CHECK Pas obligatoire ?
            removePlayerFromWaitingRoomForGame($userId, $gameId);
            $response["success"] = true;
            $response["redirect"] = "../searchGame.php";
        }else{
            $response["success"] = false;
            $response["redirect"] = "../searchGame.php"; // FIXME Pas sur du redirect
            $response["errorCode"] = 608; // Player not in waiting room
        }
    }else{
        $response["success"] = false;
        $response["redirect"] = "../searchGame.php"; // FIXME Pas sur du redirect
        $response["errorCode"] = 608; // Player not in waiting room
    }
}



header('Content-Type: application/json');
echo json_encode($response);
?>