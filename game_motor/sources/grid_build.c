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
#include "../headers/grid_build.h"


/*
fonction qui renvoie une lettre aléatoire en fonction d'un fichier fréquences
de la forme: LETTRE FREQUENCE
*/
char lettre_aleatoire(char *filename) {
  FILE *file = fopen(filename, "r");
  if (file == NULL) {
    printf("Error with file %s", *filename);
    exit(1);
  }

  // on calcule la somme des fréquences
  int somme = 0;
  char lettre;
  int frequence;
  while (fscanf(file, "%c %d", &lettre, &frequence) != EOF) {
    somme += frequence;
  }
  fclose(file);

  // on tire un nombre aléatoire entre 1 et la somme des fréquences
  int tirage = rand() % somme + 1;

  // on reparcourt le fichier 
  file = fopen(filename, "r");
  while (fscanf(file, "%c %d",  &lettre, &frequence) != EOF) {
    
    if (lettre != '\n' && tirage <= frequence) {
      // affichage de la lettre tirée, avec sa fréquence et le tirage
      //printf("ON A OBTENU LA LETTRE: %c FREQUENCE : %d tirage: %d FreqTotal: %d\n", lettre, frequence, tirage, somme);
      return lettre;
    } else {
      somme -= frequence;
    }
    tirage = rand() % somme + 1;
  }
  fclose(file);

  // on ne devrait jamais arriver ici
  return ' ';
}

// fonction qui affiche une grille à une dimension
void print_grid(grid g) {
  for (int i = 0; i < g.nbl; i++) {
    for (int j = 0; j < g.nbc; j++) {
      printf("%c ", g.gridList[coord2D_to_1D(i, j,g)]);
    }
  }
}

grid grid_build(char *filename, int nbl, int nbc) {
  grid g;
  g.nbl = nbl;
  g.nbc = nbc;
  g.gridList = malloc(nbl * nbc * sizeof(char));
  // on remplit le tableau de caractères avec des lettres aléatoire
  for (int i = 0; i < nbl; i++) {
    for (int j = 0; j < nbc; j++) {
      g.gridList[coord2D_to_1D(i, j, g)] = lettre_aleatoire(filename);
    }
  }
  return g;
}

 

int main(int argc, char *argv[]) {
  // initialisation du générateur de nombres aléatoires
  srand( time( NULL ) );
  // on crée des arguments par défaut
  char *filename = "../data/frequences.txt";
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
 