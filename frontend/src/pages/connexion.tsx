import Inscription from "../components/Zooggle/Inscription"
import ConnexionForm from "../components/Zooggle/ConnexionForm"
import Hider from "../components/Zooggle/Hider"
import "../css/Connexion.css"

export default interface ConnexionProps{
    switchSide : ()=>void
}

export default function Connexion() {

    //variables qui permettent le déplacement du "hider"
    let index = 0
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
        }
    ]

    //fonction qui switch le hider de coté et permet au bon formulaire d'être mis en avant au format telephone
    function switchSide(){

        //changement de coté
        document.getElementById("hider")?.classList.toggle("goRight")
        document.getElementById("hider")?.classList.toggle("goLeft")
    
        //actualisation des textes
        index= (index+1)%2
        let titre = document.getElementById("title")
        let message =  document.getElementById("message")
        let info =  document.getElementById("info")
        let button = document.getElementById("button")
        if(titre !== null){ 
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

        //actualisation des classes pour le passage en mode téléphone
        let connexion = document.getElementById("connexion")
        let inscription = document.getElementById("inscription")

        
        if(inscription !== null){
            inscription.classList.toggle("telHidden")
        }
        if(connexion !== null){
            connexion.classList.toggle("telHidden")
        }
    }

    //initialisation des champs
    switchSide()

    return(
        <div style={{overflowY:"hidden"}}>
            <div  className="connecContainer">
                <Inscription switchSide={switchSide}/>
                <ConnexionForm switchSide={switchSide}/>
                <Hider switchSide={switchSide}/>
            </div>
        </div>
    )
}