#include <stdlib.h>
#include <stdio.h>
#include <limits.h>

#define NONE -1

//définitions des structures
typedef char Element;

typedef struct node{
    Element elem;
    struct node* firstChild;
    struct node* nextSibling;
} Node;
typedef Node* CSTree;


typedef struct {
    Element elem;
    unsigned int firstChild;
    unsigned int nSiblings;
} ArrayCell;
typedef struct {
    ArrayCell* nodeArray;
    unsigned int nNodes;
} StaticTree;


//fonctions nécéssaires à l'export
ArrayCell cons(Element elem ,int firstChild, int nSiblings){
    ArrayCell l;
    l.elem = elem;
    l.firstChild = firstChild;
    l.nSiblings = nSiblings;
    return l;
}

int size(CSTree t){
    if (t == NULL) return 0;
    return 1 + size(t->firstChild) + size(t->nextSibling);
}

int nSibling(CSTree t){
    if(t==NULL){return 0;}
    return 1 + nSibling(t->nextSibling);
}

int nChildren(CSTree t){
    if(t==NULL){return 0;}
    return nSibling(t->firstChild); 
}


int filltab(ArrayCell* tab,int size,int index,CSTree t){
    if(t==NULL){return size;}

    int enfant = nChildren(t);
    int oldsize=size;
    if(enfant==0){
        tab[index]=cons(t->elem,NONE,nSibling(t)-1);
    }else{
        tab[index]=cons(t->elem,size,nSibling(t)-1);
        int oldsize = size;
        size+=enfant;
    }
    index+=1;
    size = filltab(tab,size,index,t->nextSibling);
    size = filltab(tab,size,oldsize,t->firstChild);

    return size;    
}

StaticTree exportStaticTree(CSTree t){
    int sizeOfTree = size(t);
    StaticTree r;
    r.nNodes = sizeOfTree;

    ArrayCell* tab = malloc(sizeof(ArrayCell*)*sizeOfTree);
    filltab(tab,nSibling(t),0,t);
    r.nodeArray = tab;
    return r;
}

void printStaticTree(StaticTree t){
    for(int i=0; i<t.nNodes; i++){
        printf("elem: %d, firstChild: %d, nSiblings: %d \n", t.nodeArray[i].elem, t.nodeArray[i].firstChild, t.nodeArray[i].nSiblings);
    }
}