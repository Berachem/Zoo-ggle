import { HomeIcon, BookOpenIcon, PlayIcon } from "@heroicons/react/24/outline";

import Accueil from "./pages/accueil";
import Dictionnaire from "./pages/dictionnaire";
import Connexion from "./pages/connexion";
import BubbleAssistant from "./components/Zooggle/assistantBubble";
import Jouer from "./pages/jouer";

export var routes = [
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
  }
];

if(localStorage.getItem("connected") === "true"){
  routes.push(
    {
      label: "Jouer",
      path: "/jouer",
      icon: PlayIcon,
      element: <Jouer />,
    }
  )
}

export default routes;