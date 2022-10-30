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

// structure de données pour les grilles
typedef struct {
    int nbl; // nombre de lignes
    int nbc; // nombre de colonnes
    char *grid; // tableau de caractères
} grid;

// fonction qui convertit des coordonnées 2D en 1D dans une grid
int coord2D_to_1D(int i, int j, grid g) {
  return i * g.nbc + j;
}

// fonction qui convertit des coordonnées 1D en 2D dans une grid
void coord1D_to_2D(int k, grid g, int *i, int *j) {
  *i = k / g.nbc;
  *j = k % g.nbc;
}

// fonction qui renvoie la liste des voisins d’une case
int *neighbors(int i, int j, grid g) {
  int *neighbors = malloc(4 * sizeof(int));
  int k = 0;
  if (i > 0) {
    neighbors[k] = coord2D_to_1D(i - 1, j, g);
    k++;
  }
  if (i < g.nbl - 1) {
    neighbors[k] = coord2D_to_1D(i + 1, j, g);
    k++;
  }
  if (j > 0) {
    neighbors[k] = coord2D_to_1D(i, j - 1, g);
    k++;
  }
  if (j < g.nbc - 1) {
    neighbors[k] = coord2D_to_1D(i, j + 1, g);
    k++;
  }
  neighbors[k] = -1;
  return neighbors;
}

/*
fonction qui renvoie un caractère aléatoire en fonction d'un fichier de fréquences
de la forme : LETTRE FREQUENCE

Pour cela, on parcourt le fichier et on calcule la somme des fréquences.
 On tire un nombre aléatoire entre 0 et cette somme. 
 Si ce nombre est inférieur à la fréquence de la lettre, on la renvoie.
Sinon, on soustrait la fréquence de la lettre à la fréquence totale et on passe à la lettre suivante.

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
      printf("%c ", g.grid[coord2D_to_1D(i, j,g)]);
    }
    printf("\n");
  }
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
  grid g;
  g.nbl = height;
  g.nbc = width;

  // on crée un tableau de caractères
  g.grid = malloc(sizeof(char) * g.nbl * g.nbc);
  
  // on remplit le tableau de caractères avec des lettres aléatoire
  for (int i = 0; i < height * width; i++) {
    g.grid[i] = lettre_aleatoire(filename);
  }
  // on ajoute le tableau de caractères à la structure de grid
  g.grid = g.grid;
  // on affiche la grille
  print_grid(g);
  // on vide la grille
  free(g.grid);

  return 0;


}
