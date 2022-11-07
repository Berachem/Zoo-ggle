#include "grid.h"

// fonction qui convertit des coordonnées 2D en 1D dans une gri
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
  int *neighbors_list = malloc(8 * sizeof(int));
  int k = 0;
  int l;
  for (l = i - 1; l <= i + 1; l++) {
    int m;
    for (m = j - 1; m <= j + 1; m++) {
      if (l >= 0 && l < g.nbl && m >= 0 && m < g.nbc && (l != i || m != j)) {
        neighbors_list[k] = coord2D_to_1D(l, m, g);
        k++;
      }
    }
  }
  return neighbors_list;
}

