import "../../css/ConnexionInscription.css"

export default function Inscription(){

    return(
        <form action="" method="POST" className="connecForm">
            <span className="connecLabel">Pseudo</span>
            <input type="text" placeholder="votre pseudo" className="connecInput"/>
            <span className="connecLabel">Mot de passe</span>
            <input type="text" placeholder="votre mot de passe" className="connecInput"/>
            <span className="connecLabel">Votre Adresse Mail</span>
            <input type="text" placeholder="votre mot de passe" className="connecInput"/>

            <span className="connecLabel">Le type de compte</span>
            <div className="radioContainer">
                <div><label htmlFor="prive">Privé</label><input type="radio" name="privatisation" value="prive" id="prive" checked/></div>
                <div><label htmlFor="public">Public</label><input type="radio" name="privatisation" value="public" id="public"/></div>
            </div>

            <span className="connecLabel">Votre Description</span>
            <input type="textarea" placeholder="votre mot de passe" className="connecInput"/>
            <input type="submit" className="connecSubmit" value="s'inscrire"/>
        </form>
    )

}