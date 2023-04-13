import "../../css/ConnexionInscription.css"

const textes=[
    {
        titre:"Inscription",
        message:"Bienvenue sur Zoo-ggle! Le Boggle orienté animaux",
        info:"Sinon cliquez en dessous pour vous connecter",
        button:"Connexion"
    },
    {
        titre:"Connexion",
        message:"Bonjour! Prêt à faire quelques parties?",
        info:"Sinon cliquez en dessous pour vous inscrire",
        button:"Inscription"
    },
    {
        titre:"Création de Partie",
        message:"Prêt à jouer?",
        info:"Sinon cliquez en dessous pour revenir à la page précédente",
        button:"Quitter"
    }
]
export default function Hider(props : any){

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

    let index = 0
    if(props.partie){
        index=2
    }

    return(
        <div className="hider goRight" id="hider">
            <span className="hiderTitle" id="title">{textes[index].titre}</span>
            <span className="hiderMessage" id="message">{textes[index].message}</span>
            <span className="hiderInfo" id="info">{textes[index].info}</span>
            <button className="hiderSubmit" id="button" onClick={props.partie?(event: React.MouseEvent<HTMLElement>) => {} : (event: React.MouseEvent<HTMLElement>)=>{switchSide("hider")} }>{textes[index].button}</button>
        </div>
    )

}
