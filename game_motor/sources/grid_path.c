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

  // check if there is enough arguments
  if (argc < 5) {
    printf("Usage: %s word height width grid (check if there is enough arguments)", argv[0]);
    exit(ERROR_PARAM_NUMBER);
  }
  // check if the word is a string
  if (atoi(argv[1]) != 0) {
    printf("Usage: %s word height width grid (check if the word is a string)", argv[0]);
    exit(ERROR_PARAM_TYPE);
  }
  // check if the height and width are integers
  if (atoi(argv[2]) == 0 || atoi(argv[3]) == 0) {
    printf("Usage: %s word height width grid (check if the height and width are integers)", argv[0]);
    exit(ERROR_PARAM_TYPE);
  }
  // check if height * width == grid length
  if (atoi(argv[2]) * atoi(argv[3]) != argc - 4) {
    printf("Usage: %s word height width grid (check if height * width == grid length)", argv[0]);
    exit(ERROR_GRID_ARGUMENTS);
  }

    char *word = remplaceQU(argv[1]);
  

    int height = atoi(argv[2]);
    int width = atoi(argv[3]);

    // on récupère tous les caractères de la grille dans une string
    char* gridList = malloc(height * width * sizeof(char));

    int i;
    for (i = 4; i < argc; i++) {
       // replace QU by $ in the grid
        if (argv[i][0] == 'Q' && argv[i][1] == 'U') {
            gridList[i-4] = '*';
        } else {
            gridList[i-4] = argv[i][0];
        }
    }

    
    // on construit la grille g
    grid g = createGrid(height, width, gridList);

     //printf("grid: \n");
     //print_grid2D(g);

    // on crée une liste des cases parcourues pour former le mot (taille du mot  = nb cases max)
    int *casesIndicesMot = malloc(strlen(word) * sizeof(int));
    memset(casesIndicesMot, -1, strlen(word) * sizeof(int));

    int result = grid_path(word,g, casesIndicesMot,0);  //grid_path(word,g, casesIndicesMot,1) pour débugger ! 
    // printf("\nRESULT : %d\n", result);

    // on affiche la liste des cases parcourues pour former le mot dans le sens inverse
    int k = strlen(word) - 1;
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



    