import "../../css/GameCardInfo.css"
import {Button} from "@material-tailwind/react";

export default function GameCardInfo(props : any){
    return(
        <div className="cardInfo">
            <span className="title">{props.title}</span>
            <p className="infos">
                <b>langue :</b> {props.lang} <br/>
                <b>createur :</b> {props.maker} <br/>
                <b>joueurs :</b> {props.players} <br/>
            </p>
            <Button size="sm" color="orange" className="rounded">Rejoindre</Button>
        </div>
    )
}