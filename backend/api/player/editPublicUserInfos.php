<?php

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';

session_start();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');

if (!isset($_SESSION['user'])) {
    $response = array(
        "success" => false,
        "message" => "User not connected."
    );
    echo json_encode($response);
    exit();
}

$idJoueur = $_SESSION['user'];
$mail = $_POST['mail'] ?? null;
$pseudo = $_POST['pseudo'] ?? null;
$description = $_POST['description'] ?? null;
$logo = $_POST['logo'] ?? null;
$profilPublic = $_POST['profil_public'] ?? null;

if (editPublicProfileDatas($idJoueur, $mail, $pseudo, $description, $logo, $profilPublic)) {
    $response = array(
        "success" => true,
        "message" => "Profile data updated."
    );
} else {
    $response = array(
        "success" => false,
        "message" => "Profile data not updated."
    );
}

echo json_encode($response);

?>