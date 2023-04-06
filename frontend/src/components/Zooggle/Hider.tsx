import "../../css/ConnexionInscription.css"

function switchSide(id : string){
    document.getElementById(id)?.classList.toggle("otherSide")
}

export default function Hider(){

    return(
        <div className="hider" id="hider">
            <span className="hiderTitle">S'inscrire</span>
            <span className="hiderMessage">Bienvenue sur Zoo-ggle ! <br/>Le Boggle orienté animaux</span>
            <span className="hiderInfo">Sinon cliquez en dessous pour vous connecter</span>
            <button className="hiderSubmit" onClick={(event: React.MouseEvent<HTMLElement>) => {switchSide("hider")}}>Connexion</button>
        </div>
    )

}
