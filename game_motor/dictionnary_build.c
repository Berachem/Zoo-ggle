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

typedef struct
{
  int taille;
  int mots;
  int cellules;
  int tailleCellule;
}header;

//fonction créant un fichier txt à partir d'un static tree
void convertStaticToTXT(char *filename, StaticTree t){

    //c'est ici que ca plante (le fichier ne s'ouvre pas)
    FILE *file = fopen(filename, "w");
    
    if (file == NULL) {
        printf("Error with file %s",*filename);
        exit(1);
    }

    char debut[] = "Nombre de noeud : ";
    char fin[10];
    sprintf(fin,"%d",t.nNodes);

    //écrit un entete avec le nombre total de noeud
    char total[strlen(debut)+strlen(fin)+1];
    strcat(strcpy(total,debut),fin);
    strcat(total,"\n");
    fwrite(total,sizeof(total),1,file);

    //cette partie ecrit tout les noeuds un par ligne
    for(int i=0;i<t.nNodes;i++){
        //j'initialise les 3 parties de ma chainse
        char noeud[10];
        char indexEnfant[10]; 
        char nombreFrere[10];

        //je transtype mes cases de int à string
        sprintf(noeud,"%c",t.nodeArray[i].elem);  
        sprintf(indexEnfant,"%d",t.nodeArray[i].firstChild);
        sprintf(nombreFrere,"%d",t.nodeArray[i].nSiblings);           

        //je crée ma string à l'aide de la concatenation (format X;X;X)
        char ligne[strlen(noeud)+strlen(indexEnfant)+strlen(nombreFrere)+3];
        strcat(strcpy(ligne,noeud),";");
        strcat(ligne,indexEnfant);
        strcat(ligne,";");
        strcat(ligne,nombreFrere);
        strcat(ligne,"\n");
        //printf("%s",ligne);

        fwrite(ligne,sizeof(ligne),1,file);
    }


    fclose(file);
}

//fonction créant le fichier .lex à partir d'un static tree
void convertStaticToLex(char* filename,StaticTree t){
  
    //c'est ici que ca plante (le fichier ne s'ouvre pas)
    FILE *file = fopen(filename, "w");
    
    if (file == NULL) {
        printf("Error with file %s",*filename);
        exit(1);
    }

    //cette partie écrit le header
    header h;
    h.cellules = t.nNodes;
    h.tailleCellule = sizeof(ArrayCell);
    h.mots = t.nWord;
    h.taille = sizeof(header);

    fwrite(&h,sizeof(header),1,file);

    //cette partie ecrit tout les noeuds un par ligne
    for(int i=0;i<t.nNodes;i++){
      ArrayCell cell = (t.nodeArray[i]);
      fwrite(&cell,sizeof(ArrayCell),1,file);
    }


    fclose(file);
}

void freeCST(CSTree t){
  if(t == NULL){return;}
  freeCST(t->firstChild);
  freeCST(t->nextSibling);
  free(t);
}

void main() { //(int argc, char *argv[])
  /* if (argc != 3) {
    printf("Erreur d'arguments");
    exit(1);
  } */
  CSTree t = convertFileToCSTree("../data/dico.txt");
  printf("%d\n",size(t));
  //printCSTree(t, 0);
  StaticTree st = exportStaticTree(t);
  printf("BIP\n");
  //printStaticTree(st);  
  convertStaticToLex("../data/dico.lex",st); // ne fonctionne pas totalement
  
  freeCST(t);
  free(st.nodeArray);
}
