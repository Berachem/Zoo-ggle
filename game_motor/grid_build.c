#include <stdio.h>
#include <string.h>
#include <stdlib.h>

/*

$ grid_build frequences.txt 4 4
G A I R R U V E QU E O T A S M J

Crée et affiche une grille aléatoire de dimensions données (4 lignes, 4
colonnes) à partir d’un fichier de fréquences (frequences.txt). La grille est
lue ligne par ligne, les cases sont séparées par des espaces.

*/



void randomLetter() {
  	FILE* f;
    char str[50];
    f = fopen("frequences.txt", "a+");

    if (NULL == f) {
        printf("file can't be opened \n");
    }
 
    printf("content of this file are \n");

	int currentFreq = 0;
    while (fgets(str, 50, f) != NULL) {
        
		 currentFreq = atoi(str);
		 printf("%s\n", str);
		 printf("%i\n", currentFreq);
    }

	int sommeFrequences = 0;
	
 
    fclose(f);
   
}

int main(int argc, char *argv[]) {
	randomLetter();
	return 0;
  int ligne;
  int column;
  int size;

  // par défaut
  ligne = 4;
  column = 4;
  size = ligne * column;

  char *grid1D = malloc(size * sizeof(char));
  char grid[] = {'A','Z','B','A','C'};

  int i;
  for (i = 0; i < size; i++) {
    printf("%c\n", grid[i]);
  }
}
