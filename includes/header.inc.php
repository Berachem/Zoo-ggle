<?php
require_once 'php/Connexion.php';
require_once 'php/functions.php';

if(!isset($_SESSION['user']) || empty($_SESSION['user'])){
    $connected = false;
}else{
    $connected = true;
}

?>
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no" />
        <meta name="description" content="" />
        <meta name="author" content="" />
        <title>Zoo-ggle</title>
        <link rel="icon" type="image/x-icon" href="assets/img/zooggle_white.png" />
        <script src="https://kit.fontawesome.com/yourcode.js" crossorigin="anonymous"></script>
        <!-- Bootstrap icons-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <!-- Google fonts-->
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,600;1,600&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,500;0,600;0,700;1,300;1,500;1,600;1,700&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;1,400&amp;display=swap" rel="stylesheet" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.1/jquery.min.js"></script>
        <link href="css/styles.css" rel="stylesheet" />
    </head>

    <?php
    // if isset get error=true echo badge
    // if isset get gameCreated=true echo badge
    // if isset get notConnected=true echo badge
    // if isset get gameJoined=true echo badge
    // if isset get connected=true echo badge
    // if isset get disconnected=true echo badge
    // if isset get accountCreated=true echo badge

    // all badges must have icon and text

    if (isset($_GET["error"]) && $_GET["error"] == "true") {
        echo '
        <br><br><br><br>
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
         Une <strong>erreur</strong> est survenue.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
    }
    if (isset($_GET["gameCreated"]) && $_GET["gameCreated"] == "true") {
        echo '
        <br><br><br><br>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
         La partie a été <strong>créée</strong>.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
    }
    if (isset($_GET["notConnected"]) && $_GET["notConnected"] == "true") {
        echo '
        <br><br><br><br>
        <div class="alert alert-danger alert-dismissible fade show" role="alert">
         Vous devez être <strong>connecté</strong> pour accéder à cette page.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
    }
    if (isset($_GET["gameJoined"]) && $_GET["gameJoined"] == "true") {
        echo '
        <br><br><br><br>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
         Vous avez rejoint la partie.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
    }
    if (isset($_GET["connected"]) && $_GET["connected"] == "true") {
        echo '
        <br><br><br><br>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
         Vous êtes <strong>connecté</strong>.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
    }
    if (isset($_GET["disconnected"]) && $_GET["disconnected"] == "true") {
        echo '
        <br><br><br><br>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
         Vous êtes <strong>déconnecté</strong>.
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
    }
    if (isset($_GET["accountCreated"]) && $_GET["accountCreated"] == "true") {
        echo '
        <br><br><br><br>
        <div class="alert alert-success alert-dismissible fade show" role="alert">
         Votre compte a été <strong>créé</strong>. (vous êtes automatiquement connecté)
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>';
    }





 
    



    ?>


    <body id="page-top">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
            <div class="container px-5">
                <img src="assets/img/zooggle.png" alt="logo" width="50" height="50" class="d-inline-block align-text-top">
                <a class="navbar-brand fw-bold" href="index.php#page-top">Zoo-ggle</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="bi-list"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
                    <li class="nav-item"><a class="nav-link me-lg-3" href="searchGame.php">Rechercher une partie</a></li>
                        <li class="nav-item"><a class="nav-link me-lg-3" href="dictionnary.php">Dictionnaire</a></li>
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#download">Contact</a></li>
                    </ul>
                    <?php
                        if($connected){
                            echo
                            "
                            <button class='btn btn-primary rounded-pill px-3 mb-2 mb-lg-0' data-bs-toggle='modal'
                            data-bs-target='#newgame'>
                                <span class='d-flex align-items-center'>
                                    <span class='small'>Créer une partie</span>
                                </span>
                            </button>
                            <a href='php/disconnect.php' class='btn btn-warning rounded-pill px-3 mb-2 mb-lg-0 mx-1'>
                            <span class='d-flex align-items-center'>
                                    <span class='small'>Deconnexion</span>
                                </span>
                            </a>
                            ";
                        }else{
                            echo 
                            "
                             <button class='btn btn-primary rounded-pill px-3 mb-2 mb-lg-0' data-bs-toggle='modal'
                            data-bs-target='#connexion'>
                                <span class='d-flex align-items-center'>
                                    <span class='small'>Connexion</span>
                                </span>
                            </button>
                            <button class='btn btn-secondary rounded-pill px-3 mx-1 mb-2 mb-lg-0' data-bs-toggle='modal'
                                    data-bs-target='#inscription'>
                                <span class='d-flex align-items-center'>
                                    <span class='small'>Inscription</span>
                                </span>
                            </button>
                            ";
                        }
                    
                    
                    ?>
                   
                </div>
            </div>
        </nav>