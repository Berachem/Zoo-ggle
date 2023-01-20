<?php

require 'lib/parse.env.php';
require 'php/Connexion.php';
require 'php/functions.php';
session_start();

// si le joueur n'est pas connecté, on le redirige vers la page de connexion
if (!isset($_SESSION["user"])) {
    header("Location: ../index.php?notConnected=true");
    exit;
}

// si le joueur n'est pas dans une partie qui a commencé, on le redirige vers la page d'accueil
if (!getGameInProgressStartedOrNotForUser($_SESSION["user"])) {
    header("Location: ../index.php?notInGame=true");
    exit;
}

$game = getGameInProgressStartedForUser($_SESSION["user"]);

if (!$game){
    header("Location: ../index.php?gameFail=true");
    exit;
}

?>

    <!-- Features section-->
    <section id="jeu">

        <h1 class="text-center"
            style="font-family: 'Roboto', sans-serif; font-size: 50px; font-weight: 700; color: #000; margin-top: 100px; margin-bottom: 50px;">
            <?php echo $game->NomPartie; ?>
        </h1>

              

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
                    $result = $game->Grille;


                    echo "<table>";

                        for ($i = 0; $i < 4; $i++) {
                            echo "<tr>";
                            for ($j = 0; $j < 4; $j++) {
                                echo "<td onclick='addToFieldByClick(this)'>" . $result[$i * 4 + $j] . "</td>";
                            }
                            echo "</tr>";
                        }
                        ?>
                    </table>

                    <br>
                    <center>
                        <input type="text" name="mot" id="mot" placeholder="Entrez un mot" onkeydown="upperCaseF(this)" minlength="1" required>
                        <button type="submit" class="btn btn-success" onclick="checkWord(document.getElementById('mot').value)">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L6.5 9.793l6.646-6.647a.5.5 0 0 1 .708 0z" />

                            </svg>
                            Valider
                        </button>
                        <button type="reset" class="btn btn-danger" onclick="resetField()">
                            Effacer
                        </button>
                    </center>

                    <br>
                    <center>
                        <ul id="word-found-list" style="list-style-type: none;"></ul>
                    </center>
                
        </section>

