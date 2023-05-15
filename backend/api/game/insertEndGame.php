<?php
require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';

if (isset($_POST["infoPartie"]) && isset($_POST["infoJoueurs"])){
    // echo json_encode(array("success" => true, "test" => "ISSET TRUE"));
    $infoPartie = $_POST["infoPartie"];
    $infoJoueurs = $_POST["infoJoueurs"];
    // echo $infoPartie;
    $infoPartie = json_decode($infoPartie,true);
    $infoJoueurs = json_decode($infoJoueurs,true);

    // var_dump($infoPartie);
    $name = $infoPartie["nom"];
    $lang = $infoPartie["langue"];
    $grid = $infoPartie["grille"];
    $beginDate = $infoPartie["dateDebut"];
    $endDate = $infoPartie["dateFin"];
    $gridSize = $infoPartie["taille"];
    $possibleNumberWord = $infoPartie["nombreMotPossibles"];
    $mode = $infoPartie["mode"];
    $playerNumber = $infoPartie["nombreJoueurs"];
    // var_dump($playerNumber);

    $gameId = insertGame($name, $lang, $grid, $beginDate, $endDate, $gridSize, $possibleNumberWord, $mode, $playerNumber);
    $gameId = intval($gameId);
    var_dump($gameId);

    foreach($infoJoueurs as $joueur){
        insertPlayerPlayedAGame($gameId, $joueur["id"], $joueur["score"]);

        $validWords = $joueur["validWords"];
        $falseWords =$joueur["falseWords"];

        foreach($validWords as $word){
            addWordPlayedByAPlayer($joueur["id"],$gameId,$word[0],1,$word[1]);
        }

        foreach($falseWords as $word){
            addWordPlayedByAPlayer($joueur["id"],$gameId,$word[0],0,$word[1]);
        }
    }
}else{
    echo json_encode(array("success" => false, "error" => "Il manque des paramètres en POST"));
}
?>
