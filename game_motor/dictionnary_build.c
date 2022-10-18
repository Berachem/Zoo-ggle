/*
Construit un arbre lexicographique à partir d’un dictionnaire (dico.txt), le
sauvegarde dans un fichier binaire (dico.lex). Aucune sortie n’est attendue.


StaticTree -> dico.lex


$ dictionnary_build dico.txt dico.lex
*/


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "dicoToStaticTree.c"



void convertStaticToLex(char *filename, StaticTree t){

    //c'est ici que ca plante (le fichier ne s'ouvre pas)
    FILE *file = fopen(filename, "w");
    
    if (file == NULL) {
        printf("Error with file %s", *filename);
        exit(1);
    }

    //cette partie marche wallah j'ai testé
    for(int i=0;i<t.nNodes;i++){
        //j'initialise les 3 parties de ma chainse
        char noeud[10];
        char indexEnfant[10]; 
        char nombreFrere[10];

        //je transtype mes cases de int à string
        sprintf(noeud,"%d",t.nodeArray[i].elem);  
        sprintf(indexEnfant,"%d",t.nodeArray[i].firstChild);
        sprintf(nombreFrere,"%d",t.nodeArray[i].nSiblings);           

        //je crée ma string à l'aide de la concatenation (format X;X;X)
        char ligne[50];
        strcat(strcpy(ligne,noeud),";");
        strcat(ligne,indexEnfant);
        strcat(ligne,";");
        strcat(ligne,nombreFrere);
        printf("%s\n",ligne);

        fwrite(ligne,sizeof(ligne),1,file);
    }


    fclose(file);
}


void main() { //(int argc, char *argv[])
  /* if (argc != 3) {
    printf("Erreur d'arguments");
    exit(1);
  } */
  CSTree t = convertFileToCSTree("../data/dico.txt");
  printCSTree(t, 0);
  StaticTree st = CSTreeToStaticTree(t);
  printStaticTree(st);  
  //convertStaticToLex("../data/dico.lex",st); // ne fonctionne pas totalement
}
