import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../css/choixPartie.css";
import { faClock, faTable, faUsers } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";

export default function Jouer() {
  const [backgroundMode, setBackgroundMode] = useState(false);

  useEffect(() => {
    const backgroundMode =
      localStorage.getItem("BackgroundMode") === "true" ? true : false;
    setBackgroundMode(backgroundMode);
  }, [backgroundMode]);

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
        {modes.map((mode) => (
          <div className="Card">
            <div className="CardHeader">
              <div className="MetaDate">
                <FontAwesomeIcon
                  icon={faClock}
                  style={{ color: mode.couleur }}
                />{" "}
                {mode.temps} min
              </div>
              <div className="MetaDate">
                <FontAwesomeIcon
                  icon={faUsers}
                  style={{ color: mode.couleur }}
                />{" "}
                {mode.joueurs}
              </div>
              <div className="MetaDate">
                <FontAwesomeIcon
                  icon={faTable}
                  style={{ color: mode.couleur }}
                />{" "}
                {mode.grille}x{mode.grille}
              </div>
            </div>

            <div className="CardImage">
              <img
                src={backgroundMode ? mode.realImage : mode.cartoonImage}
                alt="mode"
              />
            </div>

            <div className="CardTitle">
              Mode <h3 style={{ color: mode.couleur }}>{mode.nom}</h3>
            </div>
            <div className="CardDescription">{mode.description}</div>
            <div className="CardFooter">
              <button
                className="CardButton"
                style={{ backgroundColor: mode.couleur }}
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

