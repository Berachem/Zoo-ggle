<?php
require 'php/Connexion.php';
require 'php/functions.php';
session_start();

// recoit des données de la forme : { ["proxies"]=> array(0) { } ["user"]=> string(16) "berachem.markria" } } array(4) { ["name"]=> string(2) "sa" ["langue"]=> string(3) "FRA" ["taille"]=> string(1) "4" ["mode"]=> string(1) "0" }

// si pas connecté retour à l'accueil avec un message d'erreur
if (!isset($_SESSION["user"])) {
    header("Location: index.php?notConnected=true");
}elseif (isset($_POST["name"]) && isset($_POST["langue"]) && isset($_POST["taille"]) && isset($_POST["mode"])) {
    createGame(
        $_SESSION["user"],
        $_POST["name"],
        $_POST["langue"],
        intval($_POST["taille"]),
        intval($_POST["mode"]),
        $_POST["public"],
        intval($_POST["nbjoueurs"])
    );
    header("Location: index.php?gameCreated=true");
} else {
    header("Location: index.php?error=true");
}






?>