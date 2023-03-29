<?php

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';
session_start();

$response = array();

    if (isset($_GET["profileId"]) || isset($_GET["pseudo"])){
        if (isset($_GET["profileId"])){
            $profileId=$_GET["profileId"];
        }else{
            $profileId= getIdByPseudo($_GET["pseudo"]);
        }

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

        $response["success"]=true;
        $response["allGamesDetails"]=$allGamesDetails == null ? [] : $allGamesDetails;



    }else{
    $response["success"]=false;
    $response["errorCode"]=613; // No player to check given
    $response["redirect"]="../index.php";
    }



header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($response);


?>