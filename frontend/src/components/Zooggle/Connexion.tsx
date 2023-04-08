import "../../css/ConnexionInscription.css"

export default function Connexion(){

    return(
        <form action="" method="POST" className="connecForm" style={{marginTop:"15vh"}}>
            <span className="connecLabel">Pseudo</span>
            <input type="text" placeholder="votre pseudo" className="connecInput"/>
            <span className="connecLabel">Mot de passe</span>
            <input type="text" placeholder="votre mot de passe" className="connecInput"/>
            <input type="submit" className="connecSubmit" value="se connecter"/>
        </form>
    )

}