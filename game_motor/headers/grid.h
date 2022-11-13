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

int coord2D_to_1D(int i, int j, grid g);

void coord1D_to_2D(int k, grid g, int *i, int *j) ;

int *neighbors(int i, int j, grid g);

grid createGrid(int nbl, int nbc, char *gridList) ;

void displayGridIn2D(grid g);

void displayGridIn2DWithHighlightInRed(grid g, int i, int j);

void displayGridIn2DWithHighlightInGreen(grid g, int i, int j);
