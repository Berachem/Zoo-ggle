import {
  Alert,
  Button,
  Card,
} from "@material-tailwind/react";
import LogoWhite from "../assets/images/Title.svg";
import LogoBlack from "../assets/images/BlackTitle.png"
import ZooggleCard from "../components/Zooggle/ZooggleCard";
import GameGrid from "../components/Zooggle/GameGrid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from "@fortawesome/free-solid-svg-icons";
import Footer from "../components/footer/footer";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";
import tortue from "../assets/images/randomAnimals/tortue.jpg";
import cameleon from "../assets/images/randomAnimals/cameleon.jpg";
import pinguin from "../assets/images/randomAnimals/pinguin.jpg";
import IndicatorScroll from "../components/scroll/IndicatorScroll";
import { ToastContainer,toast } from "react-toastify"
import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";

//import Forest from "../assets/video/Forest.mp4"

async function checkToken(token :string){
  let formData = new FormData()
  formData.append("token",token)
  const res = await fetch("http://localhost/backend/api/verifyToken.php",{method:"POST",body:formData,credentials: 'include'}).then(res=>res.json())
  if(res.success){
    
    console.log("token is valid")
    // session storage connected
    localStorage.setItem("connected","true")
    localStorage.setItem("tokenUsedToConnect",token)
    toast.success("Vous êtes connecté !", {
      position: "top-right",
      autoClose: 8000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      toastId:1
    });
  }

}

export default function Accueil() {
  const [backgroundMode, setBackgroundMode] = useState(localStorage.getItem("BackgroundMode") === "true");
  useEffect(() => {
    function changeBG() {
      setBackgroundMode( localStorage.getItem("BackgroundMode") === "true");
      console.log("backgroundMode", backgroundMode);
    }
  
    window.addEventListener('storage', changeBG)
  
    return () => {
      window.removeEventListener('storage', changeBG)
    }
  }, [])

  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // random list of 16 letters
  const randomGridForDemo = () => {
    let letters = [];
    for (let i = 0; i < 16; i++) {
      letters.push(alphabet[Math.floor(Math.random() * alphabet.length)]);
    }
    return letters;
  };

  const location = useLocation()
    const params = new URLSearchParams(location.search);
    if(params.has("registered") && params.get("registered")=="true"){
        toast.success("Regardez vos mail pour vous connecter !", {
            position: "top-right",
            autoClose: 8000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            toastId:2
          });
    }
    if(params.has("connected") && params.get("connected")=="true"){
      toast.success("Vous êtes connecté !", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    if(params.has("disconnected") && params.get("disconnected")=="true"){
      toast.info("Vous êtes déconnecté !", {
        position: "top-right",
        autoClose: 8000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        toastId:3
      });
    }
    if(params.has("token")){
      let token = params.get("token")
      if(token!=null){
        checkToken(token)
      }
    }

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
      <ToastContainer/>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
          margin: "auto",
        }}
      >
        <IndicatorScroll />
        {/* <MouseScrollIndicator id="discover" /> */}

        <main className="flex flex-col items-center justify-center w-full flex-1  text-center text-gray-50">
          <img style={{
            width:"500px",
            aspectRatio:"2/1"

          }}src={backgroundMode ? LogoBlack : LogoWhite} />
          <a href="/choixPartie">
            <Button variant="filled" color="white" className="m-2">
              Jouer
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

      <section className="bg-white dark:bg-gray-900" id="discover">
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
            <Alert color="green" className="rounded-lg text-center">
              Voici un exemple de grille de jeu :
            </Alert>
            <ZooggleCard
              width=""
              backdropFilter="blur(0px)"
              color="black"
              key={randomGridForDemo().join(" ")}
            >
              <GameGrid
                width="big"
                grid={randomGridForDemo().join(" ")}
                key={randomGridForDemo().join(" ")}
              />
            </ZooggleCard>


          </div>
        </div>
        <div className=" mx-auto rounded-lg p-4 max-w-screen-xl mb-4">
          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 items-center justify-center mb-12">
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

            {/* https://www.youtube.com/watch?v=fQ9CRLVvl6o */}

            {/* https://www.youtube.com/watch?v=fQ9CRLVvl6o */}
            <a
              href="https://www.youtube.com/watch?v=fQ9CRLVvl6o"
              target="_blank"
            >
              <Button
                variant="filled"
                className="m-2 text-white"
                style={{ backgroundColor: "#B80F0F" }}
              >
                <FontAwesomeIcon icon={faYoutube} className="mr-2" />
                Vidéo
              </Button>
            </a>
          </div>

          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 items-center justify-center mb-12">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Un peu d'histoire
            </h2>
            <p className="mb-4">
              Le Boggle a été <b>inventé en 1972 par Allan Turoff</b>, un
              publicitaire à la recherche d'un jeu simple et amusant. Depuis, il
              a vendu des millions d'exemplaires dans le monde entier et a
              inspiré des tournois compétitifs. Le jeu est également connu pour
              faire découvrir des mots que l'on ignorait exister, mais attention
              à ne pas se tromper de mots sous peine de perdre des points, voire
              des amis !
            </p>
          </div>

          <div className="font-light text-gray-500 sm:text-lg dark:text-gray-400 items-center justify-center">
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              Pourquoi Zoo-ggle ?
            </h2>
            <p>
              Zoo-ggle est un jeu qui vous permet de découvrir des animaux.{" "}
            </p>
            <p className="mb-4">
              En effet, les mots que vous trouverez dans la grille de jeu
              correspondent à des animaux vous ferons gagner{" "}
              <u className="text-green-700">plus de points</u> que les autre !{" "}
            </p>

            {/* <Caroussel images={images} /> */}

            <div className="mx-auto max-w-screen-md py-12">
              <Card className="mb-12 overflow-hidden">
                <img
                  alt="nature"
                  className="h-[32rem] w-full object-cover object-center"
                  src={
                    [tortue, cameleon, pinguin][Math.floor(Math.random() * 3)]
                  }
                />
              </Card>
            </div>

           {/*  <p>Vous pouvez consulter la liste des animaux juste en dessous.</p> */}
          </div>
       {/*    <AnimalList /> */}
        </div>
      </section>

      <Footer />

      {/* <Team /> */}
    </>
  );
}
