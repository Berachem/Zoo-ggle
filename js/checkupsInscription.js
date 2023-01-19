//verification des champs du formulaire d'inscription

function checkPsw(){
    let psw = document.getElementById("pswInscription");
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*_-]).{8,}$/;
    let error = document.getElementById("psw-insc-error");

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

function checkMail(){
    let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    let mail = document.getElementById("mailInscription");
    let error = document.getElementById("mail-insc-error");

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

function checkCheckBoxes(){
    let pub = document.getElementById("public");
    let npub = document.getElementById("non-public");
    let error = document.getElementById("pub-insc-error");

    if(!pub.checked && !npub.checked){
        error.innerHTML = "Vous devez choisir une option.";
        error.style.color = 'red';
        return false;
    }else{
        error.innerHTML = "";
        return true;
    }
}

function checkAll(){
    //pour que les 4 messages s'affichent d'un coup et non pas en 4 submit
    let psw = checkPsw();
    let mail = checkMail();
    let boxes = checkCheckBoxes();
    let pseudo = checkPseudo();
    return psw && mail && boxes && pseudo;
}

function checkPseudo(){
    let pseudo = document.getElementById("Inscriptionlogin");
    let error = document.getElementById("login-insc-error");
    error.innerHTML = "";

    if(pseudo.value.trim() == ""){
        error.innerHTML = "Un pseudo est requis";
        error.style.color = 'red';
        return  false;
    }
    callBDDPseudo(pseudo.value);


    return error.innerHTML === "";
}


function callBDDPseudo(pseudo){
    $.ajax({
        type: "POST",
        url: "checkPseudo.php",
        data: {login: pseudo},
        datatype: "json",
        success: function(response){
            console.log(response);
            if(response.message != "ok"){
                let pseudo = document.getElementById("Inscriptionlogin");
                let error = document.getElementById("login-insc-error");
                error.innerHTML = "pseudo déjà pris.";
                error.style.color = 'red';
            }
        }
    })
}
