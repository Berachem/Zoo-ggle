<?php
require_once '../functions.php';
// recupère le word entré par l'utilisateur en POST afin de renvoyer le score obtenu avec ce dernier

if (!isset($_POST["word"])) {
    echo json_encode(array("success" => false, "error" => "Pas de word en POST"));
    exit();
}else{
    $word = $_POST["word"];
    $score = getScoreForAWord($word);
    echo json_encode(array("success" => true, "score" => $score));
}



?>