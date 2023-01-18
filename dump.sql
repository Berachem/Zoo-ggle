CREATE TABLE B_Joueur(
   Id_Joueur INT AUTO_INCREMENT,
   Mail VARCHAR(320),
   MotDePasse VARCHAR(128),
   Pseudo VARCHAR(30),
   Description VARCHAR(400),
   Logo VARCHAR(64),
   DateCreationCompte DATETIME,
   ProfilPublic TINYINT,
   PRIMARY KEY(Id_Joueur),
   UNIQUE(Pseudo)
);

CREATE TABLE B_Partie(
   Id_Partie INT AUTO_INCREMENT,
   NomPartie VARCHAR(50),
   NombreMotPossible INT,
   Grille VARCHAR(200),
   DatePartie DATETIME,
   TailleGrille INT,
   Id_Chef INT NOT NULL,
   Mode INT,
   PRIMARY KEY(Id_Partie),
   FOREIGN KEY(Id_Chef) REFERENCES B_Joueur(Id_Joueur)
);

CREATE TABLE B_Message(
   IdMessage INT AUTO_INCREMENT,
   Contenu VARCHAR(200),
   DateMessage DATETIME,
   Id_Partie INT NOT NULL,
   Id_Joueur INT NOT NULL,
   PRIMARY KEY(IdMessage),
   FOREIGN KEY(Id_Partie) REFERENCES B_Partie(Id_Partie),
   FOREIGN KEY(Id_Joueur) REFERENCES B_Joueur(Id_Joueur)
);

CREATE TABLE B_Jouer(
   Id_Joueur INT,
   Id_Partie INT,
   Score INT,
   TempsMoyenReponse DECIMAL(15,2),
   PRIMARY KEY(Id_Joueur, Id_Partie),
   FOREIGN KEY(Id_Joueur) REFERENCES B_Joueur(Id_Joueur),
   FOREIGN KEY(Id_Partie) REFERENCES B_Partie(Id_Partie)
);

CREATE TABLE B_Proposer(
   Id_Joueur INT,
   Id_Partie INT,
   Mot VARCHAR(200),
   DateProposition DATETIME,
   EstValide TINYINT,
   PRIMARY KEY(Id_Joueur, Id_Partie),
   FOREIGN KEY(Id_Joueur) REFERENCES B_Joueur(Id_Joueur),
   FOREIGN KEY(Id_Partie) REFERENCES B_Partie(Id_Partie)
);

CREATE TABLE B_MessagePrivé(
   Id_Joueur INT,
   IdMessagePrivé INT AUTO_INCREMENT,
   Contenu VARCHAR(200),
   DateMessagePrivé DATETIME,
   Id_Joueur_1 INT NOT NULL,
   PRIMARY KEY(Id_Joueur),
   UNIQUE(Id_Joueur_1),
   UNIQUE(IdMessagePrivé),
   FOREIGN KEY(Id_Joueur) REFERENCES B_Joueur(Id_Joueur),
   FOREIGN KEY(Id_Joueur_1) REFERENCES B_Joueur(Id_Joueur)
);
