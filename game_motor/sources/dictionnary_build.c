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

// Fonction de lecture d'une cellule de tableau dans un fichier lex
ArrayCell readCellInFile(char* filename, int index){
  FILE *file = fopen(filename, "rb");

  fseek(file, sizeof(header) + sizeof(ArrayCell)*index, SEEK_SET); // Pour aller a l'index de la cellule cherchée on va 
  ArrayCell cell;                                                  // à la taille du header plus la taille des cellules précédentes
  fread(&cell,sizeof(ArrayCell),1,file);                          // Puis on lit cette cellule avant la renvoyer
  printf("%c, %d, %d \n",cell.elem,cell.firstChild,cell.nSiblings);
  return cell;
}


// FIXME Lucas passer en fonction récursive correspondant à l'énoncé
// Fonction récursive qui vérifier si un mot est dans le fichier lex, renvoie 0 si il y est, 1 si c'est un préfixe existant et 0 sinon
int dictionnary_lookup(char* filename, int index, char* mot){ //Le premier index transmis à l'appel de la fonction doit être 0 pour tester depuis le début du fichier
  //printf("\n\n", mot);
  //printf("Mot: %s \n", mot);
  ArrayCell cell = readCellInFile(filename, index); // Dans un premier temps on récupère la cellule à l'index indiqué
  //printf("lettre : %c \n", cell.elem);
  //printf("Lettre de mon mot %c \n", mot[0]);
  if (cell.elem == mot[0]){   //Si l'élément récupérer dans la cellule correspond à la 1ere lettre de notre mot :
    //printf("-egal\n");
    if (mot[0]=='\0'){
      //printf("-fin de mot\n");
      return 0;               // Si c'est la fin du mot on renvoie 0 pour dire que le mot est trouvé
    }else{
      //printf("Lettre suivante \n");
      return dictionnary_lookup(filename, cell.firstChild, mot+1); // Sinon on continue à chercher le mot en passant à la lettre suivante
    }
  }else{
    //printf("Lettre pas egale >:C , nb de freres = %d\n", cell.nSiblings);
    if (mot[0]=='\0'){
      return 1;   // Si on arrive à la fin de notre mot, mais qu'il n'a pas de fin de mot dans le dico lex on renvoie 1 pour préciser qu'il s'agit d'un préfixe
    } else if (cell.nSiblings>0){
      //printf("Allons voir son frère\n");
      return dictionnary_lookup(filename, index+1, mot);  //Si ce n'est pas la fin du mot mais qu'aucune lettre ne corresponde dans le fichier lex on renvoit 2
    }else{
      return 2;
    }
  }
}




void main(int argc, char *argv[]){
  //on verifie qu'il y a bien 2 arguments et qu'ils ne sont pas renseignés alors on a comme valeur par défaut dico.txt et dico.lex
  char * txtFile;
  char * lexFile;

    if(argc < 3 ){
       txtFile= "../../data/dico.txt";
       lexFile= "../../data/dico.lex";
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
  

  // printf("BOUP\n");
  //readCellInFile("../../data/fr.lex",0);
  //readCellInFile("../../data/fr.lex",4);
  //readCellInFile("../../data/fr.lex",15);
  //printf("%d",dictionnary_lookup("../../data/dico.lex",0,"eau"));
  
  //printf("%d",dictionnary_lookup("../../data/dico.lex",0,"ciseau"));
  printf("%d",dictionnary_lookup("../../data/dico.lex",0,"chiot"));

  freeCST(t);
  free(st.nodeArray);
  
}
