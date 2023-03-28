import "../../css/GameCardInfo.css"
import { Typography } from "@material-tailwind/react";


export default function GameCardInfo(props : any){
    return(
        <div className="cardInfo">
            <span className="title">{props.title}</span>
            <p>
                <b>langue :</b> {props.lang} <br/>
                <b>createur :</b> {props.maker} <br/>
                <b>joueurs :</b> {props.players}
            </p>
            <a href="lien vers la partie" className="button">Rejoindre</a>
        </div>
    )
}