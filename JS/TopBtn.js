// get the topbutton
let topbutton = document.getElementById("topButton");

// when the user scrolls down 20px from the top of the screen, show the button
window.onscroll = function() {scrollFunction()};

function scrollFunction() {
    if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
        topbutton.style.display = "block";
    } else {
        topbutton.style.display = "none";
    }
}

// when the user clicks on the button, scoll to the top of the document
function backToTop() {
    document.body.scrollTop = 0; // for safari
    document.documentElement.scrollTop = 0; // for chrome etc
}