<?php
require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';

    $response = array();
    if(isset($_GET['idGame']) && !empty($_GET['idGame'])){
        $idGame = intval($_GET['idGame']);
        if (is_int($idGame) && gameById($idGame)) {
            if (count(getPlayers($idGame)) < gameById($idGame)->NombreJoueursMax) {
                if (!getGameInProgressStartedOrNotForUser($_SESSION["user"]) && !in_array($_SESSION["user"], getPlayers($idGame))) {
                    addPlayerToWaitingRoomForGame($_SESSION["user"], $idGame);
                    $response["success"] = true;
                    $response["redirect"] = "../waitingRoom.php?idGame=" . $idGame;
                }else{
                    $response["success"] = false;
                    $response["errorCode"] = 604; // user already in game or waiting room
                    $response["redirect"] = "../index.php?alreadyInGame=true";
                }
            }else{
                $response["success"] = false;
                $response["errorCode"] = 605; // game full
                $response["redirect"] = "../index.php?gameFull=true";
            }
        }else{
            $response["success"] = false;
            $response["errorCode"] = 606; // game does not exist
            $response["redirect"] = "../index.php?gameDoesntExist=true";
        }
    }else{
        $response["success"] = false;
        $response["errorCode"] = 607; // missing id game
        $response["redirect"] = "../index.php?noGameSelected=true";
    }

    if (!isset($_SESSION["user"])) {
        $response["success"] = false;
        $response["errorCode"] = 603; // user not connected
        $response["redirect"] = "../index.php?notConnected=true";
    }

    header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
    echo json_encode($response);
?>