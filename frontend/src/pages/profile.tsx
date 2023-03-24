// return profile page
//

import React from 'react';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Logo from "../assets/images/zooggle_lion_logo_blue.png";
import Mbappe from "../assets/images/mbappe.jpg";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// icone victoire, joué, défaite, mots trouvés, mot le plus long, moyenne de mots par partie
import { faTrophy, faGamepad, faTimes, faCheck, faSearch } from '@fortawesome/free-solid-svg-icons'
import { Avatar, Typography, Button } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import Footer from "../components/footer/footer";
import CardWithImage from '../components/card/card';



interface GameCardProps {
  title: string;
  date: string;
  score: number;
  grid: string;
}

const GameCard = ({ title, date, score, grid }: GameCardProps) => {
 // logique pour afficher les données de la partie
 return (
  <div className="bg-white rounded-md p-4 mb-4">
    <div className="font-bold mb-2">{title}</div>
    <div className="text-gray-700 text-sm">{date}</div>
    {/* afficher le score et la grille de Boggle */}
    <div>Score: {score}</div>
    <div className="grid grid-cols-4 gap-2 mt-2">
      {grid.split(" ").map((letter, index) => (
        <div key={index} className="bg-gray-200 text-center p-2 rounded-md">{letter}</div>
      ))}
    </div>
  </div>
);
};

const Profile = () => {
  const gamesData = [
    // données factices pour l'historique des parties
    { id: 1, title: "Partie 1", date: "20/03/2023", score: 50, grid: "A B C D E F G H I J K L M N O P" },
    { id: 2, title: "Partie 2", date: "21/03/2023", score: 70, grid: "S T U V W X Y Z A B C D E F G H" },
    { id: 3, title: "Partie 3", date: "22/03/2023", score: 60, grid: "I J K L M N O P Q R S T U V W X" },
  ];

  const userData = {
    // données factices pour le profil
    pseudo : "Mbappe",
    email : "mbappe.random@gmail.com",
    gamesWon : 10,
    gamesPlayed : 20,
    gamesLost : 10,
    wordsFound : 100,
    longestWord : "Bouillabaisse",
    averageWordsPerGame : 5,
  }

return (

  <div
    className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center"
    style={{
      backgroundImage: "url('https://img.freepik.com/vecteurs-libre/fond-jungle-detaille_23-2148949774.jpg?w=2000')",
      backgroundSize: "cover",
      backgroundPosition: "center",
    }}
  >
    <div className="bg-white bg-opacity-90 rounded-xl p-8 " style={{ width: "70%", marginTop: "50px"}}>
      <div className="flex flex-col md:flex-row items-center mb-8 justify-center">
        <img
          className="w-32 h-32 rounded-full mr-0 md:mr-8 mb-4 md:mb-0"
          src={Mbappe}
          alt="Avatar"
        />
        <div className="text-center md:text-left">
          <div className="font-bold text-3xl mb-2">{userData.pseudo}</div>
          <div className="text-xl text-gray-700">{userData.email}</div>
        </div>
      </div>
      
      <div className="flex flex-col md:flex-row items-center mb-8 md:mb-0 justify-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <div className="font-bold mb-4">Statistiques</div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="bg-white rounded-md p-4">
              <div className ="text-center font-bold text-2xl mb-2">
                10
                <FontAwesomeIcon icon={faTrophy} style={{marginLeft: "5px", color : "gold"}} />

              </div>
              <div className="text-center text-gray-700">Parties gagnées</div>
            </div>
            <div className="bg-white rounded-md p-4">
              <div className ="text-center font-bold text-2xl mb-2">
                5
                <FontAwesomeIcon icon={faGamepad} style={{marginLeft: "5px", color:"red"}} />
              </div>
              <div className="text-center text-gray-700">Parties perdues</div>
            </div>
            <div className="bg-white rounded-md p-4">
              <div className ="text-center font-bold text-2xl mb-2">
                15
                <FontAwesomeIcon icon={faTimes} style={{marginLeft: "5px"}} />
              </div>
              <div className="text-center text-gray-700">Mots trouvés</div>
            </div>
          </div>
        </div>
      </div>
          
      <div className="flex flex-col md:flex-row justify-center">
        <div className="md:w-1/2 mb-8 md:mb-0">
          <br />
          <div className="font-bold mb-4">Historique des parties</div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {gamesData.map((game : { id: number; title: string; date: string; score: number; grid: string; }
            ) => (
              <GameCard key={game.id} title={game.title} date={game.date} score={game.score} grid={game.grid} />
            ))}
          </div>
        </div>
        {/* autres informations sur le profil */}
        </div>
      </div>
    </div>
  
  );
};

export default Profile;


