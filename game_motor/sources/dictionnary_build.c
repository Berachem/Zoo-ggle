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

    if(argc < 3 ){
       txtFile= "../../data/listeMot.txt";
       lexFile= "../../data/listeMot.lex";
    }else{
        txtFile= argv[1];
        lexFile= argv[2];
    }
  

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
