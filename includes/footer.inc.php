        <!-- Feedback Modal-->
        <div class="modal fade" id="connexion" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-gradient-primary-to-secondary p-4">
                        <h5 class="modal-title font-alt text-white" id="feedbackModalLabel">Connexion</h5>
                        <button class="btn-close btn-close-white" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body border-0 p-4">

                        <form id="contactForm" action="connexion.php" method="post">
                            <!-- Name input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="login" name="login" type="text" placeholder="Entrez votre Pseudo..."
                                       data-sb-validations="required" required/>
                                <label for="login">Pseudo</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">Un pseudo est requis</div>
                            </div>
                            <div class="form-floating mb-3">
                                <input class="form-control" id="psw" name="psw" type="password" placeholder="Entrez votre mot de passe..."
                                       data-sb-validations="required" required/>
                                <label for="psw">Mot de Passe</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">Un mot de passe est requis</div>
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
                            <div class="d-grid"><button class="btn btn-primary rounded-pill btn-lg" id="submitButton" type="submit">Connexion</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>


        <div class="modal fade" id="inscription" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-gradient-primary-to-secondary p-4">
                        <h5 class="modal-title font-alt text-white" id="feedbackModalLabel">Inscription</h5>
                        <button class="btn-close btn-close-white" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body border-0 p-4">

                        <form id="contactForm" action="inscription.php" method="post">
                            <!-- Name input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="login" name="login" type="text" placeholder="Entrez votre Pseudo..."
                                       data-sb-validations="required" required/>
                                <label for="login">Pseudo</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">Un pseudo est requis</div>
                            </div>
                            <div class="form-floating mb-3">
                                <input class="form-control" id="psw" name="psw" type="password" placeholder="Entrez votre mot de passe..."
                                       data-sb-validations="required" required/>
                                <label for="psw">Mot de Passe</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">Un mot de passe est requis</div>
                            </div>
                            <!-- Email address input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="mail" type="email" name="mail" placeholder="mail@example.com" data-sb-validations="required,email" required/>
                                <label for="mail">Adresse mail</label>
                                <div class="invalid-feedback" data-sb-feedback="email:required">Un mail est requis</div>
                                <div class="invalid-feedback" data-sb-feedback="email:email">Mail invalide</div>
                            </div>

                            <div class="form-floating mb-3">
                                <input name="public" id="public" type="radio" data-sb-validations="required" value="1" required>
                                <label for="public">Publique</label>
                                <input name="public" id="non-public" type="radio" data-sb-validations="required" style="margin-left: 70px" value="0" required>
                                <label for="non-public" style="margin-left: 90px">Privé</label>
                            </div>


                            <!-- Message input-->
                            <div class="form-floating mb-3">
                                <input class="form-control" id="desc" name="desc" type="text" placeholder="Ecrivez une description ici..." style="height: 10rem" data-sb-validations="required">
                                <label for="desc">Description</label>
                            </div>
                            <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted-->

                            <div class="d-grid"><button class="btn btn-primary rounded-pill btn-lg" id="submitButton" type="submit">Inscription</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

        <div class="modal fade" id="newgame" tabindex="-1" aria-labelledby="feedbackModalLabel" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    <div class="modal-header bg-gradient-primary-to-secondary p-4">
                        <h5 class="modal-title font-alt text-white" id="feedbackModalLabel">
                            Créer une partie
                        </h5>
                        <button class="btn-close btn-close-white" type="button" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body border-0 p-4">

                        <form id="contactForm" action="createGame.php" method="post">

                            <div class="form-floating mb-3">
                                <input class="form-control" id="name" name="name" type="text" placeholder="Entrez votre Pseudo..."
                                       data-sb-validations="required" required/>
                                <label for="name">Nom Partie</label>
                                <div class="invalid-feedback" data-sb-feedback="name:required">Un nom de partie est requis</div>
                            </div>

                            <div class="form-floating mb-3">
                                <select class="form-select" id="langue" name="langue" aria-label="Default select example">
                                    <option value="FRA" selected>Français (FRA)</option>
                                </select>
                                <label for="langue">Langue du Dictionnaire</label>
                            </div>

                            <div class="form-floating mb-3">
                                <select class="form-select" id="taille" name="taille" aria-label="Default select example">
                                    <option value="4" selected>4x4</option>
                                </select>
                                <label for="taille">Dimensions de la Grille</label>
                            </div>

                            <div class="form-floating mb-3">
                                <select class="form-select" id="mode" name="mode" aria-label="Default select example">
                                    <option value="0" selected>Classique</option>
                                </select>
                                <label for="mode">Mode de jeu</label>
                            </div>

                            <div class="form-floating mb-3">
                                <select class="form-select" id="public" name="public" aria-label="Default select example">
                                    <option value="1" selected>Publique</option>
                                    <option value="0">Privé</option>
                                </select>
                                <label for="mode">Visibilité</label>
                            </div>

                            
                            <div class="form-floating mb-3">
                                <select class="form-select" id="nbjoueurs" name="nbjoueurs" aria-label="Default select example">
                                    <option value="2" selected>2</option>
                                    <option value="3">3</option>
                                </select>
                                <label for="mode">Nombre de joueurs</label>
                            </div>


                            <!-- Submit success message-->
                            <!---->
                            <!-- This is what your users will see when the form-->
                            <!-- has successfully submitted-->

                            <div class="d-grid"><button class="btn btn-primary rounded-pill btn-lg" id="submitButton" type="submit">Créer</button></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    


        <!-- Bootstrap core JS-->
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
        <!-- Core theme JS-->
        <script src="js/scripts.js"></script>
        <script src="https://cdn.startbootstrap.com/sb-forms-latest.js"></script>
    </body>
</html>