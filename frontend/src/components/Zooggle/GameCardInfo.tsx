import "../../css/GameCardInfo.css"
import GameButton from "./GameButton"

export default function GameCardInfo(props : any){
    return(
        <div className="cardInfo">
            <span className="title">{props.title}</span>
            <p>
                <b>langue :</b> {props.lang} <br/>
                <b>createur :</b> {props.maker} <br/>
                <b>joueurs :</b> {props.players} <br/>
            </p>
            <GameButton>Rejoindre</GameButton>
        </div>
    )
}