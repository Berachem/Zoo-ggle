<?php
// Fichier qui contient toutes les fonctions utilisées dans le site

/*
MLD:




*/


// Fonction qui renvoie les données de la partie en cours du joueur $id (en comparant la date début et fin de la partie et la date actuelle) FIXME: à tester 
function getCurrentGame($userID){
    global $db;
    $query = "SELECT * FROM B_Partie WHERE IdJoueur = ? AND DateDebutPartie <= NOW() AND DateFinPartie >= NOW()";
    $params = [[1, $userID, PDO::PARAM_INT]];
    $game = $db->execQuery($query, $params);
    return $game[0];
}



// Fonction qui renvoie la liste des mots valides pour la partie $idPartie proposés par le joueur $id
function getValidWordsListByPlayer($userID, $gameID){
    global $db;
    $query = "SELECT Libelle FROM B_Proposer WHERE IdJoueur = ? AND IdPartie = ? AND EstValide = 1";
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


/* 
Renvoie toutes les données de toutes les parties d'un joueur suivi de toutes les données de tous les joueurs de ces parties 
(Table B_Jouer, B_Partie)
*/
function getAllDetailsByJoueur($id) {
    global $db;
    $query = "SELECT * FROM B_Jouer, B_Partie, WHERE B_Jouer.IdJoueur = ? AND B_Jouer.IdPartie = B_Partie.IdPartie";
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
    $result = explode(" ", $result);
    return $result;
}

// fonction qui la liste des mots valides pour la grille $grid (sous forme de liste)
function getValidWordsForGrid($grid) {
    // if $grid is a list, convert it to a string
    if (is_array($grid)) {
        $grid = implode(" ", $grid);
    }

    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN') {
        // lance le programme en .exe
        $result = shell_exec('.\server\game_motor\sources\solve.exe server/data/listeMot.lex '.$grid);
    } else {
        $result = shell_exec('./server/game_motor/executables_LINUX/solve server/data/listeMot.lex '.$grid);
    }

    var_dump($result);
    
    return explode(" ", $result);
}




/*
Fonction qui crée un booléen si l'opération a réussi ou non
*/
function createGame($id, $name, $langue, $tailleGrille, $mode, $public, $nbJoueurs) {
    $grid = implode(" ",getRandomGrid($tailleGrille));
    $words = getValidWordsForGrid($grid);
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

    $result = $db->execQuery($query, $params, true); // TODO : vérifier que la requête s'est bien exécutée
    return $result;

}



?>