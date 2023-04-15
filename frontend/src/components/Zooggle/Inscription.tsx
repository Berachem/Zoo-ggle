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
    let telerror = document.getElementById("telpswError");

    if(psw!=null && error!=null && telerror!=null){
        if(psw.value == ""){
            error.innerHTML = "• Un mot de passe est requis.";
            error.style.color = 'red';
            telerror.innerHTML = "• Un mot de passe est requis.";
            telerror.style.color = 'red';
            return false;
        }else if(regex.test(psw.value) == false){
            error.innerHTML = "• Le mot de passe doit : être long De 8 charactère ou plus, contenir majuscule, minuscules, chiffres et charactères spéciaux";
            error.style.color = 'red';
            telerror.innerHTML = "• Le mot de passe doit : être long De 8 charactère ou plus, contenir majuscule, minuscules, chiffres et charactères spéciaux";
            telerror.style.color = 'red';
            return false;
        }else{
            error.innerHTML = "";
            telerror.innerHTML = "";
            return true;
        }
    }

    
}

async function checkMail(){
    let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    let mail = document.getElementById("mailInscription") as HTMLInputElement;
    let error = document.getElementById("mailError");
    let telerror = document.getElementById("telmailError");

    if(mail!=null && error!=null && telerror!=null){
        if(mail.value.trim()==""){
            error.innerHTML = "• Un mail est requis.";
            error.style.color = 'red';
            telerror.innerHTML = "• Un mail est requis.";
            telerror.style.color = 'red';
            return false;
        }else if(regex.test(mail.value) == false) {
            error.innerHTML = "• Entrez un mail valide";
            error.style.color = 'red';
            telerror.innerHTML = "• Entrez un mail valide";
            telerror.style.color = 'red';
            return false;
        }else{
            const res = await fetch('http://localhost/backend/api/checkMail.php?mail='+mail.value).then(res => res.json())

            if(res.retour==="not ok"){
                error.innerHTML = "• mail déjà pris."
                error.style.color = 'red'
                telerror.innerHTML = "• mail déjà pris."
                telerror.style.color = 'red'
                globalresult = true   
            }else{    
                error.innerHTML = "";
                telerror.innerHTML = "";
                return true;
            }
        }



    } 
}

async function checkAll(event : React.SyntheticEvent){
    event.preventDefault()

    //pour que les 4 messages s'affichent d'un coup et non pas en 4 submit
    let psw = checkPsw();
    let mail = await checkMail();
    let pseudo = checkPseudo();
    return psw && mail && pseudo && !globalresult;
}

function checkPseudo(){
    let pseudo = document.getElementById("Inscriptionlogin") as HTMLInputElement;
    let error = document.getElementById("loginError");
    let telerror = document.getElementById("telloginError");
    
    if(pseudo!=null && error!=null && telerror!=null){
        error.innerHTML = "";
        if(pseudo.value.trim() == ""){
            error.innerHTML = "• Un pseudo est requis";
            error.style.color = 'red';
            telerror.innerHTML = "• Un pseudo est requis";
            telerror.style.color = 'red';
            return  false;
        }
        callBDDPseudo(pseudo.value);
        return true;
    }
    
}


async function callBDDPseudo(login : string){
    const res = await fetch('http://localhost/backend/api/checkPseudo.php?login='+login).then(res => res.json())

    if(res.retour!="ok"){
        let error = document.getElementById("loginError")
        let telerror = document.getElementById("telloginError")
        if(error!=null && telerror!=null){
            error.innerHTML = "• pseudo déjà pris."
            error.style.color = 'red'
            telerror.innerHTML = "• pseudo déjà pris."
            telerror.style.color = 'red'
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
            <div className="telErrors">
                <span id="telloginError"></span><br/>
                <span id="telpswError"></span><br/>
                <span id="telmailError"></span><br/>
                <span id="telpubError"></span>
            </div>

            <span className="connecLabel">Pseudo</span>
            <input type="text" className="connecInput" id="Inscriptionlogin" onKeyUp={checkPseudo}/>
           

            <span className="connecLabel">Mot de passe</span>
            <input type="password" className="connecInput" id="pswInscription" onKeyUp={checkPsw}/>
            

            <span className="connecLabel">Votre Adresse Mail</span>
            <input type="text" className="connecInput" id="mailInscription" onKeyUp={checkMail}/>
            

            <span className="connecLabel">Le type de compte</span>
            <div className="radioContainer">
                <div><label htmlFor="non-public">Privé</label><input type="radio" name="privatisation" value="prive" id="non-public" checked/></div>
                <div><label htmlFor="public">Public</label><input type="radio" name="privatisation" value="public" id="public"/></div>
            </div>
            

            <span className="connecLabel">Votre Description</span>
            <textarea id="" cols={30} rows={10} className="connecInput desc"></textarea>
            
            <input type="submit" className="connecSubmit" value="s'inscrire"/>

            <span className="telSwitch" onClick={(event: React.MouseEvent<HTMLElement>) => {switchForm()}}>Appuyez ici pour se connecter</span>
        </form>
    )

}