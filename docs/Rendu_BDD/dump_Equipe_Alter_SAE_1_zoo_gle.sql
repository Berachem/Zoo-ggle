-- phpMyAdmin SQL Dump
-- version 4.6.6deb4+deb9u2
-- https://www.phpmyadmin.net/
--
-- Client :  sqletud.u-pem.fr
-- Généré le :  Sam 21 Janvier 2023 à 20:12
-- Version du serveur :  5.7.30-log
-- Version de PHP :  7.0.33-0+deb9u12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `berachem.markria_db`
--

-- --------------------------------------------------------

--
-- Structure de la table `B_Authentification`
--

CREATE TABLE `B_Authentification` (
  `IdAuth` int(11) NOT NULL,
  `Token` varchar(128) DEFAULT NULL,
  `DateExpiration` datetime DEFAULT NULL,
  `IdJoueur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Authentification`
--

INSERT INTO `B_Authentification` (`IdAuth`, `Token`, `DateExpiration`, `IdJoueur`) VALUES
(1, 'becfa54d9d42cb03394fd4f0ab28547ed37e6ebef44b33470c48fe2af4942814', '2023-01-21 18:41:26', 23),
(2, 'afe9b16825e67f8e230d2a8e89bd455a6b56e94f5767f1ff47a18cd04678a7d9', '2023-01-21 21:00:27', 13),
(3, 'b960371dbf5581d5dbb9981d9520e0c2b0914b6018087cbc61336590bbb456b3', '2023-01-21 21:00:31', 22),
(4, 'af67574152e6eefa0fa05fd6140301346a5ee4401177235bda1b799ee0d8103e', '2023-01-21 21:00:49', 23);

-- --------------------------------------------------------

--
-- Structure de la table `B_Jouer`
--

CREATE TABLE `B_Jouer` (
  `IdJoueur` int(11) NOT NULL,
  `IdPartie` int(11) NOT NULL,
  `Score` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Jouer`
--

INSERT INTO `B_Jouer` (`IdJoueur`, `IdPartie`, `Score`) VALUES
(22, 34, 12),
(22, 35, 19),
(23, 33, 8),
(23, 35, 20);

-- --------------------------------------------------------

--
-- Structure de la table `B_Joueur`
--

CREATE TABLE `B_Joueur` (
  `IdJoueur` int(11) NOT NULL,
  `Mail` varchar(320) DEFAULT NULL,
  `MotDePasse` varchar(128) DEFAULT NULL,
  `Pseudo` varchar(30) DEFAULT NULL,
  `Description` varchar(400) DEFAULT NULL,
  `Logo` varchar(64) DEFAULT NULL,
  `DateCreationCompte` datetime DEFAULT NULL,
  `ProfilPublic` tinyint(4) DEFAULT NULL,
  `DateDerniereConnexion` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Joueur`
--

INSERT INTO `B_Joueur` (`IdJoueur`, `Mail`, `MotDePasse`, `Pseudo`, `Description`, `Logo`, `DateCreationCompte`, `ProfilPublic`, `DateDerniereConnexion`) VALUES
(1, 'bera@gmail.com', 'd4c11669cc2cbab33bc256c245cb9ae6e911cbf1c89ec6b20f2f68c4bcfd72cc', 'bera', '', NULL, '2023-01-18 23:25:19', 1, '2023-01-19 21:32:44'),
(2, 'beraaaa@gmail.com', '3b27e5ec3328a37c535329bb5344babb7b4b87a4878e09b7f859dd5fd12d1177', 'beraaaa', 'beraaaa', NULL, '2023-01-19 13:24:52', 0, '2023-01-19 15:46:33'),
(7, 'berachem.bidule@gmail.com', '6bea537bf3af29d246a24a0fcc159a2685ad045edf89709ae2b2b0bb49033d29', 'bidule', 'dsfds', NULL, '2023-01-20 17:38:58', 1, '2023-01-20 20:22:49'),
(8, 'oui@gmail.com', '017b93f406f4399a02d9b17fb178fac73b441eb42e4d8847f58295beedaa21de', 'Lucas', 'Je suis un test', NULL, '2023-01-20 17:41:10', 1, '2023-01-20 17:44:35'),
(9, 'berachem.machin@gmail.com', '17febc00139b9f8f44b95e704dc3cdf22619a0732ad4c1d0ebbcc81afb44c3fa', 'machin', 'dfds', NULL, '2023-01-20 18:34:11', 0, '2023-01-20 21:02:27'),
(12, 'bogglefan@aol.fr', '017b93f406f4399a02d9b17fb178fac73b441eb42e4d8847f58295beedaa21de', 'Test2', '', NULL, '2023-01-20 23:02:50', 0, '2023-01-20 23:08:53'),
(13, 'berachem.France93@gmail.com', 'db9d0a7090ad603e3d6d0fe98274e46d4a681d38583ec592624a76509331646a', 'France93@', 'France93@', NULL, '2023-01-20 23:03:01', 0, '2023-01-21 20:00:27'),
(14, 'Markria93@gmail.com', '27309c00cfe69f7d2411af1906490f53195cef436f6bba86ceda2c3a94b5c77c', 'Markria93@', 'Markria93@', NULL, '2023-01-21 00:06:17', 1, '2023-01-21 00:40:51'),
(22, 'lucas26.leveque@gmail.com', 'ec010e9c19387634eb8f3858374970daa449b2db8880f10da9ccd3e8b0bf8e0f', 'Lucas_', 'J\'adore le Boggle', NULL, '2023-01-21 16:29:52', 1, '2023-01-21 20:00:31'),
(23, 'berachem.bot@gmail.com', '0f5c0c0c6a11a98ccb3dcc1aaccf65c69137c22c1a1b73c119755f117d20f607', 'Berachem93--', 'L\'île de la Cité au XVIIIe siècle, par de Nicolas Raguenet', NULL, '2023-01-21 17:41:20', 0, '2023-01-21 20:00:49');

-- --------------------------------------------------------

--
-- Structure de la table `B_Message`
--

CREATE TABLE `B_Message` (
  `IdMessage` int(11) NOT NULL,
  `Contenu` varchar(200) DEFAULT NULL,
  `DateMessage` datetime DEFAULT NULL,
  `IdPartie` int(11) NOT NULL,
  `IdJoueur` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Structure de la table `B_MessagePrive`
--

CREATE TABLE `B_MessagePrive` (
  `IdMessagePrive` int(11) NOT NULL,
  `ContenuMessagePrive` varchar(200) DEFAULT NULL,
  `DateMessagePrive` date DEFAULT NULL,
  `IdJoueur` int(11) NOT NULL,
  `IdJoueur_1` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Message`
--

INSERT INTO `B_Message` (`IdMessage`, `Contenu`, `DateMessage`, `IdPartie`, `IdJoueur`) VALUES
(1, 'Salut Bera ! :)', '2023-01-21 20:06:01', 35, 22),
(2, 'Salut mon ami de Zoo-ggle !', '2023-01-21 20:06:30', 35, 23);

-- --------------------------------------------------------

--
-- Structure de la table `B_Mot`
--

CREATE TABLE `B_Mot` (
  `Libelle` varchar(200) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Mot`
--

INSERT INTO `B_Mot` (`Libelle`) VALUES
(''),
('AI'),
('AIR'),
('CA'),
('CALIS'),
('CALO'),
('CIA'),
('CLOS'),
('DE'),
('DES'),
('DIS'),
('DIT'),
('DREAD'),
('DRED'),
('E'),
('FA'),
('FALAIS'),
('FOSI'),
('FRESSIN'),
('FRESSSI'),
('FY'),
('GI'),
('IL'),
('ILS'),
('LA'),
('LAINE'),
('LAIS'),
('LAISA'),
('LE'),
('LEROI'),
('LES'),
('LF'),
('LIE'),
('LIN'),
('LINA'),
('LIS'),
('LO'),
('LOS'),
('LOSA'),
('LYS'),
('NA'),
('NAIS'),
('NARNIA'),
('NE'),
('NESI'),
('NI'),
('NIER'),
('NIL'),
('NU'),
('NUE'),
('NUIR'),
('P'),
('PA'),
('PAIN'),
('PAR'),
('PE'),
('PI'),
('PIE'),
('PINA'),
('PRIA'),
('PRIS'),
('RAIN'),
('RAIS'),
('RALE'),
('RAT'),
('RE'),
('REIN'),
('RES'),
('RESO'),
('RIA'),
('RIEN'),
('RIO'),
('RIS'),
('ROI'),
('ROT'),
('SA'),
('SAILC'),
('SE'),
('SEIN'),
('SERE'),
('SERIE'),
('SERIEES'),
('SERIES'),
('SERIN'),
('SERS'),
('SES'),
('SI'),
('SIN'),
('SO'),
('SOI'),
('SOIN'),
('SOINE'),
('SOINIER'),
('SOIS'),
('SOO'),
('SOR'),
('SOSI'),
('SYLOS'),
('TIR'),
('TOIT'),
('TOLE'),
('TORD'),
('TTOI');

-- --------------------------------------------------------

--
-- Structure de la table `B_Partie`
--

CREATE TABLE `B_Partie` (
  `IdPartie` int(11) NOT NULL,
  `NomPartie` varchar(50) DEFAULT NULL,
  `LangueDico` char(3) DEFAULT NULL,
  `Grille` varchar(200) DEFAULT NULL,
  `DateDebutPartie` datetime DEFAULT NULL,
  `DateFinPartie` datetime DEFAULT NULL,
  `TailleGrille` int(11) DEFAULT NULL,
  `NombreMotsPossibles` int(11) DEFAULT NULL,
  `Mode` int(11) DEFAULT NULL,
  `EstPublic` tinyint(4) DEFAULT NULL,
  `NombreJoueursMax` int(11) DEFAULT NULL,
  `IdChef` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Partie`
--

INSERT INTO `B_Partie` (`IdPartie`, `NomPartie`, `LangueDico`, `Grille`, `DateDebutPartie`, `DateFinPartie`, `TailleGrille`, `NombreMotsPossibles`, `Mode`, `EstPublic`, `NombreJoueursMax`, `IdChef`) VALUES
(33, 'Salut', 'FRA', 'O A A E O O S I S F L A S Y A C', '2023-01-21 20:01:32', '2023-01-21 20:03:50', 4, 209, 0, 1, 1, 23),
(34, 'Partie Solo de Lucas', 'FRA', 'A P N N A R A A I N A A S C A I', '2023-01-21 20:01:34', '2023-01-21 20:03:48', 4, 344, 0, 1, 1, 22),
(35, 'Partie contre Berachem', 'FRA', 'L S O O E R I I E E N U S I E I', '2023-01-21 20:05:01', '2023-01-21 20:07:32', 4, 393, 0, 1, 2, 22);

-- --------------------------------------------------------

--
-- Structure de la table `B_Proposer`
--

CREATE TABLE `B_Proposer` (
  `IdJoueur` int(11) NOT NULL,
  `IdPartie` int(11) NOT NULL,
  `Libelle` varchar(200) NOT NULL,
  `DateProposition` datetime DEFAULT NULL,
  `EstValide` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Contenu de la table `B_Proposer`
--

INSERT INTO `B_Proposer` (`IdJoueur`, `IdPartie`, `Libelle`, `DateProposition`, `EstValide`) VALUES
(22, 34, 'CIA', '2023-01-21 20:03:20', 1),
(22, 34, 'NA', '2023-01-21 20:03:06', 1),
(22, 34, 'NAIS', '2023-01-21 20:02:33', 1),
(22, 34, 'NARNIA', '2023-01-21 20:03:13', 0),
(22, 34, 'NI', '2023-01-21 20:01:52', 1),
(22, 34, 'PAIN', '2023-01-21 20:02:15', 1),
(22, 34, 'PAR', '2023-01-21 20:01:48', 1),
(22, 34, 'PRIA', '2023-01-21 20:02:45', 1),
(22, 34, 'PRIS', '2023-01-21 20:02:41', 1),
(22, 34, 'RAIN', '2023-01-21 20:02:18', 1),
(22, 34, 'RAIS', '2023-01-21 20:02:27', 1),
(22, 34, 'RIA', '2023-01-21 20:03:28', 1),
(22, 34, 'RIS', '2023-01-21 20:01:55', 1),
(22, 35, 'LES', '2023-01-21 20:05:07', 1),
(22, 35, 'NU', '2023-01-21 20:05:48', 0),
(22, 35, 'NUE', '2023-01-21 20:05:51', 0),
(22, 35, 'NUIR', '2023-01-21 20:05:55', 0),
(22, 35, 'REIN', '2023-01-21 20:05:19', 1),
(22, 35, 'RIEN', '2023-01-21 20:05:22', 1),
(22, 35, 'RIO', '2023-01-21 20:06:19', 1),
(22, 35, 'RIS', '2023-01-21 20:06:17', 1),
(22, 35, 'SEIN', '2023-01-21 20:05:43', 1),
(22, 35, 'SERE', '2023-01-21 20:06:31', 1),
(22, 35, 'SERIE', '2023-01-21 20:06:36', 1),
(22, 35, 'SERIES', '2023-01-21 20:07:06', 1),
(22, 35, 'SERIN', '2023-01-21 20:06:41', 1),
(22, 35, 'SI', '2023-01-21 20:06:07', 1),
(22, 35, 'SIN', '2023-01-21 20:06:04', 1),
(22, 35, 'SOI', '2023-01-21 20:05:24', 1),
(22, 35, 'SOIN', '2023-01-21 20:07:31', 1),
(22, 35, 'SOR', '2023-01-21 20:05:11', 1),
(23, 33, 'AI', '2023-01-21 20:02:30', 1),
(23, 33, 'CA', '2023-01-21 20:01:37', 0),
(23, 33, 'CALIS', '2023-01-21 20:03:03', 0),
(23, 33, 'CALO', '2023-01-21 20:02:19', 0),
(23, 33, 'CLOS', '2023-01-21 20:03:14', 0),
(23, 33, 'FA', '2023-01-21 20:01:41', 1),
(23, 33, 'FALAIS', '2023-01-21 20:02:28', 0),
(23, 33, 'FOSI', '2023-01-21 20:03:20', 0),
(23, 33, 'FY', '2023-01-21 20:01:58', 0),
(23, 33, 'LA', '2023-01-21 20:01:39', 1),
(23, 33, 'LAIS', '2023-01-21 20:02:09', 0),
(23, 33, 'LAISA', '2023-01-21 20:02:52', 0),
(23, 33, 'LF', '2023-01-21 20:01:56', 0),
(23, 33, 'LO', '2023-01-21 20:03:22', 1),
(23, 33, 'LOS', '2023-01-21 20:03:30', 1),
(23, 33, 'LOSA', '2023-01-21 20:03:26', 0),
(23, 33, 'SA', '2023-01-21 20:01:47', 1),
(23, 33, 'SAILC', '2023-01-21 20:03:44', 0),
(23, 33, 'SI', '2023-01-21 20:01:53', 1),
(23, 33, 'SO', '2023-01-21 20:01:51', 1),
(23, 33, 'SOSI', '2023-01-21 20:02:04', 0),
(23, 33, 'SYLOS', '2023-01-21 20:02:48', 0),
(23, 35, '', '2023-01-21 20:05:34', 1),
(23, 35, 'LE', '2023-01-21 20:05:40', 1),
(23, 35, 'LEROI', '2023-01-21 20:06:53', 0),
(23, 35, 'NE', '2023-01-21 20:05:26', 1),
(23, 35, 'NESI', '2023-01-21 20:06:09', 0),
(23, 35, 'NIER', '2023-01-21 20:06:05', 1),
(23, 35, 'NU', '2023-01-21 20:05:21', 0),
(23, 35, 'NUE', '2023-01-21 20:05:23', 0),
(23, 35, 'REIN', '2023-01-21 20:05:12', 1),
(23, 35, 'RESO', '2023-01-21 20:05:45', 0),
(23, 35, 'RIS', '2023-01-21 20:05:14', 1),
(23, 35, 'ROI', '2023-01-21 20:05:34', 1),
(23, 35, 'SEIN', '2023-01-21 20:05:56', 1),
(23, 35, 'SERIEES', '2023-01-21 20:07:17', 1),
(23, 35, 'SERIES', '2023-01-21 20:07:12', 1),
(23, 35, 'SERIN', '2023-01-21 20:06:46', 1),
(23, 35, 'SERS', '2023-01-21 20:05:51', 1),
(23, 35, 'SI', '2023-01-21 20:05:19', 1),
(23, 35, 'SIN', '2023-01-21 20:05:54', 1),
(23, 35, 'SOINE', '2023-01-21 20:06:38', 0),
(23, 35, 'SOINIER', '2023-01-21 20:06:19', 0),
(23, 35, 'SOO', '2023-01-21 20:07:24', 0);

--
-- Index pour les tables exportées
--

--
-- Index pour la table `B_Authentification`
--
ALTER TABLE `B_Authentification`
  ADD PRIMARY KEY (`IdAuth`),
  ADD KEY `IdJoueur` (`IdJoueur`);

--
-- Index pour la table `B_Jouer`
--
ALTER TABLE `B_Jouer`
  ADD PRIMARY KEY (`IdJoueur`,`IdPartie`),
  ADD KEY `IdPartie` (`IdPartie`);

--
-- Index pour la table `B_Joueur`
--
ALTER TABLE `B_Joueur`
  ADD PRIMARY KEY (`IdJoueur`),
  ADD UNIQUE KEY `Mail` (`Mail`),
  ADD UNIQUE KEY `Pseudo` (`Pseudo`);

--
-- Index pour la table `B_Message`
--
ALTER TABLE `B_Message`
  ADD PRIMARY KEY (`IdMessage`),
  ADD KEY `IdPartie` (`IdPartie`),
  ADD KEY `IdJoueur` (`IdJoueur`);

--
-- Index pour la table `B_MessagePrive`
--
ALTER TABLE `B_MessagePrive`
  ADD PRIMARY KEY (`IdMessagePrive`),
  ADD KEY `IdJoueur` (`IdJoueur`),
  ADD KEY `IdJoueur_1` (`IdJoueur_1`);

--
-- Index pour la table `B_Mot`
--
ALTER TABLE `B_Mot`
  ADD PRIMARY KEY (`Libelle`);

--
-- Index pour la table `B_Partie`
--
ALTER TABLE `B_Partie`
  ADD PRIMARY KEY (`IdPartie`),
  ADD KEY `IdChef` (`IdChef`);

--
-- Index pour la table `B_Proposer`
--
ALTER TABLE `B_Proposer`
  ADD PRIMARY KEY (`IdJoueur`,`IdPartie`,`Libelle`),
  ADD KEY `IdPartie` (`IdPartie`),
  ADD KEY `Libelle` (`Libelle`);

--
-- AUTO_INCREMENT pour les tables exportées
--

--
-- AUTO_INCREMENT pour la table `B_Authentification`
--
ALTER TABLE `B_Authentification`
  MODIFY `IdAuth` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;
--
-- AUTO_INCREMENT pour la table `B_Joueur`
--
ALTER TABLE `B_Joueur`
  MODIFY `IdJoueur` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;
--
-- AUTO_INCREMENT pour la table `B_Message`
--
ALTER TABLE `B_Message`
  MODIFY `IdMessage` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `B_MessagePrive`
--
ALTER TABLE `B_MessagePrive`
  MODIFY `IdMessagePrive` int(11) NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT pour la table `B_Partie`
--
ALTER TABLE `B_Partie`
  MODIFY `IdPartie` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=36;
--
-- Contraintes pour les tables exportées
--

--
-- Contraintes pour la table `B_Authentification`
--
ALTER TABLE `B_Authentification`
  ADD CONSTRAINT `B_Authentification_ibfk_1` FOREIGN KEY (`IdJoueur`) REFERENCES `B_Joueur` (`IdJoueur`);

--
-- Contraintes pour la table `B_Jouer`
--
ALTER TABLE `B_Jouer`
  ADD CONSTRAINT `B_Jouer_ibfk_1` FOREIGN KEY (`IdJoueur`) REFERENCES `B_Joueur` (`IdJoueur`),
  ADD CONSTRAINT `B_Jouer_ibfk_2` FOREIGN KEY (`IdPartie`) REFERENCES `B_Partie` (`IdPartie`);

--
-- Contraintes pour la table `B_Message`
--
ALTER TABLE `B_Message`
  ADD CONSTRAINT `B_Message_ibfk_1` FOREIGN KEY (`IdPartie`) REFERENCES `B_Partie` (`IdPartie`),
  ADD CONSTRAINT `B_Message_ibfk_2` FOREIGN KEY (`IdJoueur`) REFERENCES `B_Joueur` (`IdJoueur`);

--
-- Contraintes pour la table `B_MessagePrive`
--
ALTER TABLE `B_MessagePrive`
  ADD CONSTRAINT `B_MessagePrive_ibfk_1` FOREIGN KEY (`IdJoueur`) REFERENCES `B_Joueur` (`IdJoueur`),
  ADD CONSTRAINT `B_MessagePrive_ibfk_2` FOREIGN KEY (`IdJoueur_1`) REFERENCES `B_Joueur` (`IdJoueur`);

--
-- Contraintes pour la table `B_Partie`
--
ALTER TABLE `B_Partie`
  ADD CONSTRAINT `B_Partie_ibfk_1` FOREIGN KEY (`IdChef`) REFERENCES `B_Joueur` (`IdJoueur`);

--
-- Contraintes pour la table `B_Proposer`
--
ALTER TABLE `B_Proposer`
  ADD CONSTRAINT `B_Proposer_ibfk_1` FOREIGN KEY (`IdJoueur`) REFERENCES `B_Joueur` (`IdJoueur`),
  ADD CONSTRAINT `B_Proposer_ibfk_2` FOREIGN KEY (`IdPartie`) REFERENCES `B_Partie` (`IdPartie`),
  ADD CONSTRAINT `B_Proposer_ibfk_3` FOREIGN KEY (`Libelle`) REFERENCES `B_Mot` (`Libelle`);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
