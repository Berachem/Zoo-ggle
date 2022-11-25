
/*
grid.h
-----

Rôle : prototypes des fonctions de grid.c

*/

typedef struct {
    int nbl; // nombre de lignes
    int nbc; // nombre de colonnes
    char *gridList; // tableau de caractères
} grid;

// convertit une position (i,j) en indice 1D
int coord2D_to_1D(int i, int j, grid g);

// convertit une position 1D en position (i,j)
void coord1D_to_2D(int k, grid g, int *i, int *j) ;

// renvoie la liste des voisins de la case (i,j)
int *neighbors(int i, int j, grid g);

// crée une grille 
grid createGrid(int nbl, int nbc, char *gridList) ;

// affiche la grille en 2D
void displayGridIn2D(grid g);

// affiche la grille en 2D avec une case en surbrillance ROUGE
void displayGridIn2DWithHighlightInRed(grid g, int i, int j);

// affiche la grille en 2D avec une case en surbrillance VERT
void displayGridIn2DWithHighlightInGreen(grid g, int i, int j);

// renvoie une lettre aléatoire en analysant un fichier de fréquences de lettres
char lettre_aleatoire(char *filename);

// renvoie une liste de caractères aléatoire de taille nbl x nbc et d'un fichier de fréquences de lettres
void grille_aleatoire(char *filename, int nb_lignes, int nb_colonnes);

// affiche une grille en 1D
void print_grid(grid g);

// renvoie une grille aléatoire de taille nbl x nbc et d'un fichier de fréquences de lettres
grid grid_build(char *filename, int nbl, int nbc);

// recherche récursive de le mot dans une grille à partir d'une position (i,j) 
int grid_path_rec(char *word, int i, int j, grid g, int *visited, int *casesLettreDuMot, int *indiceParcoursCasesLettreDuMot);

// renvoie 1 si le mot est présent dans la grille, 0 sinon
int grid_path(char *word, grid g, int *casesLettreDuMot);
