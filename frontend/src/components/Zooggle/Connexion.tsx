import "../../css/ConnexionInscription.css"

export default function Connexion(){

    return(
        <form action="" method="POST" className="connecForm">
            <span className="connecLabel">Pseudo</span><br />
            <input type="text" placeholder="votre pseudo" className="connecInput"/><br />
            <span className="connecLabel">Mot de passe</span><br />
            <input type="text" placeholder="votre mot de passe" className="connecInput"/><br />
            <input type="submit" className="connecSubmit" value="se connecter"/>
        </form>
    )

}