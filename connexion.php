<?php
    session_start();
    require_once 'php/Connexion.php';

    if(isset($_POST['login']) && !empty($_POST['login']) && isset($_POST['psw']) && !empty($_POST['psw'])){
        if(($user = $db->login($_POST['login'],$_POST['psw'])) !== null){
            $_SESSION['user'] = $user;
            echo "CONNECTE";
        }else{
            echo "NON CONNECTE";
        }
    }
?>

<form action="" method="post">
    <input type="text" name="login" id="login"> <label for="login">LOGIN</label><br>
    <input type="password" name="psw" id="psw"> <label for="psw">MDP</label><br>
    <input type="submit">
</form>
