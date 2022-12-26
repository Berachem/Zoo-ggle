#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "../headers/grid.h"






/*
 main qui lit les arguments et appelle la fonction grid_path : un mot, une hauteur, une largeur, une succession de caractères (grille)
### exemple 1 :

$ grid_path OUI 4 4 G A I R R U V E Q E O T A S M J
10 5 2 
[valeur de sortie = 0]

G A I R 
R U V E 
Q E O T 
A S M J

### exemple 2 :
$ grid_path EY 4 4 A L M L O P M I Y U O E R E T Y
11 15
[valeur de sortie = 0]
EY 4 4 
A L M L 
O P M I 
Y U O E 
R E T Y

*/


// fonction qui parcoure pour chaque case de la grille
// en affichant le chemin emprunté (liste des indices des cases utilisées, séparés par des espaces)
// renvoie 0 si le mot est présent, 1 sinon
// en ne s'arrêtant pas à la première occurrence du mot





int main(int argc, char *argv[]) {
  if (argc < 5) {
    printf("Usage: %s word height width grid", argv[0]);
    return 1;
  }
    char *word = argv[1];
    int height = atoi(argv[2]);
    int width = atoi(argv[3]);

    
    // on récupère tous les caractères de la grille dans une string
    char* gridList = malloc(height * width * sizeof(char));
    
    int i;
    for (i = 4; i < argc; i++) {
      strcpy(gridList + (i - 4) * sizeof(char), argv[i]);
    }

    // affiche toutes les variables
    printf("word: %s\n", word);
    printf("height: %d\n", height);
    printf("width: %d\n", width);
    //printf("grid: %s\n", gridList);
    
    // on construit la grille g
    grid g;
    g.nbl = height;
    g.nbc = width;
    g.gridList = gridList;

    printf("grid: \n");
    print_grid2D(g);
/* 
    // test de la fonction grid_path_rec

    int *visited = malloc(g.nbl * g.nbc * sizeof(int));
    memset(visited, 0, g.nbl * g.nbc * sizeof(int));
    int res = grid_path_rec(word, 0, 0, g, visited);
    printf("res = %d \n", res); 
    */

    // on crée une liste des cases parcourues pour former le mot (taille du mot  = nb cases max)
    int *casesIndicesMot = malloc(strlen(word) * sizeof(int));
    memset(casesIndicesMot, -1, strlen(word) * sizeof(int));

   /*  printf("casesIndicesMot: \n");
    for (i = 0; i < strlen(word); i++) {
      printf("%d ", casesIndicesMot[i]);
    }
    printf("\n"); */

    int result = grid_path(word,g, casesIndicesMot,1);
    printf("\nRESULT : %d\n", result);

    // on affiche la liste des cases parcourues pour former le mot dans le sens inverse
    int k = g.nbl * g.nbc - 1;
    while (k >= 0) {
      if (casesIndicesMot[k]>=0){
        printf("%d ", casesIndicesMot[k]);
      }
      
      k--;
    }

    // on libère la mémoire
    free(gridList);
    free(casesIndicesMot);


    return result;

}



    