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
            // TODO: add the word to the list of words found (in the html)
        }
            console.log("Mot :"+word+",Success : "+data.success)
    }
    );
    resetField();
        
}

