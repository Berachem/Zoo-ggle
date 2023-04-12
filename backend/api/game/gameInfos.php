<?php

// API qui renvoie les infos de la partie en cours du user qui a déjà commencée (mais pas finie)
// renvois un JSON avec les infos suivantes :
// - liste des joueurs
// - si la partie est terminée ou non

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';

if (isset($_GET["idPartie"])) {
    $game = getGameInfos($_GET["idPartie"]);
    if ($game) {
        $players = getPlayers($game->IdPartie);
        // map
        $players = array_map(function($player){
            return $player->Pseudo;
        }, $players);

        $gameEnded = getGameEnded($game->IdPartie);
        // $timePassed (minutes : secondes)
        $timePassed = time() - $game->DateDebutPartie;
        $timePassed = gmdate("i:s", $timePassed);
        // to String
        $timePassed = strval($timePassed);
        $score = getScoreOfPlayerInGame($game->IdChef, $game->IdPartie);
        if ($gameEnded)
            $leaderboard = getLeaderBoardGame($game->IdPartie);
            
        // map
        $validWords = array_map(function($word){
            return $word->Libelle;
        }, $validWords);

        $infos = array(
            "success" => true,
            "players" => $players,
            "gameEnded" => $gameEnded ? 1 : 0,
            "timePassed" => $timePassed,
            "foundedWords" => $validWords,
            "IdChef" => $game->IdChef,
            "score" => $score,
            "leaderboard" => $leaderboard
        );
        echo json_encode($infos);
    } else {
        $infos = array(
            "success" => false,
            "error" => "Invalid game ID"
        );
        echo json_encode($infos);
    }
} else {
    $infos = array(
        "success" => false,
        "error" => "Missing game ID parameter"
    );
    echo json_encode($infos);
}

?>
