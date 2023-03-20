<?php

// API qui renvoie le classement d'une partie en fonction de son id en POST
// Renvoie un JSON avec le classement de la partie (liste des joueurs, score, temps passé)

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';

session_start();


    header('Content-Type: application/json');
    
    if(isset($_POST["idPartie"])) {
        $playersData = getLeaderBoardGame($_POST["idPartie"]);

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

