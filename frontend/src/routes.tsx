import { HomeIcon, BookOpenIcon, PlayIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

import Accueil from "./pages/accueil";
import Dictionnaire from "./pages/dictionnaire";
import Connexion from "./pages/connexion";
import BubbleAssistant from "./components/Zooggle/assistantBubble";
import CreationPartie from "./pages/creationPartie";
import Jouer from "./pages/jouer";

export const routes = [
  {
    label: "Accueil",
    path: "/",
    icon: HomeIcon,
    element: <Accueil />,
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
  {
    label: "Jouer",
    path: "/jouer",
    icon: ComputerDesktopIcon,
    element: <Jouer />,
  }
];

export default routes;
