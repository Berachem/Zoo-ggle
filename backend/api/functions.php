<?php
// Fichier qui contient toutes les fonctions utilisées dans le site


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
    $query = "SELECT COUNT(Jouer.IdPartie) as gamesWon FROM B_Jouer AS Jouer WHERE Jouer.IdJoueur = ? AND Jouer.Score >=(SELECT MAX(B.Score) FROM B_Jouer AS B WHERE Jouer.IdPartie = B.IdPartie)";
    $params = [[1, $id, PDO::PARAM_INT]];
    $gamesWon = $db->execQuery($query, $params);
    $user[0]->gamesWon = $gamesWon[0]->gamesWon;
    // parties perdues,
    $query = "SELECT COUNT(Jouer.IdPartie) as gamesLost FROM B_Jouer AS Jouer WHERE Jouer.IdJoueur = ? AND Jouer.Score <(SELECT MAX(B.Score) FROM B_Jouer AS B WHERE Jouer.IdPartie = B.IdPartie)";
    $params = [[1, $id, PDO::PARAM_INT]];
    $gamesLost = $db->execQuery($query, $params);
    $user[0]->gamesLost = $gamesLost[0]->gamesLost;
    
    //parties jouées, 
    $query = "SELECT COUNT(Libelle) as wordsProposed FROM B_Proposer WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $wordsProposed = $db->execQuery($query, $params);
    $user[0]->wordsProposed = $wordsProposed[0]->wordsProposed;
    //mots proposés, 
    $query = "SELECT COUNT(Libelle) as wordsProposed FROM B_Proposer WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $wordsProposed = $db->execQuery($query, $params);
    $user[0]->wordsProposed = $wordsProposed[0]->wordsProposed;

    //mots trouvés
    $query = "SELECT COUNT(Libelle) as wordsValidated FROM B_Proposer WHERE IdJoueur = ? AND EstValide = 1";
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
    $query = "SELECT * FROM B_Jouer, B_Partie WHERE B_Jouer.IdPartie = B_Partie.IdPartie AND B_Jouer.IdJoueur = ? ORDER BY DateDebutPartie DESC";
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

// Fonction qui renvoie la liste des mots valides pour saisie par l'utilisateur (sous forme de liste) dans la partie $idPartie
// paramètres : $idJoueur : id du joueur
//               $idPartie : id de la partie
// return : la liste des mots valides pour saisie par l'utilisateur dans la partie $idPartie
function getValidWordsForUser($idJoueur,$idPartie) {
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdPartie = ? AND EstValide = 1 AND IdJoueur = ? ORDER BY DateProposition DESC";
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
function editPublicProfileDatas($idJoueur, $pseudo, $description, $profilPublic){
    global $db;
    $query = "UPDATE B_Joueur SET Pseudo = ?, Description = ?, ProfilPublic = ? WHERE IdJoueur = ?";
    $params = [
        [1,$pseudo, PDO::PARAM_STR],
        [2,$description, PDO::PARAM_STR],
        [3,$profilPublic, PDO::PARAM_INT],
        [4,$idJoueur, PDO::PARAM_INT]
    ];
    return $db->execOnly($query, $params);
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

function getPlayerGameInfos($idPartie,$idJoueur){
    global $db;
    $query = "SELECT * FROM B_Jouer WHERE B_Jouer.IdPartie = ? AND B_Jouer.IdJoueur = ?";
    $params = [[1, $idPartie, PDO::PARAM_INT],[2, $idJoueur, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    return $result[0];
}

function getProposedWordsCount($playerId,$gameId){
    global $db;
    $query = "SELECT * FROM B_Proposer WHERE B_Proposer.IdPartie = ? AND B_Proposer.IdJoueur = ?";
    $params = [[1, $gameId, PDO::PARAM_INT],[2, $playerId, PDO::PARAM_INT]];
    $result = $db->execCount($query, $params);
    return $result;
}

// Fonction qui insère un mot jouée par un utilisateur durant une partie et par la même occasion le mot dans la table des Mots.
// paramètres : $idJoueur : id du joueur
//              $idPartie : id de la partie
//              $libelleMot : libelle du mot
//              $estValide : booléen qui indique si le mot est valide ou non
// return : true si le mot a été inséré dans la table B_Jouer, false sinon
function addWordPlayedByAPlayer($idJoueur,$idPartie,$libelleMot,$estValide,$date){
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

function insertGame($name, $lang, $grid, $beginDate, $endDate, $gridSize, $possibleNumberWord, $mode, $playerNumber){
    global $db;
    $query = "INSERT INTO b_partie (NomPartie, LangueDico,Grille,DateDebutPartie,DateFinPartie,TailleGrille,NombreMotsPossibles,Mode,EstPublic,NombreJoueursMax,IdChef) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1, ?, -1)";
    $params = [
        [1, $name, PDO::PARAM_STR],
        [2, $lang, PDO::PARAM_STR],
        [3, $grid, PDO::PARAM_STR],
        [4, $beginDate, PDO::PARAM_STR],
        [5, $endDate, PDO::PARAM_STR],
        [6, $gridSize, PDO::PARAM_INT],
        [7, $possibleNumberWord, PDO::PARAM_INT],
        [8, $mode, PDO::PARAM_INT],
        [9, $playerNumber, PDO::PARAM_INT]
    ];  
    $db->execOnly($query, $params);
    $gameId = $db->lastInsertId();

    return $gameId;
}

function insertPlayerPlayedAGame($gameId, $playerId, $score){
    global $db;
    $query = "INSERT INTO b_jouer 
    (IdJoueur, IdPartie,Score)
    VALUES
    (?, ?, ?)";
    $params = [
        [1, $playerId, PDO::PARAM_INT],
        [2, $gameId, PDO::PARAM_INT],
        [3, $score, PDO::PARAM_INT],
    ];  
    $db->execOnly($query, $params);
}

// Fonction qui renvoie si le mot est un animal ou non
// paramètres : $word : le mot
// return : true si le mot est un animal, false sinon
function isAnimalName($word){
    include_once('animals/animalsData.php');

    $word = strtoupper($word);

    return isWordInFRAList($word) ;
}

// Fonction qui renvoie le score obtenu pour un mot
// paramètres : $word : le mot
// return : le score obtenu pour le mot
function getScoreForAWord($word){
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        exec('.\..\..\server\game_motor\executables_WIN\score_by_lenght.exe '.$word, $output);
    } else {
        exec('./../server/game_motor/executables_LINUX/score_by_length', $output);
    }
    $result = implode("\n", $output);
    
    // split le résultat en tableau
    $result = trim($result);
    $result = intval($result);

    $isAnimal = false;

    // add 5 points if the word is a animal
    if (isAnimalName($word)) {
        $result += 5;
        $isAnimal = true;
    }
    return [$result,$isAnimal];   
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
    return isExpiredToken(getUserLastToken($user));

   /*  $query = "SELECT DateCreationCompte FROM B_Joueur WHERE IdJoueur=:id";
    $parameters = [[":id",$user]];
    $dateConnec = new DateTime(($db->execQuery($query,$parameters))[0]->DateCreationCompte);
    $interval = $dateConnec->diff(new DateTime());
    return $interval->d > 3; */
}

// Fonction qui ajoute un token à un utilisateur avec un temps d'expiration de 1 heure
// paramètres : $idJoueur : id du joueur
//              $token : token à ajouter
// return : rien
function addTokenToUser($idJoueur, $token){
    global $db;
    $query = "INSERT INTO B_Authentification (Token, DateExpiration, IdJoueur) VALUES (?,NOW() + INTERVAL 1 DAY,?)"; //1 HOUR
    $params = [
        [1, $token, PDO::PARAM_STR],
        [2, $idJoueur, PDO::PARAM_INT]
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

// Fonction qui renvoie le dernier token de l'utilisateur
// paramètres : $idJoueur : id du joueur
// return : le dernier token de l'utilisateur ou null si il n'y en a pas
function getUserLastToken($idJoueur){
    global $db;
    $query = "SELECT * FROM B_Authentification WHERE IdJoueur = ? ORDER BY DateExpiration DESC";
    $params = [[1, $idJoueur, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    if (count($result) > 0){
        return $result[0]->Token;
    }
    return null;
}

// Fonction qui renvoie les informations d'un joueurs à partir de son token
// paramètres : $token : token du joueur
// return : les informations du joueur
function getUserByToken($token){
    global $db;
    $query = "SELECT * FROM B_Joueur WHERE IdJoueur = (SELECT IdJoueur FROM B_Authentification WHERE Token = ? AND DateExpiration>NOW())";
    $params = [[1, $token, PDO::PARAM_STR]];
    $result = $db->execQuery($query, $params);
    if (count($result) > 0){
        return $result[0];
    }
    return null;
}

//Fonction qui actualise la date de connexion d'un utilisateur
//paramètres : $user : l'id du joueur
//return : void
function actualiseConnexionDate($user){
    global $db;
    $query = "UPDATE B_Joueur SET DateDerniereConnexion=NOW() WHERE IdJoueur=?";
    $params = [[1, $user, PDO::PARAM_STR]];
    $db->execOnly($query, $params);
}

function getServerAuth(){
    $ini_array = parse_ini_file("../../conf.ini", true);
    return $ini_array["conf"]["password"];
}