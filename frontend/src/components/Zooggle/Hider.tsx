import "../../css/ConnexionInscription.css"

const textes=[
    {
        titre:"Inscription",
        message:"Bienvenue sur Zoo-ggle! <br/>Le Boggle orienté animaux",
        info:"Sinon cliquez en dessous pour vous connecter",
        button:"Connexion"
    },
    {
        titre:"Connexion",
        message:"Bonjour! <br/>Prêt à faire quelques parties?",
        info:"Sinon cliquez en dessous pour vous inscrire",
        button:"Inscription"
    }
]

let index = 0

function switchSide(id : string){
    document.getElementById(id)?.classList.toggle("goRight")
    document.getElementById(id)?.classList.toggle("goLeft")

    index= (index+1)%2
    let titre = document.getElementById("title")
    let message =  document.getElementById("message")
    let info =  document.getElementById("info")
    let button = document.getElementById("button")
    if(titre !== null){ //Typescript oblige la verification même si c'est codé en dur juste en dessous
        titre.innerHTML=textes[index].titre
    }
    if(message !== null){
        message.innerHTML=textes[index].message
    }
    if(info !== null){
        info.innerHTML=textes[index].info
    }
    if(button !== null){
        button.innerHTML=textes[index].button
    }
}

export default function Hider(){

    return(
        <div className="hider goRight" id="hider">
            <span className="hiderTitle" id="title">Inscription</span>
            <span className="hiderMessage" id="message">Bienvenue sur Zoo-ggle ! <br/>Le Boggle orienté animaux</span>
            <span className="hiderInfo" id="info">Sinon cliquez en dessous pour vous connecter</span>
            <button className="hiderSubmit" id="button" onClick={(event: React.MouseEvent<HTMLElement>) => {switchSide("hider")}}>Connexion</button>
        </div>
    )

}
