#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dictionnary.h"





  
/*

$ dictionnary_lookup dico.lex BONJOUR
[valeur de sortie = 0]
Recherche si un mot (BONJOUR) est dans un dictionnaire (dico.lex). Renvoie 0 si le mot est présent, 1 si c’est un
préfixe valide d’un mot présent (par exemple, BONJ), 2 sinon. Aucune sortie n’est attendue

*/

int main(int argc, char *argv[]){
  if (argc < 3){
    printf("Erreur : nombre d'arguments incorrect\n");
    return ERROR_PARAM_NUMBER
  }
  if (strstr(argv[1], ".lex") == NULL) {
    printf("Usage: %s filename height width (check if filename is a string and contains .lex)\n", argv[0]);
    return ERROR_PARAM_TYPE;
  }
  // check if the word is a string
  if (atoi(argv[2]) != 0) {
    printf("Usage: %s word height width grid (check if the word is a string)", argv[0]);
    return ERROR_PARAM_TYPE;
  }


  
  int res = dictionnary_lookup(argv[1],argv[2]);
  printf("Resultat : %d \n", res);
  ArrayCell cell= readCellInFile("../../data/listeMot.lex",2042576);
  printf("Elem : %c Enfant : %d NbFrr : %d",cell.elem,cell.firstChild,cell.nSiblings);
  return res;


  //readCellInFile("../../data/fr.lex",0);
  //readCellInFile("../../data/fr.lex",4);
  //readCellInFile("../../data/fr.lex",15);
  //printf("%d",dictionnary_lookup("../../data/dico.lex","eau"));
  
  //printf("%d",dictionnary_lookup("../../data/dico.lex","ciseau"));
  //printf("%d",dictionnary_lookup("../../data/dico.lex","chiot"));



}
