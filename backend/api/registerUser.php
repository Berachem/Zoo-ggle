<?php
    session_start();
    require_once("lib/parse.env.php");
    require_once 'Connexion.php';
    require_once 'functions.php';
    require_once 'sendAuthenToken.php';
    $response = array();

    if(isset($_POST['login']) && !empty($_POST['login']) && isset($_POST['psw']) &&
        !empty($_POST['psw']) && isset($_POST['mail']) && !empty($_POST['mail']) && isset($_POST['public']) &&
        isset($_POST['desc'])){

        if(empty($_POST['desc'])){ //le seul qui peut être vide
            $desc="";
        }else{
            $desc=$_POST['desc'];
        }

        $db->register($_POST['login'],$_POST['psw'],$_POST['mail'],$desc,$_POST['public']);
        $user = $db->getId($_POST['login']);
        $_SESSION['waitingUser'] = $user;

        // generate token
        $randomSHA256 = hash('sha256', random_bytes(32));
        // add token to user
        addTokenToUser($user, $randomSHA256);
        // send token
        sendTokenByMail(getPlayerMail($user), $randomSHA256);

        $response["success"] = true;
        $response["redirect"] = "../index.php?registered=true";
    }else{
        $response["success"] = false;
        $response["redirect"] = "../index.php?registered=false";
        $response["error"] = 613; //missing parameter
    }
    header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
    echo json_encode($response);

?>