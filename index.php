<?php  
session_start();  

include('includes/header.inc.php');
require_once 'assets/animalsLists/animals_FRA.php';
?>


            <!-- arrow scroll down to -->
    <style>
        .arrow {
            position: absolute;
            top: 90%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 50px;
            height: 50px;
            border: 2px solid #fff;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            font-size: 20px;
            color: #fff;
            cursor: pointer;
            transition: 0.5s;
        }
        .arrow:hover {
            background: #fff;
            color: #000;
        }
        .arrow::before {
            content: "";
            position: absolute;
            top: -10px;
            left: -10px;
            width: 100%;
            height: 100%;
            border: 2px solid #fff;
            border-radius: 50%;
            z-index: -1;
            transition: 0.5s;
        }
        .arrow:hover::before {
            background: #fff;
            color: #000;
        }
    </style>

    <a class="arrow" href="#jeu">
        <i class="bi bi-arrow-down"></i>
    </a>

        <!-- Mashead header-->
        <header class="masthead">
            <div class="container px-5">
                <div class="row gx-5 align-items-center">
                    <div class="col-lg-6">
                        <!-- Mashead text and app badges-->
                        <div class="mb-5 mb-lg-0 text-center text-lg-start">
                            <h1 class="display-1 lh-1 mb-3">Jouez au Boggle orienté animaux.</h1>
                            <p class="lead fw-normal text-muted mb-5">
                                <span class="fw-bolder">Zoo-ggle</span> est un jeu de mot qui vous permet de jouer avec vos amis et de découvrir des animaux.
                            </p>
                            <div class="d-flex flex-column flex-lg-row align-items-center">
                                <a class="me-lg-3 mb-4 mb-lg-0" href="#!"><img class="app-badge" src="assets/img/google-play-badge.svg" alt="..." /></a>
                                (à venir)
                            </div>
                        </div>
                    </div>
                    
                    <div class="col-lg-6">
                        <!-- Mashead image-->
                        <div class="text-center">
                            <img class="img-fluid rounded-3 mb-4 mb-lg-0" src="assets/img/Pandas-pana.png" alt="..." />
                        </div>
            
                    </div>
                </div>
            </div>
        </header>

        <!-- Features section-->
        <section id="jeu">

            <h1 class="text-center"
                style="font-family: 'Roboto', sans-serif; font-size: 50px; font-weight: 700; color: #000; margin-top: 100px; margin-bottom: 50px;">
                Entrainez-vous</h1>
                

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
                    $result = getRandomGrid(4);
                    // replace * by QU
                    $result = str_replace("*", "QU", $result);

                    

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
            <script>
                var grid = <?php echo json_encode($result); ?>;
                let foundedWords = [];
            </script>
                    <br>
                    <center>
                        <input type="text" name="mot" id="mot" placeholder="Entrez un mot" onkeydown="upperCaseF(this)" minlength="1" required>
                        <button type="submit" class="btn btn-success" onclick="foundedWords = checkWordDemo(document.getElementById('mot').value,grid,foundedWords)">
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
                        <button class="btn btn-secondary" onclick="resetWordFoundList()">Effacer la liste</button>

                    </center>
                
        </section>

        <!-- Animals & Letters -->
        <section id="animaux">
            <h1 class="text-center"
                style="font-family: 'Roboto', sans-serif; font-size: 50px; font-weight: 700; color: #000; margin-top: 100px; margin-bottom: 50px;">
                Animaux</h1>
    

                    <?php
                    
                    foreach($groupedAnimals as $letter => $animals) {
                        echo "<h1 class='text-center' style='font-family: 'Roboto', sans-serif; font-size: 50px; font-weight: 700; color: #000; margin-top: 100px; margin-bottom: 50px;'>$letter</h1>";
                        echo "<div class='container'>";
                        echo "<div class='row'>";
                        foreach($animals as $animal) {
                            echo "<div class='col-lg-3 col-md-6 mb-4'>";
                            echo "<div class='card h-100'>";
                            echo "<div class='card-body'>";
                            echo "<h4 class='card-title'>";
                            echo "<b>$animal</b>";
                            echo "</h4>";
                            echo "</div>";
                            echo "<div class='card-footer'>";
                            echo "
                            <a href='https://www.google.com/search?q=$animal' target='_blank' class='btn btn-primary'>En savoir plus</a>
                            ";
                            echo "</div>";
                            echo "</div>";
                            echo "</div>";
                        }
                        echo "</div>";
                        echo "</div>";
                    }

                    ?>
            
                </section>



        <!-- Quote/testimonial aside-->
        <aside class="text-center bg-gradient-primary-to-secondary">
            <div class="container px-5">
                <div class="row gx-5 justify-content-center">
                    <div class="col-xl-8">
                        <div class="h2 fs-1 text-white mb-4"> <i>"Nous nous dirigeons vers un monde où il n'y aura plus d'une part que l'Homme, et d'autre part les espèces animales que l'Homme aura sélectionnées. Tout le reste aura disparu."</i></div>
                        <div class="small text">
                            <div class="fw-bolder">Claude Lévi-Strauss</div>
                            <div class="fst-italic
                            text-white-50">Anthropologue français</div>
                    </div>
                </div>
            </div>
        </aside>

        <!-- Footer-->
        <footer class="bg-black text-center py-5">
            <div class="container px-5">
                <div class="text-white-50 small">
                    <div class="mb-2">&copy; Zoo-ggle 2022. All Rights Reserved.</div>
                    <a href="#!">Confidentialité</a>
                    <span class="mx-1">&middot;</span>
                    <a href="#!">Conditions</a>
                    <span class="mx-1">&middot;</span>
                    <a href="#!">Mentions légales</a>
                </div>
            </div>
        </footer>

        <?php

        include("includes/footer.inc.php");

        ?>
