<?php
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
    }else{
        echo "PAS DE PARAMETRE <br>";
    }

?>


<form action="" method="post">
    <input type="text" name="login" id="login"> <label for="login">LOGIN</label><br>
    <input type="password" name="psw" id="psw"> <label for="psw">MDP</label><br>
    <input type="mail" name="mail" id="mail"> <label for="mail">MAIL</label><br>
    <input type="text" name="desc" id="desc"> <label for="desc">DESC</label><br>
    <input type="radio" name="public" id="public" value="1"><label for="public">PUBLIC</label>
    <input type="radio" name="public" id="non-public" value="0"><label for="non-public">NON PUBLIC</label> <br>
    <input type="submit">
</form>
