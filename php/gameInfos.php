<?php


// API qui renvoie les infos de la partie en cours du user qui a déjà commencée (mais pas finie)
// renvois un JSON avec les infos suivantes :
// - liste des joueurs
// - si la partie est terminée ou non

require_once 'lib/parse.env.php';
require_once 'Connexion.php';
require_once 'functions.php';

session_start();

if (isset($_SESSION["user"])) {
    $game = getGameInProgressStartedForUser($_SESSION["user"]);
    if ($game) {
        $players = getPlayers($game->IdPartie);
        $gameEnded = getGameEnded($game->IdPartie);
        $infos = array(
            "success" => true,
            "players" => $players,
            "gameEnded" => $gameEnded
        );
        echo json_encode($infos);
    }else{
        $infos = array(
            "success" => false,
            "error" => "no game in progress"
        );
        echo json_encode($infos);
    }

}else{
    $infos = array(
        "success" => false,
        "error" => "user not connected"
    );
    echo json_encode($infos);
}



