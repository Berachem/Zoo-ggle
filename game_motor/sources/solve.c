#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dicoToStaticTree.h"
#include "../headers/dictionnary_build.h"
#include "../headers/dictionnary_lookup.h"
#include "../headers/grid.h"
#include "../headers/grid_path.h"

CSTree solve_rec(char* filename, int minLenght, grid g, CSTree allWords, int index, char* currentWord, int* letterIndex, int* casesIndicesMot){
    ArrayCell cell = readCellInFile(filename, index); 
    memset(casesIndicesMot, -1, g.nbl * g.nbc * sizeof(int));
    currentWord[*letterIndex] = cell.elem;
    currentWord[(*letterIndex)+1]='\0';
    if (cell.elem == '\0' && strlen(currentWord)>=minLenght){
      allWords = insert(allWords,currentWord);
    }

    if((grid_path(currentWord, g, casesIndicesMot)==0) && (cell.firstChild!=-1)){
      *letterIndex +=1;
      allWords = solve_rec(filename, minLenght,g,allWords,cell.firstChild,currentWord,letterIndex,casesIndicesMot);
    }
    if(cell.nSiblings!=0){
      allWords = solve_rec(filename, minLenght,g ,allWords,index+1,currentWord,letterIndex,casesIndicesMot);
    }
    *letterIndex -=1;
    return allWords;
}

char* writeAWord(char* wordsList, int* writtingIndex, char* currentWord){
  int i =0;
  while(currentWord[i]!='\0'){
    wordsList[*writtingIndex]=currentWord[i];
    i++;
    *writtingIndex =*writtingIndex+1;
  }
  wordsList[*writtingIndex]=' ';
  *writtingIndex =*writtingIndex+1;
  return wordsList;
}

char* treeToWordsList(StaticTree st,char* wordsList, int* listWrittingIndex, char* currentWord, int wordWrittingIndex, int tableIndex){
  ArrayCell cell = st.nodeArray[tableIndex];
  currentWord[wordWrittingIndex] = cell.elem;
  if (cell.elem=='\0'){
    wordsList = writeAWord(wordsList, listWrittingIndex,currentWord);
  }
  if(cell.firstChild!=-1){
    wordsList = treeToWordsList(st,wordsList, listWrittingIndex, currentWord, wordWrittingIndex+1, cell.firstChild);
  }
  if(cell.nSiblings!=0){
    wordsList = treeToWordsList(st,wordsList, listWrittingIndex, currentWord, wordWrittingIndex, tableIndex+1);
  }
  currentWord[wordWrittingIndex] = '\0';
  return wordsList;
}


char* solve(char* filename, int minLenght, grid g){
  CSTree allWords = NULL;
  int* letterIndex = malloc(sizeof(int));
  *letterIndex = 0;
  char* currentWord = malloc((g.nbc*g.nbl+1)*sizeof(char));
  int *casesIndicesMot = malloc(g.nbl * g.nbc * sizeof(int));
  memset(casesIndicesMot, -1, g.nbl * g.nbc * sizeof(int));
  allWords = solve_rec(filename, minLenght, g, allWords, 0 ,currentWord, letterIndex, casesIndicesMot);
  
  StaticTree st = exportStaticTree(allWords);
  //printStaticTree(st);
  
  free(casesIndicesMot);
  free(letterIndex);
  free(currentWord);

  // TODO : Utilisé le CS Tree genere pour en ressortir la liste de mot
  
  char* wordsList = malloc(sizeof(char)*(st.nWord*g.nbc*g.nbl));
  memset(wordsList, '\0', sizeof(char)*(st.nWord*g.nbc*g.nbl));
  memset(currentWord, '\0', (g.nbc*g.nbl+1)*sizeof(char));
  int* listWrittingIndex = malloc(sizeof(int));
  *listWrittingIndex = 0;
  wordsList = treeToWordsList(st,wordsList,listWrittingIndex,currentWord,0,0);
  printf("fin %s", wordsList);

  free(allWords);
  free(listWrittingIndex);
  
  return "";
}


int main(int argc, char *argv[]){
  /*
    if (argc < 3){
        printf("Erreur : nombre d'arguments incorrect\n");
        exit(1);
    }*/
    char s[]="";

    int height = 4;
    int width = 4;

    char* gridList = "eauxrbrxxxexxxxx";

    /*
    // affiche toutes les variables
    printf("height: %d\n", height);
    printf("width: %d\n", width);
    printf("grid: %s\n", gridList);
    */
    // on construit la grille g
    grid g;
    g.nbl = height;
    g.nbc = width;
    g.gridList = gridList;
    printf("%s", solve("../../data/dico.lex", 1, g));
}