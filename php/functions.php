<?php
// Fichier qui contient toutes les fonctions utilisées dans le site

/*
MLD:

B_Joueur = (ld_Joueur INT, Mail VARCHAR(320), MotDePasse VARCHAR(128), Pseudo VARCHAR(30), Description VARCHAR(400), Logo VARCHAR(50), Date Creation Compte DATETIME, ProfilPublic LOGICAL); B_Partie = (Id_Partie INT, Dictionnaire TEXT, Grille VARCHAR(200), DatePartie DATETIME, Taille Grille INT, #ld_Joueur);
B_Message = (IdMessage INT, Contenu VARCHAR(200), DateMessage DATETIME, #Id_Partie, #Id_Joueur);
B_Jouer = (#Id_Joueur, #Id_Partie, Score INT, TempsMoyen Reponse DECIMAL(15,2));
B_Proposer = (#Id_Joueur, #Id_Partie, Mot VARCHAR(200), DateProposition DATETIME, EStValide LOGICAL);
B_MessagePrivé = (#ld Joueur, IdMessagePrivé INT, Contenu VARCHAR(200), DateMessagePrivé DATETIME, #Id_Joueur_1);

*/


// Fonction qui renvoie la liste des mots valides pour la partie $idPartie proposés par le joueur $id
function getValidWordsListByPlayer($userID, $gameID){
    global $db;
    $query = "SELECT Mot FROM B_Proposer WHERE ld_Joueur = ? AND Id_Partie = ? AND EstValide = 1";
    $params = [[1, $userID, PDO::PARAM_INT], [2, $gameID, PDO::PARAM_INT]];
    $words = $db->execQuery($query, $params);
    return array_map(function($w){return $w->Mot;}, $words);
}



// Fonction qui un int pour savoir si le joueur $id a gagnée la partie $idPartie (0 si perdu, 1 si gagné, 2 si égalité)
// en comparant le score du joueur avec le score de tous les autres joueurs de la partie
function getVerdictForGamePlayer($userID, $gameID){
    global $db;
    $query = "SELECT Score FROM B_Jouer WHERE Id_Partie = ? AND ld_Joueur = ?";
    $params = [[1, $gameID, PDO::PARAM_INT], [2, $userID, PDO::PARAM_INT]];
    $score = $db->execQuery($query, $params);
    $score = $score[0]->Score;

    $query = "SELECT Score FROM B_Jouer WHERE Id_Partie = ? AND ld_Joueur != ?";
    $params = [[1, $gameID, PDO::PARAM_INT], [2, $userID, PDO::PARAM_INT]];
    $scores = $db->execQuery($query, $params);

    $verdict = 1;
    foreach ($scores as $s) {
        if ($s->Score > $score) {
            $verdict = 0;
            break;
        } else if ($s->Score == $score) {
            $verdict = 2;
        }
    }
    return $verdict;
}


/*
Fonction qui renvoie le pseudo d'un joueur à partir de son ID
*/
function getPseudoById($id) {
    global $db;
    $query = "SELECT Pseudo FROM B_Joueur WHERE Id_Joueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $pseudo = $db->execQuery($query, $params);
    return $pseudo[0]['Pseudo'];
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
*/
function getAllDetailsByJoueur($id) {

    global $db;
    $query = "SELECT B_Partie.*, B_Jouer.* FROM B_Partie JOIN B_Jouer ON B_Partie.Id_Partie = B_Jouer.Id_Partie WHERE B_Jouer.ld_Joueur = ?";
    $params = [[1, $id, PDO::PARAM_INT]];
    $details = $db->execQuery($query, $params);
    return $details;
}

?>