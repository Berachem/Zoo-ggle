<?php

// API qui renvoie les infos de la partie 
// renvois un JSON avec les infos suivantes :
// - liste des joueurs
// - si la partie est terminée ou non

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';

if (isset($_GET["idPartie"])) {
    if (isset($_GET["idJoueur"])) {
        $gameId = $_GET["idPartie"];
        $game = getGameInfos($gameId);
        $playerId = $_GET["idJoueur"];
        if ($game) {

            $leaderboard = getLeaderBoardGame($gameId);
            $playerGameInfos = getPlayerGameInfos($gameId,$playerId);
            $score = $playerGameInfos->Score;
            $foundedWordsCount = count(getValidWordsForUser($playerId,$gameId));

            $proposedWordsCounts = getProposedWordsCount($playerId,$gameId);
            if ($game->Mode == 0){
                $validWords = getValidWordsForUser($playerId,$gameId);
                $wordInfos = array_map(function ($word) {
                    $wordInfo = getScoreForAWord($word->Libelle);
                    return ["word"=>$word->Libelle, "score"=>$wordInfo[0], "isAnimal"=>$wordInfo[1]];
                }, $validWords);
                $foundedWordsCount = count($validWords);
            }else if ($game->Mode == 1){
                $allPlayersWordInfos = [];
                foreach ($leaderboard as $player){
                    $validWords = getValidWordsForUser($player->IdJoueur,$player->IdPartie);
                    $wordInfos = array_map(function ($word) {
                        $wordInfo = getScoreForAWord($word->Libelle);
                        return ["word"=>$word->Libelle, "score"=>$wordInfo[0], "isAnimal"=>$wordInfo[1]];
                    }, $validWords);
                    $allPlayersWordInfos[$player->Pseudo]=["score"=>$player->Score,"words"=>$wordInfos];
                }
                $wordInfos= $allPlayersWordInfos;
            }

            $infos = array(
                "success" => true,
                "gameInfos" => $game,
                "foundedWords" => $wordInfos,
                "proposedWordsCount" => $proposedWordsCounts,
                "score" => $score,
                "leaderboard" => $leaderboard,
                "foundedWordsCount" => $foundedWordsCount

            );
            header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: http://localhost:3000');
            echo json_encode($infos);
        } else {
            $infos = array(
                "success" => false,
                "error" => "Invalid game ID"
            );
            header('Content-Type: application/json');
        header('Access-Control-Allow-Origin: http://localhost:3000');
            echo json_encode($infos);
        }
    } else {
        $infos = array(
            "success" => false,
            "error" => "Missing player ID parameter"
        );
        header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: http://localhost:3000');
        echo json_encode($infos);
    }
} else {
    $infos = array(
        "success" => false,
        "error" => "Missing game ID parameter"
    );
    header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
    echo json_encode($infos);
}
