<?php
    session_start();
    require_once("lib/parse.env.php");
    require_once 'Connexion.php';
    require_once 'sendAuthenToken.php';
    require_once 'functions.php';

    $response = array();
    if(isset($_POST['login']) && !empty($_POST['login']) && isset($_POST['psw']) && !empty($_POST['psw'])){
        $user = $db->login($_POST['login'],$_POST['psw']);
        if($user != null){

            $_SESSION['token'] = $randomSHA256;
            $_SESSION['waitingUser'] = $user;

            if(needAToken($user)){
                // generate token
                $randomSHA256 = hash('sha256', random_bytes(32));
                // add token to user
                addTokenToUser($user, $randomSHA256);
                // send token
                sendTokenByMail(getPlayerMail($user), $randomSHA256);
                $response["token"] = "need a verification";
            }else{
                $response["token"] = "does not need a verification";
            }
            $response["success"] = true;
            $response["userId"] = $user;

        }else{
            $response["success"] = false;
            $response["errorCode"] = 601; // wrong login or password
            $response["redirect"] = "../index.php?wrongLoginOrPsw=true";
        }
    }else{
        $response["success"] = false;
        $response["errorCode"] = 600; // missing login or password
        $response["redirect"] = "../index.php?missingLoginOrPsw=true";
    }

    header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
    echo json_encode($response);
?>