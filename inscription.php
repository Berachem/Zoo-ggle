<?php
    session_start();
    require_once 'php/Connexion.php';

    if(isset($_POST['login']) && !empty($_POST['login']) && isset($_POST['psw']) &&
        !empty($_POST['psw']) && isset($_POST['mail']) && !empty($_POST['mail']) && isset($_POST['public']) &&
        isset($_POST['desc'])){

        if(empty($_POST['desc'])){ //le seul qui peut être vide
            $desc="";
        }else{
            $desc=$_POST['desc'];
        }

        $db->register($_POST['login'],$_POST['psw'],$_POST['mail'],$desc,$_POST['public']);
        $_SESSION['user'] = $db->getId($_POST['login']);
    }
    header("location: index.php");
?>