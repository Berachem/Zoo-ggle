
        <style>
                        /* agrandissement des cases de la grille */
                        table, td, th {

                            width: 50px;
                            height: 50px;
                            text-align: center;
                           
                        }

                        table {
                            margin: auto;
                            border-spacing: 0;
                            border-collapse: separate;
                            border-radius: 10px;
                            
                        }
                        

                        td {
                            border: 1px solid black;
                            
                            font-size: 65px;
                            /* square the cell*/
                            padding-left: 15px;
                            padding-right: 15px;
                            border-radius: 10px;
                            /* police*/
                            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
                        }
                        /* animation ombre derrière la cas */
                        td:hover {
                            box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.5);
                            transition: 0.5s;
                        }

                        .center{
                            text-align: center;
                        }
                        

                       
                        
                    </style>
<?php

require 'php/lib/parse.env.php';
require 'php/Connexion.php';
require 'php/functions.php';
session_start();

include("includes/header.inc.php");

// si le joueur n'est pas connecté, on le redirige vers la page de connexion
if (!isset($_SESSION["user"])) {
    header("Location: index.php?notConnected=true");
    exit;
}

// si le joueur n'est pas dans une partie qui a commencé, on le redirige vers la page d'accueil
/* if (!getGameInProgressStartedOrNotForUser($_SESSION["user"])) {
    header("Location: index.php?notInGame=true");
    exit;
} */

if (getGameNotStartedYet($_SESSION["user"])) {
    header("Location: waitingRoom.php?idGame=" . getGameNotStartedYet($_SESSION["user"])->IdPartie);
    exit;
}

$game = getGameInProgressStartedForUser($_SESSION["user"]);

if ($game == null) {
    header("Location: index.php?gameFail=true");
    exit;
}

?>

    <!-- Features section-->
    <section id="jeu">
        <center>    
            <br>
            <br>
            <div class="spinner-border text-primary" role="status">
                <span class="sr-only"></span>
            </div>
        
            <h1 class="text-center" id="timePassed"
                style="font-family: 'Roboto', sans-serif; font-size: 50px; font-weight: 700; color: #000; margin-top: 100px; margin-bottom: 50px;">
            </h1>
       
        </center>
              

            <script>
                let foundedWords = [];
            </script>

                    <?php
                    $result = $game->Grille;
                    $result = explode(" ", $result);
                    $sizeGrid = $game->TailleGrille;


                    echo "<table>";

                        for ($i = 0; $i < $sizeGrid; $i++) {
                            echo "<tr>";
                            for ($j = 0; $j < $sizeGrid; $j++) {
                                echo "<td onclick='addToFieldByClick(this)'>" . $result[$i * $sizeGrid + $j] . "</td>";
                            }
                            echo "</tr>";
                        }
                        ?>
                    </table>

                    <br>
                    <center>
                        <input type="text" name="mot" id="mot" placeholder="Entrez un mot" onkeydown="upperCaseF(this)" minlength="1" required>
                        <button type="submit" class="btn btn-success" onclick="foundedWords = checkWord(document.getElementById('mot').value, foundedWords)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L6.5 9.793l6.646-6.647a.5.5 0 0 1 .708 0z" />

                            </svg>
                            Valider
                        </button>
                        <button type="reset" class="btn btn-secondary" onclick="resetField()">
                            Effacer
                        </button>
                        <br>
                        <br>
                        <a href="php/endGame.php" class="btn btn-danger" style="display : none; width: 200px;" 
                        id="endGameButton">
                        Arrêter la partie !</a>
                    </center>

                    <br>
                    <center>
                        <h3>Mots trouvés</h3>
                        <ul id="word-found-list" style="list-style-type: none;"></ul>
                    </center>
                
                    <script>
                        
                        // call API php/gameInfos.php 
                        function updateGameLiveInfos(){
                            let xhttp = new XMLHttpRequest();
                            xhttp.onreadystatechange = function() {
                                if (this.readyState == 4 && this.status == 200) {
                                    console.log("REGARDE MOI :" +this.responseText);
                                    let gameInfos = JSON.parse(this.responseText);

                                    // s'il y a que deux attributs, c'est que la partie est finie
                                    if (Object.keys(gameInfos).length == 2 && gameInfos.hasOwnProperty("gameEnded")){
                                        console.log("partie finie");
                                        window.location.href = "leaderboard.php";
                                    
                                    }



                                    //console.log(gameInfos);

                                    //console.log("moi : " + gameInfos.IdChef);
                                    //console.log("chef : " + <?php echo $_SESSION["user"] ?>);

                                    // temps écoulé (current time - start time)
                                    document.getElementById("timePassed").innerHTML = gameInfos.timePassed;

                                    // liste des mots trouvés
                                    let wordFoundList = document.getElementById("word-found-list");
                                    wordFoundList.innerHTML = "";
                                    for (let i = 0; i < gameInfos.foundedWords.length; i++){
                                        let li = document.createElement("li");
                                        li.innerHTML = gameInfos.foundedWords[i];
                                        wordFoundList.appendChild(li);
                                    }

                                    // liste des joueurs
                                    /* let allPlayers = document.getElementById("allPlayers");
                                    allPlayers.innerHTML = "";
                                    for (let i = 0; i < gameInfos.players.length; i++){
                                        let li = document.createElement("li");
                                        li.innerHTML = gameInfos.players[i];
                                        allPlayers.appendChild(li);
                                    } */

                                    
                                    if (parseInt(gameInfos.IdChef) == parseInt("<?php echo $_SESSION['user'] ?>")){
                                        console.log("je suis le chef de la partie")
                                        document.getElementById("endGameButton").style.display = "block";
                                    }
                            
                                }
                            };
                            
                            xhttp.open("GET", "php/gameInfos.php", true);
                            xhttp.send();
                        }


                        // call API every 1 second
                        setInterval(updateGameLiveInfos, 1000);
                    </script>

        </section>


<?php
include("includes/footer.inc.php");
?>