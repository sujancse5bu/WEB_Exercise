
var countdown;
var countdownNumber;
let cSelector = document.querySelector(".container .row .stats-no").innerHTML;
let nm = parseInt(cSelector);

countdownNumber = 0;

function countdownTrigger(){
    if (countdownNumber<nm) {
        countdownNumber+=11;
        if(countdownNumber>nm) countdownNumber = nm;
        document.getElementById("show").innerHTML = countdownNumber;
        countdown = setTimeout("countdownTrigger()",1);
    }
}

$(document).ready(function(){
    $("#show").scroll(countdownTrigger);
})
    


    