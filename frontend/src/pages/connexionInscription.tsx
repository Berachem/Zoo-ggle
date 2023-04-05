import Inscription from "../components/Zooggle/Inscription"
import Connexion from "../components/Zooggle/Connexion"
import Hider from "../components/Zooggle/Hider"

export default function ConnexionInscription() {
    return(
        <div style={{
            display:"flex",
            flexDirection:"row",
            width:"60vw",
            height:"75vh",
            margin:"auto",
            marginTop:"12.5vh",
            backgroundColor:"#ffffff",
            borderRadius:"0.25rem"
        }}>
            <Inscription/>
            <Connexion/>
            <Hider/>
        </div>
    )
}