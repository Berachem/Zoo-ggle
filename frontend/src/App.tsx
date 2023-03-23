import React from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AppBar from './components/navbar/navbar';
import Profile from './pages/profile';
import Footer from './components/footer/footer';

// Test de la librairie react-toastify pour les notifications (à supprimer)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dictionnaire from './pages/dictionnaire';

function App() {
    // ici on met les routes de notre application
    // par exemple, nous, dans notre application, nous avons une route pour la page d'accueil, waiting room, game room, etc.
    // donc on va mettre les routes de notre application ici
    // voici un exemple de route
    // <Route path="/" element={<Layout />}>
    //   <Route index element={<Home />} />
    //   <Route path="/waiting-room" element={<WaitingRoom />} />
    //   <Route path="/game-room" element={<GameRoom />} />
    //  <Route path="/definitions" element={<Definitions />} />
    // ...
    //   <Route path="*" element={<404Error />} />

 /*  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<404Error />} />
        </Route>
      </Routes>
    </BrowserRouter>
  ); */

  return (
   /*  <>  
    <Navbar />
    <div className="App">
      <header className="App-header">
        <h1 style={{color: "white"}}>Bonjour, regarde le fichier App.tsx ^^</h1>
        <p style={{color: "white"}}> Tu peux commencer à coder ici !</p>
        <h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
      </header>
    </div>
    </> */
    <> 
    <AppBar />

   <Profile /> 
   {/*  <Dictionnaire /> */}
    </>
  );


}

export default App; // on exporte notre composant App pour pouvoir l'utiliser dans d'autres fichiers
