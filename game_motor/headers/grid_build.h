/*
grid_build.h
-----

Rôle : prototypes des fonctions de grid_build.c

*/



#include "grid.h"

char lettre_aleatoire(char *filename);

void grille_aleatoire(char *filename, int nb_lignes, int nb_colonnes);

void print_grid(grid g);

void print_grid_file(grid g, char *filename);

grid grid_build(char *filename, int nbl, int nbc);



