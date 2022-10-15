/*
Construit un arbre lexicographique à partir d’un dictionnaire (dico.txt), le sauvegarde dans un fichier binaire
(dico.lex). Aucune sortie n’est attendue.

$ dictionnary_build dico.txt dico.lex
*/



#include <stdio.h>
#include <stdlib.h>


void main(int argc, char *argv[]){
    FILE *fichier = fopen(argv[1], "r");
    FILE *fichier2 = fopen(argv[2], "w");

    /*
    A FAIRE
    */

    fclose(fichier);
    fclose(fichier2);
}

