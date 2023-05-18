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
            if(needAToken($user)){
                $_SESSION['waitingUser'] = $user;
                // generate token
                $randomSHA256 = hash('sha256', random_bytes(32));
                // add token to user
                addTokenToUser($user, $randomSHA256);
                // send token
                sendTokenByMail(getPlayerMail($user), $randomSHA256);
                $response["redirect"] = "../?registered=true";
                $_SESSION['token'] = $randomSHA256;
                
            }else{
                $_SESSION['user']=$user;
                $response["redirect"] = "../?connected=true";
            }
            $response["success"] = true;
            $response["userId"] = $user;

        }else{
            $response["success"] = false;
            $response["errorCode"] = 601; // wrong login or password
            $response["redirect"] = "/connexion?connected=false";
        }
    }else{
        $response["success"] = false;
        $response["errorCode"] = 600; // missing login or password
        //$response["redirect"] = "/acceuil?missingLoginOrPsw=true";
    }

    header('Content-Type: application/json');
    header('Access-Control-Allow-Origin: http://localhost:3000');
    header('Access-Control-Allow-Credentials: true');
    echo json_encode($response);
?>