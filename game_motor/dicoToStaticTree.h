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





