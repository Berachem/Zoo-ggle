/*
Construit un arbre lexicographique à partir d’un dictionnaire (dico.txt), le
sauvegarde dans un fichier binaire (dico.lex). Aucune sortie n’est attendue.


StaticTree -> dico.lex


$ dictionnary_build dico.txt dico.lex
*/


#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dicoToStaticTree.h"
#include "../headers/dictionnary_build.h"

//fonction créant un fichier txt à partir d'un static tree
void convertStaticToTXT(char *filename, StaticTree t){

    //c'est ici que ca plante (le fichier ne s'ouvre pas)
    FILE *file = fopen(filename, "w");
    
    if (file == NULL) {
        printf("Error with file %s",filename);
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
    printf("nom fichier : %s \n", filename);
    perror("Error 3");
    //c'est ici que ca plante (le fichier ne s'ouvre pas)
    FILE *file = fopen(filename, "wb");
    perror("Error 3.2");
    printf("nom fichier : %s\n", filename);
    if (file == NULL) {
        printf("Error with file %s",filename);
        exit(1);
    }
    perror("Error 4");
    //cette partie écrit le header
    header h;
    h.cellules = t.nNodes;
    h.tailleCellule = sizeof(ArrayCell);
    h.mots = t.nWord;
    h.taille = sizeof(header);
    printf("nb cell : %d, tailleCell : %d, nb mots : %d, taille header : %d \n",h.cellules,h.taille,h.mots,h.taille);
    perror("Error 4.5");
    fwrite(&h,sizeof(header),1,file);
    perror("Error 5");
    //cette partie ecrit tout les noeuds un par ligne
    for(int i=0;i<t.nNodes;i++){
      perror("Error 6");
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
  perror("Error 1");
  // printf("%d\n",size(t));
  //printCSTree(t, 0);
  StaticTree st = exportStaticTree(t);
  perror("Error 2");
  
  // printf("BIP\n");
  //printStaticTree(st); 
  perror("Error 2.5"); 
  convertStaticToLex(lexFile,st); // ne fonctionne pas totalement
  

  //printf("BOUP\n");
  freeCST(t);
  free(st.nodeArray);
  
}
