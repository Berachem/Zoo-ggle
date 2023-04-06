import "../../css/ConnexionInscription.css"

export default function Inscription(){

    return(
        <form action="" method="POST" className="connecForm">
            <span className="connecLabel">Pseudo</span><br />
            <input type="text" placeholder="votre pseudo" className="connecInput"/><br />
            <span className="connecLabel">Mot de passe</span><br />
            <input type="text" placeholder="votre mot de passe" className="connecInput"/><br />
            <span className="connecLabel">Votre Adresse Mail</span><br />
            <input type="text" placeholder="votre mot de passe" className="connecInput"/><br />

            <span className="connecLabel">Le type de compte</span><br />
            <div className="radioContainer">
                <div><label htmlFor="prive">Privé</label><input type="radio" name="privatisation" value="prive" id="prive" checked/></div>
                <div><label htmlFor="public">Public</label><input type="radio" name="privatisation" value="public" id="public"/><br /></div>
            </div>

            <span className="connecLabel">Votre Description</span><br />
            <input type="textarea" placeholder="votre mot de passe" className="connecInput"/><br />
            <input type="submit" className="connecSubmit" value="s'inscrire"/>
        </form>
    )

}