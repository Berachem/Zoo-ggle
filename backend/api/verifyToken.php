<?php
session_start();
require_once("lib/parse.env.php");
require_once 'Connexion.php';
require_once 'functions.php';
$response = array();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');

// Validation du jeton
if (isset($_POST['token']) ) {
    if (isExpiredToken($_POST['token'])) {
        $response["success"] = false;
        $response["errorCode"] = 610; // token expired
        echo json_encode($response);
        exit();
    }
    if ( ( isset($_SESSION['token']) && isset($_SESSION['waitingUser']) ) && $_SESSION['token'] == $_POST['token']) {
       
        //actualisation des variables
        $_SESSION['user'] = $_SESSION['waitingUser'];
        unset($_SESSION['waitingUser']);
        //unset($_SESSION['token']);
        actualiseConnexionDate($_SESSION['user']);

        //renvoie de la réponse
        $response['user'] = $_SESSION['user'];
        $response["success"] = true;
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
        header('Access-Control-Allow-Origin: http://localhost:3000');
        echo json_encode($response);
        exit();
    }
    */

    $response["success"] = false;
    $response["errorCode"] = 611; // wrong token
    //$response["redirect"] = "../index.php?wrongToken=true";
    echo json_encode($response);
    exit();
    
    
} else {
    $response["success"] = false;
    $response["errorCode"] = 612; // missing token
    //$response["redirect"] = "../index.php?missingToken=true";
    echo json_encode($response);
    exit();
}


?>