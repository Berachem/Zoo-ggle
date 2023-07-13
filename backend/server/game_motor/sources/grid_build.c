/*

$ grid_build frequences.txt 4 4
G A I R R U V E QU E O T A S M J

Crée et affiche une grille aléatoire de dimensions données (4 lignes, 4
colonnes) à partir d’un fichier de fréquences (frequences.txt). La grille est
lue ligne par ligne, les cases sont séparées par des espaces.

*/

#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include <time.h>
#include "../headers/grid.h"


int main(int argc, char *argv[]) {

  // on crée des arguments par défaut
  char *filename = "../../data/frequences.txt";
  int height = HAUTEUR_PAR_DEFAUT;
  int width = LARGEUR_PAR_DEFAUT;

  // check if there is enough arguments
  if (argc != 4) {
    printf("Usage: %s filename height width (check if there is enough arguments)\n", argv[0]);
    return ERROR_PARAM_NUMBER;
  }
  // check if the height and width are integers
  if (atoi(argv[2]) == 0 || atoi(argv[3]) == 0) {
    printf("Usage: %s filename height width (check if the height and width are integers)\n", argv[0]);
    return ERROR_PARAM_TYPE;
  }
  // check if filename is a string and contains .txt
  if (strstr(argv[1], ".txt") == NULL) {
    printf("Usage: %s filename height width (check if filename is a string and contains .txt)\n", argv[0]);
    return ERROR_FILE_TYPE;
  }
  // check if height == width
  if (atoi(argv[2]) != atoi(argv[3])) {
    printf("Usage: %s filename height width (check if height == width)\n", argv[0]);
    return ERROR_GRID_DIMENSION;
  }
  // initialisation du générateur de nombres aléatoires
  srand(time(NULL));


  // on récupère les arguments
  filename = argv[1];
  height = atoi(argv[2]);
  width = atoi(argv[3]);

  //affiche
 
  // on crée une strucutre de grid
  grid g = grid_build(filename, height, width);

  // on affiche la grille
  print_grid(g);
  printf("\n");

  // affiche en 2D
  //print_grid2D(g);
  // on vide la grille
  free(g.gridList);

  return 0;


}
 