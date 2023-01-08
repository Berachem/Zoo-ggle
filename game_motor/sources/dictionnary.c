#include <stdio.h>
#include <stdlib.h>
#include <string.h>
#include "../headers/dictionnary.h"

#define NONE -1




//======================================================
//======================================================

            // DICO.TXT TO CSTREE

//======================================================
//======================================================


// Fonction qui permet d'afficher un CSTree
// affiche un CSTree avec les enfants et les frères (,) et les niveaux (|)
void printCSTree(CSTree t, int level){
    if(t->elem == '\0'){
        printf("&");
        return;}
    for(int i=0; i<level; i++){
        printf("|");
    }
    printf("%c", t->elem);
    if(t->elem != '\0'){
        printf(",");
    }
    printf("\n");
    printCSTree(t->firstChild, level+1);
    printCSTree(t->nextSibling, level);
}

//-----fonctions nécéssaires à l'export-----

//Fonction qui permet de construire une case du tableau Static Tree
ArrayCell cons(Element elem ,int firstChild, int nSiblings){
    ArrayCell l;
    l.elem = elem;
    l.firstChild = firstChild;
    l.nSiblings = nSiblings;
    return l;
}

//Fonction qui permet d'obtenir la taille d'un CSTree/ son nombre de noeud
int size(CSTree t){ 
    if (t == NULL) return 0;
    return 1 + size(t->firstChild) + size(t->nextSibling);
}

//Fonction qui permet d'obtenir le nombre de feuille d'un CSTree, qui est aussi le nombre de mots pour nous
int nLeaves(CSTree t){
    if (t == NULL) return 0;
    if (t->firstChild == NULL ) return 1;
    return 0+nLeaves(t->firstChild)+nLeaves(t->nextSibling);
}

//Fonction qui renvoie le nombre de frère d'un noeud
int nSibling(CSTree t){
    if(t==NULL){return 0;}
    return 1 + nSibling(t->nextSibling);
}

//Fonction qui renvoie le nombre d'enfant direct d'un noeud
int nChildren(CSTree t){
    if(t==NULL){return 0;}
    return nSibling(t->firstChild); 
}

// Fonction récurssive qui insère un mot dans un Cstree en insérant chaque lettre du mot puis en finissant par un \0
CSTree insert(CSTree t, char* word){
    if(t==NULL){
        t = malloc(sizeof(Node));
        t->elem = word[0];
        t->firstChild = NULL;
        t->nextSibling = NULL;          //Creation d'un noeud

        if(word[0]=='\0'){
            return t;
        }
    }

    if(word[0] == t->elem){
        t->firstChild = insert(t->firstChild, word+1);  // Si le noeud où l'on se trouve est notre lettre actuelle, 
                                                        //on descend à son fils pour continuer la suite du mot
    }else{
        t->nextSibling = insert(t->nextSibling, word);  // Sinon on regarde son frere pour essayer d'inserer la lettre actuelle
    }
    
    return t;
}


// Fonction qui utilise un fichier de type dico.txt pour créer un CSTree correspondant à ce fichier
CSTree convertFileToCSTree(char *filename) {
    //printf("function --> convertFileToCSTree\n");
    //printf("%s",filename);
    FILE *file = fopen(filename, "r");
    if (file == NULL) {
        printf("Error opening file : %s", filename);
        exit(ERROR_OPENING_FILE);
    }
    char word[100];
    CSTree t = NULL;
    while (fscanf(file, "%s", word) != EOF) { // On parcourt tout les mots du fichier txt, pour les insérer dans un CS Tree
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


// fonction qui permet de ramplir le tableau du Static Tree, en utilisant le CS Tree
int filltab(ArrayCell* tab,int size,int index,CSTree t){
    if(t==NULL){return size;}

    //stockage du nombre d'enfant et de la taille du tableau à l'instant de l'appel
    int enfant = nChildren(t);
    int oldsize=size;//on stocke la taille à l'instant de l'appel pour pouvoir ensuite contruire les enfants au bon endroit

    
    if(enfant==0){//si il n'y à pas d'enfant on construit le tuple sans se poser de question
        tab[index]=cons(t->elem,NONE,nSibling(t)-1);
    }else{        //si il y a des enfants on construit le tuple en présisant que le premier
                  //enfant se trouve au bout du tableau à l'instant de l'appel (donc à size)
        tab[index]=cons(t->elem,size,nSibling(t)-1);
        size+=enfant;       //on actualise la taille nécéssaire du tableau après l'appel de la fonction
    }
    index+=1;
    size = filltab(tab,size,index,t->nextSibling); //on construit ensuite les frères
    size = filltab(tab,size,oldsize,t->firstChild);//on construit ensuite les enfants (qui se trouve à oldsize au bout du tableau à l'instant de l'appel)

    return size;//on renvoit la taille du tableau afin d'actualiser la position pour les prochains appels récursif    
}

//Fonction qui export un CsTree en Static Tree pour la suite du moteur de jeu
StaticTree exportStaticTree(CSTree t){
    //récupération de la taille de l'arbre
    int sizeOfTree = size(t);
    StaticTree r;
    r.nNodes = sizeOfTree;
    r.nWord = nLeaves(t);
    //reservation mémoire du tableau et remplissage
    ArrayCell* tab = malloc(sizeof(ArrayCell)*sizeOfTree);
    filltab(tab,nSibling(t),0,t);
    r.nodeArray = tab;
    return r;
} 

//Fonction d'affichage d'un static Tree
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


// Fonction qui renvoie un static tree à partir d'un fichier de type dico.txt, en passant par 
// la création du CSTree pui son sexport en Static Tree
StaticTree convertFileToStaticTree(char *filename) {
    return exportStaticTree(convertFileToCSTree(filename));

}



//======================================================
//======================================================

            // For DICTIONNARY LOOKUP

//======================================================
//======================================================

  // Fonction de lecture d'une cellule de tableau dans un fichier lex
ArrayCell readCellInFile(char* filename, int index){
  FILE *file = fopen(filename, "rb");
  if (file == NULL) {
    printf("Error opening file : %s", filename);
    exit(ERROR_OPENING_FILE);
  }

  fseek(file, sizeof(header) + sizeof(ArrayCell)*index, SEEK_SET); // Pour aller a l'index de la cellule cherchee on va 
  ArrayCell cell;                                                  // a la taille du header plus la taille des cellules precedentes
  fread(&cell,sizeof(ArrayCell),1,file);                          // Puis on lit cette cellule avant la renvoyer
  fclose(file);
  return cell;
}



// Fonction recursive qui verifie si un mot est dans le fichier lex
// renvoie 0 si il y est, 1 si c'est un prefixe existant et 2 sinon
// index = index de la case du StaticTree à regarder 
// mot = mot qu'on recherche
int dictionnary_lookup_rec(char* filename, int index, char* mot){ //Le premier index transmis a l'appel de la fonction doit être 0 pour tester depuis le debut du fichier
  ArrayCell cell = readCellInFile(filename, index); // Dans un premier temps on recupere la cellule a l'index indique
  if (cell.elem == mot[0]){   //Si l'element recuperer dans la cellule correspond a la 1ere lettre de notre mot :
    if (mot[0]=='\0'){
      return 0;               // Si c'est la fin du mot on renvoie 0 pour dire que le mot est trouve
    }else{
      return dictionnary_lookup_rec(filename, cell.firstChild, mot+1); // Sinon on continue a chercher le mot en passant a la lettre suivante
    }
  }else{
    if (mot[0]=='\0'){
      return 1;   // Si on arrive a la fin de notre mot, mais qu'il n'a pas de fin de mot dans le dico lex on renvoie 1 pour preciser qu'il s'agit d'un prefixe
    } else if (cell.nSiblings>0){
      return dictionnary_lookup_rec(filename, index+1, mot);  //Si ce n'est pas la fin du mot mais qu'aucune lettre ne corresponde dans le fichier lex on renvoit 2
    }else{
      return 2;
    }
  }
}

// Fonction principale qui appelle dictionnary_lookup_rec, cette fonction verifie si un mot est dans le fichier lex
// renvoie 0 si il y est, 1 si c'est un prefixe existant et 2 sinon
int dictionnary_lookup(char* filename, char* mot) {
    return dictionnary_lookup_rec(filename,0,mot);
}

//Fonction créant le fichier .lex à partir d'un static tree
void convertStaticToLex(char* filename,StaticTree t){
    FILE *file = fopen(filename, "wb");
    if (file == NULL) {
        exit(ERROR_OPENING_FILE);
    }
    //cette partie écrit le header
    header h;
    h.cellules = t.nNodes;
    h.tailleCellule = sizeof(ArrayCell);
    h.mots = t.nWord;
    h.taille = sizeof(header);
    fwrite(&h,sizeof(header),1,file);
    //cette partie ecrit tout les noeuds, un par ligne
    for(int i=0;i<t.nNodes;i++){
      ArrayCell cell = (t.nodeArray[i]);
      fwrite(&cell,sizeof(ArrayCell),1,file);
    }

    fclose(file);
}

// Fonction qui libère la mémoir utilisé par un CS tree
void freeCST(CSTree t){
  if(t == NULL){return;}
  freeCST(t->firstChild);
  freeCST(t->nextSibling);
  free(t);
}

// fonction qui remplace les QU par * dans un mot
// word : mot à modifier
// return : mot modifié
char *remplaceQUdico(char *word) {
  int sizeWordToMalloc = strlen(word);
  for (int i = 0; i < strlen(word); i++) {
    if (word[i] == 'Q' && word[i + 1] == 'U') {
      sizeWordToMalloc--;
    }
  }
  char *wordToMalloc = malloc(sizeWordToMalloc * sizeof(char));
  int j = 0;
  for (int i = 0; i < strlen(word); i++) {
    if (word[i] == 'Q' && word[i + 1] == 'U') {
      wordToMalloc[j] = '*';
      i++;
    } else {
      wordToMalloc[j] = word[i];
    }
    j++;
  }
  return wordToMalloc;
}
