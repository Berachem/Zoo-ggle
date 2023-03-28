import {
    HomeIcon,
    BookOpenIcon,
    PlayIcon
  } from "@heroicons/react/24/outline";

import  Accueil  from "./pages/accueil";
import  Jouer  from "./pages/jouer";
import  Dictionnaire from "./pages/dictionnaire";
import Game from "./pages/game"
import RecherchePartie from "./pages/recherchePartie";

export const routes = [
    {
      label: "Accueil",
      path: "/accueil",
        icon: HomeIcon,
        element :< Accueil />,
    },
    {
        label: "Jouer",
        path: "/jouer",
        icon: PlayIcon,
        element : <Jouer />,
        },
    {
        label: "Dictionnaire",
        path: "/dictionnaire",
        icon: BookOpenIcon,
        element : <Dictionnaire />,
        },
      {
        label: "Game",
        path: "/game",
          icon: HomeIcon,
          element :< Game />,
      },
      {
        label: "Recherche",
        path: "/RecherchePartie",
          icon: HomeIcon,
          element :< RecherchePartie />,
      }
  ];

export default routes;

  


  
