<?php
require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';
session_start();

// Récupère les paramètres utiles au solve
$word = $_POST["word"];
$grid = $_POST["grid"];
$gridSize = intVal(sqrt(count($grid)));

//Appel à solve pour obtenir la liste de tout les mots valides

$allValidWords = getValidWordsForGrid($grid,$gridSize);

//Puis renvoie true et le mot si le mot est correct et false avec une erreur sinon

if (in_array($word, $allValidWords)) {
    // json avec success = true et le mot
    echo json_encode(array("success" => true, "mot" => $word));
    
} else {
    // json avec success = false et l'erreur
    echo json_encode(array("success" => false, "error" => "Mot non valide"));
}

?>