import "../../css/Connexion.css"
import ConnexionProps from "../../pages/connexion"

export default function Hider(props : ConnexionProps){

    return(
        <div className="hider goLeft" id="hider">
            <span className="hiderTitle" id="title">Connexion</span>
            <span className="hiderMessage" id="message">Bonjour! Prêt à faire quelques parties?</span>
            <span className="hiderInfo" id="info">Sinon cliquez en dessous pour vous inscrire</span>
            <button className="hiderSubmit" id="button" onClick={props.switchSide}>Inscription</button>
            <div className="errors">
                <span id="loginError"></span><br/>
                <span id="pswError"></span><br/>
                <span id="mailError"></span><br/>
                <span id="pubError"></span>
            </div>
        </div>
    )

}
