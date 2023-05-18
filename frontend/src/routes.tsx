import { HomeIcon, BookOpenIcon, PlayIcon } from "@heroicons/react/24/outline";

import Accueil from "./pages/accueil";
import Jouer from "./pages/choixPartie";
import Dictionnaire from "./pages/dictionnaire";
import Game from "./pages/game";
import Connexion from "./pages/connexion";
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
    path: "/choixPartie",
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
    path: "/jouer",
    icon: HomeIcon,
    element: (
      <>
        <BubbleAssistant />
        <Game />{" "}
      </>
    ),
  },
  {
    path: "/connexion",
    icon: HomeIcon,
    element: (
      <>
        <BubbleAssistant />
        <Connexion/>{" "}
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
