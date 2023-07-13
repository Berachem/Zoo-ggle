CREATE TABLE B_Joueur(
   IdJoueur INT AUTO_INCREMENT,
   Mail VARCHAR(320),
   MotDePasse VARCHAR(128),
   Pseudo VARCHAR(30),
   Description VARCHAR(400),
   Logo VARCHAR(64),
   DateCreationCompte DATETIME,
   ProfilPublic TINYINT,
   DateDerniereConnexion DATETIME,
   EstAutorise TINYINT,
   EstAdmin TINYINT,
   PRIMARY KEY(IdJoueur),
   UNIQUE(Mail),
   UNIQUE(Pseudo)
);

CREATE TABLE B_Partie(
   IdPartie INT AUTO_INCREMENT,
   NomPartie VARCHAR(50),
   LangueDico CHAR(3),
   Grille VARCHAR(200),
   DateDebutPartie DATETIME,
   DateFinPartie DATETIME,
   TailleGrille INT,
   NombreMotsPossibles INT,
   Mode INT,
   EstPublic TINYINT,
   NombreJoueursMax INT,
   IdChef INT NOT NULL,
   PRIMARY KEY(IdPartie),
   FOREIGN KEY(IdChef) REFERENCES B_Joueur(IdJoueur)
);

CREATE TABLE B_Message(
   IdMessage INT AUTO_INCREMENT,
   Contenu VARCHAR(200),
   DateMessage DATETIME,
   IdPartie INT NOT NULL,
   IdJoueur INT NOT NULL,
   PRIMARY KEY(IdMessage),
   FOREIGN KEY(IdPartie) REFERENCES B_Partie(IdPartie),
   FOREIGN KEY(IdJoueur) REFERENCES B_Joueur(IdJoueur)
);

CREATE TABLE B_MessagePrive(
   IdMessagePrive INT AUTO_INCREMENT,
   ContenuMessagePrive VARCHAR(200),
   DateMessagePrive DATE,
   IdJoueur INT NOT NULL,
   IdJoueur_1 INT NOT NULL,
   PRIMARY KEY(IdMessagePrive),
   FOREIGN KEY(IdJoueur) REFERENCES B_Joueur(IdJoueur),
   FOREIGN KEY(IdJoueur_1) REFERENCES B_Joueur(IdJoueur)
);

CREATE TABLE B_Mot(
   Libelle VARCHAR(200),
   PRIMARY KEY(Libelle)
);

CREATE TABLE B_Jouer(
   IdJoueur INT,
   IdPartie INT,
   Score INT,
   PRIMARY KEY(IdJoueur, IdPartie),
   FOREIGN KEY(IdJoueur) REFERENCES B_Joueur(IdJoueur),
   FOREIGN KEY(IdPartie) REFERENCES B_Partie(IdPartie)
);

CREATE TABLE B_Proposer(
   IdJoueur INT,
   IdPartie INT,
   Libelle VARCHAR(200),
   DateProposition DATETIME,
   EstValide TINYINT,
   PRIMARY KEY(IdJoueur, IdPartie, Libelle),
   FOREIGN KEY(IdJoueur) REFERENCES B_Joueur(IdJoueur),
   FOREIGN KEY(IdPartie) REFERENCES B_Partie(IdPartie),
   FOREIGN KEY(Libelle) REFERENCES B_Mot(Libelle)
);

CREATE TABLE B_Authentification(
   IdAuth INT AUTO_INCREMENT,
   Token VARCHAR(128),
   DateExpiration DATETIME,
   IdJoueur INT NOT NULL,
   PRIMARY KEY(IdAuth),
   FOREIGN KEY(IdJoueur) REFERENCES B_Joueur(IdJoueur)
);
