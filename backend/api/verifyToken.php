<?php
session_start();

require_once("lib/parse.env.php");
require_once 'Connexion.php';
require_once 'functions.php';

$response = array();


// Validation du jeton
if (isset($_POST['token']) ) {
    if (isExpiredToken($_POST['token'])) {
        $response["success"] = false;
        $response["errorCode"] = 610; // token expired
        $response["redirect"] = "../index.php?tokenExpired=true";
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }
    if ( ( isset($_SESSION['token']) && isset($_SESSION['waitingUser']) ) && $_SESSION['token'] == $_POST['token']) {
        $_SESSION['user'] = $_SESSION['waitingUser'];
        unset($_SESSION['waitingUser']);
        unset($_SESSION['token']);
        $response["success"] = true;
        $response["redirect"] = "../index.php?connected=true";
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }

    /*pas secu
    $user = getUserByToken($_GET['token']);
    if ($user) {
        $_SESSION['user'] = $user->IdJoueur;
        $response["success"] = true;
        $response["redirect"] = "../index.php?connected=true";
        header('Content-Type: application/json');
        echo json_encode($response);
        exit();
    }
    */

    $response["success"] = false;
    $response["errorCode"] = 611; // wrong token
    $response["redirect"] = "../index.php?wrongToken=true";
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
    
    
} else {
    $response["success"] = false;
    $response["errorCode"] = 612; // missing token
    $response["redirect"] = "../index.php?missingToken=true";
    header('Content-Type: application/json');
    echo json_encode($response);
    exit();
}


?>