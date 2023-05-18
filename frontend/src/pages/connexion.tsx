import Inscription from "../components/Zooggle/Inscription"
import ConnexionForm from "../components/Zooggle/ConnexionForm"
import Hider from "../components/Zooggle/Hider"
import "../css/Connexion.css"

export default function Connexion() {
    return(
        <div style={{overflowY:"hidden"}}>
            <div  className="connecContainer">
                <Inscription/>
                <ConnexionForm/>
                <Hider/>
            </div>
        </div>
    )
}