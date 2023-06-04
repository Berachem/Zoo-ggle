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
  faLanguage,
  faList,
  faMedal,
  faPencilAlt,
  faPercentage,
  faTrophy,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";

const getDifferenceTimeSentence = (startDate: string) => {
  // french to english (day/month/year -> year/month/day)
  const dateArray = startDate.split("/");
  const newDate = dateArray[2] + "/" + dateArray[1] + "/" + dateArray[0];
  
  // get difference between current date and start date
  const date = new Date(newDate);
  const currentDate = new Date();
  const difference = currentDate.getTime() - date.getTime();
  const differenceInDays = Math.floor(difference / (1000 * 3600 * 24));
  const differenceInHours = Math.floor(
    (difference % (1000 * 3600 * 24)) / (1000 * 3600)
  );
  const differenceInMinutes = Math.floor(
    (difference % (1000 * 3600)) / (1000 * 60)
  );
  const differenceInSeconds = Math.floor((difference % (1000 * 60)) / 1000);

  // return sentence
  if (differenceInDays > 0) {
    return "il y a " + differenceInDays + " jours";
  } else if (differenceInHours > 0) {
    return "il y a " + differenceInHours + " heures";
  } else if (differenceInMinutes > 0) {
    return "il y a " + differenceInMinutes + " minutes";
  } else if (differenceInSeconds > 0) {
    return "il y a " + differenceInSeconds + " secondes";
  } else {
    return "il y a quelques secondes";
  }
};

function goToHistoric(gameId : number, playerId : number){
  window.location.assign("/historique?idPartie="+gameId+"&idJoueur="+playerId)
}

export default function GameCardInfo(props: any) {
  return (
    <div className="cardInfo">
      <span className="title">{props.title}</span>
      <div className="flex items-center">
        {props.isPublic !== undefined && (
          <>
            {props.isPublic ? (
              <span className="flex rounded-full bg-green-500 px-2 py-1 text-xs text-white">
                Partie publique
              </span>
            ) : (
              <span className="flex rounded-full bg-red-500 px-2 py-1 text-xs  text-white">
                Partie privée
              </span>
            )}
          </>
        )}

{/*         {props.startDate && (
          <>
            <span
              className="flex rounded-full px-2 py-1 text-xs text-white"
              style={{ backgroundColor: "#B426BB" }}
            >
              <FontAwesomeIcon
                icon={faClock}
                className="icon"
                style={{ paddingRight: "5px", paddingTop: "2px" }}
              />
              {getDifferenceTimeSentence(props.startDate)}
            </span>
          </>
        )} */}
      </div>
      <p className="infos">
        {props.score !== undefined && (
          <>
            <FontAwesomeIcon
              icon={faTrophy}
              className="icon"
              style={{
                color: "#f39c12",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
            />
            <b style={{ color: "#f39c12" }}>Score :</b> {props.score} <br />
          </>
        )}
        {props.lang && (
          <>
            <FontAwesomeIcon
              icon={faLanguage}
              className="icon"
              style={{
                color: "#3498db",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
            />
            <b style={{ color: "#3498db" }}>Langue :</b> {props.lang} <br />
          </>
        )}

        {props.endDate && (
          <>
            <FontAwesomeIcon
              icon={faClose}
              className="icon"
              style={{
                color: "#e74c3c",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
            />
            <b style={{ color: "#e74c3c" }}>Fin :</b> {props.endDate} <br />
          </>
        )}
        {props.size !== undefined && (
          <>
            <FontAwesomeIcon
              icon={faExpand}
              className="icon"
              style={{
                color: "#27ae60",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
            />
            <b style={{ color: "#27ae60" }}>Taille :</b> {props.size} <br />
          </>
        )}
        {props.mode && (
          <>
            <FontAwesomeIcon
              icon={faGamepad}
              className="icon"
              style={{
                color: "#f1c40f",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
            />
            <b style={{ color: "#f1c40f" }}>Mode :</b> {props.mode} <br />
          </>
        )}

        {props.maxPlayers !== undefined && (
          <>
            <FontAwesomeIcon
              icon={faUsers}
              className="icon"
              style={{
                color: "#c0392b",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
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
              style={{
                color: "#d35400",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
            />
            <b style={{ color: "#d35400" }}>Créateur :</b> {props.maker} <br />
          </>
        )}

        {props.players && (
          <>
            <FontAwesomeIcon
              icon={faUsers}
              className="icon"
              style={{
                color: "#2980b9",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
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
              style={{
                color: "#2ecc71",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
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
              style={{
                color: "#e67e22",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
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
              style={{
                color: "#e74c3c",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
            />
            <b style={{ color: "#e74c3c" }}>Pourcentage :</b>{" "}
            {props.percentageWordsFound}% <br />
          </>
        )}

{props.leaderboard && props.leaderboard.length > 0 && (
          <>
            <FontAwesomeIcon
              icon={faList}
              className="icon"
              style={{
                color: "#9b59b6",
                paddingRight: "5px",
                paddingTop: "2px",
              }}
            />
            <b style={{ color: "#9b59b6" }}>Classement :</b>
            <div className="flex items-center justify-between">
              {props.leaderboard.map((player: any) => (
                <a href={"/profile/" + player.id}>
                  <span
                    className="flex rounded-full px-2 py-1 text-xs text-white" 
                    style={{
                      backgroundColor: [
                        "#f1c40f",
                        "#e67e22",
                        "#e74c3c",
                        "#c0392b",
                        "#9b59b6",
                        "#3498db",
                        "#27ae60",
                        "#2ecc71",
                      ][props.leaderboard.indexOf(player)],
                    }}
                  >
                    {props.leaderboard.indexOf(player) + 1 === 1 ? (
                      <FontAwesomeIcon
                        icon={faCrown}
                        className="icon"
                        style={{
                          color: "#d35400",
                          paddingRight: "5px",
                          paddingTop: "2px",
                        }}
                      />
                    ) : props.leaderboard.indexOf(player) + 1 === 2 ? (
                      <FontAwesomeIcon
                        icon={faMedal}
                        className="icon"
                        style={{
                          color: "#bdc3c7",
                          paddingRight: "5px",
                          paddingTop: "2px",
                        }}
                      />
                    ) : props.leaderboard.indexOf(player) + 1 === 3 ? (
                      <FontAwesomeIcon
                        icon={faMedal}
                        className="icon"
                        style={{
                          color: "#bdc3c7",
                          paddingRight: "5px",
                          paddingTop: "2px",
                        }}
                      />
                    ) : (
                      props.leaderboard.indexOf(player) + 1
                    )}
                    {" " + player.pseudo} : {player.score} points
                  </span>
                </a>
              ))}
            </div>
          </>
        )}

      </p>
      <div style={{display:"flex",margin:"auto"}}>
        <Button size="sm" color="orange" className="rounded" onClick={()=>{goToHistoric(props.gameId,props.playerId)}}>Voir l'historique</Button>
      </div>


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
      {props.endDate == null && (props.canJoin == null || props.canJoin) && (
        <Button size="sm" color="orange" className="rounded">
          Rejoindre
        </Button>
      )}
    </div>
  );
}
