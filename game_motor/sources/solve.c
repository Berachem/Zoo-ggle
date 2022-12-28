#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dictionnary.h"
#include "../headers/grid.h"

/* ANCIENNE VERSION
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
  printf("TEST1");
  int *casesIndicesMot = malloc(g.nbl * g.nbc * sizeof(int));
  
  memset(casesIndicesMot, -1, g.nbl * g.nbc * sizeof(int));
  
  allWords = solve_rec(filename, minLenght, g, allWords, 0 ,currentWord, letterIndex, casesIndicesMot);
  printf("Fin de grid !");
  StaticTree st = exportStaticTree(allWords);
  printf("Apres static tree");
  //printStaticTree(st);
  
  free(casesIndicesMot);
  free(letterIndex);
  free(currentWord);

  // TODO : Utilisé le CS Tree genere pour en ressortir la liste de mot
  printf("BUG!");
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
}*/
void effaceMot(char* word, int beggining, int end){
  for(int i = beggining; i<end; i++){
    word[i]='\0';
  }
}

void solve_rec(char* filename, int minLenght, grid g, int index, char* currentWord, int* letterIndex, int* casesIndicesMot){
  
    ArrayCell cell = readCellInFile(filename, index);
    printf("Je lis la lettre %c dans la cellule %d\t",cell.elem, index);
    
    //printf("Elem : %c Enfant : %d NbFrr : %d \n",cell.elem,cell.firstChild,cell.nSiblings);
    memset(casesIndicesMot, -1, g.nbl * g.nbc * sizeof(int));
    currentWord[*letterIndex] = cell.elem;
    effaceMot(currentWord,(*letterIndex)+1,(g.nbc)*(g.nbl));
    printf("Le mot actuel est %s \n", currentWord);
    if (cell.elem == '\0' && strlen(currentWord)>=minLenght){
      //allWords = insert(allWords,currentWord);
      printf("%s est valide \n",currentWord);
    }

    if((grid_path(currentWord, g, casesIndicesMot,0)==0) && (cell.firstChild!=-1)){
      *letterIndex +=1;
      printf("%s est prefixe \n",currentWord);
      solve_rec(filename, minLenght,g,cell.firstChild,currentWord,letterIndex,casesIndicesMot);
      *letterIndex-=1;
      //printf("Mot en remontee : %s \n",currentWord);
    }else{
      printf("%s n'est pas dans la grille \n", currentWord);
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
  printf("Fin de grid !");
  //StaticTree st = exportStaticTree(allWords);
  printf("Apres static tree");
  //printStaticTree(st);
  
  free(casesIndicesMot);
  free(letterIndex);
  free(currentWord);
  
  return "";
}


int main(int argc, char *argv[]){
  if (argc < 4) {
    printf("Usage: %s height width grid", argv[0]);
    return 1;
  }
    int height = atoi(argv[1]);
    int width = atoi(argv[2]);

    
    // on récupère tous les caractères de la grille dans une string
    char* gridList = malloc(height * width * sizeof(char));
    
    int i;
    for (i = 3; i < argc; i++) {
      strcpy(gridList + (i - 3) * sizeof(char), argv[i]);
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
    printf("%s", solve("../../data/listeMot.lex", 4, g));
}