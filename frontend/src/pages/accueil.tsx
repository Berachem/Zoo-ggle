import { Alert, Button, IconButton, Typography } from "@material-tailwind/react";
import Logo from "../assets/images/Title.svg";
import ZooggleCard from "../components/Zooggle/ZooggleCard";
import GameGrid from "../components/Zooggle/GameGrid";
import Title from "../components/Zooggle/Title";
import Team from "../components/sections/teamSection";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Input from "../components/Zooggle/Input";
import { useEffect } from "react";
import React from 'react'
import AnimalList from "../components/Zooggle/animalsList";

//import Forest from "../assets/video/Forest.mp4"

export default function Accueil() {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // random list of 16 letters
  const randomGridForDemo = () => {
    let letters = [];
    for (let i = 0; i < 16; i++) {
      letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    return letters;
  };


  
  


  return (
    /*
        ----si un jour on trouve une video d'assez bonne qualité----
        <video autoPlay muted loop id="myVideo" style={{
            position: "fixed",
            right: "0",
            bottom: "0",
            minWidth: "100%",
            minHeight: "100%",
            zIndex: "-1",
            objectFit: "cover"
        }}>
         <source src={Forest} type="video/mp4"/>
        </video>*/
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: "auto",
        }}
      >
        <main className="flex flex-col items-center justify-center w-full flex-1  text-center text-gray-50">
          <img src={Logo} />
          <a href="#regles">
            <Button variant="filled" color="white" className="m-2">
              Règles
            </Button>
          </a>
        </main>
      </div>

      {/* <ZooggleCard width="50vw" >
                        <Title variant="h4">Les règles du Boggle</Title>
                        <Typography>
                                Dans une limite de temps de 3 minutes, vous devez trouver un maximum de mots en formant des chaînes de  lettres contiguës. Plus le mot est long, plus les points qu'il vous rapporte sont importants.<br/><br/>
                                Vous pouvez passer d'une lettre à la suivante située directement à gauche, à droite, en haut, en bas, ou sur l'une des quatre cases diagonales.<br/><br/>
                                Regardez l'exemple de grille à coté:
                        </Typography>
                    </ZooggleCard>  
                    <ZooggleCard width="">
                        <GameGrid width="big" grid="? ? ? ? ? ? ? ? ? ? ? ? ? ? ? ?"/>     
                    </ZooggleCard> */}

      {/* landing page décrivant Zoo-ggle (dérivé du jeu de grille Boggle) */}

      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-screen-xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Zoo-ggle : Un jeu amusant inspiré du Boggle
            </h2>
            <p className="mb-4">
              Zoo-ggle est un jeu de grille qui vous permet de découvrir des
              animaux et de les classer selon leur mode de vie.{" "}
            </p>
            <p className="mb-4">
              Dans une limite de temps de 3 minutes, vous devez trouver un
              maximum de mots en formant des chaînes de lettres contiguës. Plus
              le mot est long, plus les points qu'il vous rapporte sont
              importants.{" "}
            </p>

           
          </div>
          <div className="flex flex-col items-center justify-center">
          <Alert color="green" className="rounded-lg text-center" >
            Voici un exemple de grille de jeu :
            
          </Alert>
            <ZooggleCard width="" backdropFilter="blur(0px)" color="black">
              <GameGrid width="big" grid={randomGridForDemo().join(" ")} />
            </ZooggleCard>

            <div className="flex flex-row items-center justify-center">
              <Input label="Mot" type="text" placeholder="Mot" disabled={true} />
              <Button variant="filled" color="green" className="lg:mt-5" disabled={true}>
                Valider
              </Button>
            </div>
            
          </div>
        </div>
        <div className=" mx-auto rounded-lg p-4 max-w-screen-xl mb-4">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 items-center justify-center mb-8">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Comment jouer ?
            </h2>
            <p>
              Vous pouvez passer d'une lettre à la suivante située directement à
              gauche, à droite, en haut, en bas, ou sur l'une des quatre cases
              diagonales.
            </p>
            <p className="mb-4">
              Vous pouvez tester sur la grille ci-dessus :)
            </p>
            <p>
              Vous pouvez aussi consulter les règles du jeu en cliquant sur le
              bouton ci-dessous.
            </p>

            <a href="https://www.boggle.fr/regles.php" target="_blank">
              <Button
                variant="filled"
                className="m-2 text-white"
                style={{ backgroundColor: "#04291F" }}
              >
                <FontAwesomeIcon icon={faBook} className="mr-2" />
                Règles
              </Button>
            </a>
          </div>
          {/* Pourquoi Zoo-ggle ? */}
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 items-center justify-center">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Pourquoi Zoo-ggle ?
            </h2>
            <p>
              Zoo-ggle est un jeu qui vous permet de découvrir des animaux et de
              les classer selon leur mode de vie.{" "}
            </p>
            <p className="mb-4">
              En effet, les mots que vous trouverez dans la grille de jeu
              correspondent à des espèces d'animaux.{" "}
            </p>
            <p>
              Vous pouvez consulter la liste des espèces d'animaux juste en dessous.
            </p>

  
            
           </div>
           <AnimalList/>

        </div>
      </section>

      {/* <Team /> */}
    </>
  );
}
