<?php
session_start();

require_once 'lib/parse.env.php';
require_once 'Connexion.php';

if(isset($_POST['message']) && isset($_SESSION['user'])){

    $querry = "INSERT INTO B_Message (IdPartie,IdJoueur,Contenu) VALUES (:idPartie,:idJoueur,:message);";
    $parameters = [
        [":idPartie",1],//a actualiser
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
}elseif (isset($_POST['ping']) && $_POST['ping'] == "update required" && isset($_SESSION['user'])){
    //l'idPartie du joueur
    $querry = "SELECT Contenu FROM B_Message WHERE IdPartie = :idPartieJoueur";
    $parameters = [
        [":idPartieJoueur", 1]
    ];
    $sql = $db->execQuery($querry,$parameters);

    $retour = [
        "retour" => "OK",
        "requette" => $sql
    ];

    echo json_encode($retour);

}else{
    $retour = [
        "retour" => "NOT OK"
    ];
    echo json_encode($retour);
}
