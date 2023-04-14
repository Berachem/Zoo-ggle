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

let globalresult = false;

function checkPsw(){
    let psw = document.getElementById("pswInscription") as HTMLInputElement;
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/;
    let error = document.getElementById("pswError");

    if(psw!=null && error!=null){
        if(psw.value == ""){
            error.innerHTML = "Un mot de passe est requis.";
            error.style.color = 'red';
            return false;
        }else if(regex.test(psw.value) == false){
            error.innerHTML = "Le mot de passe doit être : long De 8 charactère ou plus, contenir Majuscule/Minuscules/Chiffres/Charactères Spéciaux";
            error.style.color = 'red';
            return false;
        }else{
            error.innerHTML = "";
            return true;
        }
    }

    
}

function checkMail(){
    let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    let mail = document.getElementById("mailInscription") as HTMLInputElement;
    let error = document.getElementById("mailError");

    if(mail!=null && error!=null){
        if(mail.value.trim()==""){
            error.innerHTML = "Un mail est requis.";
            error.style.color = 'red';
            return false;
        }else if(regex.test(mail.value) == false) {
            error.innerHTML = "Entrez un mail valide";
            error.style.color = 'red';
            return false;
        }else{
            error.innerHTML = "";
            return true;
        }
    } 
}

function checkCheckBoxes(){
    let pub = document.getElementById("public") as HTMLInputElement;
    let npub = document.getElementById("non-public") as HTMLInputElement;
    let error = document.getElementById("pubError");

    if(pub!=null && npub!=null && error!=null){
        if(!pub.checked && !npub.checked){
            error.innerHTML = "Vous devez choisir une option.";
            error.style.color = 'red';
            return false;
        }else{
            error.innerHTML = "";
            return true;
        }
    }

    
}

function checkAll(){
    //pour que les 4 messages s'affichent d'un coup et non pas en 4 submit
    let psw = checkPsw();
    let mail = checkMail();
    let boxes = checkCheckBoxes();
    let pseudo = checkPseudo();
    return psw && mail && boxes && pseudo && !globalresult;
}

function checkPseudo(){
    let pseudo = document.getElementById("Inscriptionlogin") as HTMLInputElement;
    let error = document.getElementById("loginError");
    
    if(pseudo!=null && error!=null ){
        error.innerHTML = "";
        if(pseudo.value.trim() == ""){
            error.innerHTML = "Un pseudo est requis";
            error.style.color = 'red';
            return  false;
        }
        callBDDPseudo(pseudo.value);
        return true;
    }
    
}


async function callBDDPseudo(pseudo : string){
    const formData = new FormData();
    formData.append("login",pseudo)
    const res = await fetch('http://localhost/backend/api/checkPseudo.php)',
                            {method: 'POST',body: formData}
    ).then(res => res.json())

    if(res.message!="ok"){
        let error = document.getElementById("loginError")
        if(error!=null){
            error.innerHTML = "pseudo déjà pris."
            error.style.color = 'red'
            globalresult = true
        }     
    }else{
        globalresult = false
    }
}

export default function Inscription(){

    return(
        <form action="" method="POST" className="connecForm" id="inscription" onSubmit={checkAll}>
            
            <span className="titleTel">Inscription</span>
            <span className="connecLabel">Pseudo</span>
            <input type="text" className="connecInput" id="Inscriptionlogin" onKeyUp={checkPseudo}/>
            <span id="loginError"></span>

            <span className="connecLabel">Mot de passe</span>
            <input type="password" className="connecInput" id="pswInscription" onKeyUp={checkPsw}/>
            <span id="pswError"></span>

            <span className="connecLabel">Votre Adresse Mail</span>
            <input type="text" className="connecInput" id="mailInscription" onKeyUp={checkMail}/>
            <span id="mailError"></span>

            <span className="connecLabel">Le type de compte</span>
            <div className="radioContainer">
                <div><label htmlFor="prive">Privé</label><input type="radio" name="privatisation" value="prive" id="non-public" checked/></div>
                <div><label htmlFor="public">Public</label><input type="radio" name="privatisation" value="public" id="public"/></div>
            </div>
            <span id="pubError"></span>

            <span className="connecLabel">Votre Description</span>
            <textarea id="" cols={30} rows={10} className="connecInput desc"></textarea>
            
            <input type="submit" className="connecSubmit" value="s'inscrire"/>

            <span className="telSwitch" onClick={(event: React.MouseEvent<HTMLElement>) => {switchForm()}}>Appuyez ici pour se connecter</span>
        </form>
    )

}