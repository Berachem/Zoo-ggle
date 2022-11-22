#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dicoToStaticTree.h"
#include "../headers/dictionnary_build.h"





  // Fonction de lecture d'une cellule de tableau dans un fichier lex
ArrayCell readCellInFile(char* filename, int index){
  FILE *file = fopen(filename, "rb");

  fseek(file, sizeof(header) + sizeof(ArrayCell)*index, SEEK_SET); // Pour aller a l'index de la cellule cherchee on va 
  ArrayCell cell;                                                  // a la taille du header plus la taille des cellules precedentes
  fread(&cell,sizeof(ArrayCell),1,file);                          // Puis on lit cette cellule avant la renvoyer
  // printf("%c, %d, %d \n",cell.elem,cell.firstChild,cell.nSiblings);
  return cell;
}



// Fonction recursive qui verifier si un mot est dans le fichier lex, renvoie 0 si il y est, 1 si c'est un prefixe existant et 0 sinon
int dictionnary_lookup_rec(char* filename, int index, char* mot){ //Le premier index transmis a l'appel de la fonction doit être 0 pour tester depuis le debut du fichier
  //printf("\n\n", mot);
  //printf("Mot: %s \n", mot);
  ArrayCell cell = readCellInFile(filename, index); // Dans un premier temps on recupere la cellule a l'index indique
  //printf("lettre : %c \n", cell.elem);
  //printf("Lettre de mon mot %c \n", mot[0]);
  if (cell.elem == mot[0]){   //Si l'element recuperer dans la cellule correspond a la 1ere lettre de notre mot :
    //printf("-egal\n");
    if (mot[0]=='\0'){
      //printf("-fin de mot\n");
      return 0;               // Si c'est la fin du mot on renvoie 0 pour dire que le mot est trouve
    }else{
      //printf("Lettre suivante \n");
      return dictionnary_lookup_rec(filename, cell.firstChild, mot+1); // Sinon on continue a chercher le mot en passant a la lettre suivante
    }
  }else{
    //printf("Lettre pas egale >:C , nb de freres = %d\n", cell.nSiblings);
    if (mot[0]=='\0'){
      return 1;   // Si on arrive a la fin de notre mot, mais qu'il n'a pas de fin de mot dans le dico lex on renvoie 1 pour preciser qu'il s'agit d'un prefixe
    } else if (cell.nSiblings>0){
      //printf("Allons voir son frere\n");
      return dictionnary_lookup_rec(filename, index+1, mot);  //Si ce n'est pas la fin du mot mais qu'aucune lettre ne corresponde dans le fichier lex on renvoit 2
    }else{
      return 2;
    }
  }
}

// fonction principale qui appelle dictionnary_lookup_rec
int dictionnary_lookup(char* filename, char* mot) {
    return dictionnary_lookup_rec(filename,0,mot);
}
  
/*

$ dictionnary_lookup dico.lex BONJOUR
[valeur de sortie = 0]
Recherche si un mot (BONJOUR) est dans un dictionnaire (dico.lex). Renvoie 0 si le mot est présent, 1 si c’est un
préfixe valide d’un mot présent (par exemple, BONJ), 2 sinon. Aucune sortie n’est attendue

*/
/*
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
*/