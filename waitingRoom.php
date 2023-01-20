<?php
require_once("php/functions.php");
require_once("php/lib/parse.env.php");
require_once("php/Connexion.php");

session_start();

// si l'utilisateur n'est pas connecté, on le redirige vers la page de connexion
if (!isset($_SESSION["user"])) {
    header("Location: index.php?notConnected=true");
    exit;
}
$currentGameStarted = getGameStarted($_SESSION["user"]);
$currentGameNotStartedYet = getGameNotStartedYet($_SESSION["user"]);

// si l'utilisateur est connecté, mais qu'il n'est pas dans une partie, on le redirige vers la page d'accueil
if (!$currentGameStarted && !$currentGameNotStartedYet) {
    header("Location: index.php?notInGame=true");
    exit;
}

// si l'utilisateur est connecté et dans une partie mais qui a déjà commencé, on le redirige vers la page de la partie
if ($currentGameStarted) {
    header("Location: game.php");
    exit;
}

include("includes/header.inc.php");

// sinon on affiche la page du salon d'attente de la partie qui fait des appels ajax pour mettre à jour la page en temps réel (toutes les 5 secondes)
?>
<br>
<br>
<br>
<br>
<section id="gameDetails" style="display : none"> 
<br>
<br>
        <h1>Salon d'attente de partie</h1>
            <div id="game-container"></div>
            <script>
                // Fonction pour appeler l'API et mettre à jour les informations de la partie
                function updateGame() {
                    var idGame = <?php echo $currentGameNotStartedYet ?>; // remplacer par l'id de la partie
                    var xhr = new XMLHttpRequest();
                    xhr.open("POST", "php/waitingRoomInfos.php", true);
                    xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
                    xhr.onreadystatechange = function() {
                        if (xhr.readyState === 4 && xhr.status === 200) {
                            var response = JSON.parse(xhr.responseText);
                            if (response.success) {
                                var gameInfos = response.gameInfos;
                                var players = response.players;
                                var pseudoChef = "";
                                var logoChef = "";
                                // remove chef from the list of other players 
                                for (var i = 0; i < players.length; i++) {
                                    if (players[i].IdJoueur == gameInfos.IdChef) {
                                        pseudoChef = players[i].Pseudo;
                                        logoChef = players[i].Logo;
                                        players.splice(i, 1);
                                    }
                                }
                                playersList = "";
                                for (var i = 0; i < players.length; i++) {
                                    playersList =playersList+ "<a href='profile.php?pseudo='"+players[i].Pseudo+ "'>"+players[i].Pseudo+"<a> ,";
                                }
                                

                                playersList = playersList.slice(0, -2);
                                var gameStarted = response.gameStarted == 1 ? true : false;
                                if (gameStarted) {
                                    window.location.href = "game.php";
                                }

                                // Mettre à jour l'affichage de la partie ici
                                document.getElementById("gameDetails").style.display = "block";
                                var gameContainer = document.getElementById("game-container");
                                gameContainer.innerHTML = "<i class='bi bi-gamepad'></i><u> Nom de la partie:</u> " + gameInfos.NomPartie + "<br>" + 
                                                    "<i class='bi bi-globe'></i><u> Langue du dico:</u> " + gameInfos.LangueDico + "<br>" + 
                                                   // "<i class='bi bi-grid-3x2'></i> <u>Grille:</u> " + gameInfos.Grille + "<br>" + 
                                                    //"<i class='bi bi-calendar'></i><u> Date de début de la partie:</u> " + gameInfos.DateDebutPartie + "<br>" + 
                                                   // "<i class='bi bi-calendar'></i><u> Date de fin de la partie:</u> " + gameInfos.DateFinPartie + "<br>" + 
                                                    "<i class='bi bi-grid-3x2-gap-fill'></i><u> Taille de la grille:</u> " + gameInfos.TailleGrille + "<br>" + 
                                                    "<i class='bi bi-list'></i><u> Nombre de mots possibles:</u> " + gameInfos.NombreMotsPossibles + "<br>" + 
                                                    "<u>Mode de jeu:</u> " + gameInfos.Mode + "<br>" + 
                                                    "<u>Partie publique:</u> " + gameInfos.EstPublic + "<br>" + 
                                                    "<u>Nombre de joueurs max:</u> " + gameInfos.NombreJoueursMax + "<br>" + 
                                                    "<u>Chef de la partie :</u> <a href='profile.php?pseudo=" + pseudoChef + "'>"+pseudoChef+"<a><br>" + 
                                                    "<u>Joueurs:</u> " + playersList + "<br>" + 
                                                    "<u>Partie lancée:</u> " + gameStarted;
                                if (gameInfos.IdChef == <?php echo $_SESSION["user"] ?>) {
                                    gameContainer.innerHTML += "<br><br><button class='btn btn-primary' href='php/game.php'>Lancer la partie</button>";
                                }
                                    

                            } else {
                                console.log(response.error);
                                // remove inner
                                document.getElementById("gameDetails").innerHTML = "";
                            }
                        }
                    }
                    xhr.send(encodeURIComponent('idGame') + '=' + encodeURIComponent(idGame));
                }

                // Appeler la fonction updateGame toutes les 5 secondes
                setInterval(updateGame, 3000);
            </script>


</section>





<style>

#gameDetails {
    text-align: center;
    margin: 0 auto;
    width: 90%;
    border: 3px solid #214DAD;
    padding: 10px;
    background-color: #f2f2f2;
    border-radius: 10px;
}

</style>