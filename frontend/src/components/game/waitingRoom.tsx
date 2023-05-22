import React, { useEffect, useState } from "react";
import "../../css/WaitingRoom.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock, faTable, faUser, faUsers } from "@fortawesome/free-solid-svg-icons";
import {Player, WaitingRoomItem} from "../../components/game/websocket"


interface WaitingRoomProps{
  room:WaitingRoomItem
  onLeaving:() => void
  playersWaiting: Player[]
}

{/* <RoomWaiter roomName={chatState.waitingRoomName} startTimestamp={chatState.startTimestamp} onLeaving={leaveWaitingRoom} playersWaiting={playersWaiting} /> */}

export default function WaitingRoom(props: WaitingRoomProps) {
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

  return (
    <>

      <div className="WaitingRoom_Card">
        <div className="WaitingRoom_CardHeader">
          <div className="WaitingRoom_CardHeaderIntermediaire">
            <div className="MetaDate">
              <FontAwesomeIcon icon={faClock} style={{ color: props.room.color }} />{" "}
              {props.room.duration/60} min
            </div>
            <div className="MetaDate">
              <FontAwesomeIcon icon={faUsers} style={{ color: props.room.color }} />{" "}
              {props.room.attendeeNumber}
            </div>
            <div className="MetaDate">
              <FontAwesomeIcon icon={faTable} style={{ color: props.room.color }} />{" "}
              {props.room.grid_size}x{props.room.grid_size}
            </div>
          </div>
        </div>
        <div className="WaitingRoom_CardBody">
          <div className="WaitingRoom_CardLeft">

            <div className="WaitingRoom_CardImage">
              {backgroundMode ? (
                <img src={props.room.image_realist} alt="mode" />
              ) : (
                <img src={props.room.image_cartoon} alt="mode" />
              )}
            </div>
            <div className="WaitingRoom_CardMainInfos">
              <div className="WaitingRoom_CardTitle">
                Mode <h3 style={{ color: props.room.color }}>{props.room.name}</h3>
              </div>
              <div className="WaitingRoom_CardDescription">
                {props.room.description}
              </div>
            </div>
          </div>

          <div className="WaitingRoom_CardRight" style={{ borderColor: props.room.color }}>
            <div className="WaitingRoom_CardRules">
              <h3>Règles</h3>
              <p>{props.room.rule}</p>
            </div>
            <div className="WaitingRoom_CardPlayers">
              <h3>Joueurs ({props.playersWaiting.length}/{props.room.attendeeNumber}){" "}<FontAwesomeIcon icon={faUser} style={{ color: props.room.color }} /></h3>
              <div className="WaitingRoom_CardPlayersList">
                {props.playersWaiting.map(player => player.pseudo).join(", ")}
              </div>
            </div>
          </div>
        </div>

        <div className="WaitingRoom_CardFooter">
          <button
          onClick={props.onLeaving}
            className="WaitingRoom_CardButton"
            style={{ backgroundColor: props.room.color }}
          >
            Quitter
          </button>
        </div>
      </div>

    </>
  );
}
