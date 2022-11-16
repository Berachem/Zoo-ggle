/*
grid_path.h
-----

Rôle : prototypes des fonctions de grid_path.c

*/





int grid_path_rec(char *word, int i, int j, grid g, int *visited, int *casesLettreDuMot, int *indiceParcoursCasesLettreDuMot);

int grid_path(char *word, grid g, int *casesLettreDuMot);






