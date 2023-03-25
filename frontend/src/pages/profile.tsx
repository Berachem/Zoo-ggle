// return profile page
//

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logo from "../assets/images/zooggle_lion_logo_blue.png";
import Mbappe from "../assets/images/mbappe.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// icone victoire, joué, défaite, mots trouvés, mot le plus long, moyenne de mots par partie
import {
  faTrophy,
  faGamepad,
  faTimes,
  faCheck,
  faSearch,
  faBirthdayCake,
  faCalendar,
  faTimesCircle,
  faBook,
  faRotateBack,
  faBookBookmark,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import Footer from "../components/footer/footer";
import CardWithImage from "../components/card/card";

interface GameCardProps {
  title: string;
  date: string;
  score: number;
  grid: string;
  language: string;
  leaderboard: Map<string, number>;
  wordsFound: number;
  numberOfWords: number;
}

const GameCard = ({
  title,
  date,
  score,
  grid,
  language,
  leaderboard,
  wordsFound,
  numberOfWords,
}: GameCardProps) => {
  const progress = (wordsFound / numberOfWords) * 100;

  const columnNumber = Math.sqrt(grid.split(" ").length );

  // logique pour afficher les données de la partie
  return (
    <div className="bg-white rounded-md p-4 mb-4 flex">
      {/* Afficher le titre et la grille de Boggle */}
      <div className="w-2/5 pr-4">
        <div className="font-bold mb-2">{title}</div>
        <div className="text-gray-700 text-sm hidden md:grid">{date}</div>
        <div className="grid grid-cols-4 gap-2 mt-2 mb-4 hidden md:grid">
          {grid.split(" ").map((letter, index) => (
            <div key={index} className="bg-gray-200 text-center p-2 rounded-md">
              {letter}
            </div>
          ))}
        </div>
      </div>
      {/* Afficher le reste des informations à droite */}
      <div className="w-3/5">
        <div className="flex justify-between items-center mb-4">
          <p className="text-gray-700 text-sm">
            Langue:{" "}
            {language === "Anglais" ? (
              <img
                src="https://cdn-icons-png.flaticon.com/512/197/197560.png"
                alt="drapeau anglais"
                style={{ width: "32px" }}
              />
            ) : (
              <img
                src="https://cdn-icons-png.flaticon.com/512/197/197560.png"
                alt="drapeau français"
                style={{ width: "32px" }}
              />
            )}
          </p>

          <div className="w-1/3">
            <div className="text-green-800 text-sm mb-2">
        
              Mots <FontAwesomeIcon icon={faBookBookmark}  style={{ width: "32px", color : "green" }}/>
               {wordsFound}/{numberOfWords}
            </div>
            <div className="relative h-2 rounded-full bg-gray-300">
              <div
                className="absolute top-0 left-0 h-2 rounded-full bg-green-800"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>

        <div className="text-gray-700 text-sm mb-2 flex justify-between">
          {" "}
          Classement{" "}
        </div>
        <div className="border rounded-md p-2">
          {Array.from(leaderboard.entries()).map(([username, score], index) => (
            <div key={username} className="flex justify-between">
              <a href="/profile/{username}" className="flex items-center">
              <div className="text-green-800">{username}</div>
              </a>
              <div>{score}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const Profile = () => {
  const gamesData = [
    // données factices pour l'historique des parties
    {
      id: 1,
      title: "Partie 1",
      date: "20/03/2023",
      score: 50,
      grid: "A B C D E F G H I J K L M N O P",
      language: "Français",
      leaderboard: new Map([
        ["Mbappe", 50],
        ["Neymar", 40],
        ["Ronaldo", 30],
        ["Messi", 20],
        ["Zlatan", 10],
      ]),
      wordsFound: 10,
      numberOfWords: 250,
    },
    {
      id: 2,
      title: "Partie 2",
      date: "12/03/2022",
      score: 40,
      grid: "B K M E",
      language: "Anglais",
      leaderboard: new Map([
        ["Ronaldinho", 50],
        ["Mbappe", 40],
        ["Neymar", 30],
        ["Messi", 20],
        ["Zlatan", 10],
      ]),
      wordsFound: 100,
      numberOfWords: 370,
    },
    {
      id: 3,
      title: "Partie 3",
      date: "20/03/2021",
      score: 30,
      grid: "A B C D E F G H I J K L M N O P",
      language: "Français",
      leaderboard: new Map([
        ["Mbappe", 50],
        ["Neymar", 40],
        ["Ronaldo", 30],
        ["Messi", 20],
        ["Zlatan", 10],
      ]),
      wordsFound: 10,
      numberOfWords: 250,
    },
    {
      id: 4,
      title: "Partie 4",
      date: "20/03/2020",
      score: 20,
      grid: "A B C D E F G H I J K L M N O P",
      language: "Français",
      leaderboard: new Map([
        ["Mbappe", 50],
        ["Neymar", 40],
        ["Ronaldo", 30],
        ["Messi", 20],
        ["Zlatan", 10],
      ]),
      wordsFound: 10,
      numberOfWords: 250,
    },
    {
      id: 5,
      title: "Partie 5",
      date: "20/03/2019",
      score: 10,
      grid: "A B C D E F G H I J K L M N O P",
      language: "Français",
      leaderboard: new Map([
        ["Mbappe", 50],
        ["Neymar", 40],
        ["Ronaldo", 30],
        ["Messi", 20],
        ["Zlatan", 10],
      ]),
      wordsFound: 10,
      numberOfWords: 250,
    },
    {
      id: 6,
      title: "Partie 6",
      date: "20/03/2018",
      score: 0,
      grid: "A B C D E F G H I J K L M N O P",
      language: "Français",
      leaderboard: new Map([
        ["Mbappe", 50],
        ["Neymar", 40],
        ["Ronaldo", 30],
        ["Messi", 20],
        ["Zlatan", 10],
      ]),
      wordsFound: 10,
      numberOfWords: 250,
    },
  ];

  const userData = {
    // données factices pour le profil
    pseudo: "Mbappe",
    description:
      "Salut, je suis Mbappe, je suis un joueur de Boggle au PSG ! Je suis le meilleur joueur de Boggle de tous les temps !",
    gamesWon: 10,
    gamesPlayed: 20,
    gamesLost: 10,
    wordsFound: 100,
    longestWord: "Bouillabaisse",
    averageWordsPerGame: 5,
    isPublic: true,
    birthday: "20/03/1998",
    inscriptionDate: "20/03/2021",
    lastGameDate: "20/03/2023",
    email: "mbappe@gmail.com",
  };

  const currentAge = () => {
    // calcul de l'âge à partir de la date de naissance
    const today = new Date();
    // convert french date to english date
    const convertDate = userData.birthday.split("/").reverse().join("-");
    const birthDate = new Date(convertDate);

    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  const [pseudoSearch, setPseudoSearch] = useState("");

  const handleClickSearchProfile = () => {
    // fonction qui permet de rechercher un profil (redirection vers la page de recherche de profil de l'utilisateur)
    // profile/:pseudo
    //history.push(`/profile/${pseudoSearch}`);
    console.log("Recherche du profil de " + pseudoSearch);
  };

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
      <div
        className="bg-white bg-opacity-80 rounded-xl p-8 "
        style={{ width: "70%", marginTop: "50px" }}
      >
        <div className="flex flex-col md:flex-row items-center mb-8 justify-center">
          <img
            className="w-32 h-32 rounded-full mr-0 md:mr-8 mb-4 md:mb-0"
            src={Mbappe}
            alt="Avatar"
          />
          <div className="text-center md:text-left">
            <div className="font-bold text-3xl mb-2">{userData.pseudo}</div>
            <div className="text-xl text-gray-700 mb-2">
              {userData.description}
            </div>
          </div>
        </div>

        <div className="font-bold mb-4 text-2xl">Informations</div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {userData.gamesWon}
              <FontAwesomeIcon
                icon={faTrophy}
                style={{ marginLeft: "5px", color: "gold" }}
              />
            </div>
            <div className="text-center text-gray-700">Parties gagnées</div>
          </div>
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {userData.gamesLost}
              <FontAwesomeIcon
                icon={faGamepad}
                style={{ marginLeft: "5px", color: "red" }}
              />
            </div>
            <div className="text-center text-gray-700">Parties jouées</div>
          </div>
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {userData.wordsFound}
              <FontAwesomeIcon
                icon={faBook}
                style={{ marginLeft: "5px", color: "blue" }}
              />
            </div>
            <div className="text-center text-gray-700">Mots trouvés</div>
          </div>
          {/* age, date d'inscription, date de dernière partie, nombre de parties jouées */}
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {currentAge()}
              <FontAwesomeIcon
                icon={faBirthdayCake}
                style={{ marginLeft: "5px", color: "purple" }}
              />
            </div>
            <div className="text-center text-gray-700">Age</div>
          </div>
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {userData.inscriptionDate}
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ marginLeft: "5px", color: "green" }}
              />
            </div>
            <div className="text-center text-gray-700">Date d'inscription</div>
          </div>
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {userData.lastGameDate}
              <FontAwesomeIcon
                icon={faRotateBack}
                style={{ marginLeft: "5px", color: "orange" }}
              />
            </div>
            <div className="text-center text-gray-700">
              Date de dernière partie
            </div>
          </div>
          {/* profil public ou non  */}
        </div>

        <br />
        <div className="font-bold mb-4 text-2xl">Historique des parties</div>
        <div className="grid flex flex-wrap">
          {gamesData.map(
            (game: {
              id: number;
              title: string;
              date: string;
              score: number;
              grid: string;
              language: string;
              leaderboard: Map<string, number>;
              wordsFound: number;
              numberOfWords: number;
            }) => (
              <GameCard
                key={game.id}
                title={game.title}
                date={game.date}
                score={game.score}
                grid={game.grid}
                wordsFound={game.wordsFound}
                language={game.language}
                leaderboard={game.leaderboard}
                numberOfWords={game.numberOfWords}
              />
            )
          )}
        </div>
      </div>
      {/* barre de recherche pour chercher un autre profil */}
      <br />
      <div className="flex flex-row justify-center items-center">
        <input
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          type="text"
          placeholder="Rechercher un autre profil"
          onChange={(e) => setPseudoSearch(e.target.value)}
        />
        <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded" type="button" onClick={handleClickSearchProfile}>
          Rechercher
        </button>
      </div>
              


      <br />
    </div>
  );
};

export default Profile;
