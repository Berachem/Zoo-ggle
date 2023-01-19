<?php
    session_start();
    require_once("lib/parse.env.php");
    require_once 'Connexion.php';

    if(isset($_POST['login']) && !empty($_POST['login']) && isset($_POST['psw']) && !empty($_POST['psw'])){
        $user = $db->login($_POST['login'],$_POST['psw']);
        if($user != null){
            $_SESSION['user'] = $user;
            header("location: ../index.php?connected=true");
        }else{
            header("location: ../index.php?connected=false");
        }
    }else{
        header("location: ../index.php?connected=false");
    }
?>
