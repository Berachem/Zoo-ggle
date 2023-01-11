## Toujours faire attention à son répertoire courant !
## (ici le repertoire courant est le père du repertoire Zoo-ggle, le repertoire du projet)


# Creation des dictionnaires :
    La commande est : java -classpath "Zoo-ggle\server\java\dico\target\classes" fr.uge.jdict.DictionaryMake *chemin vers le dossier xml* *langue* *nom du fichier de stockage (sans extension)*

    exemple : java -classpath "Zoo-ggle\server\java\dico\target\classes" fr.uge.DictionaryMaker "C:\Users\Jlwis\Desktop\wiki-fr.xml" fr dico

**a partir d'ici il faut avoir généré un dictionnaire pour que les commandes marchent**

# Recherche de mot :
    La commande est : java -classpath "Zoo-ggle\server\java\dico\target\classes" fr.uge.jdict.DictionarySearcher *chemin vers le dossier de recherche* *mot a chercher*

    exemple : java -classpath "Zoo-ggle\server\java\dico\target\classes" fr.uge.jdict.DictionarySearcher "Zoo-ggle\server\java\dico\dico" yaml:CONSTITUTION

    **attention** : le mot à chercher peut être précédé ou non de "yaml:" pour changer la forme de la sortie de la recherche


# Extraction des fréquences de mot :
    La commande est : java -classpath "Zoo-ggle\server\java\dico\target\classes" fr.uge.jdict.ChartableMaker *chemin vers le dossier de recherche*

    exemple : java -classpath "Zoo-ggle\server\java\dico\target\classes" fr.uge.jdict.ChartableMaker "Zoo-ggle\server\java\dico\dico"


# Extraction de tout les mots :
    La commande est : java -classpath "Zoo-ggle\server\java\dico\target\classes" fr.uge.jdict.NormalizedExtractor *chemin vers le dossier de recherche* *(optionnel) parametre,parametre...*

    exemple : java -classpath "Zoo-ggle\server\java\dico\target\classes" fr.uge.jdict.NormalizedExtractor "Zoo-ggle\server\java\dico\dico" adjectif,verbe