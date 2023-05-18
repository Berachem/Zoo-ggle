// Importation de la bibliothèque socket.io
const io = require("socket.io")();

// Définition des constantes pour le jeu
const BOARD_SIZE = 4;
const GAME_DURATION = 60;

// Définition de la classe Player
class Player {
  constructor(id) {
    this.id = id;
    this.socket = null;
    this.room = null;
    this.score = 0;
    this.words = [];
  }

  // Fonction pour envoyer un message à un joueur
  send(message) {
    if (this.socket) {
      this.socket.emit("message", message);
    }
  }
}

// Définition de la classe Room
class Room {
  constructor(id) {
    this.id = id;
    this.players = [];
    this.gameStarted = false;
    this.gameTimer = null;
    this.board = null;
    this.solutions = null;
    this.gameDuration = GAME_DURATION;
    this.currentTurn = null;
    this.chatHistory = [];
  }

  // Fonction pour ajouter un joueur à la salle d'attente
  addPlayer(player) {
    if (!this.gameStarted) {
      this.players.push(player);
      player.room = this;
      player.send({ type: "wait" });
      console.log(`Player ${player.id} joined room ${this.id}`);
      if (this.players.length >= 2) {
        this.startGame();
      }
    }
  }

  // Fonction pour retirer un joueur de la salle d'attente
  removePlayer(player) {
    const index = this.players.indexOf(player);
    if (index !== -1) {
      this.players.splice(index, 1);
      player.room = null;
      console.log(`Player ${player.id} left room ${this.id}`);
    }
    if (this.players.length === 0) {
      console.log(`Room ${this.id} is empty, deleting...`);
      delete rooms[this.id];
    }
  }

  // Fonction pour démarrer une partie
  startGame() {
    this.gameStarted = true;
    console.log(`Starting game in room ${this.id}`);
    // TODO: Générer une grille aléatoire et trouver toutes les solutions
    this.board = [
      ["A", "B", "C", "D"],
      ["E", "F", "G", "H"],
      ["I", "J", "K", "L"],
      ["M", "N", "O", "P"],
    ];
    this.solutions = [["ABCD", "1", "2", "3", "4"]];
    this.players.forEach((player) => {
      player.send({
        type: "start",
        board: this.board,
        gameDuration: this.gameDuration,
        currentTurn: this.currentTurn ? this.currentTurn.id : null,
      });
    });
    this.startTimer();
  }

  // Fonction pour démarrer le timer de la partie
  startTimer() {
    let remainingTime = this.gameDuration;
    this.gameTimer = setInterval(() => {
      remainingTime--;
      if (remainingTime === 0) {
        this.endGame();
      }
      this.players.forEach((player) => {
        player.send({
          type: "timer",
          remainingTime,
        });
      });
    }, 1000);
  }

  // Fonction pour terminer la partie
  endGame() {
    clearInterval(this.gameTimer);
    this.gameStarted = false;
    this.players.forEach((player) => {
      player.send({
        type: "end",
        scores: this.players.map((p) => ({ id: p.id, score: p.score })),
      });
    });
  }
}

// Définition de la liste des salles d'attente
const rooms = {};

// Fonction pour trouver une salle d'attente libre
function findFreeRoom() {
  let roomId = 1;
  while (rooms[roomId]) {
    roomId++;
  }
  return roomId;
}

// Fonction pour trouver une salle d'attente par son id
function findRoomById(roomId) {
  return rooms[roomId];
}

// Fonction pour trouver un joueur par son id
function findPlayerById(playerId) {
  for (const roomId in rooms) {
    const room = rooms[roomId];
    for (const player of room.players) {
      if (player.id === playerId) {
        return player;
      }
    }
  }
  return null;
}

// Fonction pour trouver un joueur par son socket
function findPlayerBySocket(socket) {
  for (const roomId in rooms) {
    const room = rooms[roomId];
    for (const player of room.players) {
      if (player.socket === socket) {
        return player;
      }
    }
  }
  return null;
}

// Fonction pour créer une salle d'attente
function createRoom(socket) {
  const room = new Room(findFreeRoom());
  rooms[room.id] = room;
  const player = new Player(socket.id);
  player.socket = socket;
  room.addPlayer(player);
  return room;
}

// Fonction pour rejoindre une salle d'attente
function joinRoom(socket, roomId) {
  const room = findRoomById(roomId);
  if (room) {
    const player = new Player(socket.id);
    player.socket = socket;
    room.addPlayer(player);
    return room;
  }
  return null;
}

// Fonction pour quitter une salle d'attente
function leaveRoom(socket) {
  const player = findPlayerBySocket(socket);
  if (player && player.room) {
    player.room.removePlayer(player);
  }
}

/* 

Pour que les autres joueurs puissent voir la room créée par un utilisateur sur votre site, vous pouvez utiliser une approche basée sur un serveur. Lorsqu'un utilisateur crée une room, vous pouvez envoyer une requête au serveur pour créer la room, avec les informations nécessaires telles que le nom de la room et l'ID du créateur. Le serveur peut alors stocker ces informations dans une base de données ou une autre structure de stockage appropriée.

Les autres joueurs peuvent ensuite accéder à la liste des rooms disponibles sur votre site et sélectionner la room créée par l'utilisateur en question. Lorsqu'un joueur sélectionne une room, vous pouvez envoyer une requête au serveur pour rejoindre la room, avec les informations nécessaires telles que l'ID du joueur. Le serveur peut alors ajouter le joueur à la liste des joueurs de la room, et transmettre cette information aux autres joueurs de la room.

Il est important de noter que cela nécessite une communication en temps réel entre les différents joueurs et le serveur. Pour cela, vous pouvez utiliser des sockets comme nous l'avons vu précédemment, afin de permettre une communication bidirectionnelle en temps réel entre les joueurs et le serveur.



En général, il est courant de créer un socket pour chaque joueur dès la connexion. Cela permet à chaque joueur d'être prêt à recevoir des messages à tout moment, même s'ils ne sont pas encore impliqués dans une partie.

*/

