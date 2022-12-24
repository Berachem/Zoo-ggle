#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include <time.h>

#include "../headers/grid.h"

#define NELEMS(x)  (sizeof(x) / sizeof((x)[0]))



// fonction qui convertit des coordonnées 2D en 1D dans une gri
int coord2D_to_1D(int i, int j, grid g) {
  return i * g.nbc + j;
}

// fonction qui convertit des coordonnées 1D en 2D dans une grid
void coord1D_to_2D(int k, grid g, int *i, int *j) {
  *i = k / g.nbc;
  *j = k % g.nbc;
}

// fonction qui affiche une grille à une dimension en 2D
void displayGridIn2D(grid g) {
  int i;
  for (i = 0; i < g.nbl; i++) {
    int j;
    for (j = 0; j < g.nbc; j++) {
      printf("%c ", g.gridList[coord2D_to_1D(i, j, g)]);
    }
    printf("\n");
  }
}

// affiche une grille à une dimension en 2D avec une case en surbrillance
void displayGridIn2DWithHighlightInRed(grid g, int i, int j) {
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

void displayGridIn2DWithHighlightInGreen(grid g, int i, int j){
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
int *neighbors(int i, int j, grid g) {
  int *neighborsList = malloc(8 * sizeof(int));
  // initialisation de la liste des voisins à -1
  int p;
  for (p = 0; p < 8; p++) {
    neighborsList[p] = -1;
  }

  int k = 0;
  int l;
  for (l = i - 1; l <= i + 1; l++) {
    int m;
    for (m = j - 1; m <= j + 1; m++) {
      if (l >= 0 && l < g.nbl && m >= 0 && m < g.nbc && !(l == i && m == j)) {
        neighborsList[k] = coord2D_to_1D(l, m, g);
        k++;
      }
    }
  }
  return neighborsList;

  

}

// fonction qui renvoie une grid à partir d'une longueur, d'une largeur et d'une liste de caractères
grid createGrid(int nbl, int nbc, char *gridList) {
  grid g;
  g.nbl = nbl;
  g.nbc = nbc;
  g.gridList = gridList;
  return g;
}



// Structure pour stocker une lettre et sa fréquence
typedef struct {
    char letter;
    int frequency;
} Letter;

// Fonction pour lire les fréquences depuis le fichier
// letters : tableau de lettres à remplir
// filename : nom du fichier à lire
void readFrequencies(Letter* letters, const char* filename) {
    // Ouvre le fichier en lecture
    FILE* file = fopen(filename, "r");
    if (file == NULL) {
        perror("Error opening file");
        exit(EXIT_FAILURE);
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
    // Génère un nombre aléatoire entre 0 et le total des fréquences
    int randInt = rand() % total;

    // Parcourt le tableau de lettres et soustrait la fréquence de chaque lettre au nombre aléatoire
    // Si le nombre aléatoire est inférieur à 0, on renvoie la lettre
    int i;
    for (i = 0; i < size; i++) {
        randInt -= letters[i].frequency;
        if (randInt < 0) {
            return letters[i].letter;
        }
    }

    // Si on arrive ici, c'est qu'il y a eu un problème
    printf("Error generating random letter");
}


// fonction qui affiche une grille à une dimension
void print_grid(grid g) {
  for (int i = 0; i < g.nbl; i++) {
    for (int j = 0; j < g.nbc; j++) {
      printf("%c ", g.gridList[coord2D_to_1D(i, j,g)]);
    }
  }
}

// fonction qui affiche une grille à deux dimensions
void print_grid2D(grid g) {
  for (int i = 0; i < g.nbl; i++) {
    for (int j = 0; j < g.nbc; j++) {
      printf("%c ", g.gridList[coord2D_to_1D(i, j, g)]);
    }
    printf("\n");
  }
}

grid grid_build(char *filename, int nbl, int nbc) {
  Letter letters[27];
  // on lit les fréquences des lettres dans le fichier
  readFrequencies(letters, filename);
  // on calcule le total des fréquences
  int total = 0;
  for (int i = 0; i < 27; i++) {
    total += letters[i].frequency;
  }
  
  grid g;
  g.nbl = nbl;
  g.nbc = nbc;
  g.gridList = malloc(nbl * nbc * sizeof(char));
  // on remplit le tableau de caractères avec des lettres aléatoire
  for (int i = 0; i < nbl; i++) {
    for (int j = 0; j < nbc; j++) {
      // utilise la fonction generateRandomLetter 
      g.gridList[coord2D_to_1D(i, j, g)] = generateRandomLetter(letters, 27, total);
      
    }
  }
  return g;
}


// renvoie 1 si le chiffre est présent dans la liste, 0 sinon
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


/*
renvoie 0 si le mot est
présent, 1 sinon. Si le mot est présent, on affiche le chemin emprunté (liste des indices des cases utilisées, séparés
par des espaces)
*/
int grid_path_rec(char *word, int i, int j, grid g, int *visited, int *casesLettreDuMot, int *indiceParcoursCasesLettreDuMot, int showLogs) {
  int flagAlreadyFound = 0;

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
  if (showLogs) printf("g.gridList[%d] = %c == word[0] = %c (1 lettre trouvee) \n", k, g.gridList[k], word[0]);
  if (strlen(word) == 1) {
    // si le mot ne contient qu'une seule lettre (donc c'est la dernière lettre du mot)
    casesLettreDuMot[*indiceParcoursCasesLettreDuMot] = k;
    *indiceParcoursCasesLettreDuMot += 1;
    //printf("%d ", k);
    return 0;
  }
  if (showLogs)printf("====================\n");
  if (showLogs) displayGridIn2DWithHighlightInRed(g, i, j);
  if (showLogs)printf("====================\n");

  // on marque la case comme visitée
  visited[k] = 1;
  // on récupère la liste des voisins de la case
  int *neighbors_list = neighbors(i, j, g);

  // affiche la liste des voisins et leurs valeurs
  int p=0;
  for (p=0; p<8; p++) {
    if (showLogs) printf("VOISIN -> (lettre g.gridList[%d] = %c) \n", neighbors_list[p], g.gridList[neighbors_list[p]]);
  }
  
  

  // on parcourt la liste des voisins
 int  l = 0;
  while (neighbors_list[l] >=0 ) {  // tant qu'on n'est pas arrivé à la fin de la liste
    // on récupère les coordonnées du voisin
    int *visited_copy = malloc(g.nbl * g.nbc * sizeof(int));
    memcpy(visited_copy, visited, g.nbl * g.nbc * sizeof(int));
    int i_copy, j_copy;
    coord1D_to_2D(neighbors_list[l], g, &i_copy, &j_copy);

    // affichage de la grille avec la case en surbrillance
    if (showLogs) displayGridIn2DWithHighlightInGreen(g, i_copy, j_copy);
    

    // on appelle la fonction récursive sur tous les voisins sans s'arrêter à la première lettre trouvée
    flagAlreadyFound = grid_path_rec(word+1, i_copy, j_copy, g, visited_copy,casesLettreDuMot, indiceParcoursCasesLettreDuMot, showLogs);
    if (flagAlreadyFound == 0) {
      // si la lettre a été trouvée, on affiche la case
    casesLettreDuMot[*indiceParcoursCasesLettreDuMot] = k;
    *indiceParcoursCasesLettreDuMot += 1;
      //printf("%d ", k);
      free(visited_copy);
      return 0;
    }
    free(visited_copy);
    l++;

  }
  free(neighbors_list);
  return 1;

}

// fonction principale qui renvoie -1 si le mot n'est pas présent, 0 et la liste des indices des cases utilisées sinon
int grid_path(char *word, grid g, int *casesLettreDuMot, int showLogs) {
  int k = 0;
  int indiceParcoursCasesLettreDuMot = 0;

  int *visited = malloc(g.nbl * g.nbc * sizeof(int));
  // on initialise le tableau visited à 0
  memset(visited, 0, g.nbl * g.nbc * sizeof(int));
  int i, j; 
  for (i = 0; i < g.nbl; i++) {
      for (j = 0; j < g.nbc; j++) {
        
        if (word[0]==g.gridList[coord2D_to_1D(i,j,g)] && grid_path_rec(word, i, j, g, visited, casesLettreDuMot, &indiceParcoursCasesLettreDuMot, showLogs) == 0) {  

            if (showLogs) printf("on a trouve le mot %s depuis la case (%d, %d) OU en 1D : %d\n", word, i, j, coord2D_to_1D(i,j,g));
      
    
            free(visited);
            return 0;
          } 
          else{
            memset(visited, 0, g.nbl * g.nbc * sizeof(int));
          } 
      }
    }
  
  free(visited);
  return 1;
}



