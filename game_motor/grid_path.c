#include "grid_build.c"


/*
grid_path

$ grid_path OUI 4 4 G A I R R U V E QU E O T A S M J
10 5 2
[valeur de sortie = 0]

Teste si un mot donné est présent dans la grille, renvoie 0 si le mot est
présent, 1 sinon. 
-> Si le mot est présent, on affiche le chemin emprunté (liste des indices des cases utilisées, séparés
par des espaces).
-> Aucune sortie si le mot est absent, par exemple:

$ grid_path TOIT 4 4 G A I R R U V E QU E O T A S M J
[valeur de sortie = 1]

*/



/*
renvoie 0 si le mot est
présent, 1 sinon. Si le mot est présent, on affiche le chemin emprunté (liste des indices des cases utilisées, séparés
par des espaces)
*/
int grid_path_rec(char *word, int i, int j, grid g, int *visited) {
  int k = coord2D_to_1D(i, j, g);
  if (visited[k] == 1) {
    return 1;
  }
  if (g.grid[k] != word[0]) {
    return 1;
  }
  if (strlen(word) == 1) {
    printf("%d ", k);
    return 0;
  }
  visited[k] = 1;
  int *neighbors_list = neighbors(i, j, g);
  int l = 0;
  while (neighbors_list[l] != -1) {
    int *visited_copy = malloc(g.nbl * g.nbc * sizeof(int));
    memcpy(visited_copy, visited, g.nbl * g.nbc * sizeof(int));
    int i_copy, j_copy;
    coord1D_to_2D(neighbors_list[l], g, &i_copy, &j_copy);
    if (grid_path_rec(word + 1, i_copy, j_copy, g, visited_copy) == 0) {
      printf("%d ", k);
      free(visited_copy);
      free(neighbors_list);
      return 0;
    }
    free(visited_copy);
    l++;
  }
  free(neighbors_list);
  return 1;
}

// fonction principale qui appelle grid_path_rec pour chaque case de la grille 
int grid_path(char *word, int nbl, int nbc, char *gridList) {
  grid g;
  g.nbl = nbl;
  g.nbc = nbc;
  g.grid = gridList;
  int *visited = malloc(nbl * nbc * sizeof(int));
  memset(visited, 0, nbl * nbc * sizeof(int));
  int i, j;
  for (i = 0; i < nbl; i++) {
    for (j = 0; j < nbc; j++) {
      if (grid_path_rec(word, i, j, g, visited) == 0) {
        printf("");
        free(visited);
        return 0;
        }
    }
    }
    free(visited);
    return 1;
}


// main qui lit les arguments et appelle la fonction grid_path : un mot, une hauteur, une largeur, une succession de caractères (grille)
//$ grid_path OUI 4 4 G A I R R U V E QU E O T A S M J
//10 5 2
//[valeur de sortie = 0]

int main(int argc, char *argv[]) {
  if (argc < 5) {
    printf("Usage: %s word height width grid", argv[0]);
    return 1;
    }
    char *word = argv[1];
    int height = atoi(argv[2]);
    int width = atoi(argv[3]);
    
    // on construit récupère tous les caractères de la grille dans une string
    char* gridList = malloc((height * width) * sizeof(char));

    // on récupère tous les caractères de la grille dans une string
    int j;
    for (j = 0; j < height * width; j++) {
      gridList[j] = argv[4][j]; // FIXME Berachem : Il faut bien arriver à récupérer les caractères de la grille
    }

    // affiche toutes les variables
    printf("word: %s\n", word);
    printf("height: %d\n", height);
    printf("width: %d\n", width);
    printf("grid: %s\n", gridList);


    int result = grid_path(word, height, width, gridList);
    printf("\nRESULT : %d", result);

    // on libère la mémoire
    free(gridList);


    return result;

}



    


