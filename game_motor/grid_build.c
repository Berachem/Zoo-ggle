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


/*
fonction qui renvoie un caractère aléatoire en fonction d'un fichier de fréquences
de la forme : LETTRE FREQUENCE

*/
char random_letter(char *filename) {
  FILE *f = fopen(filename, "r");
  if (f == NULL) {
    fprintf(stderr, "Error: cannot open file %s", filename);
    exit(1);
  }
  int total_freq = 0;
  char c;
  int freq;
  // on calcule la fréquence totale des lettres
  while (fscanf(f, "%c %d", &c, &freq) != EOF) {
    total_freq += freq;
  }
  fclose(f);

  f = fopen(filename, "r");
  // pour chaque lettre, on tire un nombre aléatoire entre 1 et la fréquence totale
  int random;
  while (fscanf(f, "%c %d", &c, &freq) != EOF) {
    random = rand() % total_freq + 1;

    // si le nombre aléatoire est inférieur à la fréquence de la lettre, on la renvoie
    if (random <= freq) {
      fclose(f);
      // affiche la lettre tirée
      printf("LETTRE : %c\n", c);
      return c;

    }
    // affiche la lettre actuekke avec sa fréquence et le nombre aléatoire
    printf("LETTRE : %c FREQUENCE : %d RANDOM : %d\n", c, freq, random);
    // sinon on décrémente la fréquence totale
    total_freq -= freq;
    
  }
 
  
  fclose(f);
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
  char grid[100];
  // on remplit le tableau de caractères avec des lettres aléatoire
  for (int i = 0; i < height * width; i++) {
    grid[i] = random_letter(filename);
  }
  // on ajoute le tableau de caractères à la structure de grid
  g.grid = grid;
  // on affiche la grille
  print_grid(g);
  // on vide le


  return 0;


}



