<?php
session_start();

require_once("lib/parse.env.php");
require_once 'Connexion.php';
require_once 'functions.php';


// Validation du jeton
if (isset($_GET['token']) ) {
    if (isExpiredToken($_GET['token'])) {
        header("Location: ../index.php?expiredToken=true");
        exit();
    }
    if (isset($_SESSION['token']) && $_SESSION['token'] == $_GET['token']) {
        $_SESSION['waitingUser'] = $_SESSION['user'];
        unset($_SESSION['user']);
        header("Location: ../index.php?connected=true");
        exit();
    }

    $user = getUserByToken($_GET['token']);
    if ($user) {
        $_SESSION['user'] = $user->IdJoueur;
        header("Location: ../index.php?connected=true");
        exit();
    }

    header("Location: ../index.php?notConnected=true");
    exit();
    
    
} else {
    header("Location: ../index.php?notConnected=true");
}


?>