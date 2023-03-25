import React from 'react';
import logo from './logo.svg';
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css';
import AppBar from './components/navbar/navbar';
import Profile from './pages/profile';
import Footer from './components/footer/footer';
import NavBar from './components/navbar/navbar';
import Background from './components/Zooggle/Background';

// Test de la librairie react-toastify pour les notifications (à supprimer)
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dictionnaire from './pages/dictionnaire';
import routes from './routes';
import Page404 from './pages/erreur404';
import { Navbar } from '@material-tailwind/react';

function App() {
    // ici on met les routes de notre application
    // par exemple, nous, dans notre application, nous avons une route pour la page d'accueil, waiting room, game room, etc.
    // donc on va mettre les routes de notre application ici

  return (
    <BrowserRouter>
    <>
    <Background/>
    <NavBar />
      <Routes> 
        {routes.map((route, index) => (
          <Route key={index} path={route.path} element={route.element}
             />
        ))}
        <Route path='/profil' element={<Profile />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
      </>
    </BrowserRouter>
  ); 

}

export default App; // on exporte notre composant App pour pouvoir l'utiliser dans d'autres fichiers
