import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Profile from "./pages/profile";
import NavBar from "./components/navbar/navbar";
import Background from "./components/Zooggle/Background";
import routes from "./routes";
import Page404 from "./pages/erreur404";
import BubbleAssistant from "./components/Zooggle/assistantBubble";

function App() {
  // ici on met les routes de notre application
  // par exemple, nous, dans notre application, nous avons une route pour la page d'accueil, waiting room, game room, etc.
  // donc on va mettre les routes de notre application ici
  const [BackgroundMode, setBackgroundMode] = React.useState(
    localStorage.getItem("BackgroundMode") === "true"
  );
  
  const changeBackgroundMode = () => {
    const newValue = !BackgroundMode;
    setBackgroundMode(newValue);
    localStorage.setItem("BackgroundMode", newValue.toString());
    window.dispatchEvent(new Event("storage"));
  };
  
  return (
    <BrowserRouter>
      <>
        <Background backgroundMode={BackgroundMode} isLandingPage={
          window.location.pathname === "/" ? true : false
        } />

        {window.location.pathname !== "/game" && ( <NavBar
          changeBackgroundMode={changeBackgroundMode}
          backgroundMode={BackgroundMode}
        />)}

       
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}

          <Route path="/profile/">
            <Route
              path=":id"
              element={
                <>
                  <BubbleAssistant />
                  <Profile />{" "}
                </>
              }
            />
            <Route
              path="me"
              element={
                <>
                  <BubbleAssistant />
                  <Profile />{" "}
                </>
              }
            />
          </Route>

          <Route
            path="*"
            element={
              <>
                <BubbleAssistant />
                <Page404 />{" "}
              </>
            }
          />

          <Route path="/historique/:idgame/:idplayer" element={<></>} /> {/* Accès historique d'une partie avec une POV */}
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App; // on exporte notre composant App pour pouvoir l'utiliser dans d'autres fichiers
