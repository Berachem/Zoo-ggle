// return profile page
//

import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
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
  faSadCry,
  faThumbsDown,
  faExclamationTriangle,
  faCrown,
  faUserLock,
  faUnlock,
  faSadTear,
} from "@fortawesome/free-solid-svg-icons";
import { Avatar, Typography, Button, Alert } from "@material-tailwind/react";
import {
  MapPinIcon,
  BriefcaseIcon,
  BuildingLibraryIcon,
} from "@heroicons/react/24/solid";
import Footer from "../components/footer/footer";
import CardWithImage from "../components/card/card";
import { useEffect } from 'react';
import { BounceLoader } from "react-spinners";
import { isUndefined } from "lodash";
import Title from "../components/Zooggle/Title";
import GameGrid from "../components/Zooggle/GameGrid";
import GameCard from "../components/Zooggle/GameCard";
import GameCardInfo from "../components/Zooggle/GameCardInfo";



const Profile = () => {
  let { id } = useParams();
  const PROFILE_DATA_BASE_URL = "https://zoo-ggle.berachem.dev/V2/api/player/getUserInfos.php?profileId="
  const [profileData, setProfileData] = useState( {
    pseudo: "",
    description: "",
    gamesWon: 0,
    gamesPlayed: 0,
    gamesLost: 0,
    wordsFound: 0,
    longestWord: "",
    averageWordsPerGame: 0,
    isPublic: false,
    inscriptionDate: "",
    lastGameDate: "",
    games: [],
  });

  // ============= All the states================
  const [ownProfile, setOwnProfile] = useState(false);
  const [userFound, setUserFound] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [pseudoSearch, setPseudoSearch] = useState("");



  useEffect(() => {
    const fetchData = async () => {

      setIsFetching(true);
      // /:id use params to get the id of the user
      
      let idUser = parseInt(id!); // ajoutez le point d'exclamation pour indiquer que id n'est pas undefined
      console.log(idUser);
      if (isNaN(idUser)) { // vérifiez si idUser est NaN
        idUser = parseInt(localStorage.getItem("id")!); // utilisez le point d'exclamation pour garantir que getItem ne renvoie pas undefined
        setOwnProfile(true);
      }
      console.log(idUser);
      
      const response = await fetch(PROFILE_DATA_BASE_URL + idUser);
      const data = await response.json();
      console.log(data);
      if (data.success === false) {
        setUserFound(false);
        setIsFetching(false);
        return;
      }
      const userProfileData = {
        pseudo: data.profileInfos[0].Pseudo,
        description: data.profileInfos[0].Description,
        gamesWon: parseInt(data.profileInfos[0].gamesWon),
        gamesPlayed: parseInt(data.profileInfos[0].gamesPlayed),
        gamesLost: parseInt(data.profileInfos[0].gamesLost),
        wordsFound: isNaN(parseInt(data.profileInfos[0].wordsFound)) ? 0 : parseInt(data.profileInfos[0].wordsFound)
        ,
        longestWord: "",
        averageWordsPerGame: 0,
        isPublic: parseInt(data.profileInfos[0].ProfilPublic) === 1,
        inscriptionDate: new Date(data.profileInfos[0].DateCreationCompte).toLocaleDateString(),
        lastGameDate: new Date(data.profileInfos[0].DateDerniereConnexion).toLocaleDateString(),
        email: data.profileInfos[0].Mail,
        games: data.allGamesDetails.map((game: any) => {
          return {
            id: game.IdPartie,
            name: game.NomPartie,
            score : game.Score,
            lang : game.LangueDico,
            grid : game.Grille,
            startDate : new Date(game.DateDebutPartie).toLocaleDateString(),
            endDate : new Date(game.DateFinPartie).toLocaleDateString(),
            size : game.TailleGrille,
            mode : game.Mode,
            isPublic : game.EstPublic,
            maxPlayers : game.NombreJoueursMax,
            leaderboard : game.leaderboard.map((player: any) => {
              return {
                pseudo: player.Pseudo,
                score: player.Score,
                id : player.IdJoueur
              }
            }),
            numberWordsFound: game.validWordsNumber,
            numberWordsProposed: game.wordProposedNumber,
            // round
            percentageWordsFound: Math.round(game.validWordPercentage),

          }
        })
      };
      setProfileData(userProfileData);
      
      setIsFetching(false);
    };
    fetchData();
  }, [id]);
  


  const handleClickSearchProfile = () => {
    // fonction qui permet de rechercher un profil (redirection vers la page de recherche de profil de l'utilisateur)
    // profile/:pseudo
    // redirect to /profile/:pseudo
   alert("Recherche du profil de " + pseudoSearch);
   

    
  };

  if (isFetching) {
   // bouncing loader
    return (
      <div className="flex justify-center items-center h-screen">
        <BounceLoader color={"#E6EBF1"} loading={isFetching} size={150} />
      </div>
    );
  }

  if (!userFound) {
    // tailwind "utilisateur non trouvé" with a button to go back to the home page and icon in the middle of the screen in red
    // avec un bouton pour revenir à la page d'accueil et une icone au milieu de l'écran en rouge
    // centré verticalement et horizontalement sur une div bg-white bg-opacity-80 rounded-xl p-8
    return (
      <div className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
        <div
          className="bg-white bg-opacity-80 rounded-xl p-8 "
          style={{ width: "70%", marginTop: "50px" }}
        >
          <div className="flex flex-col md:flex-row items-center mb-8 justify-center">
            <div className="text-center md:text-left">
              
              <div className="font-bold text-3xl mb-2">
              <FontAwesomeIcon icon={faExclamationTriangle} size="2x"
               color="orange" />
              Utilisateur non trouvé</div>
              <div className="text-xl text-gray-700 mb-2">
                L'utilisateur que vous recherchez n'existe pas.
              </div>
            </div>
          </div>
          <div className="flex justify-center">
            <a href="/">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Retour à l'accueil
            </button>
            </a>
          </div>
        </div>
      </div>
    );

  
         

  }

  return (
    <div className="bg-cover bg-center min-h-screen flex flex-col justify-center items-center">
      <div
        className="bg-opacity-80 rounded-xl p-8  border-2 border-gray-200"
        style={{ width: "70%", marginTop: "50px", backdropFilter:"blur(20px)",color : "white" }}
      >
        {/* badge with "Vous" if ownProfile */}
        {ownProfile &&<span className="bg-green-800 text-white font-bold py-1 px-2 rounded-full">
        <FontAwesomeIcon icon={faCrown} size="1x" color="orange" /> Vous</span>}

        {profileData.isPublic && <span className="bg-blue-800 text-white font-bold py-1 px-2 rounded-full ml-2">
        <FontAwesomeIcon icon={faUnlock} size="1x" /> Public</span>}
        {!profileData.isPublic && <span className="bg-red-800 text-white font-bold py-1 px-2 rounded-full ml-2">
        <FontAwesomeIcon icon={faUserLock} size="1x"  /> Privé</span>}

        <div className="flex flex-col md:flex-row items-center mb-8 justify-center">
          
          <img
            className="w-32 h-32 rounded-full mr-0 md:mr-8 mb-4 md:mb-0"
            src={"https://ui-avatars.com/api/?background=random&name="+profileData.pseudo}
            alt="Avatar"
          />
          <div className="text-center md:text-left">
            
            <div className="font-bold text-3xl mb-2">{profileData.pseudo}
            

            </div>
            <div className="text-xl text-gray-700 mb-2">
              {profileData.description}
            </div>
          </div>
        </div>

        <Title variant="h4" style={{ color:"white"}}>Informations</Title>


        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4" style={{color : "black"}}>
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {profileData.gamesWon}
              <FontAwesomeIcon
                icon={faTrophy}
                style={{ marginLeft: "5px", color: "gold" }}
              />
            </div>
            <div className="text-center text-gray-700">Parties gagnées</div>
          </div>
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {profileData.gamesPlayed}
              <FontAwesomeIcon
                icon={faGamepad}
                style={{ marginLeft: "5px", color: "red" }}
              />
            </div>
            <div className="text-center text-gray-700">Parties jouées</div>
          </div>
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {profileData.wordsFound}
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
              {profileData.gamesLost}
              <FontAwesomeIcon
                icon={faThumbsDown}
                style={{ marginLeft: "5px", color: "purple" }}
              />
            </div>
            <div className="text-center text-gray-700">
              Parties perdues
            </div>
          </div>
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {profileData.inscriptionDate}
              <FontAwesomeIcon
                icon={faCalendar}
                style={{ marginLeft: "5px", color: "green" }}
              />
            </div>
            <div className="text-center text-gray-700">Date d'inscription</div>
          </div>
          <div className="bg-white rounded-md p-4">
            <div className="text-center font-bold text-2xl mb-2">
              {profileData.lastGameDate}
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
        
        <Title variant="h4" style={{ color:"white"}}>Historique des parties</Title>
      {profileData.games.length == 0 && 
      <>
      <div className="text-center text-gray-700 bg-white rounded-md p-4">
              Aucune partie jouée
              <FontAwesomeIcon icon={faSadTear} style={{ marginLeft: "5px" }}/>
      </div>
      </>}
        
        {profileData.games.map(
            (game: {
              id: any;
              name: any;
              language: any;
              score: any; 
              leaderboard: any;
              grid: any;
              startDate : any;
              endDate : any;
              size : any;
              mode : any;
              isPublic : any;
              maxPlayers : any;
              numberWordsFound : any;
              numberWordsProposed : any;
              percentageWordsFound : any;
            }) =>
          <GameCard key={game.id} id={game.id} score={game.score} startDate={game.startDate} endDate={game.endDate} size={game.size} isPublic={game.isPublic} maxPlayers={game.maxPlayers} numberWordsFound={game.numberWordsFound} numberWordsProposed={game.numberWordsProposed} percentageWordsFound={game.percentageWordsFound}>

            <GameGrid grid={game.grid}  width="small"/>
            <GameCardInfo
            title={game.name}
            lang={game.language}
            score={game.score}
            leaderboard={game.leaderboard}
            startDate={game.startDate}
           // endDate={game.endDate}
           // size={game.size}
           // mode={game.mode}
            isPublic={game.isPublic}
          //  maxPlayers={game.maxPlayers}
            numberWordsFound={game.numberWordsFound}
            numberWordsProposed={game.numberWordsProposed}
            percentageWordsFound={game.percentageWordsFound}


            />

          </GameCard>

          )}

   

              


      <br />
    </div>
    </div>
  
  );

}

export default Profile;
