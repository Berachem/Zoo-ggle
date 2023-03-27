<?php
session_start();
$response = array();
session_destroy();

$response["success"] = true;
$response["redirect"] = '../index.php?disconnected=true';

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
echo json_encode($response);
?>