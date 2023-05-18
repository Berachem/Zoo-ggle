<?php
require_once '../functions.php';
// recupère le word entré par l'utilisateur en POST afin de renvoyer le score obtenu avec ce dernier

if (!isset($_POST["word"])) {
    echo json_encode(array("success" => false, "error" => "Pas de word en POST"));
    exit();
}else{
    $word = $_POST["word"];
    $result = getScoreForAWord($word);
    $score = $result[0];
    $isAnimal = $result[1];
    echo json_encode(array("success" => true, "score" => $score, "isAnimal"=>$isAnimal));
}



?>