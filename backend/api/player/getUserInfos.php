<?php

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';
session_start();

$response = array();
if (isset($_GET["profileId"]) || isset($_GET["pseudo"]) || isset($_SESSION["user"])){
if (isset($_SESSION["user"])) {$profileId= $_SESSION["user"];}else{
    if (isset($_GET["profileId"])){
        $profileId=$_GET["profileId"];
    }else{
        $profileId= getIdByPseudo($_GET["pseudo"]);
    }}
    $statistics = getUserStatistics($profileId);

    
    // =========================================
    /* get All games played by the player */
    // =========================================
    $allGamesDetails = getAllGamesPlayedByUser($profileId);
        
    $i = 0;
    foreach ($allGamesDetails as $gameDetails) {
        $allValidsWordsListByPlayer = getValidsWordsListByPlayerInGame($profileId, $gameDetails->IdPartie) == null ? [] : getValidsWordsListByPlayerInGame($profileId, $gameDetails->IdPartie);
        $validWordsNumber = count($allValidsWordsListByPlayer);
        
        $allWordsListByPlayer = getAllWordsListByPlayerInGame($gameDetails->IdPartie, $profileId) == null ? [] : getAllWordsListByPlayerInGame($gameDetails->IdPartie, $profileId);
        $wordProposedNumber = count($allWordsListByPlayer);
        
        $validWordPercentage = ($validWordsNumber / $gameDetails->NombreMotsPossibles) * 100;
       
        $allGamesDetails[$i]->validWordsNumber = $validWordsNumber;
        $allGamesDetails[$i]->wordProposedNumber = $wordProposedNumber;
        $allGamesDetails[$i]->validWordPercentage = $validWordPercentage;
        $allGamesDetails[$i]->leaderboard=getLeaderBoardGame($gameDetails->IdPartie);
//            $mode = intval($gameDetails->Mode) == 0 ? "Classique" : "spécial";
        $i++;
    }
    // =========================================

    if ($statistics != null){
        $response["success"]=true;
        $response["profileInfos"]=$statistics; // get player statistics
        $response["allGamesDetails"]=$allGamesDetails == null ? [] : $allGamesDetails; // get all games played by the player
    }else{
        $response["success"]=false;
        $response["errorCode"]=616; // No matching player
        $response["redirect"]="../index.php";
    }
}else{
    $response["success"]=false;
    $response["errorCode"]=613; // No player to check given
    $response["redirect"]="../index.php";
}

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

echo json_encode($response);


?>