import Hider from "../components/Zooggle/Hider"
import "../css/ConnexionInscription.css"

export default function CreationPartie() {
    return(
        <div style={{height:"88vh",overflowY:"hidden"}}>
            <div  className="connecContainer">
                <form className="connecForm" action="" method="POST">
                    <span className="titleTel">Création de partie</span>
                    <span className="connecLabel">Nom de la Partie</span>
                    <input type="text" placeholder="le nom ici" className="connecInput" required/>

                    <span className="connecLabel">Nombre de Joueurs</span>
                    <select name="" id="" className="connecInput">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                    </select>

                    <span className="connecLabel">Dictionnaire</span>
                    <select name="" id="" className="connecInput">
                        <option value="fr">Francais</option>
                        <option value="en">Anglais</option>
                    </select>
                    <input type="submit" className="connecSubmit" placeholder="Créer"/>
                    <span className="telSwitch" onClick={(event: React.MouseEvent<HTMLElement>) => {}}>Appuyez ici pour QUITTER</span>
                </form>
                <Hider partie={true}/>
            </div>
        </div>
    )
}