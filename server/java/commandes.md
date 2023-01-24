## Toujours faire attention à son répertoire courant !
## (ici le repertoire courant est le père du repertoire Zoo-ggle, le repertoire du projet)
**Dans le cas de la correction du projet java sans le reste du projet il faudra modifier les chemins**

# Creation des dictionnaires :
    La commande est : cat *fichier* | java -cp "Zoo-ggle\server\java\Dictionaries.jar" fr.uge.DictionaryMaker *langue* *chemin du fichier de stockage (sans extension)* *1 si il faut une décompression, 0 sinon*

    exemple :cat C:\Users\Jlwis\Desktop\wiki-fr.xml | java -cp "Zoo-ggle\server\java\Dictionaries.jar" fr.uge.DictionaryMaker fr dico 0

**a partir d'ici il faut avoir généré un dictionnaire pour que les commandes marchent**

# Recherche de mot :
    La commande est : java -cp "Zoo-ggle\server\java\Dictionaries.jar" fr.uge.jdict.DictionarySearcher *chemin du fichier de stockage (sans extension)* *mot a chercher*

    exemple : java -cp "Zoo-ggle\server\java\Dictionaries.jar" fr.uge.jdict.DictionarySearcher dico yaml:CONSTITUTION

    **attention** : le mot à chercher peut être précédé ou non de "yaml:" pour changer la forme de la sortie de la recherche


# Extraction des fréquences de mot :
    La commande est : java -cp "Zoo-ggle\server\java\Dictionaries.jar" fr.uge.jdict.ChartableMaker *chemin du fichier de stockage (sans extension)*

    exemple : java -cp "Zoo-ggle\server\java\Dictionaries.jar" fr.uge.jdict.ChartableMaker dico


# Extraction de tout les mots :
    La commande est : java -cp "Zoo-ggle\server\java\Dictionaries.jar" fr.uge.jdict.NormalizedExtractor *chemin du fichier de stockage (sans extension)* *(optionnel) parametre,parametre...*

    exemple : java -cp "Zoo-ggle\server\java\Dictionaries.jar" fr.uge.jdict.NormalizedExtractor dico verbe