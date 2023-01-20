<?php

// Profile page (profile.php)

require_once("php/functions.php");
session_start();
include('includes/header.inc.php');


echo '<br>
<br>';
 
if (!isset($_SESSION['user']) && !isset($_GET['pseudo'])) {
    // badger is not logged in
    echo '<br>
    <br><div class="container">
            <div class="row">
                <div class="col-md-12">
                    <div class="alert alert-danger" role="alert">
                        <h4 class="alert-heading">Vous n\'êtes pas connecté!</h4>
                        <p>Vous avez besoin d\'être connecté pour accéder à cette page.</p>
                        <hr>
                    </div>
                </div>
            </div>
        </div>';
    exit;
}
 
$userID = $_SESSION['user'];
if (isset($_GET['pseudo'])) {
    $userID = getIdByPseudo($_GET['pseudo']);
}


$userStats = getUserStatistics($userID);

// all variables
$profilPublic = $userStats[0]->ProfilPublic;





$mail = $userStats[0]->Mail;
$pseudo = $userStats[0]->Pseudo;
$description = $userStats[0]->Description;
$logo = $userStats[0]->Logo;
$dateCreationCompte = $userStats[0]->DateCreationCompte;
$dateDerniereConnexion = $userStats[0]->DateDerniereConnexion;
$score = $userStats[0]->score;
$gamesPlayed = $userStats[0]->gamesPlayed;

$allWordsProposeds = getAllWordsProposedByUser($userID);
$allWordsValidated = getAllValidsWordsProposedByUser($userID);

// profile picture 

if ($logo == null) {
    $logo = "assets/playersLogos/default.png";
}

// description

if ($description == null) {
    $description = "Aucune description";
}

// profil public
if ($profilPublic == 1) {
    $profilPublic = "Publique";
} else {
    $profilPublic = '<i class="bi bi-lock-fill"></i>'." Privé";
}

// date creation compte
$dateCreationCompte = formatDateToSentence($dateCreationCompte);

// date derniere connexion
$dateDerniereConnexion = formatDateToSentence($dateDerniereConnexion);

// score
if ($score == 0) {
    $score = "Aucun score";
} else {
    $score = $score . " points";
}

// games played

if ($gamesPlayed == 0) {
    $gamesPlayed = "Aucune partie jouée";
} else {
    $gamesPlayed = $gamesPlayed . " parties jouées";
}

// words proposed
if (count($allWordsProposeds) == 0) {
    $allWordsProposeds = "Aucun mot proposé";
} else {
    $allWordsProposeds = count($allWordsProposeds) . " mots proposés";
}

// words validated
if (count($allWordsValidated) == 0) {
    $allWordsValidated = "Aucun mot validé";
} else {
    $allWordsValidated = count($allWordsValidated) . " mots validés";
}


// display profile

echo '<br><br><h1 class="text-center">Statistiques</h1>';
if ($profilPublic == "Publique" || $userID == $_SESSION['user']) {
      
echo '<div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="' .$logo. '" class="img-fluid" alt="Responsive image">
                            </div>
                            <div class="col-md-8">
                                <h5 class="card-title"><u>Pseudo :</u> ' . $pseudo . '</h5>
                                <p class="card-text"><u>Description :</u> ' . $description . '</p>
                                <p class="card-text"><u>Visibilité du profil :</u> ' . $profilPublic . '</p>
                                <p class="card-text"><u>Date de création du compte :</u> ' . $dateCreationCompte . '</p>
                                <p class="card-text"><u>Date de dernière connexion :</u> ' . $dateDerniereConnexion . '</p>
                                <p class="card-text"><u>Score :</u> ' . $score . '</p>
                                <p class="card-text"><u>Parties jouées :</u> ' . $gamesPlayed . '</p>
                                <p class="card-text"><u>Mots proposés :</u> ' . $allWordsProposeds . '</p>
                                <p class="card-text"><u>Mots validés :</u> ' . $allWordsValidated . '</p>
                                <a href="editProfile.php" class="btn btn-primary">
                                    <i class="bi bi-pencil-square"></i>
                                    Modifier mon profil
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>';
} else {
    echo '<div class="container">
        <div class="row">
            <div class="col-md-12">
                <div class="card">
                    <div class="card-body">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="' .$logo. '" class="img-fluid" alt="Responsive image">
                            </div>
                            <div class="col-md-8">
                                <h5 class="card-title"><u>Pseudo :</u> ' . $pseudo . '</h5>
                                <p class="card-text"><u>Description :</u> ' . $description . '</p>
                                <p class="card-text"><u>Visibilité du profil :</u> ' . $profilPublic . '</p>
                                <p class="card-text"><u>Score :</u> ' . $score . '</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>';
}
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

.pulsive {
    animation: pulse 1s infinite;
    animation-direction: alternate
}

@keyframes pulse {
    from {
        transform: scale(1)
    }

    to {
        transform: scale(1.8)
    }
}
</style>
    <section>

        <h1 class="text-center">Historique de parties</h1>

        <div class="container mt-5 mb-3">
            <div class="row">
                <?php

                $allGamesDetails = getAllGamesPlayedByUser($userID);
                

                foreach ($allGamesDetails as $gameDetails) {
                    $allValidsWordsListByPlayer = getValidsWordsListByPlayerInGame($gameDetails->IdPartie, $userID);
                    $allValidsWordsListByPlayerNumber = count($allValidsWordsListByPlayer);

                    $allWordsListByPlayer = getAllWordsListByPlayerInGame($gameDetails->IdPartie, $userID);
                    $allWordsListByPlayerNumber = count($allWordsListByPlayer);

                    $pourcentage =$allWordsListByPlayerNumber == 0 ? 0 :(int) ($allValidsWordsListByPlayerNumber / $allWordsListByPlayerNumber) * 100;

                    $mode = intval($gameDetails->Mode) == 0 ? "Classique" : "spécial";
                    $dateDebut = $gameDetails->DateDebutPartie == null ? "En cours <i class='bi bi-circle-fill pulsive' style='color: red;'></i>" : "jouée le ".$gameDetails->DateDebutPartie;
            


                    echo '
                    <center>
                    <br>
                    <div class="col-md-4">
                        <div class="game-card p-3 mb-2">
                            <div class="d-flex justify-content-between">
                                <div class="d-flex flex-row align-items-center">
                                    <div class="icon">  
                                    <img src="'.getLogoPathById($gameDetails->IdChef).'" alt="'.$gameDetails->LangueDico.'" width="50" height="50">
                                    </div>
                                    <div class="ms-2 c-details">
                                        <h6 class="mb-0">Créée par '.getPseudoById($gameDetails->IdChef).'</h6> <span>'.$dateDebut.'</span>
                                    </div>
                                </div>
                                <div class="badge"> <span>'.$mode.'</span> </div>
                            </div>
                            <div class="mt-5">
                                <h3 class="heading">'.$gameDetails->NomPartie.'</h3>
                                <div class="mt-5">
                                <i class="bi bi-alarm-fill"></i> '.
                                $gameDetails->DateDebutPartie
                                .'<br>
                                Langue :   <img src="assets/flags/'.$gameDetails->LangueDico.'.png" alt="'.$gameDetails->LangueDico.'" width="20" height="20"> <br>
                                Grille de '.$gameDetails->TailleGrille.'x'.$gameDetails->TailleGrille.' à '.$gameDetails->NombreJoueursMax.' <i class="bi bi-people-fill""></i></span></span> </div>
                                    <div class="progress">
                                        <div class="progress-bar" role="progressbar" style="width: '.$pourcentage.'%" aria-valuenow="'.$pourcentage.'" aria-valuemin="0" aria-valuemax="100"></div>
                                    </div>
                                    <div class="mt-3"> <span class="text1">'.$allValidsWordsListByPlayerNumber.' trouvé(s) <span class="text2">sur '.$allWordsListByPlayerNumber.' mots</span></span> </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    </center>';    
                }
                ?>
                
                
            </div>
        </div>
    </section>




<?php

include("includes/footer.inc.php");

?>




















