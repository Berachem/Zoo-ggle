<?php
const HTTP_OK = 200;
const HTTP_BAD_REQUEST = 400;
const HTTP_METHOD_NOT_ALLOWED = 405;

require_once("lib/parse.env.php");
require_once('Connexion.php');

if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && strtoupper($_SERVER['HTTP_X_REQUESTED_WITH']) == "XMLHTTPREQUEST"){

    $responceCode = HTTP_BAD_REQUEST;
    $retour = "not ok";

    if(isset($_POST['login'])){
        $responceCode = HTTP_OK;

        $id = $db->getId($_POST['login']);
        if($id == null){
            $retour = "ok";
        }
    }
    responce($responceCode,$retour);
}else{

    $responceCode = HTTP_METHOD_NOT_ALLOWED;
    $retour = "not ok";

    responce($responceCode,$retour);
}

function responce($responceCode,$retour){
    header("Content-Type: application/json");
    http_response_code($responceCode);
    $responce = [
        "code" => $responceCode,
        "message" => $retour,
    ];

    echo json_encode($responce);
}