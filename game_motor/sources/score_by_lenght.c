/*
$ score OUI VIE
2

Reçoit une liste de mots en paramètres, et affiche un score associé. On suppose que tous les mots sont valides
(présents dans la grille et le dictionnaire). Ces spécifications peuvent être adaptées en fonction de la règle de calcul
du score: l’exécutable peut également recevoir l’adresse du dictionnaire de référence, les listes des autres joueurs, etc.
On pourra avoir plusieurs exécutables correspondant à plusieurs choix de politique de scores.
*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

int scoreByWord(char *word) {
    /*
    Mot de 3 ou 4 lettres : 1 point. Mot de 5 lettres : 2 points. Mot de 6 lettres : 3 points. Mot de 7 lettres : 5 points.
    */

    int score = 0;
    int length = strlen(word);
    if (length == 3 || length == 4) {
        score = 1;
    } else if (length == 5) {
        score = 2;
    } else if (length == 6) {
        score = 3;
    } else if (length == 7) {
        score = 5;
    } else if (length >= 8) {
        score = 11;
    }
    return score;
}


int main(int argc, char *argv[]) {
    if (argc < 2) {
        printf("Usage: %s word1 word2 word3 ...", argv[0]);
        return 5;
    }
    if (atoi(argv[1]) != 0) {
        printf("Usage: %s word1 word2 word3 ... (check if the word is a string)", argv[0]);
        return 6;
    }

    int score = 0;
    for (int i = 1; i < argc; i++) {
        score += scoreByWord(argv[i]);
    }
    printf("score : %d\n", score);
    return 0;
}

