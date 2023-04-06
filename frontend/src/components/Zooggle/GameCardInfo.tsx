import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../../css/GameCardInfo.css";
import { Alert, Button } from "@material-tailwind/react";
import {
  faCheck,
  faCircle,
  faClock,
  faClose,
  faCrown,
  faExpand,
  faGamepad,
  faGlobe,
  faLanguage,
  faList,
  faPencilAlt,
  faPercentage,
  faPlay,
  faTable,
  faTimes,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

export default function GameCardInfo(props: any) {
  return (
    <div className="cardInfo">
      <span className="title">{props.title}</span>
      <p className="infos">
        {props.score !== undefined && (
          <>
            <FontAwesomeIcon
              icon={faTrophy}
              className="icon"
              style={{ color: "#f39c12", paddingRight: "5px" }}
            />
            <b style={{ color: "#f39c12" }}>Score :</b> {props.score} <br />
          </>
        )}
        {props.lang && (
          <>
            <FontAwesomeIcon
              icon={faLanguage}
              className="icon"
              style={{ color: "#3498db", paddingRight: "5px" }}
            />
            <b style={{ color: "#3498db" }}>Langue :</b> {props.lang} <br />
          </>
        )}
        {props.startDate && (
          <>
            <FontAwesomeIcon
              icon={faClock}
              className="icon"
              style={{ color: "#8e44ad", paddingRight: "5px" }}
            />
            <b style={{ color: "#8e44ad" }}>Début :</b> {props.startDate} <br />
          </>
        )}
        {props.endDate && (
          <>
            <FontAwesomeIcon
              icon={faClose}
              className="icon"
              style={{ color: "#e74c3c", paddingRight: "5px" }}
            />
            <b style={{ color: "#e74c3c" }}>Fin :</b> {props.endDate} <br />
          </>
        )}
        {props.size !== undefined && (
          <>
            <FontAwesomeIcon
              icon={faExpand}
              className="icon"
              style={{ color: "#27ae60", paddingRight: "5px" }}
            />
            <b style={{ color: "#27ae60" }}>Taille :</b> {props.size} <br />
          </>
        )}
        {props.mode && (
          <>
            <FontAwesomeIcon
              icon={faGamepad}
              className="icon"
              style={{ color: "#f1c40f", paddingRight: "5px" }}
            />
            <b style={{ color: "#f1c40f" }}>Mode :</b> {props.mode} <br />
          </>
        )}
        {props.isPublic !== undefined && (
          <>
            <FontAwesomeIcon
              icon={faGlobe}
              className="icon"
              style={{ color: "#2c3e50", paddingRight: "5px" }}
            />
            <b style={{ color: "#2c3e50" }}>Public :</b>{" "}
            {props.isPublic ? "Oui" : "Non"} <br />
          </>
        )}
        {props.maxPlayers !== undefined && (
          <>
            <FontAwesomeIcon
              icon={faUsers}
              className="icon"
              style={{ color: "#c0392b", paddingRight: "5px" }}
            />
            <b style={{ color: "#c0392b" }}>Joueurs max :</b> {props.maxPlayers}{" "}
            <br />
          </>
        )}
        {props.maker && (
          <>
            <FontAwesomeIcon
              icon={faCrown}
              className="icon"
              style={{ color: "#d35400", paddingRight: "5px" }}
            />
            <b style={{ color: "#d35400" }}>Créateur :</b> {props.maker} <br />
          </>
        )}
        {props.leaderboard && props.leaderboard.length > 0 && (
          <>
            <FontAwesomeIcon
              icon={faList}
              className="icon"
              style={{ color: "#9b59b6", paddingRight: "5px" }}
            />
            <b style={{ color: "#9b59b6" }}>Classement :</b>
            <ul>
              {props.leaderboard.map((player: any) => (
                <li key={player.id}>
                  {player.pseudo} : {player.score}
                </li>
              ))}
            </ul>
          </>
        )}
        {props.players && (
          <>
            <FontAwesomeIcon
              icon={faUsers}
              className="icon"
              style={{ color: "#2980b9", paddingRight: "5px" }}
            />
            <b style={{ color: "#2980b9" }}>Joueurs :</b>
            <i>{props.players}</i>
          </>
        )}
        {props.numberWordsFound !== undefined && (
          <>
            <FontAwesomeIcon
              icon={faCheck}
              className="icon"
              style={{ color: "#2ecc71", paddingRight: "5px" }}
            />
            <b style={{ color: "#2ecc71" }}>Mots trouvés :</b>{" "}
            {props.numberWordsFound} <br />
          </>
        )}
        {props.numberWordsProposed !== undefined && (
          <>
            <FontAwesomeIcon
              icon={faPencilAlt}
              className="icon"
              style={{ color: "#e67e22", paddingRight: "5px" }}
            />
            <b style={{ color: "#e67e22" }}>Mots proposés :</b>{" "}
            {props.numberWordsProposed} <br />
          </>
        )}
        {props.percentageWordsFound !== undefined && (
          <>
            <FontAwesomeIcon
              icon={faPercentage}
              className="icon"
              style={{ color: "#e74c3c", paddingRight: "5px" }}
            />
            <b style={{ color: "#e74c3c" }}>Pourcentage :</b>{" "}
            {props.percentageWordsFound}% <br />
          </>
        )}
      </p>
      {props.endDate != null && !props.endDate && (
        <>
          <Alert color="green" className="rounded">
            {" "}
            <FontAwesomeIcon icon={faCircle} className="icon" /> Partie en cours
            !
          </Alert>
          <br />
        </>
      )}
        {props.endDate != null && props.endDate && (
            <>
                <Alert color="orange" className="rounded">
                    
                     La partie est déjà terminée !
                </Alert>
                <br />
            </>
        )}
      {/*   <Button size="sm" color="orange" className="rounded">Rejoindre</Button> */}
      {props.endDate == null && (
        <Button size="sm" color="orange" className="rounded">
          Rejoindre
        </Button>
      )}
    </div>
  );
}
