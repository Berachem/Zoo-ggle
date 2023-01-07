#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dictionnary.h"
#include "../headers/grid.h"

/*
$ solve dico.lex 3 4 4 G A I R R U V E QU E O T A S M JOUI VIE VIRE ...

Renvoie tous les mots valides de la grille présents dans le dictionnaire (dico.lex) séparés par des espaces, avec unetaille minimum (3).
*/

// Fonction utilisee dans solve, pour mettre à jour le mot recherchee dans la grille
void effaceMot(char* word, int beggining, int end){
  for(int i = beggining; i<end; i++){
    word[i]='\0';
  }
}

// Fonction qui renvoie l'entierete des mots valides present dans la grille
// filename = nom du fichier .lex (format StaticTree) contenant les mots valides
// minLength = longueur minimum des mots recherches,  g = grille dans laquelle on cherche
// index = indice de la case du StaticTree a regarder, currentWord : Mot dont on cherche la presence dans la grille
// letterIndex = indice de la lettre a modifiee dans currentWord, casesIndicesMot : parametre necessaire a grid_path
void solve_rec(char* filename, int minLenght, grid g, int index, char* currentWord, int* letterIndex, int* casesIndicesMot){
  
    ArrayCell cell = readCellInFile(filename, index);
    memset(casesIndicesMot, -1, g.nbl * g.nbc * sizeof(int));
    currentWord[*letterIndex] = cell.elem;                    // On modifie la lettre à la position letterIndex du mot actuel pour préparer le mot
    effaceMot(currentWord,(*letterIndex)+1,(g.nbc)*(g.nbl));  // a cherche dans la grille, et on efface les lettres suivantes pour ne pas garder
                                                              // les lettres ecrites precedemment dans le cas ou on est descendu plus bas pour d'autres mots

    if (cell.elem == '\0' && strlen(currentWord)>=minLenght){
      printf("%s ",currentWord);                              // Si on arrive a la fin du mot dans le StaticTree et que la longueur est suffisante on renvoie le mot
    }

    if((grid_path(currentWord, g, casesIndicesMot,0)==0) && (cell.firstChild!=-1)){  //Si le mot actuel est valide, et préfixe d'autres mot (son noeud a des enfants)
      *letterIndex +=1;                                                              //on continue pour a chercher pour les "enfants" de ce mot
      solve_rec(filename, minLenght,g,cell.firstChild,currentWord,letterIndex,casesIndicesMot);
      *letterIndex-=1;
    }
    currentWord[(*letterIndex)+1]='\0';
    if(cell.nSiblings!=0){                                                                //Si le mot actuel avec la denrire lettre inseree n'est pas valide
      solve_rec(filename, minLenght,g,index+1,currentWord,letterIndex,casesIndicesMot);   // on regarde pour les freres de ces lettres, si elle en a 
      currentWord[(*letterIndex)+1]='\0';
    }
}

// Fonction qui renvoie l'entierete des mots valides present dans la grille, en faisant appel a solve_rec
void solve(char* filename, int minLenght, grid g){
  // Allocation en memoire des parametres necessaire a solve_rec
  int* letterIndex = malloc(sizeof(int));
  *letterIndex = 0;
  char* currentWord = malloc((g.nbc*g.nbl+1)*sizeof(char));
  int *casesIndicesMot = malloc(g.nbl * g.nbc * sizeof(int));
  
  memset(casesIndicesMot, -1, g.nbl * g.nbc * sizeof(int));
  
  solve_rec(filename, minLenght, g, 0 ,currentWord, letterIndex, casesIndicesMot);
  // Liberation des espaces alloues pour solve_rec
  free(casesIndicesMot);
  free(letterIndex);
  free(currentWord);
}


void main(int argc, char *argv[]){
  if (argc < 5) {
    printf("Usage: %s filename minLength height width grid", argv[0]);
    exit(ERROR_PARAM_NUMBER);
  }

  if (strstr(argv[1], ".lex") == NULL) {
    printf("Usage: %s filename minLength height width grid (check if filename is .lex file)\n", argv[0]);
    exit(ERROR_FILE_TYPE);
  }
  // check if minLength, height and width are integers
  if (atoi(argv[2]) == 0 || atoi(argv[3]) == 0 || atoi(argv[4]) == 0) {
    printf("Usage: %s filename minLength height width grid (check if minLength,height and width are integers)", argv[0]);
    exit(ERROR_PARAM_TYPE);
  }
  // check if height * width == grid length
  if (atoi(argv[3]) * atoi(argv[4]) != argc - 5) {
    printf("Usage: %s filename minLength height width grid (check if height * width == grid length)", argv[0]);
    exit(ERROR_GRID_ARGUMENTS);
  }
  // check if height * width >= minLength
  if (atoi(argv[3]) * atoi(argv[4]) < atoi(argv[2])) {
    printf("Usage: %s filename minLength height width grid (check if height * width > minLength)", argv[0]);
    exit(ERROR_GRID_WORD);
  }
    int minLength = atoi(argv[2]);
    int height = atoi(argv[3]);
    int width = atoi(argv[4]);

    
    // on récupère tous les caractères de la grille dans une string
    char* gridList = malloc(height * width * sizeof(char));
    
    int i;
    for (i = 4; i < argc; i++) {
      strcpy(gridList + (i - 4) * sizeof(char), argv[i]);
    }
    // on construit la grille g pour solve
    grid g;
    g.nbl = height;
    g.nbc = width;
    g.gridList = gridList;
    solve(argv[1], minLength, g);
}