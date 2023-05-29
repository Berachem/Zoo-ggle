<?php

// API qui renvoie le classement d'une partie en fonction de son id en POST
// Renvoie un JSON avec le classement de la partie (liste des joueurs, score)

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';

session_start();


    header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
    
    if(isset($_GET["idPartie"])) {
        $playersData = getLeaderBoardGame($_GET["idPartie"]);

        if(!empty($playersData)){
            $response = array(
                "success" => true,
                "leaderboard" => $playersData
            );
        } else {
            $response = array(
                "success" => false,
                "message" => "No leaderboard found."
            );
        }
    } else {
        $response = array(
            "success" => false,
            "message" => "idPartie not set."
        );
    }

    echo json_encode($response);
?>

