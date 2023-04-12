import { Button, IconButton, Typography } from "@material-tailwind/react";
import Logo from "../assets/images/Title.svg";
import ZooggleCard from "../components/Zooggle/ZooggleCard";
import GameGrid from "../components/Zooggle/GameGrid";
import Title from "../components/Zooggle/Title";
import Team from "../components/sections/teamSection";

//import Forest from "../assets/video/Forest.mp4"

export default function Accueil() {
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
                <p>
                  Dans une limite de temps de 3 minutes, vous devez trouver un
                  maximum de mots en formant des chaînes de lettres contiguës.
                  Plus le mot est long, plus les points qu'il vous rapporte sont
                  importants.{" "}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-8">
                <img
                  className="w-full rounded-lg"
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/content/office-long-2.png"
                  alt="office content 1"
                />
  
              </div>
            </div>
          </section>
        
        <Team />
    </>
  );
}
