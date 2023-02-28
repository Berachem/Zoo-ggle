
<?php

// API qui renvoie les infos de la partie en cours du user qui a déjà commencée (mais pas finie)
// renvois un JSON avec les infos suivantes :
// - liste des joueurs
// - si la partie est terminée ou non

require_once '../lib/parse.env.php';
require_once '../Connexion.php';
require_once '../functions.php';
require_once '../animals/animalsData.php';

session_start();

$response = array();

if (isset($_SESSION["user"])) {
    $game = getGameInProgressStartedForUser($_SESSION["user"]);
    if ($game) {
        $response["gameFinished"] = false;
        if ($game->IdChef == $_SESSION["user"]) {
            endAGame($game->IdPartie);
            $response["gameFinished"] = true;
        }
        $response["success"] = true;
    }else{
        $response["success"] = false;
        $response["errorCode"] = 602; // no game in progress
        $response["redirect"] = '../index.php?noGameInProgress=true';
    }

}else{
    $response["success"] = false;
    $response["errorCode"] = 603; // user not connected
    $response["redirect"] = '../index.php?notConnected=true';
}

header('Content-Type: application/json');
echo json_encode($response);

?>

