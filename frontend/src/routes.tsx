import { HomeIcon, BookOpenIcon, PlayIcon } from "@heroicons/react/24/outline";

import Accueil from "./pages/accueil";
import Jouer from "./pages/jouer";
import Dictionnaire from "./pages/dictionnaire";
import Game from "./pages/game";
import ConnexionInscription from "./pages/connexionInscription";
import BubbleAssistant from "./components/Zooggle/assistantBubble";
import CreationPartie from "./pages/creationPartie";

export const routes = [
  {
    label: "Accueil",
    path: "/",
    icon: HomeIcon,
    element: <Accueil />,
  },
  {
    label: "Jouer",
    path: "/jouer",
    icon: PlayIcon,
    element: (
      <>
        <BubbleAssistant />
        <Jouer />
      </>
    ),
  },
  {
    label: "Dictionnaire",
    path: "/dictionnaire",
    icon: BookOpenIcon,
    element: (
      <>
        <BubbleAssistant />
        <Dictionnaire />
      </>
    ),
  },
  {
    label: "Game",
    path: "/game",
    icon: HomeIcon,
    element: (
      <>
        <BubbleAssistant />
        <Game />{" "}
      </>
    ),
  },
  {
    path: "/connexionInscription",
    icon: HomeIcon,
    element: (
      <>
        <BubbleAssistant />
        <ConnexionInscription />{" "}
      </>
    ),
  },
  {
    label: "creation",
    path: "/creationPartie",
    icon: HomeIcon,
    element: (
      <>
        <BubbleAssistant />
        <CreationPartie />{" "}
      </>
    ),
  },
];

export default routes;
