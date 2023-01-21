<?php


// API qui renvoie les infos de la partie en cours du user qui a déjà commencée (mais pas finie)
// renvois un JSON avec les infos suivantes :
// - liste des joueurs
// - si la partie est terminée ou non

require_once 'lib/parse.env.php';
require_once 'Connexion.php';
require_once 'functions.php';
require_once '../assets/animalsLists/animals_FRA.php';

session_start();

if (isset($_SESSION["user"])) {
    $game = getGameInProgressStartedForUser($_SESSION["user"]);
    if ($game) {
        // si le chef est le user
        if ($game->IdChef == $_SESSION["user"]) {
            endAGame($game->IdPartie);
        }    
        
    }
    header("Location: ../leaderboard.php");

}else{
    header("Location: ../index.php?notConnected=true");
}



