<?php
session_start();

require_once 'lib/parse.env.php';
require_once 'Connexion.php';

if(isset($_POST['message']) && isset($_SESSION['user'])){

    $querry = "INSERT INTO B_Message (IdPartie,IdJoueur,Contenu,DateMessage) VALUES (:idPartie,:idJoueur,:message,NOW());";
    $parameters = [
        [":idPartie",33],//a actualiser
        [":idJoueur",$_SESSION['user']],
        [":message",$_POST['message']]
    ];
    $db->execQuery($querry,$parameters);

    $retour = [
        "message" => $_POST['message'],
        "Joueur" => $_SESSION['user'],
        "retour" => "OK"
    ];
    echo json_encode($retour);
}elseif (isset($_POST['ping']) && $_POST['ping'] == "update required" && isset($_SESSION['user'])){ //remplacer la variable de session du user par celle de la partie
    $querry = "SELECT Contenu FROM B_Message WHERE IdPartie = :idPartieJoueur";
    $parameters = [
        [":idPartieJoueur", 33]
    ];
    $sql = $db->execQuery($querry,$parameters);

    $retour = [
        "retour" => "OK",
        "requette" => $sql
    ];

    echo json_encode($retour);

}else{
    $retour = [
        "retour" => "NOT OK",
        "user" => $_SESSION['user'],
        "ping" => $_POST['ping']
    ];
    echo json_encode($retour);
}

/*pour le chat entren les joueurs
  Faire une différenciation des requettes pour le style du chat (sinon illisible)
  Order By afin de pouvoir les dépiller dans l'ordre simplement (comparer le plus vieux puis print etc...)

    $requette = "SELECT ContenuMessagePrive,IdMessagePrive FROM B_MessagePrive WHERE IdJoueur = :idJoueur ORDER BY IdMessagePrive"
    $parameters = [
            [":IdJoueur",$_SESSION['user']]
        ];
    $messageRecu = $db->execQuery($querry,$parameters);

    $requette = "SELECT ContenuMessagePrive,IdMessagePrive FROM B_MessagePrive WHERE IdJoueur_1 = :idJoueur ORDER BY IdMessagePrive"
    $parameters = [
            [":IdJoueur",$_SESSION['user']]
        ];
    $messageEnvoye = $db->execQuery($querry,$parameters);

    $retour = [
            "retour" => "OK",
            "messageEnvoye" => $messageEnvoye,
            "messageRecu" => $messageRecu
        ];
    echo json_encode($retour);

*/

