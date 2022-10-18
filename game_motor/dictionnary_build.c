/*
Construit un arbre lexicographique à partir d’un dictionnaire (dico.txt), le
sauvegarde dans un fichier binaire (dico.lex). Aucune sortie n’est attendue.


Dico.txt -> CSTree -> StaticTree -> dico.lex


$ dictionnary_build dico.txt dico.lex
*/

#include "exportStaticTree.c"
#include <stdio.h>
#include <stdlib.h>
#include <string.h>


CSTree insert(CSTree t, char* word){
    if(t==NULL){
        t = malloc(sizeof(Node));
        t->elem = word[0];
        t->firstChild = NULL;
        t->nextSibling = NULL;
        if(word[1] != '\0'){
            t->firstChild = insert(t->firstChild, word+1);
        }
    }
    else if(t->elem == word[0]){
        if(word[1] != '\0'){
            t->firstChild = insert(t->firstChild, word+1);
        }
    }
    else{
        t->nextSibling = insert(t->nextSibling, word);
    }
    return t;
}

CSTree convertFileToCSTree(char *filename) {
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        printf("Error opening file %s", *filename);
        exit(1);
    }
    char word[100];
    CSTree t = NULL;
    while (fscanf(file, "%s", word) != EOF) {
        t = insert(t, word);
    }
    fclose(file);
    return t;

}

// affiche un CSTree
void printCSTree(CSTree t) {
  if (t != NULL) {
    printf("%c", t->elem);
    printCSTree(t->firstChild);
    printCSTree(t->nextSibling);
  }
}


void main(int argc, char *argv[]) {
  if (argc != 3) {
    printf("Erreur d'arguments");
    exit(1);
  }
  CSTree t = convertFileToCSTree(&argv[1]);
  printCSTree(t);
  StaticTree st = exportStaticTree(t);
  

}
