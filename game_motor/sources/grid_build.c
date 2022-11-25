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
  // initialisation du générateur de nombres aléatoires
  srand( time( NULL ) );
  // on crée des arguments par défaut
  char *filename = "../../data/frequences.txt";
  int height = 4;
  int width = 4;
  if (argc > 1) {
    filename = argv[1];
  }
  if (argc > 2) {
    height = atoi(argv[2]);
  }
  if (argc > 3) {
    width = atoi(argv[3]);
  }
  // on crée une strucutre de grid
  grid g = grid_build(filename, height, width);

  // on affiche la grille
  print_grid(g);
  // on vide la grille
  free(g.gridList);

  return 0;


}
 