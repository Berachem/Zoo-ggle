import "../../css/ConnexionInscription.css"

function switchForm(){
    let connexion = document.getElementById("connexion")
    let inscription = document.getElementById("inscription")

    if(connexion !== null){
        connexion.classList.toggle("telHidden")
    }
    if(inscription !== null){
        inscription.classList.toggle("telHidden")
    }

}

export default function Connexion(){

    return(
        <form id="connexion" action="" method="POST" className="connecForm telHidden" style={{marginTop:"15vh"}}>
            <span className="titleTel">Connexion</span>
            <span className="connecLabel">Pseudo</span>
            <input type="text" placeholder="votre pseudo" className="connecInput"/>
            <span className="connecLabel">Mot de passe</span>
            <input type="text" placeholder="votre mot de passe" className="connecInput"/>
            <input type="submit" className="connecSubmit" value="se connecter"/>
            <span className="telSwitch" onClick={(event: React.MouseEvent<HTMLElement>) => {switchForm()}}>Appuyez ici pour s'inscrire</span>
        </form>
    )

}