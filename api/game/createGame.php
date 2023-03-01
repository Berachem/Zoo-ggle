<?php
require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';
session_start();

// recoit des données de la forme : { ["proxies"]=> array(0) { } ["user"]=> string(16) "berachem.markria" } } array(4) { ["name"]=> string(2) "sa" ["langue"]=> string(3) "FRA" ["taille"]=> string(1) "4" ["mode"]=> string(1) "0" }
$response = array();

// si pas connecté retour à l'accueil avec un message d'erreur
if(isset($_POST["name"]) && isset($_POST["langue"]) && isset($_POST["taille"]) && isset($_POST["mode"])){
   $idGame =  createGame(
        $_SESSION["user"],
        $_POST["name"],
        $_POST["langue"],
        intval($_POST["taille"]),
        intval($_POST["mode"]),
        $_POST["public"],
        intval($_POST["nbjoueurs"])
    );

    if (!$idGame) {
        $response["success"] = false;
        $response["errorCode"] = 614; // error while creating game
        $response["redirect"] = 'index.php?error=true';
        header('Content-Type: application/json');
        echo json_encode($response);
        exit;
    }

    $response["success"] = true;
    $response["redirect"] = 'game.php?id='.$idGame;
    header('Content-Type: application/json');
    echo json_encode($response);
} else {
    $response["success"] = false;
    $response["errorCode"] = 615; // missing parameters : name, langue, taille, mode
    $response["bidule"] = implode(" ",$_GET);
    $response["redirect"] = 'index.php?error=true';
    header('Content-Type: application/json');
    echo json_encode($response);
}






?>