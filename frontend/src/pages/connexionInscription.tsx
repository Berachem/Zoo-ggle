import Inscription from "../components/Zooggle/Inscription"
import Connexion from "../components/Zooggle/Connexion"
import Hider from "../components/Zooggle/Hider"
import "../css/ConnexionInscription.css"

export default function ConnexionInscription() {
    return(
        <div  className="connecContainer">
            <Inscription/>
            <Connexion/>
            <Hider/>
        </div>
    )
}