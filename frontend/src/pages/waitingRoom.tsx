import React, { useEffect, useState } from "react";
import "../css/WaitingRoom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTable, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";

interface Mode {
  nom: string;
  description: string;
  temps: number;
  joueurs: number;
  dictionnaire: string;
  grille: number;
  couleur: string;
  cartoonImage: string;
  realImage: string;
  regles: string;
}

export default function WaitingRoom() {
  const modes = [
    {
      nom: "Paresseux",
      description: "prenez votre temps...",
      temps: 5,
      joueurs: 2,
      dictionnaire: "fr",
      grille: 5,
      couleur: "#579A86",
      cartoonImage:
        "https://st4.depositphotos.com/2633985/21923/v/450/depositphotos_219232430-stock-illustration-sloth-hanging-on-tree-branch.jpg",
      realImage:
        "https://fac.img.pmdstatic.net/fit/https.3A.2F.2Fi.2Epmdstatic.2Enet.2Ffac.2F2021.2F09.2F02.2F0110eda7-6a0b-4ead-8290-cf7656479290.2Ejpeg/1200x1200/quality/80/crop-from/center/focus-point/1949%2C1436/tout-savoir-sur-le-paresseux.jpeg",
      regles:
        "Dans une limite de temps de 5 minutes, vous devez trouver un maximum de mots en formant des chaînes de lettres contiguës.",
    },
    // Lion
    {
      nom: "Lion",
      description: "classique",
      temps: 3,
      joueurs: 2,
      dictionnaire: "fr",
      grille: 4,
      couleur: "#F5593D",
      cartoonImage:
        "https://cdn.discordapp.com/attachments/890989295794552832/1108097595299090652/1f981.png",
      realImage:
        "https://www.larousse.fr/encyclopedie/data/images/1316665-Lion.jpg",
      regles:
        "Dans une limite de temps de 3 minutes, vous devez trouver un maximum de mots en formant des chaînes de lettres contiguës.",
    },
    // Aigle
    {
      nom: "Aigle",
      description: "rapide et efficace...",
      temps: 1,
      joueurs: 4,
      dictionnaire: "fr",
      grille: 4,
      couleur: "#0D4FFB",
      cartoonImage:
        "https://img.pixers.pics/pho_wat(s3:700/FO/79/56/57/75/700_FO79565775_6e7408d23de9d5538b2413c1bf8a1548.jpg,695,700,cms:2018/10/5bd1b6b8d04b8_220x50-watermark.png,over,475,650,jpg)/rideaux-occultants-dessin-anime-aigle-en-plein-vol.jpg.jpg",
      realImage:
        "https://asafacon.fr/wp-content/uploads/2022/10/Quest-ce-Que-Laigle-Et-Sa-Signification-Spirituelle-Disent-728x410.jpg",
      regles:
        "Dans une limite de temps de 1 minute, vous devez trouver un maximum de mots en formant des chaînes de lettres contiguës. Soyez rapide !",
    },
  ];
  const [mode, setMode] = React.useState<Mode>(modes[0]);
  const [backgroundMode, setBackgroundMode] = useState(false);

  useEffect(() => {
    function changeBG() {
      setBackgroundMode(localStorage.getItem("BackgroundMode") === "true");
      console.log("backgroundMode", backgroundMode);
    }

    window.addEventListener("storage", changeBG);

    return () => {
      window.removeEventListener("storage", changeBG);
    };
  }, []);

  const players = [
    "Berachem93DZ",
    "Bilel212",
    "Rachid236",
    "La france aux français",
  ];

  useEffect(() => {
    // random mode
    const mode = modes[Math.floor(Math.random() * modes.length)];
    setMode(mode);
  }, []);

  return (
    <>

      <div className="WaitingRoom_Card">
        <div className="WaitingRoom_CardHeader">
          <div className="WaitingRoom_CardHeaderIntermediaire">
            <div className="MetaDate">
              <FontAwesomeIcon icon={faClock} style={{ color: mode.couleur }} />{" "}
              {mode.temps} min
            </div>
            <div className="MetaDate">
              <FontAwesomeIcon icon={faUsers} style={{ color: mode.couleur }} />{" "}
              {mode.joueurs}
            </div>
            <div className="MetaDate">
              <FontAwesomeIcon icon={faTable} style={{ color: mode.couleur }} />{" "}
              {mode.grille}x{mode.grille}
            </div>
          </div>
        </div>
        <div className="WaitingRoom_CardBody">
          <div className="WaitingRoom_CardLeft">
            
            <div className="WaitingRoom_CardImage">
              {backgroundMode ? (
                <img src={mode.realImage} alt="mode" />
              ) : (
                <img src={mode.cartoonImage} alt="mode" />
              )}
            </div>
            <div className="WaitingRoom_CardMainInfos">
            <div className="WaitingRoom_CardTitle">
              Mode <h3 style={{ color: mode.couleur }}>{mode.nom}</h3>
            </div>
            <div className="WaitingRoom_CardDescription">
              {mode.description}
            </div>
            </div>
          </div>

          <div className="WaitingRoom_CardRight" style={{ borderColor : mode.couleur}}>
            <div className="WaitingRoom_CardRules">
              <h3>Règles</h3>
              <p>{mode.regles}</p>
            </div>
            <div className="WaitingRoom_CardPlayers">
              <h3>Joueurs ({players.length}/{mode.joueurs}){" "}<FontAwesomeIcon icon={faUser} style={{ color: mode.couleur }} /></h3>
              <div className="WaitingRoom_CardPlayersList">
                {players.join(", ")}
              </div>
            </div>
          </div>
        </div>

        <div className="WaitingRoom_CardFooter">
          <button
            className="WaitingRoom_CardButton"
            style={{ backgroundColor: mode.couleur }}
          >
            Quitter
          </button>
        </div>
      </div>

    </>
  );
}
