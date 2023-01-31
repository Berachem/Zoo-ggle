<?php
//require_once("php/Connexion.php");
require_once("php/functions.php");
session_start();




include('includes/header.inc.php');
?>



<br>
<br>
<?php

if(!isset($_SESSION['user'])) { // && false pour tester la page sans être connecté

    // si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
    echo '
    <br>
    <br>
    <div class="container">
            <div class="alert alert-danger alert-dismissible fade show" role="alert">
                <strong>Vous devez être connecté pour accéder à cette page.</strong> <a href="index.php" class="alert-link">Se connecter</a>
                
            </div>
        </div>';
    exit;
} 

?>






<?php

include("includes/footer.inc.php");

?>
