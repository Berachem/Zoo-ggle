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
int grid_path_rec(char *word, int i, int j, grid g, int *visited, int *casesLettreDuMot, int *indiceParcoursCasesLettreDuMot) {
  int flagAlreadyFound = 0;

  int k = coord2D_to_1D(i, j, g);
  if (visited[k] == 1) {
    // si la case a déjà été visitée
    printf("visited[%d] = %d (lettre g.gridList[%d] = %c) \n", k, visited[k], k, g.gridList[k]);
    return 1;
  }
  if (g.gridList[k] != word[0]) {
    // si la lettre de la case n'est pas la première lettre du mot
    printf("g.gridList[%d] = %c != word[0] = %c\n", k, g.gridList[k], word[0]);
    return 1;
  }
  printf("g.gridList[%d] = %c == word[0] = %c (1 lettre trouvee) \n", k, g.gridList[k], word[0]);
  if (strlen(word) == 1) {
    // si le mot ne contient qu'une seule lettre (donc c'est la dernière lettre du mot)
    casesLettreDuMot[*indiceParcoursCasesLettreDuMot] = k;
    *indiceParcoursCasesLettreDuMot += 1;
    //printf("%d ", k);
    return 0;
  }
  printf("====================\n");
  displayGridIn2DWithHighlightInRed(g, i, j);
  printf("====================\n");

  // on marque la case comme visitée
  visited[k] = 1;
  // on récupère la liste des voisins de la case
  int *neighbors_list = neighbors(i, j, g);

  // affiche la liste des voisins et leurs valeurs
  int p=0;
  for (p=0; p<8; p++) {
    printf("VOISIN -> (lettre g.gridList[%d] = %c) \n", neighbors_list[p], g.gridList[neighbors_list[p]]);
  }
  
  

  // on parcourt la liste des voisins
 int  l = 0;
  while (neighbors_list[l] >=0 && is_in_list(neighbors_list, neighbors_list[l])==1) {  // tant qu'on n'est pas arrivé à la fin de la liste
    // on récupère les coordonnées du voisin
    int *visited_copy = malloc(g.nbl * g.nbc * sizeof(int));
    memcpy(visited_copy, visited, g.nbl * g.nbc * sizeof(int));
    int i_copy, j_copy;
    coord1D_to_2D(neighbors_list[l], g, &i_copy, &j_copy);

    // affichage de la grille avec la case en surbrillance
    displayGridIn2DWithHighlightInGreen(g, i_copy, j_copy);
    

    // on appelle la fonction récursive sur tous les voisins sans s'arrêter à la première lettre trouvée
    flagAlreadyFound = grid_path_rec(word+1, i_copy, j_copy, g, visited_copy,casesLettreDuMot, indiceParcoursCasesLettreDuMot);
    if (flagAlreadyFound == 0) {
      // si la lettre a été trouvée, on affiche la case
    casesLettreDuMot[*indiceParcoursCasesLettreDuMot] = k;
    *indiceParcoursCasesLettreDuMot += 1;
      //printf("%d ", k);
      return 0;
    }
    l++;

    
  

  }
  free(neighbors_list);
  return 1;

}

// fonction principale qui renvoie -1 si le mot n'est pas présent, 0 et la liste des indices des cases utilisées sinon
int grid_path(char *word, grid g, int *casesLettreDuMot) {
  int k = 0;
  int indiceParcoursCasesLettreDuMot = 0;

  int *visited = malloc(g.nbl * g.nbc * sizeof(int));
  // on initialise le tableau visited à 0
  memset(visited, 0, g.nbl * g.nbc * sizeof(int));
  int i, j; 
  for (i = 0; i < g.nbl; i++) {
      for (j = 0; j < g.nbc; j++) {
        
        if (word[0]==g.gridList[coord2D_to_1D(i,j,g)] && grid_path_rec(word, i, j, g, visited, casesLettreDuMot, &indiceParcoursCasesLettreDuMot) == 0) {  

            printf("on a trouve le mot %s depuis la case (%d, %d) OU en 1D : %d\n", word, i, j, coord2D_to_1D(i,j,g));
      
            // si la première lettre du mot est trouvée, on l'ajoute à la liste des cases 
            
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




