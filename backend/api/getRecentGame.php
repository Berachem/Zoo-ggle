<?php
session_start();

require_once("lib/parse.env.php");
require_once 'Connexion.php';
require_once 'functions.php';

$response = array();
$response["success"]=true;
$response["result"]=getRecentGame();

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
echo json_encode($response);