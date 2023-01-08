
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

#define TAILLE_ALPHABET 27
#define LARGEUR_PAR_DEFAUT 4
#define HAUTEUR_PAR_DEFAUT 4

// codes d'erreur
#define ERROR_OPENING_FILE 151
#define ERROR_PARAM_NUMBER 253
#define ERROR_PARAM_TYPE 254
#define ERROR_FILE_TYPE 255
#define ERROR_GRID_ARGUMENTS 256
#define ERROR_GRID_WORD 257
#define ERROR_GRID_DIMENSION 258

// convertit une position (i,j) en indice 1D
int coord2D_to_1D(int i, int j, grid g);

// convertit une position 1D en position (i,j)
void coord1D_to_2D(int k, grid g, int *i, int *j) ;

// renvoie le nombre et affecte la liste des voisins de la case (i,j)
int getNeighbors(int i, int j,grid g, int* neighbors);

// crée une grille 
grid createGrid(int nbl, int nbc, char *gridList) ;

// affiche la grille en 2D
void print_grid2D(grid g);

// affiche la grille en 2D avec une case en surbrillance ROUGE
void print_grid2DWithHighlightInRed(grid g, int i, int j);

// affiche la grille en 2D avec une case en surbrillance VERT
void print_grid2DWithHighlightInGreen(grid g, int i, int j);

// renvoie une lettre aléatoire en analysant un fichier de fréquences de lettres
char lettre_aleatoire(char *filename);

// renvoie une liste de caractères aléatoire de taille nbl x nbc et d'un fichier de fréquences de lettres
void grille_aleatoire(char *filename, int nb_lignes, int nb_colonnes);

// affiche une grille en 1D
void print_grid(grid g);

// renvoie une grille aléatoire de taille nbl x nbc et d'un fichier de fréquences de lettres
grid grid_build(char *filename, int nbl, int nbc);

// recherche récursive de le mot dans une grille à partir d'une position (i,j) 
int grid_path_rec(char *word, int i, int j, grid g, int *visited, int *casesLettreDuMot, int *indiceParcoursCasesLettreDuMot, int showLogs);

// renvoie 1 si le mot est présent dans la grille, 0 sinon
int grid_path(char *word, grid g, int *casesLettreDuMot, int showLogs);

// remplacer les QU
char *remplaceQU(char *word);

// fonction qui affiche un mot qui contient des * et qui remplace les * par QU
void printWordWithQU(char *word);

// fonction qui compte le nombre d'occurences d'un caractère dans un mot
int countOccurences(char *word, char c);



