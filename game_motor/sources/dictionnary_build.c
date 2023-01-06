/*
Construit un arbre lexicographique à partir d’un dictionnaire (dico.txt), le
sauvegarde dans un fichier binaire (dico.lex). Aucune sortie n’est attendue.


StaticTree -> dico.lex


$ dictionnary_build dico.txt dico.lex
*/


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dictionnary.h"



void main(int argc, char *argv[]){
  //on verifie qu'il y a bien 2 arguments et qu'ils ne sont pas renseignés alors on a comme valeur par défaut dico.txt et dico.lex
  char * txtFile;
  char * lexFile;
/* FOR TEST
      txtFile= "../../data/listeMot.txt";
       lexFile= "../../data/listeMot.lex";
*/
   // gestion des codes d'erreur
  if (argc != 3) {
    printf("Usage: %s filename height width (check if there is enough arguments)\n", argv[0]);
    return ERROR_PARAM_NUMBER;
  }
  // check if filename is a string and contains .txt
  if (strstr(argv[1], ".txt") == NULL) {
    printf("Usage: %s filename height width (check if filename is a string and contains .txt)\n", argv[0]);
    return ERROR_PARAM_TYPE;
  }
  // check if filename is a string and contains .txt
  if (strstr(argv[2], ".lex") == NULL) {
    printf("Usage: %s filename height width (check if filename is a string and contains .lex)\n", argv[0]);
    return ERROR_PARAM_TYPE;
  }
  txtFile = argv[1];
  lexFile = argv[2];
  

  CSTree t = convertFileToCSTree(txtFile);
  // printf("%d\n",size(t));
  //printCSTree(t, 0);
  StaticTree st = exportStaticTree(t);
  
  //printStaticTree(st); 
  convertStaticToLex(lexFile,st); // ne fonctionne pas totalement
  

  //printf("BOUP\n");
  freeCST(t);
  free(st.nodeArray);
  
}
