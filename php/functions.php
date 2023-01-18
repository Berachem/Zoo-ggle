<?php
// Fichier qui contient toutes les fonctions utilisées dans le site

/*
MLD:

B_Joueur = (IdJoueur INT, Mail VARCHAR(320), MotDePasse VARCHAR(128), Pseudo VARCHAR(30), Description VARCHAR(400), Logo VARCHAR(64), DateCreationCompte DATETIME, ProfilPublic LOGICAL, DateDerniereConnexion DATETIME);
B_Partie = (IdPartie INT, NomPartie VARCHAR(50), LangueDico CHAR(3), Grille VARCHAR(200), DateDebutPartie DATETIME, DateFinPartie VARCHAR(50), TailleGrille INT, NombreMotsPossibles INT, Mode INT, EstPublic LOGICAL, NombreJoueursMax INT, #IdJoueur);
B_Message = (IdMessage INT, Contenu VARCHAR(200), DateMessage DATETIME, #IdPartie, #IdJoueur);
B_MessagePrive = (IdMessagePrive INT, ContenuMessagePrive VARCHAR(200), DateMessagePrive DATE, #IdJoueur, #IdJoueur_1);
MOT = (Libelle VARCHAR(200));
B_Jouer = (#IdJoueur, #IdPartie, Score INT);
B_Proposer = (#IdJoueur, #IdPartie, #Libelle, DateProposition DATETIME, EstValide LOGICAL);


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
Renvoie les détails d'une partie composé de plusieurs informations : 
- int Score : le score du joueur dans la partie
- DECIMAL(15,2) TempsMoyen : le temps moyen de réponse du joueur dans la partie
- String Dictionnaire : la liste des mots du dictionnaire utilisé dans la partie (séparés par des espaces)
- String Grille : la grille de la partie (séparés par des espaces)
- int TailleGrille : la taille de la grille de la partie
- DATETIME DatePartie : la date de la partie
- int ID_ChefPartie : l'ID du chef de partie

function getAllDetailsByJoueur($id) {

    global $db;
    $query = "SELECT B_Partie.*, B_Jouer.* FROM B_Partie JOIN B_Jouer ON B_Partie.Id_Partie = B_Jouer.Id_Partie WHERE B_Jouer.ld_Joueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $details = $db->execQuery($query, $params);
    return $details;
}
*/

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
    
    return explode(" ", $result);
}




/*
Fonction qui crée un booléen si l'opération a réussi ou non
*/
function createGame($id, $name, $langue, $tailleGrille, $mode, $public, $nbJoueurs) {
    $grid = implode(" ",getRandomGrid($tailleGrille));
    $words = getValidWordsForGrid($grid);
    $nbWords = count($words);
    $date = date("Y-m-d H:i:s");

    global $db;

    $query = "INSERT INTO B_Partie (NomPartie, LangueDico, Grille, DateDebutPartie, TailleGrille, NombreMotsPossibles, Mode, EstPublic, NombreJoueursMax, Id_Joueur) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $params = [
        [1, $name, PDO::PARAM_STR],
        [2, $langue, PDO::PARAM_STR],
        [3, $grid, PDO::PARAM_STR],
        [4, $date, PDO::PARAM_STR],
        [5, $tailleGrille, PDO::PARAM_INT],
        [6, $nbWords, PDO::PARAM_INT],
        [7, $mode, PDO::PARAM_INT],
        [8, $public],
        [9, $nbJoueurs, PDO::PARAM_INT],
        [10, $id, PDO::PARAM_INT]
    ];



}



?>