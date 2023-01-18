<?php
// recupère le mot entré par l'utilisateur en POST et regarde s'il est dans le dictionnaire et si il est dans la grille
// si oui renvoie un json avec success = true et le mot sinon success = false et l'erreur
session_start();

// si pas connecté renvoie un json avec success = false et l'erreur
/*
if (!isset($_SESSION["user"])) {
    echo json_encode(array("success" => false, "error" => "Utilisateur non connecté"));
    exit();
}
*/

$mot = $_POST["mot"];

// TODO : Lucas
// 1. Créer une fonction qui renvoie des données de la partie en cours du user 
// 2. Récupérer la grille de la partie
// 3. Appeller la fonction getValidWordsForGrid avec la grille 
// 4. Vérifier si le mot est dans le tableau renvoyé par la fonction


// TODO : add to database
if (in_array($mot, $result)) {
    // json avec success = true et le mot
    echo json_encode(array("success" => true, "mot" => $mot));
    
} else {
    // json avec success = false et l'erreur
    echo json_encode(array("success" => false, "error" => "Mot non valide"));
}

?>