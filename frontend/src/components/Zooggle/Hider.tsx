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

        //changement de coté
        document.getElementById(id)?.classList.toggle("goRight")
        document.getElementById(id)?.classList.toggle("goLeft")
    
        //actualisation des textes
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

        //vidange des erreurs
        let pswerror=document.getElementById("pswError")
        let mailerrror=document.getElementById("mailError")
        let loginerror=document.getElementById("loginError");

        if(loginerror!=null && mailerrror!=null && pswerror!=null){
            pswerror.innerHTML=""
            mailerrror.innerHTML=""
            loginerror.innerHTML=""
        }

    }

    let index = 1
    if(props.partie){
        index=2
    }

    return(
        <div className="hider goLeft" id="hider">
            <span className="hiderTitle" id="title">{textes[index].titre}</span>
            <span className="hiderMessage" id="message">{textes[index].message}</span>
            <span className="hiderInfo" id="info">{textes[index].info}</span>
            <button className="hiderSubmit" id="button" onClick={props.partie?(event: React.MouseEvent<HTMLElement>) => {} : (event: React.MouseEvent<HTMLElement>)=>{switchSide("hider")} }>{textes[index].button}</button>
            <div className="errors">
                <span id="loginError"></span><br/>
                <span id="pswError"></span><br/>
                <span id="mailError"></span><br/>
                <span id="pubError"></span>
            </div>
        </div>
    )

}
