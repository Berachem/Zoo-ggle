#include <stdio.h>
#include <string.h>
#include <stdlib.h>
#include "../headers/grid.h"
#include "../headers/grid_path.h"

#define NELEMS(x)  (sizeof(x) / sizeof((x)[0]))



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
    displayGridIn2D(g);
/* 
    // test de la fonction grid_path_rec

    int *visited = malloc(g.nbl * g.nbc * sizeof(int));
    memset(visited, 0, g.nbl * g.nbc * sizeof(int));
    int res = grid_path_rec(word, 0, 0, g, visited);
    printf("res = %d \n", res); 
    */

    // on crée une liste des cases parcourues pour former le mot (16 cases max)
    int *casesIndicesMot = malloc(g.nbl * g.nbc * sizeof(int));
    memset(casesIndicesMot, -1, g.nbl * g.nbc * sizeof(int));

    int result = grid_path(word,g, casesIndicesMot);
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



    