
# !!!! PLACEZ VOUS DANS LE REPERTOIRE 'sources' PUIS EXECUTEZ CES COMMANDES !!!!
# Si vous êtes sur Linux (sous Bash), vous devez utiliser "./" avant chaque commande


## dictionnary_build.c
gcc -g dictionnary.c dictionnary_build.c -o dictionnary_build  ; 
.\dictionnary_build ../../data/listeMot.txt ../../data/listeMot.lex

## grid_path.c
gcc -g grid.c grid_path.c -o grid_path  ; 
.\grid_path OUI 4 4 A L M L O P M I Y U O E R E T QU 
.\grid_path LPU 4 4 A L M L O P M I Y U O E R E T Y  

## grid_build.c
gcc -g grid.c grid_build.c -o grid_build  ;
.\grid_build ../../data/frequences.txt 4 4

## dictionnary_lookup.c
gcc -g dictionnary.c  dictionnary_lookup.c -o dictionnary_lookup  ; 
.\dictionnary_lookup ../../data/listeMot.lex BONJ 

## solve.c 
gcc -g dictionnary.c grid.c solve.c -o solve  ; 
.\solve ../../data/listeMot.lex 4 4 4 A L M L O P M I Y U O E R E T Y

## score_by_lenght
gcc score_by_lenght.c -o score_by_lenght  ; 
.\score_by_lenght OUI VIE

## score_by_letters_weight
### Cette implémentation du score n'a pas été finalisée donc elle ne fonctionne pas. Néanmoins, l'idée est (était) de calculer le score en fonction du poids des lettres.