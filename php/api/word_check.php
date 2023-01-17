<?php
// recupère le mot entré par l'utilisateur en POST et regarde s'il est dans le dictionnaire et si il est dans la grille
// si oui renvoie un json avec success = true et le mot sinon success = false et l'erreur
session_start();

// si pas connecté renvoie un json avec success = false et l'erreur
if (!isset($_SESSION["user"])) {
    echo json_encode(array("success" => false, "error" => "Utilisateur non connecté"));
    exit();
}

// récupère le mot entré par l'utilisateur et la grille
$mot = $_POST["mot"];
$grille = $_POST["grille"];

echo '.\server\game_motor\executables\solve.exe server/data/listeMot.lex 2 4 4 ' . implode(" ", $grille);
$result = shell_exec('.\game_motor\executables\solve.exe server/data\listeMot.lex 2 4 4 '.implode(" ", $grille));
$result = explode(" ", $result);

// TODO : add to database

if (in_array($mot, $result)) {
    // json avec success = true et le mot
    echo json_encode(array("success" => true, "mot" => $mot));
    
} else {
    // json avec success = false et l'erreur
    echo json_encode(array("success" => false, "error" => "Mot non valide"));
}

?>