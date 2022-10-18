#include <stdlib.h>
#include <stdio.h>
#include <limits.h>

#define NONE -1

//-----définitions des structures-----
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


//-----fonctions nécéssaires à l'export-----
ArrayCell cons(Element elem ,int firstChild, int nSiblings){
    ArrayCell l;
    l.elem = elem;
    l.firstChild = firstChild;
    l.nSiblings = nSiblings;
    return l;
}

//renvoie la taille d'un arbre
int size(CSTree t){ 
    if (t == NULL) return 0;
    return 1 + size(t->firstChild) + size(t->nextSibling);
}

//renvoie le nombre de frère d'un noeud
int nSibling(CSTree t){
    if(t==NULL){return 0;}
    return 1 + nSibling(t->nextSibling);
}

//renvoie le nombre d'enfant direct d'un noeud
int nChildren(CSTree t){
    if(t==NULL){return 0;}
    return nSibling(t->firstChild); 
}

//
int filltab(ArrayCell* tab,int size,int index,CSTree t){
    if(t==NULL){return size;}

    //stockage du nombre d'enfant et de la taille du tableau à l'instant de l'appel
    int enfant = nChildren(t);
    int oldsize=size;

    
    if(enfant==0){//si il n'y à pas d'enfant on construit le tuple sans se poser de question
        tab[index]=cons(t->elem,NONE,nSibling(t)-1);
    }else{        //si il y a des enfants on construit le tuple en présisant que le premier
                  //enfant se trouve au bout du tableau à l'instant de l'appel (donc à size)
        tab[index]=cons(t->elem,size,nSibling(t)-1);
        int oldsize = size; //on stocke la taille à l'instant de l'appel pour pouvoir ensuite contruire les enfants au bon endroit
        size+=enfant;       //on actualise la taille nécéssaire du tableau après l'appel de la fonction
    }
    index+=1;
    size = filltab(tab,size,index,t->nextSibling); //on construit ensuite les frères
    size = filltab(tab,size,oldsize,t->firstChild);//on construit ensuite les enfants (qui se trouve à oldsize au bout du tableau à l'instant de l'appel)

    return size;//on renvoit la taille du tableau afin d'actualiser la position pour les prochains appels récursif    
}

//transforme un CSTtree en StaticTree
StaticTree exportStaticTree(CSTree t){
    
    //récupération de la taille de l'arbre
    int sizeOfTree = size(t);
    StaticTree r;
    r.nNodes = sizeOfTree;

    //reservation mémoire du tableau et remplissage
    ArrayCell* tab = malloc(sizeof(ArrayCell*)*sizeOfTree);
    filltab(tab,nSibling(t),0,t);
    r.nodeArray = tab;
    return r;
}

//affichage d'un arbre static
void printStaticTree(StaticTree t){
    for(int i=0; i<t.nNodes; i++){
        printf("elem: %d, firstChild: %d, nSiblings: %d \n", t.nodeArray[i].elem, t.nodeArray[i].firstChild, t.nodeArray[i].nSiblings);
    }
}