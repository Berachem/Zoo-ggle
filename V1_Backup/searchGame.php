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

.shadow-hover:hover {
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.2);
    transform: translateY(-5px);
    transition: all 0.3s ease-in-out;
}


</style>

<?php

// permet de chercher une partie parmi celle qui sont publiques (serachGame.php) et 
//qui n'ont pas commencées (sans critères de recherche)

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
} 
$allGamesDetails = getPublicGames('FRA',0,2,''); // on récupère toutes les parties publiques et non commencées
?>

<br>
<br>
<h1 class="text-center">Rechercher une partie (<?php echo count($allGamesDetails); ?>)</h1>



<div class="container mt-5 mb-3">
    <div class="row">
        <?php
        if (isset($_SESSION['user'])){
            $currentGame = getGameInProgressStartedOrNotForUser($_SESSION['user']); // on récupère la partie en cours de l'utilisateur
        }
        else{
            $currentGame = null;
        }
       

        if ($currentGame){
            $mode = intval($currentGame->Mode) == 0 ? "Classique" : "spécial";
            echo '
            <h2 class="text-center">Vous avez une partie en cours !</h2>
            <div class="col-md-4 shadow-hover"  style="border: 1px solid #eee; border-radius: 10px; background-color: #faebeb; margin: 0 auto; ">
                <div class="game-card p-3 mb-2">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                            <div class="icon"> 
                            <img src="assets/playersLogos/default.png" width="50" height="50">
                            </div>
                            <div class="ms-2 c-details">
                                <h6 class="mb-0">Chef : <u> <a href="profile.php?pseudo='.getPseudoById($currentGame->IdChef).'">'.getPseudoById($currentGame->IdChef).'</a></u></h6>
                                En cours <i class="bi bi-circle-fill" style="color: red;"></i>
                            </div>
                        </div>
                        <div class="badge">
                            <span class="text1">
                            '.$mode.'
                            </span>
                        </div>
                    </div>
                    
                </div>
                <a class="btn btn-primary" href="waitingRoom.php?idGame='.$currentGame->IdPartie.'">
                    <i class="bi bi-controller"></i> Rejoindre la partie
                    </a>
            </div>
            <br>
            
            ';


        }
     

        foreach ($allGamesDetails as $gameDetails) {
            $mode = intval($gameDetails->Mode) == 0 ? "Classique" : "spécial";
            


            echo '
            <div class="col-md-4 shadow-hover">
                <div class="game-card p-3 mb-2">
                    <div class="d-flex justify-content-between">
                        <div class="d-flex flex-row align-items-center">
                            <div class="icon"> 
                            <img src="assets/playersLogos/default.png" width="50" height="50">
                            
                            </div>
                            <div class="ms-2 c-details">
                                <h6 class="mb-0">Chef : <u> <a href="profile.php?pseudo='.getPseudoById($gameDetails->IdChef).'">'.getPseudoById($gameDetails->IdChef).'</a></u>
                                </h6> 
                            </div>
                        </div>
                        <div class="badge"> <span>'.$mode.'</span> </div>
                    </div>
                    <div class="mt-5">
                        <h3 class="heading"><i>'.$gameDetails->NomPartie.'</i><br></h3>
                        <div class="mt-5">
                            <div class="mt-3"> <span class="text1"><span class="text2">
                            <i class="bi bi-alarm-fill"></i> '.
                            $gameDetails->DateDebutPartie
                            .'<br>
                            Langue :   <img src="assets/flags/'.$gameDetails->LangueDico.'.png" alt="'.$gameDetails->LangueDico.'" width="20" height="20"> <br>
                            Grille de '.$gameDetails->TailleGrille.'x'.$gameDetails->TailleGrille.' à '.$gameDetails->NombreJoueursMax.' <i class="bi bi-people-fill""></i></span></span> </div>
                        </div>
                    </div>
                    <center>
                    <a class="btn btn-primary" href="php/joinGame.php?idGame='.$gameDetails->IdPartie.'">
                    <i class="bi bi-controller"></i>
                    Rejoindre ('.getNbPlayersInWaitingRoom($gameDetails->IdPartie).'/'.$gameDetails->NombreJoueursMax.')
                    </a>
                    </center>
                </div>
            </div>';    
        }
        ?>
        
        
    </div>
</div>

<br>
<br>




<?php

include("includes/footer.inc.php");

?>