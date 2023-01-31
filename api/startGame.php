<?php

// script PHP qui vérifie qu'on a à faire à un utilisateur connecté, qui est chef de partie qui n'a pas encore commencé la partie 

// si c'est le cas, on met la partie à l'état "en cours"

require 'lib/parse.env.php';
require 'Connexion.php';
require 'functions.php';
session_start();

if (!isset($_SESSION["user"])) {
    // pas connecté (json)
    $response = array();
    $response["success"] = false;
    $response["errorCode"] = 603; // user not connected
    $response["redirect"] = '../index.php?notConnected=true';
    header('Content-Type: application/json');
    echo json_encode($response);
}

// idPartie
$gameNotStarted = getGameNotStartedYet($_SESSION["user"]);

if (!$gameNotStarted) {
    // pas de partie en cours
    $response = array();
    $response["success"] = false;
    $response["errorCode"] = 602; // no game in progress
    $response["redirect"] = '../index.php?noGameInProgress=true';
    header('Content-Type: application/json');
    echo json_encode($response);
}

// retrouver le chef de partie de la partie dont l'id est $gameNotStarted
$chef = getGameInfos($gameNotStarted)->IdChef;

if ($chef != $_SESSION["user"]) {
    // pas le chef de partie
    $response = array();
    $response["success"] = false;
    $response["errorCode"] = 609; // not the chef of the game
    $response["redirect"] = '../index.php?notTheChef=true';
    header('Content-Type: application/json');
    echo json_encode($response);
}

// si on arrive ici, c'est que tout est bon, on renvoie un JSON avec success = true et le mot

startGame($gameNotStarted);

$response = array();
$response["success"] = true;
header('Content-Type: application/json');
echo json_encode($response);


?>


