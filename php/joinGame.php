<?php

require 'lib/parse.env.php';
require 'Connexion.php';
require 'functions.php';
session_start();


// si le joueur n'est pas connecté, on le redirige vers la page de connexion
if (!isset($_SESSION["user"])) {
    header("Location: ../index.php?notConnected=true");
    exit;
}

// si le joueur n'a pas sélectionné de partie, on le redirige vers la page d'accueil

if (!isset($_GET["idGame"])) {
    header("Location: ../index.php?noGameSelected=true");
    exit;
}

// si l'id de la partie n'est pas un entier ou si la partie n'existe pas, on le redirige vers la page d'accueil
if (!is_int(intval($_GET["idGame"])) || !gameById(intval($_GET["idGame"]))) {
    header("Location: ../index.php?gameDoesntExist=true");
    exit;
}

// si la partie est pleine, on le redirige vers la page d'accueil
if (count(getPlayers($_GET["idGame"])) >= gameById(intval($_GET["idGame"]))->NombreJoueursMax) {
    header("Location: ../index.php?gameFull=true");
    exit;
}

// si le joueur est déjà dans la partie, on le redirige vers la page d'accueil

if (in_array($_SESSION["user"], getPlayers($_GET["idGame"]))) {
    header("Location: ../index.php?alreadyInGame=true");
    exit;
}

// si le joueur est déjà dans une partie, on le redirige vers la page d'accueil
if (getGameInProgressStartedOrNotForUser($_SESSION["user"])) {
    header("Location: ../index.php?alreadyInGame=true");
    exit;
}

// si le joueur est déjà dans une partie en attente, on le redirige vers la page d'accueil


// sinon on ajoute le joueur à la partie
addPlayerToWaitingRoomForGame($_SESSION["user"], $_GET["idGame"]);

// on le redirige vers la page du salon d'attente de la partie
header("Location: ../waitingRoom.php?idGame=" . $_GET["idGame"]);

?>

