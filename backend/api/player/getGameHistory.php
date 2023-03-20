<?php

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';
session_start();

$response = array();
if (!isset($_SESSION["user"])) {
    // pas connecté (json)
    $response["success"] = false;
    $response["errorCode"] = 603; // user not connected
    $response["redirect"] = '../index.php?notConnected=true';
}else{
    if (isset($_POST["profileId"])){
        $profileId = $_POST["profileId"];
        $allGamesDetails = getAllGamesPlayedByUser($profileId);
        $i = 0;
        foreach ($allGamesDetails as $gameDetails) {
            $allValidsWordsListByPlayer = getValidsWordsListByPlayerInGame($profileId, $gameDetails->IdPartie);
            $validWordsNumber = count($allValidsWordsListByPlayer);
            $allWordsListByPlayer = getAllWordsListByPlayerInGame($gameDetails->IdPartie, $profileId);
            $wordProposedNumber = count($allWordsListByPlayer);
            $validWordPercentage = ($validWordsNumber / $gameDetails->NombreMotsPossibles) * 100;

            $allGamesDetails[$i]["validWordsNumber"] = $validWordsNumber;
            $allGamesDetails[$i]["wordProposedNumber"] = $wordProposedNumber;
            $allGamesDetails[$i]["validWordPercentage"] = $validWordPercentage;
            $allGamesDetails[$i]["leaderboard"]=getLeaderBoardGame($gameDetails->IdPartie);
//            $mode = intval($gameDetails->Mode) == 0 ? "Classique" : "spécial";
            $i++;
        }
    }else{
        $response["sucess"]=false;
        $response["errorCode"]=613; // No player to check given
        $response["redirect"]="../index.php";
    }
}



$response = array();
$response["success"] = true;
header('Content-Type: application/json');
echo json_encode($response);

?>