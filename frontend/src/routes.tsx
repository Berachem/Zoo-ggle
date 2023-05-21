import { HomeIcon, BookOpenIcon, PlayIcon, ComputerDesktopIcon } from "@heroicons/react/24/outline";

import Accueil from "./pages/accueil";
import Jouer from "./pages/choixPartie";
import Dictionnaire from "./pages/dictionnaire";
import Game from "./pages/game";
import Connexion from "./pages/connexion";
import BubbleAssistant from "./components/Zooggle/assistantBubble";
import CreationPartie from "./pages/creationPartie";
import WaitingRoom from "./pages/waitingRoom";
import WebsocketPage from "./pages/websocketsTEST";
import { PageTest } from "./components/visualForGame/pageTest";

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
  {
    label: "waitingRoom",
    path: "/waitingRoom",
    icon: HomeIcon,
    element: (
      <>
        <BubbleAssistant />
        <WaitingRoom />{" "}
      </>
    ),
  },
  {
    label: "Websocket",
    path: "/websocket",
    icon: ComputerDesktopIcon,
    element: <WebsocketPage />,
  },
  {
    label: "chatVisu",
    path: "/chatVisu",
    icon: ComputerDesktopIcon,
    element: <PageTest />,
  }
];

export default routes;
