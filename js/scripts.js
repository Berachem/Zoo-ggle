/*!
* Start Bootstrap - New Age v6.0.6 (https://startbootstrap.com/theme/new-age)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-new-age/blob/master/LICENSE)
*/
//
// Scripts
// 

window.addEventListener('DOMContentLoaded', event => {

    // Activate Bootstrap scrollspy on the main nav element
    const mainNav = document.body.querySelector('#mainNav');
    if (mainNav) {
        new bootstrap.ScrollSpy(document.body, {
            target: '#mainNav',
            offset: 74,
        });
    };

    // Collapse responsive navbar when toggler is visible
    const navbarToggler = document.body.querySelector('.navbar-toggler');
    const responsiveNavItems = [].slice.call(
        document.querySelectorAll('#navbarResponsive .nav-link')
    );
    responsiveNavItems.map(function (responsiveNavItem) {
        responsiveNavItem.addEventListener('click', () => {
            if (window.getComputedStyle(navbarToggler).display !== 'none') {
                navbarToggler.click();
            }
        });
    });

});

function upperCaseF(a){
    setTimeout(function(){
        a.value = a.value.toUpperCase();
    }, 1);
}

function addToFieldByClick(cell) {
    var mot = document.getElementById("mot");
    mot.value += cell.innerHTML;
}

function resetField(){
    var mot = document.getElementById("mot");
    mot.value = "";
}

function checkWord(word, grid, time){
    // fetch the php (php/api/word_check.php) and send the word and the grid in POST
    fetch('php/api/word_check.php', {
        method: 'POST',
        body: JSON.stringify({
            word: word
        })
    })
    .then(response => response.json())
    .then(data => {
        // if the word is valid, add it to the list and remove it from the grid
        if (data.success) {
            // TODO: add the word to the list of words found word-found-list

            document.getElementById("word-found-list").innerHTML += "<li>"+word+"</li>";

        }
            console.log("Mot :"+word+",Success : "+data.success)
    }
    );
    resetField();
        
}

//verification des champs du formulaire d'inscription
function checkPsw(){
    let psw = document.getElementById("pswInscription");
    let regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
    let error = document.getElementById("psw-insc-error");

    if(psw.value.trim() == ""){
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
    //pour que les 3 messages s'affichent d'un coup et non pas en trois submit
    let psw = checkPsw();
    let mail = checkMail();
    let boxes = checkCheckBoxes();
    return psw && mail && boxes ;
}

