#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#include "../headers/grid.h"

#define NELEMS(x)  (sizeof(x) / sizeof((x)[0]))


// fonction qui convertit des coordonnées 2D en 1D dans une grid
// i = ligne, j = colonne
int coord2D_to_1D(int i, int j, grid g) {
  return i * g.nbc + j;
}

// fonction qui convertit des coordonnées 1D en 2D dans une grid
// k = indice, i = ligne, j = colonne
// on suppose que k est compris entre 0 et nbl*nbc
void coord1D_to_2D(int k, grid g, int *i, int *j) {
  *i = k / g.nbc;
  *j = k % g.nbc;
}


// affiche une grille à une dimension en 2D avec une case en surbrillance ROUGE
void print_grid2DWithHighlightInRed(grid g, int i, int j) {
  int k;
  for (k = 0; k < g.nbl; k++) {
    int l;
    for (l = 0; l < g.nbc; l++) {
      if (k == i && l == j) {
        printf("\033[0;31m%c\033[0m ", g.gridList[coord2D_to_1D(k, l, g)]);
      } else {
        printf("%c ", g.gridList[coord2D_to_1D(k, l, g)]);
      }
    }
    printf("\n");
  }
}
// affiche une grille à une dimension en 2D avec une case en surbrillance VERT
void print_grid2DWithHighlightInGreen(grid g, int i, int j){
  int k;
  for (k = 0; k < g.nbl; k++) {
    int l;
    for (l = 0; l < g.nbc; l++) {
      if (k == i && l == j) {
        printf("\033[0;32m%c\033[0m ", g.gridList[coord2D_to_1D(k, l, g)]);
      } else {
        printf("%c ", g.gridList[coord2D_to_1D(k, l, g)]);
      }
    }
    printf("\n");
  }
}

// fonction qui renvoie la liste des voisins d’une case dans le sens des aiguilles d’une montre 
// (en partant du voisin en haut à gauche)
// i = ligne, j = colonne
// neighbors = tableau de taille 8
// renvoie le nombre de voisins
int getNeighbors(int i, int j,grid g, int* neighbors) {
  int k = 0;
  int l;
  for (l = i-1; l <= i+1; l++) {
    int m;
    for (m = j-1; m <= j+1; m++) {
      if (l >= 0 && l < g.nbl && m >= 0 && m < g.nbc && !(l == i && m == j)) {
        neighbors[k] = coord2D_to_1D(l, m, g);
        k++;
      }
    }
  }
  return k;
}

// fonction qui renvoie une grid à partir d'une longueur, d'une largeur et d'une liste de caractères
// nbl = nombre de lignes, nbc = nombre de colonnes, gridList = liste de caractères

grid createGrid(int nbl, int nbc, char *gridList) {
  grid g;
  g.nbl = nbl;
  g.nbc = nbc;
  g.gridList = gridList;
  return g;
}



// Structure pour stocker une lettre et sa fréquence
// letter : lettre
// frequency : fréquence de la lettre
typedef struct {
    char letter;
    int frequency;
} Letter;

// Fonction pour lire les fréquences depuis le fichier : 
// elle lit chaque ligne du fichier et stocke la lettre et la fréquence dans le tableau de lettres
// letters : tableau de lettres à remplir
// filename : nom du fichier à lire
void readFrequencies(Letter* letters, const char* filename) {

    // Ouvre le fichier en lecture
    FILE* file = fopen(filename, "r");
    if (file == NULL) {
        perror("Error opening file");
        exit(ERROR_OPENING_FILE);
    }

    // Lit chaque ligne du fichier et stocke la lettre et la fréquence dans le tableau de lettres
    char line[256];
    int i = 0;
    while (fgets(line, sizeof(line), file)) {
        sscanf(line, "%c %d", &letters[i].letter, &letters[i].frequency);
        i++;
    }

    // Ferme le fichier
    fclose(file);
}


// Fonction pour générer une lettre aléatoire en fonction de ses fréquences
// letters : tableau de lettres et de fréquences
// size : nombre de lettres dans le tableau
// total : total des fréquences
char generateRandomLetter(Letter* letters, int size, int total) {


    // Parcourt le tableau de lettres et soustrait la fréquence de chaque lettre au nombre aléatoire
    // Si le nombre aléatoire est inférieur à 0, on renvoie la lettre
    int totalFreq = total;
    int i;
    int randInt;
    
    for (i = 0; i < size; i++) {
        // Génère un nombre aléatoire entre 0 et le total des fréquences
        randInt = rand() % totalFreq;
         //printf("\ntotal : %i lettre : %c freq : %d random : %i pcent de chance : %.1f -> écart de : %i",totalFreq, letters[i].letter, letters[i].frequency, randInt, ((float)  letters[i].frequency/total)*100, randInt - letters[i].frequency); 
        if (randInt < letters[i].frequency) {
            return letters[i].letter;
        }
        totalFreq -= letters[i].frequency;
    }
    //printf("random : %i\n", randInt);

    // Si on arrive ici c'est qu'il y a eu un problème
    return ' ';
}


// fonction qui affiche une grille à une dimension
// g : grille
void print_grid(grid g) {
  for (int i = 0; i < g.nbl; i++) {
    for (int j = 0; j < g.nbc; j++) {
      printf("%c ", g.gridList[coord2D_to_1D(i, j,g)]);
    }
  }
}

// fonction qui affiche une grille à deux dimensions
// g : grille
void print_grid2D(grid g) {
  for (int i = 0; i < g.nbl; i++) {
    for (int j = 0; j < g.nbc; j++) {
      printf("%c ", g.gridList[coord2D_to_1D(i, j, g)]);
    }
    printf("\n");
  }
}

// fonction qui mélange les lettres du tableau
// letters : tableau de lettres
// size : taille du tableau
void shuffleLettersList(Letter* letters, int size) {
  int i;
  for (i = 0; i < size; i++) {
    int j = rand() % size;
    Letter temp = letters[i];
    letters[i] = letters[j];
    letters[j] = temp;
  }
}

// fonction qui construit une grille aléatoire de taille nbl x nbc
// filename : nom du fichier contenant les fréquences des lettres
// nbl : nombre de lignes
// nbc : nombre de colonnes
grid grid_build(char *filename, int nbl, int nbc) {
 
  Letter letters[TAILLE_ALPHABET];
  // on lit les fréquences des lettres dans le fichier
  readFrequencies(letters, filename);
  // on calcule le total des fréquences
  int total = 0;
  for (int i = 0; i < TAILLE_ALPHABET; i++) {
    total += letters[i].frequency;
  }

  // on mélange les lettres pour avoir un ordre aléatoire
  shuffleLettersList(letters, TAILLE_ALPHABET);
  
  grid g;
  g.nbl = nbl;
  g.nbc = nbc;
  g.gridList = malloc(nbl * nbc * sizeof(char));
  // on remplit le tableau de caractères avec des lettres aléatoire
  for (int i = 0; i < nbl; i++) {
    for (int j = 0; j < nbc; j++) {
      // utilise la fonction generateRandomLetter 
      g.gridList[coord2D_to_1D(i, j, g)] = generateRandomLetter(letters, TAILLE_ALPHABET, total);
      
    }
  }
  return g;
}


// fonction qui renvoie 1 si le mot est présent dans la grille, 0 sinon
// number : nombre à chercher
// list : tableau d'entiers
int is_in_list(int *list, int number) {
  int i = 0;
  while (list[i] >= 0) {
    if (list[i] == number) {
      return 1;
    }
    i++;
  }
  return 0;
}


// fonction récursive qui renvoie 1 si le mot est présent dans la grille, 0 sinon
// word : mot à chercher
// g : grille
// showLogs : affiche les logs si 1
// return : 1 si le mot est présent, 0 sinon
int grid_path_rec(char *word, int i, int j, grid g, int *visited, int *casesLettreDuMot, int *indiceParcoursCasesLettreDuMot, int showLogs) {
  int k = coord2D_to_1D(i, j, g);

  if (visited[k] == 1) {
    // si la case a déjà été visitée
    if (showLogs) printf("visited[%d] = %d (lettre g.gridList[%d] = %c) \n", k, visited[k], k, g.gridList[k]);
    return 1;
  }
  if (g.gridList[k] != word[0]) {
    // si la lettre de la case n'est pas la première lettre du mot
    if (showLogs) printf("g.gridList[%d] = %c != word[0] = %c\n", k, g.gridList[k], word[0]);
    return 1;
  }

  if (strlen(word) == 1) {
    // si le mot ne contient qu'une seule lettre (donc c'est la dernière lettre du mot)
    if (showLogs) printf("g.gridList[%d] = %c == word[0] = %c (derniere lettre trouvee) \n", k, g.gridList[k], word[0]);
    //printf("%d ", k);
    casesLettreDuMot[*indiceParcoursCasesLettreDuMot] = k;
    *indiceParcoursCasesLettreDuMot += 1;
    return 0;
  }
  if (showLogs)printf("====================\n");
  if (showLogs) print_grid2DWithHighlightInRed(g, i, j);
  if (showLogs)printf("====================\n");

  // on marque la case comme visitée
  visited[k] = 1;

  // on parcourt les voisins de la case
  int i_offset[] = {-1, -1, -1, 0, 0, 1, 1, 1};
  int j_offset[] = {-1,  0,  1, -1, 1, -1, 0, 1};

  int l;
  for (l = 0; l < 8; l++) {  // on parcourt les 8 voisins possibles
    int i_neighbor = i + i_offset[l];
    int j_neighbor = j + j_offset[l];
    int neighbor1DCoord = coord2D_to_1D(i_neighbor, j_neighbor, g);

    // on vérifie que la case voisine est bien dans la grille
    if (i_neighbor >= 0 && i_neighbor < g.nbl && j_neighbor >= 0 && j_neighbor < g.nbc) {
      if (showLogs) printf("VOISIN -> (lettre g.gridList[%d] = %c) \n", neighbor1DCoord, g.gridList[neighbor1DCoord]);

      // affichage de la grille avec la case en surbrillance
      if (showLogs) print_grid2DWithHighlightInGreen(g, i_neighbor, j_neighbor);

      // on appelle la fonction récursive sur tous les voisins sans s'arrêter à la première lettre trouvée
      if (grid_path_rec(word+1, i_neighbor, j_neighbor, g, visited, casesLettreDuMot, indiceParcoursCasesLettreDuMot, showLogs) == 0) {
        // si le mot est présent, on ajoute la case à la liste des cases utilisées
        casesLettreDuMot[*indiceParcoursCasesLettreDuMot] = k;
        *indiceParcoursCasesLettreDuMot += 1;
        //printf("%d ", k);
        return 0;
      }
    }
  }
  return 1;

}

// fonction principale qui renvoie 1 si le mot est présent dans la grille, 0 sinon
// word : mot à chercher
// g : grille
// showLogs : affiche les logs si 1
// casesLettreDuMot : tableau qui contiendra les cases utilisées pour trouver le mot
// return : 1 si le mot est présent, 0 sinon
int grid_path(char *word, grid g, int *casesLettreDuMot, int showLogs) {
  int indiceParcoursCasesLettreDuMot = 0;

  int *visited = malloc(g.nbl * g.nbc * sizeof(int));
  
  // on initialise le tableau visited à 0
  memset(visited, 0, g.nbl * g.nbc * sizeof(int));

  int i, j; 
  for (i = 0; i < g.nbl; i++) {
      for (j = 0; j < g.nbc; j++) {
        
        if (word[0]==g.gridList[coord2D_to_1D(i,j,g)] ) {  
          if (showLogs) printf("on cherche le mot %s depuis la case (%d, %d) OU en 1D : %d\n", word, i, j, coord2D_to_1D(i,j,g));
            if (grid_path_rec(word, i, j, g, visited, casesLettreDuMot, &indiceParcoursCasesLettreDuMot, showLogs) == 0) {

              if (showLogs) printf("on a trouve le mot %s depuis la case (%d, %d) OU en 1D : %d\n", word, i, j, coord2D_to_1D(i,j,g));

              free(visited);
              return 0;
            }
          } 
          else{
            memset(visited, 0, g.nbl * g.nbc * sizeof(int));
          } 
      }
    }

  free(visited);
  return 1;
}
