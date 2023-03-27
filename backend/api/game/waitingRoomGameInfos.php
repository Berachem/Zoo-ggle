<?php

// API qui renvoie les infos d'une partie en fonction de son id en POST
// Renvoie un JSON avec les infos de la partie (liste des joueurs, partie lancée ou non, les infos de la partie

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';

session_start();

$response = array();

if (!isset($_SESSION["user"])) {
    $response["success"] = false;
    $response["errorCode"] = 603; // user not connected
    $response["redirect"] = "../index.php?notConnected=true";
}else {
    $userId = intval($_SESSION["user"]);
    $gameId = getGameNotStartedYet($userId);
    if ($gameId != null) {
        $game = getGameInfos($gameId);
        $players = getPlayers($gameId);
        $gameStarted = getGameStarted($gameId);
        $response["success"]=true;
        $response["gameInfos"]=$game;
        $response["players"]=$players;
        $response["gameStarted"]=$gameStarted;
    }else{
        $response["success"]=false;
        $response["errorCode"]=602;
        $response["redirect"]="../searchGame.php";
    }
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($response);

?>