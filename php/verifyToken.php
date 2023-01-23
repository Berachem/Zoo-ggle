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
    if ( ( isset($_SESSION['token']) && isset($_SESSION['waitingUser']) ) && $_SESSION['token'] == $_GET['token']) {
        $_SESSION['user'] = $_SESSION['waitingUser'];
        unset($_SESSION['waitingUser']);
        unset($_SESSION['token']);
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