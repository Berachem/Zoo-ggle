<?php
require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';
// recupère le word entré par l'utilisateur en POST et regarde s'il est dans le dictionnaire et si il est dans la grille
// si oui renvoie un json avec success = true et le word sinon success = false et l'erreur
session_start();

// si pas connecté renvoie un json avec success = false et l'erreur

if (!isset($_SESSION["user"])) {
    echo json_encode(array("success" => false, "error" => "Utilisateur non connecté"));
    exit();
}

if (!isset($_POST["word"])) {
    echo json_encode(array("success" => false, "error" => "Pas de word en POST"));
    exit();
}


$word = $_POST["word"];
// 1. Créer une fonction qui renvoie des données de la partie en cours du user

$playerId = $_SESSION["user"];
//echo "Id joueur : $playerId";
$currentGame = getGameInProgressStartedForUser($playerId);
//var_dump($currentGame);


// 2. Récupérer la grille de la partie
$grid = $currentGame->Grille;
$gameId = $currentGame->IdPartie;
$gridSize = $currentGame->TailleGrille;
/*
echo "<br/> <br/>";
echo "$gameId ";
echo "$grid ";
echo "$gridSize ";
*/

// 3. Appeller la fonction getValidWordsForGrid avec la grille

$allValidWords = getValidWordsForGrid($grid,$gridSize);
/*
echo "LES résultats: ";
print_r($allValidWords);
*/
// 4. Vérifier si le word est dans le tableau renvoyé par la fonction


if (in_array($word, $allValidWords)) {
    // json avec success = true et le word
    // TODO : si le mot est le nom d'un animal, ajouter X points au joueur
    addWordPlayedByAPlayer($playerId,$gameId,$word,1);

    echo json_encode(array("success" => true, "mot" => $word));
    
} else {
    // json avec success = false et l'erreur
    addWordPlayedByAPlayer($playerId,$gameId,$word,0);
    echo json_encode(array("success" => false, "error" => "word non valide"));
}

?>