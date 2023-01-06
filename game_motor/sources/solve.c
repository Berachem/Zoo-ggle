#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dictionnary.h"
#include "../headers/grid.h"

void effaceMot(char* word, int beggining, int end){
  for(int i = beggining; i<end; i++){
    word[i]='\0';
  }
}

void solve_rec(char* filename, int minLenght, grid g, int index, char* currentWord, int* letterIndex, int* casesIndicesMot){
  
    ArrayCell cell = readCellInFile(filename, index);
    //printf("Je lis la lettre %c dans la cellule %d\t",cell.elem, index);
    
    //printf("Elem : %c Enfant : %d NbFrr : %d \n",cell.elem,cell.firstChild,cell.nSiblings);
    memset(casesIndicesMot, -1, g.nbl * g.nbc * sizeof(int));
    currentWord[*letterIndex] = cell.elem;
    effaceMot(currentWord,(*letterIndex)+1,(g.nbc)*(g.nbl));
    //printf("Le mot actuel est %s \n", currentWord);
    if (cell.elem == '\0' && strlen(currentWord)>=minLenght){
      //allWords = insert(allWords,currentWord);
      printf("%s ",currentWord);
    }

    if((grid_path(currentWord, g, casesIndicesMot,0)==0) && (cell.firstChild!=-1)){
      *letterIndex +=1;
      //printf("%s est prefixe \n",currentWord);
      solve_rec(filename, minLenght,g,cell.firstChild,currentWord,letterIndex,casesIndicesMot);
      *letterIndex-=1;
      //printf("Mot en remontee : %s \n",currentWord);
    }else{
      //printf("%s n'est pas dans la grille \n", currentWord);
    }
    currentWord[(*letterIndex)+1]='\0';
    if(cell.nSiblings!=0){
      //printf("Allons voir le prochain frere de : %s \n",currentWord);
      solve_rec(filename, minLenght,g,index+1,currentWord,letterIndex,casesIndicesMot);
      currentWord[(*letterIndex)+1]='\0';
      //printf("Je reviens de mon frere : %s \n",currentWord);
    }
    //printf("Je lisais la lettre : %c \n",cell.elem);
    
    //currentWord[letterIndex] = cell.elem;
    //effaceMot(currentWord,(*letterIndex)+1,(g.nbc)*(g.nbl));
}


char* solve(char* filename, int minLenght, grid g){
  
  //CSTree allWords = NULL;
  int* letterIndex = malloc(sizeof(int));
  *letterIndex = 0;
  
  char* currentWord = malloc((g.nbc*g.nbl+1)*sizeof(char));
  //printf("TEST1");
  int *casesIndicesMot = malloc(g.nbl * g.nbc * sizeof(int));
  
  memset(casesIndicesMot, -1, g.nbl * g.nbc * sizeof(int));
  
  solve_rec(filename, minLenght, g, 0 ,currentWord, letterIndex, casesIndicesMot);
  
  free(casesIndicesMot);
  free(letterIndex);
  free(currentWord);
  
  return "";
}


int main(int argc, char *argv[]){
  if (argc < 5) {
    printf("Usage: %s height width grid", argv[0]);
    return ERROR_PARAM_NUMBER;
  }
    int minLength = atoi(argv[1]);
    int height = atoi(argv[2]);
    int width = atoi(argv[3]);

    
    // on récupère tous les caractères de la grille dans une string
    char* gridList = malloc(height * width * sizeof(char));
    
    int i;
    for (i = 4; i < argc; i++) {
      strcpy(gridList + (i - 4) * sizeof(char), argv[i]);
    }

    // affiche toutes les variables
    //printf("height: %d\n", height);
    //printf("width: %d\n", width);
    //printf("grid: %s\n", gridList);
    
    // on construit la grille g
    grid g;
    g.nbl = height;
    g.nbc = width;
    g.gridList = gridList;
    printf("%s", solve("../../data/listeMot.lex", minLength, g));
}