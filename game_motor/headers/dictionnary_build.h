typedef struct
{
  int taille;
  int mots;
  int cellules;
  int tailleCellule;
}header;

void convertStaticToTXT(char *filename, StaticTree t);

void convertStaticToLex(char* filename,StaticTree t);

void freeCST(CSTree t);

