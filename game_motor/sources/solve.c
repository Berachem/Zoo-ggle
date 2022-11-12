#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dicoToStaticTree.h"
#include "../headers/dictionnary_build.h"
#include "../headers/dictionnary_lookup.h"
#include "../headers/grid_path.h"
#include "../headers/grid.h"

char* solve_rec(char* filename, int minLenght, grid g, char allWords[], int index, char currentWord[]){
    ArrayCell cell = readCellInFile(filename, index); 
    char oldWord []="";
    strcpy(oldWord,currentWord);
    char lettre[] = {cell.elem};
    strcat(currentWord,lettre);
    if (cell.elem == '\0' && strlen(currentWord)>=minLenght){
        if (strlen(allWords)==0){
            strcat(allWords, " ");
        }
        strcat(allWords,currentWord);
    }

    if((grid_path(currentWord, g)==0) && (cell.firstChild!=-1)){
        allWords=solve_rec(filename, minLenght,g,allWords,cell.firstChild,currentWord);
    }
    if(cell.nSiblings!=0){
        allWords=solve_rec(filename, minLenght,g ,allWords,index+1,oldWord);
    }
    return allWords;
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


char* solve(char* filename, int minLenght, grid g, char allWords[]){
    solve_rec(filename, minLenght, g, allWords, 0 ,"");
}


int main(int argc, char *argv[]){
    if (argc < 3){
        printf("Erreur : nombre d'arguments incorrect\n");
        exit(1);
    }
    char* s;

    int height = 4;
    int width = 4;

    char* gridList = "EAUXRBRXXXEXXXX";
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
    printf("%s", solve("../../data/dico.lex", 1, g, s));
}