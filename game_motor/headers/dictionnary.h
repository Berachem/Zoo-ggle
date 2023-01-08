/*
dictionnary.h
-----

Rôle : prototypes des fonctions de dictionnary.c

*/

// codes d'erreur
#define ERROR_OPENING_FILE 151
#define ERROR_PARAM_NUMBER 253
#define ERROR_PARAM_TYPE 254
#define ERROR_FILE_TYPE 255
#define ERROR_GRID_ARGUMENTS 256
#define ERROR_GRID_WORD 257
#define ERROR_GRID_DIMENSION 258

//-----définitions des structures-----
typedef char Element;

typedef struct {
    Element elem;
    unsigned int firstChild;
    unsigned int nSiblings;
} ArrayCell;

typedef struct node{
    Element elem;
    struct node* firstChild;
    struct node* nextSibling;
} Node;
typedef Node* CSTree;

typedef struct {
    ArrayCell* nodeArray;
    unsigned int nNodes;
    unsigned int nWord;
} StaticTree;


//-----Promesses de fonctions-----




void printCSTree(CSTree t, int level);

ArrayCell cons(Element elem ,int firstChild, int nSiblings);

int size(CSTree t);

int nLeaves(CSTree t);

int nSibling(CSTree t);

int nChildren(CSTree t);

CSTree insert(CSTree t, char* word);

CSTree convertFileToCSTree(char *filename);

int filltab(ArrayCell* tab,int size,int index,CSTree t);

StaticTree exportStaticTree(CSTree t);

void printStaticTree(StaticTree t);

StaticTree convertFileToStaticTree(char *filename);


ArrayCell readCellInFile(char* filename, int index);
int dictionnary_lookup_rec(char* filename, int index, char* mot);
int dictionnary_lookup(char* filename, char* mot);


typedef struct
{
  int taille;
  int mots;
  int cellules;
  int tailleCellule;
}header;


void convertStaticToLex(char* filename,StaticTree t);

void freeCST(CSTree t);

// fonction qui remplace les QU par * dans un mot
// word : mot à modifier
// return : mot modifié
char *remplaceQUdico(char *word);