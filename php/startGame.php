<?php

// script PHP qui vérifie qu'on a à faire à un utilisateur connecté, qui est chef de partie qui n'a pas encore commencé la partie 

// si c'est le cas, on met la partie à l'état "en cours"

require 'lib/parse.env.php';
require 'Connexion.php';
require 'functions.php';
session_start();

if (!isset($_SESSION["user"])) {
    header("Location: ../index.php?notConnected=true");
}

// idPartie
$gameNotStarted = getGameNotStartedYet($_SESSION["user"]);

if (!$gameNotStarted) {
    header("Location: ../index.php?noGameNotStarted=true");
}

// retrouver le chef de partie de la partie dont l'id est $gameNotStarted
$chef = getGameInfos($gameNotStarted)->IdChef;

if ($chef != $_SESSION["user"]) {
    header("Location: ../index.php?notTheChef=true");
}

// si on arrive ici, c'est que tout est bon, on renvoie un JSON avec success = true et le mot

startGame($gameNotStarted);

header("Location: ../game.php?idGame=" . $gameNotStarted);

?>


