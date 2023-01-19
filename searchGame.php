<?php

// permet de chercher une partie parmi celle qui sont publiques (serachGame.php) et 
//qui n'ont pas commencées (sans critères de recherche)

require_once("php/functions.php");
session_start();
include('includes/header.inc.php');

?>

<style>
.game-card {
    border: none;
    border-radius: 10px
}

.c-details span {
    font-weight: 300;
    font-size: 13px
}

.icon {
    width: 50px;
    height: 50px;
    background-color: #eee;
    border-radius: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 39px
}

.badge span {
    background-color: #fffbec;
    width: 60px;
    height: 25px;
    padding-bottom: 3px;
    border-radius: 5px;
    display: flex;
    color: #fed85d;
    justify-content: center;
    align-items: center
}

.progress {
    height: 10px;
    border-radius: 10px
}

.progress div {
    background-color: red
}

.text1 {
    font-size: 14px;
    font-weight: 600
}

.text2 {
    color: #a5aec0
}
</style>

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
} 

?>

<div class="container mt-5 mb-3">
    <div class="row">
       <!--  <div class="col-md-4">
            <div class="game-card p-3 mb-2">
                <div class="d-flex justify-content-between">
                    <div class="d-flex flex-row align-items-center">
                        <div class="icon"> <i class="bx bxl-mailchimp"></i> </div>
                        <div class="ms-2 c-details">
                            <h6 class="mb-0">Mailchimp</h6> <span>1 days ago</span>
                        </div>
                    </div>
                    <div class="badge"> <span>Design</span> </div>
                </div>
                <div class="mt-5">
                    <h3 class="heading">Senior Product<br>Designer-Singapore</h3>
                    <div class="mt-5">
                        <div class="progress">
                            <div class="progress-bar" role="progressbar" style="width: 50%" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100"></div>
                        </div>
                        <div class="mt-3"> <span class="text1">32 Applied <span class="text2">of 50 capacity</span></span> </div>
                    </div>
                </div>
            </div>
        </div> -->
        <?php
        $allGamesDetails = getPublicGames('FRA',0,2,''); // on récupère toutes les parties publiques et non commencées


        

        foreach ($allGamesDetails as $gameDetails) {
            $mode = intval($gameDetails->Mode) == 0 ? "classique" : "spécial";
            


            echo '
            <div class="col-md-4">
                <div class="game-card p-3 mb-2">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                            <div class="icon"> <i class="bx bxl-mailchimp"></i> </div>
                            <div class="ms-2 c-details">
                                <h6 class="mb-0">Créée par '.getPseudoById($gameDetails->IdChef).' 
                                dont le nom est '.$gameDetails->NomPartie.' et 
                                a un nombre de joueurs maximum de '.$gameDetails->NombreJoueursMax.'
                                </h6> 
                            </div>
                        </div>
                        <div class="badge"> <span>Mode de jeu '.$mode.'</span> </div>
                    </div>
                    <div class="mt-5">
                        <h3 class="heading">En cours ? <br>'.
                        $gameDetails->DateDebutPartie. ' - '.$gameDetails->DateFinPartie
                        .'</h3>
                        <div class="mt-5">
                            <div class="mt-3"> <span class="text1"> Langue :'.
                            $gameDetails->LangueDico
                            .' trouvé(s) <span class="text2">
                            sur une grille de taille'.$gameDetails->TailleGrille.' mots</span></span> </div>
                        </div>
                    </div>
                </div>
            </div>';    
        }
        ?>
        
        
    </div>
</div>


<?php

include("includes/footer.inc.php");

?>