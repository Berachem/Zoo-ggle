<?php

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';
// recupère le token entré par l'utilisateur en POST afin de renvoyer le score obtenu avec ce dernier

if (!isset($_POST["token"])) {
    echo json_encode(array("success" => false, "error" => "Pas de token en POST"));
    exit();
}else{
    $token = $_POST["token"];
    $data = getUserByToken($token);
    echo json_encode(array("success" => true, "pseudo" => $data->Pseudo,"id" => $data->IdJoueur));
}



?>