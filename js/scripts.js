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

function checkWord(word, grid){
    // fetch the php (php/api/wordCheck.php) and send the word and the grid in POST
    fetch('php/word_check.php', {
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
function checkWordDemo(word, grid,foundedWords){
    $.ajax({
        url: 'php/word_check_demo.php',
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

