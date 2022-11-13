#include <stdio.h>
#include <stdlib.h>
#include "../headers/grid.h"





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


