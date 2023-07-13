
##  Technologie utilisée
[![My Skills](https://skillicons.dev/icons?i=python)](https://skillicons.dev)

## Objectif de cette partie

Assurer le déroulement des parties entre les joueurs et leur permettre de communiquer via un chat.

## Installation

Pour lancer Chatac : 

En partant du principe que Python 3 est présent sur votre système.
1) Placer vous dans le dossier websocket : `cd Zoo-ggle\backend\websocket`
2) Afin d'installer chatac, lors de la première utilisation éxécuter les commandes suivantes : 
- `python -m venv venv`
- `.\venv\Scripts\activate.bat` : Attention cette peut différer en fonction de votre terminal, référez vous à cette [documentation](https://docs.python.org/3/library/venv.html#how-venvs-work) si cela ne fonctionne pas pour vous.
- `pip install --editable .`
3) Puis pour lancer le websocket : `chatac-server -i localhost -p 8090`, dans notre cas nous le websocket sur le port 8090.


Il se peut qu'il manque certaines librairies de python dans ce cas, il vosu suffira d'installer les librairies indiquer par le message d'erreur avec pip