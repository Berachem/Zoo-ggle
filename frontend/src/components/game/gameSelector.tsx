import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/choixPartie.css";
import { faClock, faTable, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import {WaitingRoomItem} from "../../components/game/websocket"

interface GameSelectorProps{
  rooms:WaitingRoomItem[]
  onChosenRoom: (username: string, waitingRoom: string) => void
}

export default function GameSelector(props:GameSelectorProps) {
  const [backgroundMode, setBackgroundMode] = useState(localStorage.getItem("BackgroundMode") === "true");

  var token = localStorage.getItem("token")
    if (token == null){
        var tokenString = ""
    }else{
        var tokenString = token
    }

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
    },
  ];

  return (
    <>
      <div className="Row">
        {props.rooms.map((room) => (
          <div className="Card">
            <div className="CardHeader">
              <div className="CardHeaderIntermediaire">
                <div className="MetaDate">
                  <FontAwesomeIcon
                    icon={faClock}
                    style={{ color: room.color }}
                  />{" "}
                  {room.duration/60} min
                </div>
                <div className="MetaDate">
                  <FontAwesomeIcon
                    icon={faUsers}
                    style={{ color: room.color }}
                  />{" "}
                  {room.attendeeNumber}
                </div>
                <div className="MetaDate">
                  <FontAwesomeIcon
                    icon={faTable}
                    style={{ color: room.color }}
                  />{" "}
                  {room.grid_size}x{room.grid_size}
                </div>
              </div>
            </div>

            <div className="CardImage">
            {backgroundMode ?
              <img
                src={room.image_realist} 
                alt="mode"
              /> :
              <img
                src={room.image_cartoon}
                alt="mode"
              />
            }
            </div>

            <div className="CardTitle">
              Mode <h3 style={{ color: room.color }}>{room.name}</h3>
            </div>
            <div className="CardDescription">{room.description}</div>
            <div className="CardFooter">
              <button
                onClick={() => props.onChosenRoom(tokenString, room.name)}
                className="CardButton"
                style={{ backgroundColor: room.color }}
              >
                Jouer
              </button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
