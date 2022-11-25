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
    exit(1);
  }
  int res = dictionnary_lookup(argv[1],argv[2]);
  printf("Resultat : %d \n", res);

  return res;


  //readCellInFile("../../data/fr.lex",0);
  //readCellInFile("../../data/fr.lex",4);
  //readCellInFile("../../data/fr.lex",15);
  //printf("%d",dictionnary_lookup("../../data/dico.lex",0,"eau"));
  
  //printf("%d",dictionnary_lookup("../../data/dico.lex",0,"ciseau"));
  //printf("%d",dictionnary_lookup("../../data/dico.lex",0,"chiot"));



}
