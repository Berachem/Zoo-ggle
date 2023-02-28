<?php

// API qui renvoie les infos d'une partie en fonction de son id en POST
// Renvoie un JSON avec les infos de la partie (liste des joueurs, partie lancée ou non, les infos de la partie

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';

session_start();

if (isset($_POST["idGame"])) {
    $idGame = intval($_POST["idGame"]);
    $game = getGameInfos($idGame);
    $players = getPlayers($idGame);
    $gameStarted = getGameStarted($idGame);
    $infos = array(
        "success" => true,
        "gameInfos" => $game,
        "players" => $players,
        "gameStarted" => $gameStarted
    );
    echo json_encode($infos);
}else{
    $infos = array(
        "success" => false,
        "error" => "idGame not set"
    );
    echo json_encode($infos);
}


?>