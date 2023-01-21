<?php
    session_start();
    require_once("lib/parse.env.php");
    require_once 'Connexion.php';
    require_once 'sendAuthenToken.php';
    require_once 'functions.php';

    if(isset($_POST['login']) && !empty($_POST['login']) && isset($_POST['psw']) && !empty($_POST['psw'])){
        $user = $db->login($_POST['login'],$_POST['psw']);
        if($user != null){
            // generate token
            $randomSHA256 = hash('sha256', random_bytes(32));
            $_SESSION['token'] = $randomSHA256;
            $_SESSION['waitingUser'] = $user;
            // send token
            sendTokenByMail(getPlayerMail($user), $randomSHA256);
            header("location: ../index.php?mailSend=true");

        }else{
            header("location: ../index.php?connected=false");
        }
    }else{
        header("location: ../index.php?connected=false");
    }
?>
