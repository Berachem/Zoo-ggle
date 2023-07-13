<?php
session_start();
$response = array();
session_destroy();

$response["success"] = true;
$response["redirect"] = '/?disconnected=true';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:3000');
header('Access-Control-Allow-Credentials: true');
echo json_encode($response);
?>