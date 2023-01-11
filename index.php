<?php  
session_start();  

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
        <!-- Bootstrap icons-->
        <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.5.0/font/bootstrap-icons.css" rel="stylesheet" />
        <!-- Google fonts-->
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link href="https://fonts.googleapis.com/css2?family=Newsreader:ital,wght@0,600;1,600&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Mulish:ital,wght@0,300;0,500;0,600;0,700;1,300;1,500;1,600;1,700&amp;display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/css2?family=Kanit:ital,wght@0,400;1,400&amp;display=swap" rel="stylesheet" />
        <!-- Core theme CSS (includes Bootstrap)-->
        <link href="css/styles.css" rel="stylesheet" />
    </head>
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


    <body id="page-top">
        <!-- Navigation-->
        <nav class="navbar navbar-expand-lg navbar-light fixed-top shadow-sm" id="mainNav">
            <div class="container px-5">
                <img src="assets/img/zooggle.png" alt="logo" width="50" height="50" class="d-inline-block align-text-top">
                <a class="navbar-brand fw-bold" href="#page-top">Zoo-ggle</a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                    Menu
                    <i class="bi-list"></i>
                </button>
                <div class="collapse navbar-collapse" id="navbarResponsive">
                    <ul class="navbar-nav ms-auto me-4 my-3 my-lg-0">
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#features">Dictionnaire</a></li>
                        <li class="nav-item"><a class="nav-link me-lg-3" href="#download">Contact</a></li>
                    </ul>
                    <button class="btn btn-primary rounded-pill px-3 mb-2 mb-lg-0" data-bs-toggle="modal" data-bs-target="#feedbackModal">
                        <span class="d-flex align-items-center">
                            <i class="bi-person me-2"></i>
                            <span class="small">Connexion/Inscription</span>
                        </span>
                    </button>
                </div>
            </div>
        </nav>
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
                                <a href="#!"><img class="app-badge" src="assets/img/app-store-badge.svg" alt="..." /></a>
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

        <style>
                        /* agrandissement des cases de la grille */
                        table, td, th {
                            border: 1px solid black;
                            width: 50px;
                            height: 50px;
                            text-align: center;
                        }

                        table {
                            border-collapse: collapse;
                            margin: auto;
                            border-radius: 30px;
                        }

                        td {
                            font-size: 50px;
                            /* square the cell*/
                            padding: 15px;


                            /* police*/
                            font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
                        }

                        td:hover {
                            background-color: #f1f1f1;
                        }

                        .center{
                            text-align: center;
                        }
                        

                       
                        
                    </style>

                    <?php
                    // récupère le retour de l'exécution du fichier C game_motor/sources/grid_build ../../data/frequences.txt 4 4
                        $result = shell_exec('.\server\game_motor\sources\grid_build.exe server/data/frequences.txt 4 4');
                        // split le résultat en tableau
                        $result = explode(" ", $result);

                        $_SESSION["grille"] = $result;

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
                    <form action="checkWord.php" method="post" class="center">
                        <input type="text" name="mot" id="mot" placeholder="Entrez un mot" onkeydown="upperCaseF(this)" minlength="1" required>
                        <script>
                            function upperCaseF(a){
                                setTimeout(function(){
                                    a.value = a.value.toUpperCase();
                                }, 1);
                            }

                            function addToFieldByClick(cell) {
                                var mot = document.getElementById("mot");
                                mot.value += cell.innerHTML;
                            }
                        </script>
                        <button type="submit" class="btn btn-success">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check" viewBox="0 0 16 16">
                                <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L6.5 9.793l6.646-6.647a.5.5 0 0 1 .708 0z" />

                            </svg>
                            Valider
                        </button>
                        <button type="reset" class="btn btn-danger">
                            Effacer
                        </button>

                    </form>
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
        <!-- Feedback Modal-->
        <div class="modal fade" id="feedbackModal" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-gradient-primary-to-secondary p-4">
                        <h5 class="modal-title font-alt text-white" id="feedbackModalLabel">Send feedback</h5>
                        <button class="btn-close btn-close-white" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body border-0 p-4">
                        <!-- * * * * * * * * * * * * * * *-->
                        <!-- * * SB Forms Contact Form * *-->
                        <!-- * * * * * * * * * * * * * * *-->
                        <!-- This form is pre-integrated with SB Forms.-->
                        <!-- To make this form functional, sign up at-->
                        <!-- https://startbootstrap.com/solution/contact-forms-->
                        <!-- to get an API token!-->
                        <form id="contactForm" data-sb-form-api-token="API_TOKEN">
                            <!-- Name input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="name" type="text" placeholder="Enter your name..." data-sb-validations="required" />
                                <label for="name">Full name</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">A name is required.</div>
                            </div>
                            <!-- Email address input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="email" type="email" placeholder="name@example.com" data-sb-validations="required,email" />
                                <label for="email">Email address</label>
                                <div class="invalid-feedback" data-sb-feedback="email:required">An email is required.</div>
                                <div class="invalid-feedback" data-sb-feedback="email:email">Email is not valid.</div>
                            </div>
                            <!-- Phone number input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="phone" type="tel" placeholder="(123) 456-7890" data-sb-validations="required" />
                                <label for="phone">Phone number</label>
                                <div class="invalid-feedback" data-sb-feedback="phone:required">A phone number is required.</div>
                            </div>
                            <!-- Message input-->
                            <div class="form-floating mb-3">
                                <textarea class="form-control" id="message" type="text" placeholder="Enter your message here..." style="height: 10rem" data-sb-validations="required"></textarea>
                                <label for="message">Message</label>
                                <div class="invalid-feedback" data-sb-feedback="message:required">A message is required.</div>
                            </div>
                            <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted-->
                            <div class="d-none" id="submitSuccessMessage">
                                <div class="text-center mb-3">
                                    <div class="fw-bolder">Form submission successful!</div>
                                    To activate this form, sign up at
                                    <br />
                                    <a href="https://startbootstrap.com/solution/contact-forms">https://startbootstrap.com/solution/contact-forms</a>
                                </div>
                            </div>
                            <!-- Submit error message-->
                            <!---->
                            <!-- This is what your users will see when there is-->
                            <!-- an error submitting the form-->
                            <div class="d-none" id="submitErrorMessage"><div class="text-center text-danger mb-3">Error sending message!</div></div>
                            <!-- Submit Button-->
                            <div class="d-grid"><button class="btn btn-primary rounded-pill btn-lg disabled" id="submitButton" type="submit">Submit</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/scripts.js"></script>
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        <!-- * *                               SB Forms JS                               * *-->
        <!-- * * Activate your form at https://startbootstrap.com/solution/contact-forms * *-->
        <!-- * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * * *-->
        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
    </body>
</html>
