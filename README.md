# 🦁 Zoo-ggle : un dérivé du jeu Boggle

<img src="https://i.ibb.co/mhH0Nrb/image.png">

<!--
<table border="0">
    <tr>
        <td>
            <img src="https://i.ibb.co/mhH0Nrb/image.png">
            ____________________________________
        </td>
        <td>
            <img src="./screenshots/Remise.png">
            ___________________________________________________________________________________________________________________________________
        </td>
        <td>
            <img src="./screenshots/Remise.png">
            ___________________________________________________________________________________________________________________________________
        </td>
        <td>
            <img src="./screenshots/Graphique.png">
            _______________________________________________________________________
        </td>
    </tr>
</table>
-->


Zoo-ggle est un projet transversal de développement d'un site web mettant en œuvre plusieurs langages de programmation, avec pour thème principal les animaux. Ce jeu vous permet de jouer en ligne avec vos amis et de mettre votre vocabulaire à l'épreuve ! Avec un mode réaliste et idéaliste ! 

## Technologies utilisées

Le site web Zoo-ggle utilise une combinaison de langages de programmation côté client et côté serveur pour offrir une expérience complète et dynamique. Voici les principales technologies utilisées dans ce projet :

### Côté client
[![My Skills](https://skillicons.dev/icons?i=react,ts,js,html,tailwind)](https://skillicons.dev)

- ReactJS : Une bibliothèque JavaScript pour la construction d'interfaces utilisateur interactives.
- TypeScript : Un sur-ensemble de JavaScript qui ajoute des fonctionnalités de typage statique.
- HTML : Le langage de balisage standard pour la création de pages web.
- CSS : Le langage de feuille de style utilisé pour la mise en forme des éléments HTML.
- JavaScript : Le langage de programmation de script utilisé pour rendre les pages web interactives.
- TailwindCSS : Un framework CSS utilisé pour faciliter le développement et la personnalisation de l'interface utilisateur.

### Côté serveur
[![My Skills](https://skillicons.dev/icons?i=php,python,mysql)](https://skillicons.dev)
- Python : Un langage de programmation polyvalent utilisé pour la mise en œuvre d'un système de websocket permettant la communication en temps réel entre les clients et le serveur.
- PHP : Un langage de script côté serveur utilisé pour la logique métier et la gestion des requêtes.
- MySQL : Un système de gestion de base de données relationnelle utilisé pour stocker et récupérer les données du jeu.

### Autres composants
[![My Skills](https://skillicons.dev/icons?i=c,java)](https://skillicons.dev)

En plus des langages mentionnés ci-dessus, Zoo-ggle utilise également d'autres composants essentiels pour son fonctionnement :

- Algorithmes de vérification en langage C : Ces algorithmes ont été développés en langage C pour garantir des performances optimales lors de la vérification des mots sur les grilles de jeu.
- Dictionnaire de mots en Java : Le dictionnaire de mots utilisé pour valider les mots saisis par les joueurs a été développé en Java, offrant ainsi une recherche rapide et efficace des mots valides.

## Installation et utilisation

Pour exécuter le projet Zoo-ggle sur votre machine locale, suivez les étapes suivantes :

1. Assurez-vous d'avoir installé Node.js, npm, Python, PHP et MySQL sur votre machine.
2. Clonez ce dépôt de projet sur votre machine : `git clone https://github.com/Berachem/Zoo-ggle.git`
3. Accédez au répertoire du projet : `cd Zoo-ggle`
4. Installez les dépendances nécessaires pour le côté client en exécutant la commande : `npm install`
5. Installez les dépendances nécessaires pour le côté serveur en exécutant la commande : `pip install -r requirements.txt`
6. Configurez la base de données MySQL en utilisant le dump SQL fourni dans le dossier et mettez le sur votre Laragon ou Xampp en local.
7. Démarrez le serveur de développement pour le côté client en exécutant la commande : `npm start`
8. Exécutez la commande : `python -m venv venv` puis ` .\venv\Scripts\activate.ps1` pour activer l'environnement virtuel Python.
9. Démarrez le serveur de développement pour le côté serveur en exécutant la commande : `chatac-server -i localhost -p 8090`
10. Ouvrez votre navigateur et accédez à l'adresse : `http://localhost:3000`
11. Vous pouvez maintenant jouer à Zoo-ggle !

(__Bonus :__ Vous pouvez aussi utiliser un tunnel HTTP pour rendre votre serveur accessible depuis l'extérieur en utilisant un service comme [ngrok](https://ngrok.com/))


### Equipe de développement

Ce projet a été réalisé dans un cadre d'un projet universitaire en deuxième année de BUT Informatique à l'IUT de Marne-la-vallée. 

L'équipe de développement est composée de :

- [Berachem "MBera" MARKRIA ](https://github.com/Berachem/ "Berachem")
- [Joshua "Kilouhardi" LEMOINE](https://github.com/LemoineJoshua "Joshua")
- [Lucas "Liixray" LEVEQUE](https://github.com/Liixray "Lucas")

### Documents de conception

[Note d'intention.pdf](https://github.com/Berachem/Zoo-ggle/files/9818120/Note.d.intention.pdf)

[![My Skills](https://skillicons.dev/icons?i=figma)](https://www.figma.com/file/ih2HV31Co3sSWCgXnjEdbG/Zoo-ggle?type=design&node-id=0%3A1&t=tIQLUInMQl6C3LwK-1) 



