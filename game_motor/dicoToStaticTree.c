/*

Fichier qui contient les fonctions de conversion d'un dictionnaire en CSTree PUIS StaticTree

dico.txt -> CSTree -> StaticTree 

*/



#include <stdio.h>
#include <stdlib.h>
#include <string.h>

#define NONE -1

//-----définitions des structures-----
typedef char Element;

typedef struct {
    Element elem;
    unsigned int firstChild;
    unsigned int nSiblings;
} ArrayCell;


//======================================================
//======================================================

            // DICO.TXT TO CSTREE

//======================================================
//======================================================

typedef struct node{
    Element elem;
    struct node* firstChild;
    struct node* nextSibling;
} Node;
typedef Node* CSTree;

// affiche un CSTree avec les enfants et les frères (,) et les niveaux (|)
void printCSTree(CSTree t, int level){
    if(t==NULL){return;}
    for(int i=0; i<level; i++){
        printf("|");
    }
    printf("%c", t->elem);
    if(t->firstChild != NULL){
        printf(",");
    }
    printf("\n");
    printCSTree(t->firstChild, level+1);
    printCSTree(t->nextSibling, level);
}

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

// fonction récurssive qui renvoie insère chaque lettre d'un mot dans un CSTree
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


// Fonction qui utilise un fichier de type dico.txt pour créer un CSTree correspondant à ce fichier
CSTree convertFileToCSTree(char *filename) {
    //printf("function --> convertFileToCSTree\n");
    FILE *file = fopen(filename, "r");
    printf("file opened\n");
    
    if (file == NULL) {
        printf("Error opening file!\n");
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


//======================================================
//======================================================

            // CSTREE TO STATIC TREE

//======================================================
//======================================================

typedef struct {
    ArrayCell* nodeArray;
    unsigned int nNodes;
} StaticTree;



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
StaticTree CSTreeToStaticTree(CSTree t){
    StaticTree st;
    st.nNodes = size(t);
    st.nodeArray = malloc(sizeof(ArrayCell)*st.nNodes);
    filltab(st.nodeArray,st.nNodes,0,t);
    return st;
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
        printf("elem: %c, firstChild: %d, nSiblings: %d \n", t.nodeArray[i].elem, t.nodeArray[i].firstChild, t.nodeArray[i].nSiblings);
    }
}

//======================================================
//======================================================

            // DICO.TXT TO STATIC TREE

//======================================================
//======================================================


// fonction qui renvoie un static tree à partir d'un fichier de type dico.txt
StaticTree convertFileToStaticTree(char *filename) {
    return CSTreeToStaticTree(convertFileToCSTree(filename));

}

 /*
    
void main(){
   
   
    CSTree t = convertFileToCSTree("../data/dico.txt");
    printf("CSTree : \n");
    printCSTree(t, 0);
    // affiche tous les frères d'un noeud
    printf("\nExemple --> nombre de freres de la racines : %d\n",nSibling(t));
     
}*/