#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dicoToStaticTree.h"
#include "../headers/dictionnary_build.h"
#include "../headers/dictionnary_lookup.h"
#include "../headers/grid.h"
#include "../headers/grid_path.h"

char* solve_rec(char* filename, int minLenght, grid g, CSTree allWords, int index, char* currentWord, int* letterIndex){
    ArrayCell cell = readCellInFile(filename, index); 
    //printf("B");
    currentWord[*letterIndex] = cell.elem;
    currentWord[(*letterIndex)+1]='\0';
    //printf("currentWord:%s et allWords : %s",currentWord,allWords);
    //char oldWord []="";
    //strcpy(oldWord,currentWord);
    //char lettre[] = {cell.elem};
    //strcat(currentWord,lettre);
    //printf("1");
    if (cell.elem == '\0' && strlen(currentWord)>=minLenght){
      insert(allWords,currentWord);
    }

    //printf("2");
    if((grid_path(currentWord, g)==0) && (cell.firstChild!=-1)){
      //printf("D");
      *letterIndex +=1;
      solve_rec(filename, minLenght,g,allWords,cell.firstChild,currentWord,letterIndex);
      //allWords=solve_rec(filename, minLenght,g,allWords,cell.firstChild,currentWord);
    }
    
    //printf("3");
    if(cell.nSiblings!=0){
      //printf("E");
      solve_rec(filename, minLenght,g ,allWords,index+1,currentWord,letterIndex);
      //allWords=solve_rec(filename, minLenght,g ,allWords,index+1,oldWord);
    }
    //printf("U");
    *letterIndex -=1;
    //return allWords;
}


/*
int dictionnary_lookup_rec(char* filename, int index, char* mot){ //Le premier index transmis a l'appel de la fonction doit être 0 pour tester depuis le debut du fichier
  ArrayCell cell = readCellInFile(filename, index); // Dans un premier temps on recupere la cellule a l'index indique
  if (cell.elem == mot[0]){   //Si l'element recuperer dans la cellule correspond a la 1ere lettre de notre mot :
    if (mot[0]=='\0'){
      return 0;               // Si c'est la fin du mot on renvoie 0 pour dire que le mot est trouve
    }else{
      return dictionnary_lookup_rec(filename, cell.firstChild, mot+1); // Sinon on continue a chercher le mot en passant a la lettre suivante
    }
  }else{
    //printf("Lettre pas egale >:C , nb de freres = %d\n", cell.nSiblings);
    if (mot[0]=='\0'){
      return 1;   // Si on arrive a la fin de notre mot, mais qu'il n'a pas de fin de mot dans le dico lex on renvoie 1 pour preciser qu'il s'agit d'un prefixe
    } else if (cell.nSiblings>0){
      return dictionnary_lookup_rec(filename, index+1, mot);  //Si ce n'est pas la fin du mot mais qu'aucune lettre ne corresponde dans le fichier lex on renvoit 2
    }else{
      return 2;
    }
  }
}
*/


char* solve(char* filename, int minLenght, grid g){
  CSTree allWords = NULL;
  int* letterIndex = malloc(sizeof(int));
  *letterIndex = 0;
  char* currentWord = malloc((g.nbc*g.nbl+1)*sizeof(char));
  solve_rec(filename, minLenght, g, allWords, 0 ,currentWord, letterIndex);
  StaticTree st = exportStaticTree(allWords);
  //printf("LE CSTREE %c et %c", allWords->elem, allWords->firstChild->elem);
  printf("JE VAIS PRINT");
  printStaticTree(st);
  // TODO : Utilisé le CS Tree genere pour en ressortir la liste de mot
  free(letterIndex);
  free(currentWord);
  free(allWords);
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
    printf("AAAAA");
    printf("%s", solve("../../data/dico.lex", 1, g));
}