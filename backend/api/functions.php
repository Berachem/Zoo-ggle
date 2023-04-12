<?php
// Fichier qui contient toutes les fonctions utilisées dans le site

/*
     * Effectue une recherche avec les éléments de $text dans le paramètre $parameter
     * Renvoie le resultat de la commande sous forme de PDOStatment
     *
     * $text : le texte saisi par l'utilisateur
     *
     */
function recherchePartie(string $text){
    global $db;

    //le bind de PHP n'aime pas les accents, du coup on vient tous les remplacer,
    // le LIKE de SQL va rattraper la différence par la suite
    $search  = array('À', 'Á', 'Â', 'Ã', 'Ä', 'Å', 'Ç', 'È', 'É', 'Ê', 'Ë', 'Ì', 'Í', 'Î', 'Ï', 'Ò', 'Ó', 'Ô', 'Õ', 'Ö', 'Ù', 'Ú', 'Û', 'Ü', 'Ý', 'à', 'á', 'â', 'ã', 'ä', 'å', 'ç', 'è', 'é', 'ê', 'ë', 'ì', 'í', 'î', 'ï', 'ð', 'ò', 'ó', 'ô', 'õ', 'ö', 'ù', 'ú', 'û', 'ü', 'ý', 'ÿ');
    $replace = array('A', 'A', 'A', 'A', 'A', 'A', 'C', 'E', 'E', 'E', 'E', 'I', 'I', 'I', 'I', 'O', 'O', 'O', 'O', 'O', 'U', 'U', 'U', 'U', 'Y', 'a', 'a', 'a', 'a', 'a', 'a', 'c', 'e', 'e', 'e', 'e', 'i', 'i', 'i', 'i', 'o', 'o', 'o', 'o', 'o', 'o', 'u', 'u', 'u', 'u', 'y', 'y');
    $text = str_replace($search, $replace, $text);
    $text = str_replace("'","' ",$text);

    $arrayOfword = explode(" ",$text);
    $request = "SELECT * FROM B_Partie WHERE NomPartie";

    //on commence par préparer la requette
    $numberOfParameters = 0;
    $parameters=array();
    foreach ($arrayOfword as $mot){
        if(strlen($mot)>2){              //on enlève toutes les particules (de,la,l'...)
            $numberOfParameters++;
            if($numberOfParameters==1){
                $request.=" LIKE(CONCAT('%', :$mot, '%'))";
            }else {
                $request .= " OR NomPartie LIKE(CONCAT('%', :$mot, '%'))";
            }
            $parameters[] = [":$mot", $mot];
        }
    }
    $request.=" AND DateFinPartie IS NULL";
    return $db->execQuery($request,$parameters);
}

/*
* Fonction qui vient récupérer toutes les games lancées qui ne sont pas finies
*/
function getRecentGame(){
    $request = "SELECT * FROM B_Partie WHERE DateFinPartie IS NULL LIMIT 20";
    return $db->execQuery($request);
}


// Fonction qui renvoie les infos d'une partie en fonction de son id
// paramètres : $id : id de la partie
// return : un objet contenant les informations de la partie
function getGameInfos($id) {
    global $db;
    $query = "SELECT * FROM B_Partie WHERE IdPartie = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return null;
    }
    return $result[0];
}

// Fonction qui renvoie la liste des joueurs d'une partie en fonction de son id ET ses informations (Pseudo, Logo, IdJoueur)
// paramètres : $id : id de la partie
// return : un tableau d'objets contenant les informations des joueurs de la partie
function getPlayers($id) {
    global $db;
    $query = "SELECT Pseudo,IdJoueur,Logo FROM B_Joueur bj WHERE bj.IdJoueur IN (SELECT IdJoueur FROM B_Jouer WHERE IdPartie = ?)";
    $params = [[1, $id, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return null;
    }
    return $result;
}

// Fonction qui renvoie true si la partie a commencé, false sinon
// paramètres : $idGame : id de la partie
// return : true si la partie a commencé, false sinon
function getGameStarted($idGame) {
    global $db;
    $query = "SELECT DateDebutPartie FROM B_Partie WHERE IdPartie = ? AND DateDebutPartie IS NOT NULL";
    $params = [[1, $idGame, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return null;
    }
    return $result[0]->DateDebutPartie != null;
}

// Fonction qui renvoie true si la partie est terminée, false sinon 
// paramètres : $idGame : id de la partie
// return : true si la partie est terminée, false sinon
function getGameEnded($idGame) {
    global $db;
    $query = "SELECT DateFinPartie FROM B_Partie WHERE IdPartie = ? AND DateFinPartie IS NOT NULL";
    $params = [[1, $idGame, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return null;
    }
    return $result[0]->DateFinPartie != null;
}

// Fonction qui lance la partie $id
// paramètres : $id : id de la partie
// return : true si la partie a commencé, false sinon
function startGame($id) {
    global $db;
    $query = "UPDATE B_Partie SET DateDebutPartie = NOW() WHERE IdPartie = ?"; // TODO: DateFinPartie = NOW() + DUREE DE LA PARTIE
    $params = [[1, $id, PDO::PARAM_INT]];
    $db->execQuery($query, $params);

    // On récupère les joueurs de la partie
    $players = getPlayers($id);
    // On leur donne un score de 0
    foreach ($players as $player) {
        $query = "UPDATE B_Jouer SET Score = 0 WHERE IdJoueur = ? AND IdPartie = ?";
        $params = [
            [1, $player->IdJoueur, PDO::PARAM_INT],
            [2, $id, PDO::PARAM_INT]
        ];
        $db->execQuery($query, $params);

    }
}

// Fonction qui renvoie l'id de la partie non commencée du joueur $id
// paramètres : $id : id du joueur
// return : l'id de la partie non commencée du joueur $id
function getGameNotStartedYet($id) {
    global $db;
    $query = "SELECT IdPartie FROM B_Jouer WHERE IdJoueur = ? AND IdPartie IN (SELECT IdPartie FROM B_Partie WHERE DateDebutPartie IS NULL)";
    $params = [[1, $id, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return null;
    }
    return $result[0]->IdPartie;
}


// Fonction qui renvoie la partie en cours du joueur $id (en regardant si le score est à -1, si la date de début existe et que la date de fin est null)
// paramètres : $id : id du joueur
// return : l'id de la partie en cours du joueur $id
function getGameInProgressStartedOrNotForUser($id) {
    global $db;
    $query = "SELECT * FROM B_Partie bp WHERE bp.IdPartie IN (SELECT b.IdPartie FROM B_Jouer b WHERE b.IdJoueur = ? AND b.Score = -1 AND b.IdPartie IN (SELECT IdPartie FROM B_Partie WHERE DateFinPartie IS NULL))";
    $params = [
        [1, $id, PDO::PARAM_INT]
    ];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return null;
    }
    return $result[0];
}

// Fonction qui renvoie la partie en cours du joueur $id (en regardant si le score est à -1, si la date de début existe et que la date de fin est null)
// paramètres : $id : id du joueur
// return : l'id de la partie en cours du joueur $id
function getGameInProgressStartedForUser($id) {
    global $db;
    $query = "SELECT * FROM B_Partie bp WHERE bp.IdPartie IN (SELECT b.IdPartie FROM B_Jouer b WHERE b.IdJoueur = ? AND b.Score > -1 AND b.IdPartie IN (SELECT IdPartie FROM B_Partie WHERE DateFinPartie IS NULL))";
    $params = [
        [1, $id, PDO::PARAM_INT]
    ];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return null;
    }
    return $result[0];
}




// Fonction qui renvoie l'email du joueur $id
// paramètres : $id : id du joueur
// return : l'email du joueur $id
function getPlayerMail($id) {
    global $db;
    $query = "SELECT Mail FROM B_Joueur WHERE IdJoueur = ?";
    $params = [
        [1, $id, PDO::PARAM_INT]
    ];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return null;
    }
    return $result[0]->Mail;
}

//Fonction qui check si un email existe
//paramètres : mail : le mail a check
//return : true si il est libre, false sinon
function checkMail($mail) {
    global $db;
    $query = "SELECT IdJoueur FROM B_Joueur WHERE Mail = ?";
    $params = [
        [1, $mail, PDO::PARAM_STR]
    ];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return true;
    }
    return false;
}

// Fonction qui ajoute un joueur dans le salon de la partie $idPartie (en créant une ligne dans la table B_Jouer avec le score à -1))
// paramètres : $idJoueur : id du joueur, $idPartie : id de la partie
// return : rien (exécute une requête)
function addPlayerToWaitingRoomForGame($userID, $gameID){
    global $db;
    $query = "INSERT INTO B_Jouer (IdJoueur, IdPartie, Score) VALUES (?, ?, -1)";
    $params = [[1, $userID, PDO::PARAM_INT], [2, $gameID, PDO::PARAM_INT]];
    $db->execQuery($query, $params);
}

// Fonction qui retire un joueur du salon de la partie $idPartie (en retirant la ligne dans la table B_Jouer))
// paramètres : $idJoueur : id du joueur, $idPartie : id de la partie
// return : rien (exécute une requête)
function removePlayerFromWaitingRoomForGame($userID, $gameID){
    global $db;
    $query = "DELETE FROM B_Jouer WHERE IdJoueur = ? AND IdPartie = ?";
    $params = [[1, $userID, PDO::PARAM_INT], [2, $gameID, PDO::PARAM_INT]];
    $db->execQuery($query, $params, false, false);
}

// Fonction qui ferme la partie $gameID (en retirant la ligne dans la table B_Partie) après avoir retiré tout les joueurs de la partie)
// paramètres : $gameID : id de la partie
// return : rien (exécute une requête)
function closeWaitingRoomForGame($gameID){
    $players = getPlayers($gameID);
    foreach($players as $player){
        removePlayerFromWaitingRoomForGame($player,$gameID);
    }
    global $db;
    $query = "DELETE FROM B_Partie WHERE IdPartie = ?";
    $params = [[1, $gameID, PDO::PARAM_INT]];
    $db->execQuery($query, $params, false, false);
}


// Fonction qui renvoie la liste des mots valides pour la partie $idPartie proposés par le joueur $id
// paramètres : $idJoueur : id du joueur, $idPartie : id de la partie
// return : la liste des mots valides pour la partie $idPartie proposés par le joueur $id
function getValidsWordsListByPlayerInGame($userID, $gameID){
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdJoueur = ? AND IdPartie = ? AND EstValide = 1";
    $params = [[1, $userID, PDO::PARAM_INT], [2, $gameID, PDO::PARAM_INT]];
    $words = $db->execQuery($query, $params);
    return $words;
}

// Fonction qui renvoie la liste des mots pour la partie $idPartie proposés par le joueur $id
// paramètres : $idJoueur : id du joueur, $idPartie : id de la partie
// return : la liste des mots pour la partie $idPartie proposés par le joueur $id
function getAllWordsListByPlayerInGame($userID, $gameID){
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdJoueur = ? AND IdPartie = ?";
    $params = [[1, $userID, PDO::PARAM_INT], [2, $gameID, PDO::PARAM_INT]];
    $words = $db->execQuery($query, $params);
    return $words;
}




// Fonction qui un int pour savoir si le joueur $id a gagnée la partie $idPartie (0 si perdu, 1 si gagné, 2 si égalité)
// en comparant le score du joueur avec le score de tous les autres joueurs de la partie
// paramètres : $idJoueur : id du joueur, $idPartie : id de la partie
// return : un int pour savoir si le joueur $id a gagnée la partie $idPartie (0 si perdu, 1 si gagné, 2 si égalité)
function getVerdictForGamePlayer($userID, $gameID){
    global $db;
    $query = "SELECT Score FROM B_Jouer WHERE IdJoueur = ? AND IdPartie = ?";
    $params = [[1, $userID, PDO::PARAM_INT], [2, $gameID, PDO::PARAM_INT]];
    $score = $db->execQuery($query, $params)[0]['Score'];
    $query = "SELECT Score FROM B_Jouer WHERE IdPartie = ? AND Score > ?";
    $params = [[1, $gameID, PDO::PARAM_INT], [2, $score, PDO::PARAM_INT]];
    $scoreHigher = $db->execQuery($query, $params);
    $query = "SELECT Score FROM B_Jouer WHERE IdPartie = ? AND Score < ?";
    $params = [[1, $gameID, PDO::PARAM_INT], [2, $score, PDO::PARAM_INT]];
    $scoreLower = $db->execQuery($query, $params);
    if(count($scoreHigher) == 0 && count($scoreLower) == 0){
        return 2;
    }else if(count($scoreHigher) == 0){
        return 1;
    }else{
        return 0;
    }
}


/*
Fonction qui renvoie le pseudo d'un joueur à partir de son ID
paramètres : $id : id du joueur
return : le pseudo du joueur $id
*/
function getPseudoById($id) {
    global $db;
    $query = "SELECT Pseudo FROM B_Joueur WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $pseudo = $db->execQuery($query, $params);
    return $pseudo[0]->Pseudo;
}


// fonction qui renvoie le lien vers l'image du joueur à partir de son ID
// paramètres : $id : id du joueur
// return : le lien vers l'image du joueur $id
function getLogoPathById($id) {
    global $db;
    $query = "SELECT Logo FROM B_Joueur WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $hash = $db->execQuery($query, $params);
    if ($hash[0]->Logo == NULL) {
        return "assets/playersLogos/default.png";
    } else {
        return "assets/playersLogos/" . $hash[0]->Logo;
    }
}


// Fonction qui renvoie les informations d'une partie à partir de son ID 
// paramètres : $id : id de la partie
// return : les informations de la partie $id
function gameById($id) {
    global $db;
    $query = "SELECT * FROM B_Partie WHERE IdPartie = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $game = $db->execQuery($query, $params);
    if (count($game) == 0) {
        return null;
    }
    return $game[0];
}

// Fonction qui renvoie l'ID d'un joueur à partir de son pseudo
// paramètres : $pseudo : pseudo du joueur
// return : l'ID du joueur $pseudo
function getIdByPseudo($pseudo) {
    global $db;
    $query = "SELECT IdJoueur FROM B_Joueur WHERE Pseudo = ?";
    $params = [[1, $pseudo, PDO::PARAM_STR]];
    $id = $db->execQuery($query, $params);
    return $id[0]->IdJoueur;
}

// Fonction qui renvoie true si le joueur d'id $playerId est admin, false sinon
// paramètres : $playerId : id du joueur
// return : true si le joueur est Admin
function isAdmin($playerId){
    global $db;
    $query = "SELECT EstAdmin FROM B_Joueur WHERE IdJoueur = ?";
    $params = [[1, $playerId, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return null;
    }
    return $result[0]->DateDebutPartie == 1;
}

//Fonction qui met à jour un joueur avant d'empecher de jouer
// paramètre : $playerId: id du joueur
function banPlayer($playerId){
    global $db;
    $query = "UPDATE B_Joueur SET EstAutorise=0 WHERE IdJoueur=?";
    $params = [[1, $playerId, PDO::PARAM_INT]];
    $db->execQuery($query, $params,false,false);
}

//Fonction qui met à jour un joueur avant d'empecher de jouer
// paramètre : $playerId: id du joueur
function unbanPlayer($playerId){
    global $db;
    $query = "UPDATE B_Joueur SET EstAutorise=1 WHERE IdJoueur=?";
    $params = [[1, $playerId, PDO::PARAM_INT]];
    $db->execQuery($query, $params,false,false);
}

function getMatchingUsers($pattern){
    global $db;
    $researchPattern = "%$pattern%";
    $query = "SELECT * FROM B_Joueur WHERE Mail LIKE ? OR Pseudo LIKE = ?";
    $params = [[1, $researchPattern, PDO::PARAM_STR],[2, $researchPattern, PDO::PARAM_STR]];
    $users = $db->execQuery($query, $params);
    return $users;
}

// renvoie les informations d'un joueur à partir de son ID (Table B_Joueur, somme des scores de toutes les parties jouées par le joueur où score != -1 (as score), nombre de parties jouées par le joueur (as gamesPlayed))
// paramètres : $id : id du joueur
// return : les informations du joueur $id
function getUserStatistics($id) {
    global $db;
    $query = "SELECT * FROM B_Joueur WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $user = $db->execQuery($query, $params);
    if (count($user) == 0) {
        return null;
    }
    $query = "SELECT SUM(Score) as score FROM B_Jouer WHERE IdJoueur = ? AND Score != -1";
    $params = [[1, $id, PDO::PARAM_INT]];
    $score = $db->execQuery($query, $params);
    $query = "SELECT COUNT(IdPartie) as gamesPlayed FROM B_Jouer WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $gamesPlayed = $db->execQuery($query, $params);
    $user[0]->score = $score[0]->score;
    $user[0]->gamesPlayed = $gamesPlayed[0]->gamesPlayed;

    // parties gagnées, 
    $query = "SELECT COUNT(IdPartie) as gamesWon FROM B_Jouer WHERE IdJoueur = ? AND Score >=(SELECT MAX(Score) FROM B_Jouer WHERE IdPartie = B_Jouer.IdPartie)";
    $params = [[1, $id, PDO::PARAM_INT]];
    $gamesWon = $db->execQuery($query, $params);
    $user[0]->gamesWon = $gamesWon[0]->gamesWon;
    // parties perdues,
    $query = "SELECT COUNT(IdPartie) as gamesLost FROM B_Jouer WHERE IdJoueur = ? AND Score <(SELECT MAX(Score) FROM B_Jouer WHERE IdPartie = B_Jouer.IdPartie)";
    $params = [[1, $id, PDO::PARAM_INT]];
    $gamesLost = $db->execQuery($query, $params);
    $user[0]->gamesLost = $gamesLost[0]->gamesLost;
    
    //parties jouées, 
    $query = "SELECT COUNT(IdProposer) as wordsProposed FROM B_Proposer WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $wordsProposed = $db->execQuery($query, $params);
    $user[0]->wordsProposed = $wordsProposed[0]->wordsProposed;
    //mots proposés, 
    $query = "SELECT COUNT(IdProposer) as wordsProposed FROM B_Proposer WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $wordsProposed = $db->execQuery($query, $params);
    $user[0]->wordsProposed = $wordsProposed[0]->wordsProposed;

    //mots trouvés
    $query = "SELECT COUNT(IdProposer) as wordsValidated FROM B_Proposer WHERE IdJoueur = ? AND EstValide = 1";
    $params = [[1, $id, PDO::PARAM_INT]];
    $wordsValidated = $db->execQuery($query, $params);
    $user[0]->wordsValidated = $wordsValidated[0]->wordsValidated;
    



    return $user;
}

// Fonction qui renvoie tous mots proposés par un joueur à partir de son ID
// paramètres : $id : id du joueur
// return : tous les mots proposés par le joueur $id
function getAllWordsProposedByUser($id) {
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $words = $db->execQuery($query, $params);
    return $words;
}


// Fonction qui renvoie tous VALIDES mots proposés par un joueur à partir de son ID
// paramètres : $id : id du joueur
// return : tous les mots proposés par le joueur $id
function getAllValidsWordsProposedByUser($id) {
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdJoueur = ? AND EstValide = 1";
    $params = [[1, $id, PDO::PARAM_INT]];
    $words = $db->execQuery($query, $params);
    return $words;
}



// Fonction qui renvoie toutes les informations de toutes les parties jouées par un joueur à partir de son ID
// paramètres : $id : id du joueur
// return : toutes les informations de toutes les parties jouées par le joueur $id
function getAllGamesPlayedByUser($id) {
    global $db;
    $query = "SELECT * FROM B_Jouer, B_Partie WHERE B_Jouer.IdPartie = B_Partie.IdPartie AND B_Jouer.IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $games = $db->execQuery($query, $params);
    return $games;
}


// fonction qui renvoie une grille de taille $tailleGrille (sous forme de liste avec toutes les lettres)
// paramètres : $tailleGrille : taille de la grille
// return : une grille de taille $tailleGrille
function getRandomGrid($tailleGrille) {
    // si OS = windows alors on lance le programme en .exe
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        exec('.\server\game_motor\sources\grid_build.exe server/data/frequences.txt '.$tailleGrille.' '.$tailleGrille, $output);
    } else {
        exec('./server/game_motor/executables_LINUX/grid_build server/data/frequences.txt '.$tailleGrille.' '.$tailleGrille, $output);
    }
    $result = implode("\n", $output);
    // split le résultat en tableau
    $result = trim($result);
    $result = explode(" ", $result);
    return $result;
}

// Fonction qui renvoie la liste des mots valides pour saisie par l'utilisateur (sous forme de liste) dans la partie $idPartie
// paramètres : $idJoueur : id du joueur
//               $idPartie : id de la partie
// return : la liste des mots valides pour saisie par l'utilisateur dans la partie $idPartie
function getValidWordsForUser($idJoueur,$idPartie) {
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdPartie = ? AND EstValide = 1 AND IdJoueur = ?";
    $params = [
        [1, $idPartie, PDO::PARAM_INT],
        [2, $idJoueur, PDO::PARAM_INT]
    ];
    $words = $db->execQuery($query, $params);
    return $words;
}

// fonction qui la liste des mots valides pour la grille $grid (sous forme de liste)
// paramètres : $grid : grille de jeu
//              $gridSize : taille de la grille
// return : la liste des mots valides pour la grille $grid
function getValidWordsForGrid($grid, $gridSize) {
    // if $grid is a list, convert it to a string
    if (is_array($grid)) {
        $grid = implode(" ", $grid);
    }
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        exec('.\server\game_motor\sources\solve.exe server/data/listeMot.lex 2 '.$gridSize.' '.$gridSize.' '.$grid, $output);
    } else {
        exec('./../server/game_motor/executables_LINUX/solveNousLinux ./../server/data/listeMotNousLinux.lex 2 '.$gridSize.' '.$gridSize.' '.$grid, $output);
    }
    $result = implode("\n", $output);
    return explode(" ", $result);
}




/*
Fonction qui crée un booléen si l'opération a réussi ou non
paramètres : $id : id de la partie
             $idJoueur : id du joueur
             $word : mot proposé
return : true si l'opération a réussi, false sinon
*/
function createGame($id, $name, $langue, $tailleGrille, $mode, $public, $nbJoueurs) {
    $grid = implode(" ",getRandomGrid($tailleGrille));
    $words = getValidWordsForGrid($grid, $tailleGrille);
    $nbWords = count($words);

    global $db;

    $query = "INSERT INTO B_Partie (NomPartie, LangueDico, Grille, TailleGrille, NombreMotsPossibles, Mode, EstPublic, NombreJoueursMax, IdChef) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $params = [
        [1, $name, PDO::PARAM_STR],
        [2, $langue, PDO::PARAM_STR],
        [3, $grid, PDO::PARAM_STR],
        [4, $tailleGrille, PDO::PARAM_INT],
        [5, $nbWords, PDO::PARAM_INT],
        [6, $mode, PDO::PARAM_INT],
        [7, $public],
        [8, $nbJoueurs, PDO::PARAM_INT],
        [9, $id, PDO::PARAM_INT]
    ];
    $result = $db->execQuery($query, $params,false,false);

    // récupère l'id de la partie créée
    $query = "SELECT IdPartie FROM B_Partie WHERE NomPartie = ? AND LangueDico = ? AND Grille = ? AND TailleGrille = ? AND NombreMotsPossibles = ? AND Mode = ? AND EstPublic = ? AND NombreJoueursMax = ? AND IdChef = ?";
    $params = [
        [1, $name, PDO::PARAM_STR],
        [2, $langue, PDO::PARAM_STR],
        [3, $grid, PDO::PARAM_STR],
        [4, $tailleGrille, PDO::PARAM_INT],
        [5, $nbWords, PDO::PARAM_INT],
        [6, $mode, PDO::PARAM_INT],
        [7, $public],
        [8, $nbJoueurs, PDO::PARAM_INT],
        [9, $id, PDO::PARAM_INT]
    ];
    $result = $db->execQuery($query, $params);

    // si la partie a bien été créée, on ajoute le joueur à la table B_Jouer
    if ($result) {
        $idPartie = $result[0]->IdPartie;
        $query = "INSERT INTO B_Jouer (IdJoueur, IdPartie, Score) VALUES (?, ?, ?)";
        $params = [
            [1, $id, PDO::PARAM_INT],
            [2, $idPartie, PDO::PARAM_INT],
            [3, -1, PDO::PARAM_INT]
        ];
        $result = $db->execQuery($query, $params,false,false);
        return true;
    } else {
        return false;
    } 

    

}

// Fonction qui renvoie le nombre de joueurs dans le salon d'attente d'une partie $idPartie
// (on compte le nombre de Score à -1 dans la table B_Jouer)
// paramètres : $idPartie : id de la partie
// return : le nombre de joueurs dans le salon d'attente de la partie $idPartie
function getNbPlayersInWaitingRoom($idPartie) {
    global $db;
    $query = "SELECT COUNT(Score) as nombre FROM B_Jouer WHERE IdPartie = ? AND Score = -1";
    $params = [
        [1, $idPartie, PDO::PARAM_INT]
    ];
    $result = $db->execQuery($query, $params);
    return $result[0]->nombre;
}


// Fonction qui renvoie la liste des parties publiques (en fonction de la langue, du mode, du nombre de joueurs et du nom)
// paramètres : $langue : langue du dictionnaire
//              $mode : mode de la partie
//              $nbJoueurs : nombre de joueurs max de la partie
//              $name : nom de la partie
// return : la liste des parties publiques

function getPublicGames($langue, $mode, $nbJoueurs, $name) {
    global $db;
    $query = "SELECT * FROM B_Partie WHERE EstPublic = 1 AND DateDebutPartie IS NULL";
    $params = [];
    $i = 1;
    if(!empty($langue)){
        $query .= " AND LangueDico LIKE ?";
        $params[] = [$i++, $langue, PDO::PARAM_STR];
    }
    if(!empty($mode)){
        $query .= " AND Mode = ?";
        $params[] = [$i++, $mode, PDO::PARAM_INT];
    }
    if(!empty($nbJoueurs)){
        $query .= " AND NombreJoueursMax = ?";
        $params[] = [$i++, $nbJoueurs, PDO::PARAM_INT];
    }
    if(!empty($name)){
        $query .= " AND NomPartie LIKE ?";
        $params[] = [$i++, $name, PDO::PARAM_STR];
    }
    $games = $db->execQuery($query, $params);

    // filter all games that are already full (getNbPlayersInWaitingRoom($idPartie) >= NombreJoueursMax)
    $games = array_filter($games, function($game) {
        return getNbPlayersInWaitingRoom($game->IdPartie) < $game->NombreJoueursMax;
    });

    return $games;
}


// Fonction qui renvoie la liste des Pseudo, Logo, Score, IdJoueur et IdPartie des joueurs de la dernière partie jouée par un utilisateur 
// order by Score DESC
// paramètres : $idJoueur : id du joueur
// return : la liste des Pseudo, Logo, Score, IdJoueur et IdPartie des joueurs de la dernière partie jouée par un utilisateur
function getLeaderBoardLastGameOfUser($idJoueur){
    global $db;
    $query = "SELECT B_Joueur.Pseudo, B_Joueur.Logo, B_Jouer.Score, B_Joueur.IdJoueur, B_Partie.IdPartie FROM B_Joueur, B_Jouer, B_Partie WHERE B_Joueur.IdJoueur = B_Jouer.IdJoueur AND B_Jouer.IdPartie = B_Partie.IdPartie AND B_Partie.IdPartie = (SELECT MAX(IdPartie) FROM B_Jouer b WHERE b.IdJoueur = ?) ORDER BY Score DESC";
    $params = [[1, $idJoueur, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    return $result;
}

// Fonction qui modifie les données d'un profil public (mail, pseudo, description, logo, profilPublic)
// paramètres : $idJoueur : id du joueur
//              $mail : mail du joueur
//              $pseudo : pseudo du joueur
//              $description : description du joueur
//              $logo : logo du joueur
//              $profilPublic : profil public du joueur
// return : true si la modification a été effectuée, false sinon
function editPublicProfileDatas($idJoueur, $mail, $pseudo, $description, $logo, $profilPublic){
    global $db;
    $query = "UPDATE B_Joueur SET Mail = ?, Pseudo = ?, Description = ?, Logo = ?, ProfilPublic = ? WHERE IdJoueur = ?";
    $params = [
        [$mail, PDO::PARAM_STR],
        [$pseudo, PDO::PARAM_STR],
        [$description, PDO::PARAM_STR],
        [$logo, PDO::PARAM_STR],
        [$profilPublic, PDO::PARAM_INT],
        [$idJoueur, PDO::PARAM_INT],
    ];
    return $db->execQuery($query, $params);
}



// Fonction qui renvoie la liste des Pseudo, Logo, Score, IdJoueur et IdPartie des joueurs de la partie $idPartie
// order by Score DESC
// paramètres : $idPartie : id de la partie
// return : la liste des Pseudo, Logo, Score, IdJoueur

function getLeaderBoardGame($idPartie){
    global $db;
    $query = "SELECT B_Joueur.Pseudo, B_Joueur.Logo, B_Jouer.Score, B_Joueur.IdJoueur, B_Partie.IdPartie FROM B_Joueur, B_Jouer, B_Partie WHERE B_Joueur.IdJoueur = B_Jouer.IdJoueur AND B_Jouer.IdPartie = B_Partie.IdPartie AND B_Partie.IdPartie = ? ORDER BY Score DESC";
    $params = [[1, $idPartie, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    return $result;
}


// Fonction qui insère un mot jouée par un utilisateur durant une partie et par la même occasion le mot dans la table des Mots.
// paramètres : $idJoueur : id du joueur
//              $idPartie : id de la partie
//              $libelleMot : libelle du mot
//              $estValide : booléen qui indique si le mot est valide ou non
// return : true si le mot a été inséré dans la table B_Jouer, false sinon
function addWordPlayedByAPlayer($idJoueur,$idPartie,$libelleMot,$estValide){
    global $db;

    $isWordAlreadyInWordTable = function($libelleMot) {
        global $db;
        $query = "SELECT * FROM B_Mot WHERE Libelle = ?";
        $params = [[1, $libelleMot, PDO::PARAM_STR]];
        $result = $db->execQuery($query, $params);
        return count($result) > 0;
    };

    if (!$isWordAlreadyInWordTable($libelleMot)){
        $query = "INSERT INTO B_Mot VALUES (?)";
        $params = [[1, $libelleMot, PDO::PARAM_STR]];
        $db->execOnly($query, $params);
    }
        
    $isWordAlreadyProposedByPlayerInGame = function($idJoueur, $idPartie, $libelleMot) {
        global $db;
        $query = "SELECT * FROM B_Proposer WHERE IdJoueur = ? AND IdPartie = ? AND Libelle = ?";
        $params = [
            [1, $idJoueur, PDO::PARAM_INT],
            [2, $idPartie, PDO::PARAM_INT],
            [3, $libelleMot, PDO::PARAM_STR]
        ];
        $result = $db->execQuery($query, $params);
        return count($result) > 0;
    };

    if (!$isWordAlreadyProposedByPlayerInGame($idJoueur, $idPartie, $libelleMot)) {
        $date = date("Y-m-d H:i:s");
        $query = "INSERT INTO B_Proposer VALUES(?,?,?,?,?)";
        $params = [
            [1, $idJoueur, PDO::PARAM_INT],
            [2, $idPartie, PDO::PARAM_INT],
            [3, $libelleMot, PDO::PARAM_STR],
            [4, $date, PDO::PARAM_STR],
            [5, $estValide, PDO::PARAM_INT]
        ];
        $db->execOnly($query, $params);
    }




}


// Fonction qui formatte une date au format français
// paramètres : $date : date à formater
// return : la date formatée
function formatDateToSentence($date){
    $date = new DateTime($date);
    $date = $date->format('d/m/Y à H:i:s');
    return 'le '.$date;
}

// Fonction qui termine une partie et effectue les mises à jour nécessaires (sur les scores, dates de fin)
// paramètres : $idGame : id de la partie
// return : true si la partie a été terminée, false sinon
function endAGame($idGame){
    global $db;
    $game = getGameInfos($idGame);
    $words = getValidWordsForGrid($game->Grille, $game->TailleGrille);
    $nbWords = count($words);

    //pour chaque joueur mettre a jour score de fin
    $date = date("Y-m-d H:i:s");
    $query = "UPDATE B_Partie SET DateFinPartie = ?, NombreMotsPossibles = ? WHERE IdPartie = ?";
    $params = [
        [1, $date, PDO::PARAM_STR],
        [2, $nbWords, PDO::PARAM_INT],
        [3, $idGame, PDO::PARAM_INT]
    ];  
    $db->execOnly($query, $params);

    $players = getPlayers($idGame);
    foreach($players as $player){
 
        $score = getScoreOfPlayerInGame($player->IdJoueur, $idGame);

        
        $query = "UPDATE B_Jouer SET Score = ? WHERE IdJoueur = ? AND IdPartie = ?";
        $params = [
            [1, $score, PDO::PARAM_INT],
            [2, $player->IdJoueur, PDO::PARAM_INT],
            [3, $idGame, PDO::PARAM_INT]
        ];
        $db->execOnly($query, $params);

    }    
}

// Fonction qui renvoie le score d'un joueur dans une partie
// paramètres : $idJoueur : id du joueur
//              $idGame : id de la partie
// return : le score du joueur dans la partie
function getScoreOfPlayerInGame($idJoueur,$idGame){
    global $db;
    $allValidWords = getValidWordsForUser($idJoueur, $idGame);
    $allValidWords = array_map(function($word) {
        return $word->Libelle;
    }, $allValidWords);
    $allValidWords = array_unique($allValidWords);
    $allValidWordsString = implode(" ", $allValidWords);

   
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        exec('.\..\server\game_motor\sources\score.exe '.$allValidWordsString, $output);
    } else {
        exec('./../server/game_motor/executables_LINUX/score_by_length '.$allValidWordsString, $output);
    }
    $result = implode("\n", $output);
    
    // split le résultat en tableau
    $result = trim($result);
    $result = intval($result);

    // add 5 points for each animal in $animalsListUppercase (already in uppercase)
    foreach($allValidWords as $word){
        if (in_array(strtoupper($word), $GLOBALS['animalsListUppercase'])) {
            $result += 5;
        }
    }
    

    return $result;   
}

/**
 * Fonction qui indique si un utilisateur à besoin d'un token (s'est connecté il y a plus de 3 jours)
 *
 * @param $user :l'id de l'utilisateur
 * @return bool : true si il a besoin d'un token false sinon
 *
 */
function needAToken($user){
    global $db;
    $query = "SELECT DateCreationCompte FROM B_Joueur WHERE IdJoueur=:id";
    $parameters = [[":id",$user]];
    $dateConnec = new DateTime(($db->execQuery($query,$parameters,true))[0]->DateCreationCompte);
    $interval = $dateConnec->diff(new DateTime());
    return $interval->d > 3;
}


// Fonction qui ajoute un token à un utilisateur avec un temps d'expiration de 1 heure
// paramètres : $idJoueur : id du joueur
//              $token : token à ajouter
// return : rien
function addTokenToUser($idJoueur, $token){
    global $db;
    $dateExpiration = date("Y-m-d H:i:s", strtotime('+1 hour'));
    $query = "INSERT INTO B_Authentification (Token, DateExpiration, IdJoueur) VALUES (?,?,?)";
    $params = [
        [1, $token, PDO::PARAM_STR],
        [2, $dateExpiration, PDO::PARAM_STR],
        [3, $idJoueur, PDO::PARAM_INT]
    ];
    $db->execOnly($query, $params);

}

// Fonction qui renvoie si un token est expiré ou non
// paramètres : $token : token à vérifier
// return : true si le token est expiré, false sinon
function isExpiredToken($token){
    global $db;
    $query = "SELECT * FROM B_Authentification WHERE Token = ?";
    $params = [[1, $token, PDO::PARAM_STR]];
    $result = $db->execQuery($query, $params);
    if (count($result) > 0){
        $dateExpiration = $result[0]->DateExpiration;
        $dateExpiration = new DateTime($dateExpiration);
        $dateNow = new DateTime();
        return $dateExpiration < $dateNow;
    }
    return true;
}

// Fonction qui renvoie les informations du dernier token d'un utilisateur
// paramètres : $idJoueur : id du joueur
// return : les informations du dernier token de l'utilisateur
function getLastDateTokenUser($idJoueur){
    global $db;
    $query = "SELECT * FROM B_Authentification WHERE IdJoueur = ? ORDER BY DateExpiration DESC";
    $params = [[1, $idJoueur, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    if (count($result) > 0){
        return $result[0]->DateExpiration;
    }
    return null;
}

// Fonction qui renvoie les informations d'un joueurs à partir de son token
// paramètres : $token : token du joueur
// return : les informations du joueur
function getUserByToken($token){
    global $db;
    $query = "SELECT * FROM B_Joueur WHERE IdJoueur = (SELECT IdJoueur FROM B_Authentification WHERE Token = ?)";
    $params = [[1, $token, PDO::PARAM_STR]];
    $result = $db->execQuery($query, $params);
    if (count($result) > 0){
        return $result[0];
    }
    return null;
}


?>