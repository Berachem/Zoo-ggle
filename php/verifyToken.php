<?php
session_start();


// Validation du jeton
if (isset($_GET['token']) && $_GET['token'] === $_SESSION['token']) {
    $_SESSION["user"] = $_SESSION["waitingUser"];
    unset($_SESSION["waitingUser"]);
    unset($_SESSION["token"]);
    // Redirection vers la page d'accueil
    header("Location: ../index.php?connected=true");
} else {
    header("Location: ../index.php?notConnected=true");
}


?>