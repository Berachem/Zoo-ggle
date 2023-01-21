<?php
session_start();

require_once("lib/parse.env.php");
require_once 'Connexion.php';
require_once 'functions.php';


// Validation du jeton
if (isset($_GET['token']) && $_GET['token'] === $_SESSION['token']) {
    if (isExpiredToken($_GET['token'])) {
        header("Location: ../index.php?expiredToken=true");
        exit();
    }
    
    $_SESSION["user"] = $_SESSION["waitingUser"];
    unset($_SESSION["waitingUser"]);
    unset($_SESSION["token"]);
    // Redirection vers la page d'accueil
    header("Location: ../index.php?connected=true");
} else {
    header("Location: ../index.php?notConnected=true");
}


?>