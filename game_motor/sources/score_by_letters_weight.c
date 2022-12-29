/*
$ score frequence.txt MOT1 MOT2 MOT3...

Reçoit une liste de mots en paramètres, et affiche un score associé. On suppose que tous les mots sont valides.

Le calcul du score est basé sur la fréquence d’apparition des lettres 
ainsi on fait la somme des fréquences de chaque lettre du mot.


*/

#include <stdio.h>
#include <stdlib.h>
#include <string.h>

// Structure pour stocker les informations sur une lettre
struct lettre {
  char c;
  int frequence;
  int score;
};

typedef struct lettre lettre;

// Fonction qui calcule le total des fréquences
int totalFreq(struct lettre *lettres){
    int total = 0;
    for (int i = 0; i < 27; i++){
        total += lettres[i].frequence;
    }
    return total;
}

// Fonction qui adonne le score à une lettre
int scoreLettre(struct lettre lettre, int total){
    return (int) ((lettre.frequence / total) * 100);
}

// Fonction qui affecte les scores aux lettres
void affectsScores(struct lettre *lettres){
    for (int i = 0; i < 27; i++){
        lettres[i].score = scoreLettre(lettres[i], totalFreq(lettres));
    }
}
    

// Structure pour stocker les informations sur un mot
void readFrequencies(char *filename, struct lettre *lettres) {
  FILE *f = fopen(filename, "r");
  if (f == NULL) {
    printf("Impossible d'ouvrir le fichier %s", filename);
    exit(1);
    }
    char c;
    int i = 0;
    while (fscanf(f, "%c %i", &c, &lettres[i].frequence) != EOF) {
      lettres[i].c = c;
      lettres[i].score = -1;
      i++;
    }
    fclose(f);
}


// main function qui prend en paramètre :  le nom du fichier de fréquences et une liste de mots

int main(int argc, char *argv[]) {
    if (argc < 3) {
        printf("Usage: %s <fichier frequence> <mot1> <mot2> ... (erreur nombre de paramètre)\n", argv[0]);
        return 5;
    }
     // check if the file is a .txt
    if (strstr(argv[1], ".txt") == NULL) {
        printf("Usage: %s <fichier frequence> <mot1> <mot2> ... (erreur de type de fichier)\n", argv[0]);
        return 6;
    }
    struct lettre lettres[27];
    readFrequencies(argv[1], lettres);
    affectsScores(lettres);
    int score = 0;
    for (int i = 2; i < argc; i++) {
        for (int j = 0; j < strlen(argv[i]); j++) {
        int k = 0;
        while (lettres[k].c != argv[i][j]) {
            k++;
        }
        score += lettres[k].score;
        }
    }
    printf("Score: %d\n", score);
    return 0;
}