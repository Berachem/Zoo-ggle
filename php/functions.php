<?php
// Fichier qui contient toutes les fonctions utilisées dans le site

/*
MLD:


*/



// Fonction qui renvoie les infos d'une partie en fonction de son id
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
function getGameStarted($id) {
    global $db;
    $query = "SELECT DateDebutPartie FROM B_Partie WHERE IdPartie = ? AND DateDebutPartie IS NOT NULL";
    $params = [[1, $id, PDO::PARAM_INT]];
    $result = $db->execQuery($query, $params);
    if (count($result) == 0) {
        return null;
    }
    return $result[0]->DateDebutPartie != null;
}

// Fonction qui renvoie true si la partie est terminée, false sinon 
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
function startGame($id) {
    global $db;
    $query = "UPDATE B_Partie SET DateDebutPartie = NOW() WHERE IdPartie = ?";
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

// fonction qui renvoie la partie en


// fonction qui renvoie des données de la partie en cours du user $id
// (en regardant les scores, et en regardant la date de début et de fin de la partie)
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
function getGameInProgressStartedForUser($id) {
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

// Fonction qui ajoute un joueur dans le salon de la partie $idPartie (en créant une ligne dans la table B_Jouer avec le score à -1))
function addPlayerToWaitingRoomForGame($userID, $gameID){
    global $db;
    $query = "INSERT INTO B_Jouer (IdJoueur, IdPartie, Score) VALUES (?, ?, -1)";
    $params = [[1, $userID, PDO::PARAM_INT], [2, $gameID, PDO::PARAM_INT]];
    $db->execQuery($query, $params);
} 


// Fonction qui renvoie la liste des mots valides pour la partie $idPartie proposés par le joueur $id
function getValidsWordsListByPlayerInGame($userID, $gameID){
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdJoueur = ? AND IdPartie = ? AND EstValide = 1";
    $params = [[1, $userID, PDO::PARAM_INT], [2, $gameID, PDO::PARAM_INT]];
    $words = $db->execQuery($query, $params);
    return $words;
}

// Fonction qui renvoie la liste des mots pour la partie $idPartie proposés par le joueur $id
function getAllWordsListByPlayerInGame($userID, $gameID){
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdJoueur = ? AND IdPartie = ?";
    $params = [[1, $userID, PDO::PARAM_INT], [2, $gameID, PDO::PARAM_INT]];
    $words = $db->execQuery($query, $params);
    return $words;
}




// Fonction qui un int pour savoir si le joueur $id a gagnée la partie $idPartie (0 si perdu, 1 si gagné, 2 si égalité)
// en comparant le score du joueur avec le score de tous les autres joueurs de la partie
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
*/
function getPseudoById($id) {
    global $db;
    $query = "SELECT Pseudo FROM B_Joueur WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $pseudo = $db->execQuery($query, $params);
    return $pseudo[0]->Pseudo;
}

// fonction qui renvoie le lien vers l'image du joueur à partir de son ID
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

//si la partie n'existe pas, on le redirige vers la page d'accuei
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
function getIdByPseudo($pseudo) {
    global $db;
    $query = "SELECT IdJoueur FROM B_Joueur WHERE Pseudo = ?";
    $params = [[1, $pseudo, PDO::PARAM_STR]];
    $id = $db->execQuery($query, $params);
    return $id[0]->IdJoueur;
}


// renvoie les informations d'un joueur à partir de son ID (Table B_Joueur, somme des scores de toutes les parties jouées par le joueur où score != -1 (as score), nombre de parties jouées par le joueur (as gamesPlayed))
function getUserStatistics($id) {
    global $db;
    $query = "SELECT * FROM B_Joueur WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $user = $db->execQuery($query, $params);
    $query = "SELECT SUM(Score) as score FROM B_Jouer WHERE IdJoueur = ? AND Score != -1";
    $params = [[1, $id, PDO::PARAM_INT]];
    $score = $db->execQuery($query, $params);
    $query = "SELECT COUNT(IdPartie) as gamesPlayed FROM B_Jouer WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $gamesPlayed = $db->execQuery($query, $params);
    $user[0]->score = $score[0]->score;
    $user[0]->gamesPlayed = $gamesPlayed[0]->gamesPlayed;
    return $user;
}

/*
CREATE TABLE B_Mot(
   Libelle VARCHAR(200),
   PRIMARY KEY(Libelle)
);

CREATE TABLE B_Jouer(
   IdJoueur INT,
   IdPartie INT,
   Score INT,
   PRIMARY KEY(IdJoueur, IdPartie),
   FOREIGN KEY(IdJoueur) REFERENCES B_Joueur(IdJoueur),
   FOREIGN KEY(IdPartie) REFERENCES B_Partie(IdPartie)
);

CREATE TABLE B_Proposer(
   IdJoueur INT,
   IdPartie INT,
   Libelle VARCHAR(200),
   DateProposition DATETIME,
   EstValide TINYINT,
   PRIMARY KEY(IdJoueur, IdPartie, Libelle),
   FOREIGN KEY(IdJoueur) REFERENCES B_Joueur(IdJoueur),
   FOREIGN KEY(IdPartie) REFERENCES B_Partie(IdPartie),
   FOREIGN KEY(Libelle) REFERENCES B_Mot(Libelle)
);

*/

function getAllWordsProposedByUser($id) {
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $words = $db->execQuery($query, $params);
    return $words;
}

function getAllValidsWordsProposedByUser($id) {
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdJoueur = ? AND EstValide = 1";
    $params = [[1, $id, PDO::PARAM_INT]];
    $words = $db->execQuery($query, $params);
    return $words;
}






/* 
Renvoie toutes les données de toutes les parties d'un joueur suivi de toutes les données de tous les joueurs de ces parties 
(Table B_Jouer, B_Partie)
*/
function getAllGamesPlayedByUser($id) {
    global $db;
    $query = "SELECT * FROM B_Jouer, B_Partie WHERE B_Jouer.IdPartie = B_Partie.IdPartie AND B_Jouer.IdJoueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $games = $db->execQuery($query, $params);
    return $games;
}


// fonction qui renvoie une grille de taille $tailleGrille (sous forme de liste avec toutes les lettres)
function getRandomGrid($tailleGrille) {
    // si OS = windows alors on lance le programme en .exe
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        // lance le programme en .exe
        $result = shell_exec('.\server\game_motor\sources\grid_build.exe server/data/frequences.txt '.$tailleGrille.' '.$tailleGrille);
    } else {
        $result = shell_exec('./server/game_motor/executables_LINUX/grid_build server/data/frequences.txt '.$tailleGrille.' '.$tailleGrille);
    }
    // split le résultat en tableau
    $result = trim($result);
    $result = explode(" ", $result);
    return $result;
}

// fonction qui la liste des mots valides pour la grille $grid (sous forme de liste)
function getValidWordsForGrid($grid, $gridSize) {
    // if $grid is a list, convert it to a string
    if (is_array($grid)) {
        $grid = implode(" ", $grid);
    }

    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        // lance le programme en .exe
        $result = shell_exec('.\server\game_motor\sources\solve.exe server/data/listeMot.lex 2 '.$gridSize.' '.$gridSize.' '.$grid);
    } else {
        $result = shell_exec('./../server/game_motor/executables_LINUX/solve ./../server/data/listeMot.lex 2 '.$gridSize.' '.$gridSize.' '.$grid);
    }
    
    return explode(" ", $result);
}




/*
Fonction qui crée un booléen si l'opération a réussi ou non
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
    $result = $db->execQuery($query, $params);

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
        $result = $db->execQuery($query, $params);
        return true;
    } else {
        return false;
    } 

    

}

// Fonction qui renvoie le nombre de joueurs dans le salon d'attente d'une partie $idPartie
// (on compte le nombre de Score à -1 dans la table B_Jouer)
function getNbPlayersInWaitingRoom($idPartie) {
    global $db;
    $query = "SELECT COUNT(Score) as nombre FROM B_Jouer WHERE IdPartie = ? AND Score = -1";
    $params = [
        [1, $idPartie, PDO::PARAM_INT]
    ];
    $result = $db->execQuery($query, $params);
    return $result[0]->nombre;
}

/*

CREATE TABLE B_Partie(
   IdPartie INT,
   NomPartie VARCHAR(50),
   LangueDico CHAR(3),
   Grille VARCHAR(200),
   DateDebutPartie DATETIME,
   DateFinPartie VARCHAR(50),
   TailleGrille INT,
   NombreMotsPossibles INT,
   Mode INT,
   EstPublic LOGICAL,
   NombreJoueursMax INT,
   IdJoueur INT NOT NULL,
   PRIMARY KEY(IdPartie),
   FOREIGN KEY(IdJoueur) REFERENCES B_Joueur(IdJoueur)
);

*/
// Fonction qui renvoie la liste des parties publiques (en fonction de la langue, du mode, du nombre de joueurs et du nom)

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


function addWordPlayedByAPlayer($idJoueur,$idPartie,$libelleMot,$estValide){
    global $db;
    $query = "INSERT INTO B_Mot VALUES (?)";
    $params = [[1, $libelleMot, PDO::PARAM_STR]];
    $db->execQuery($query, $params,true);

    $date = date("Y-m-d H:i:s");
    $query = "INSERT INTO B_Proposer VALUES(?,?,?,?,?)";
    $params = [
        [1, $idJoueur, PDO::PARAM_INT],
        [2, $idPartie, PDO::PARAM_INT],
        [3, $libelleMot, PDO::PARAM_STR],
        [4, $date, PDO::PARAM_STR],
        [5, $estValide, PDO::PARAM_INT]
    ];
    $db->execQuery($query, $params,true);
}


function formatDateToSentence($date){
    $date = new DateTime($date);
    $date = $date->format('d/m/Y à H:i:s');
    return 'le '.$date;
}




?>