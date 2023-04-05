export default function Inscription(){

    return(
        <form action="" method="POST" style={{border:"1px black solid"}}>
            <span>Pseudo</span><br />
            <input type="text" placeholder="votre pseudo"/><br />
            <span>Mot de passe</span><br />
            <input type="text" placeholder="votre mot de passe"/><br />
            <span>Votre Adresse Mail</span><br />
            <input type="text" placeholder="votre mot de passe"/><br />

            <span>Le type de compte</span><br />
            <input type="radio" name="privatisation" value="prive" checked/><label htmlFor="prive">Privé</label>
            <input type="radio" name="privatisation" value="public"/><label htmlFor="public">Public</label><br />

            <span>VVotre Description</span><br />
            <input type="textarea" placeholder="votre mot de passe"/><br />
            <input type="submit"/>
        </form>
    )

}