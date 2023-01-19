<?php
    session_start();
    require_once 'php/Connexion.php';

    if(isset($_POST['login']) && !empty($_POST['login']) && isset($_POST['psw']) && !empty($_POST['psw'])){
        if(($user = $db->login($_POST['login'],$_POST['psw'])) !== null){
            $_SESSION['user'] = $user;
        }
    }
    header("location: index.php?connected=true");
?>
