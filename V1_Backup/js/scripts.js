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

function checkWord(word, foundedWords){
    $.ajax({
        url: 'php/wordCheck.php',
        type: 'POST',
        data: {
            word: word
        },
        success: function(data) {
            console.log("AVANT :"+data);
            var result = JSON.parse(data);
            if (result.success && !foundedWords.includes(word)) {
                $("#word-found-list").append("<li>" + word + "</li>");
                foundedWords.push(word);
            }
            console.log(" ===> Mot :"+word+",Success : "+result.success);
            console.log("Data : " +data);
            console.log("Data parsed: " +result);
            console.log("List "+foundedWords);
        }
    });
    resetField();
    return foundedWords
}

function checkWordDemo(word, grid,foundedWords){
    $.ajax({
        url: 'php/wordCheckDemo.php',
        type: 'POST',
        data: {
            word: word,
            grid: grid
        },
        success: function(data) {
            console.log("AVANT :"+data);
            var result = JSON.parse(data);
            if (result.success && !foundedWords.includes(word)) {
                $("#word-found-list").append("<li>" + word + "</li>");
                foundedWords.push(word);
            }else{
                // incorrect-word 
                $("#incorrect-word").innerHTML = "Le mot "+word+" est incorrect";
            }
            console.log(" ===> Mot :"+word+",Success : "+result.success);
            console.log("Data : " +data);
            console.log("Data parsed: " +result);
            console.log("List "+foundedWords);
        }
    });
    resetField();
    return foundedWords
}




function resetWordFoundList() {
    document.getElementById("word-found-list").innerHTML = "";
    foundedWords=[];
}

