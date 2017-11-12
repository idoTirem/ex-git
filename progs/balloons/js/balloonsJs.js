'use strict'

console.log('balloons-pop');

var gBalloons = [];
createBalloons();

// pushes balloons in to an array
function createBalloons() {
    var elBalloons = document.querySelectorAll('.balloon');
    for (var i = 0; i < elBalloons.length; i++) {
        var balloon = {
            class: '.balloon' + [i + 1],
            elBalloon: elBalloons[i],
            bottom: 0,
            speed: 0
        };
        gBalloons.push(balloon);
        console.log(balloon);
        console.log(gBalloons);
    }
}

function moveBalloons() {
    var elBalloons = document.querySelectorAll('.balloon');
    console.log(elBalloons);
    setInterval(makefly, 15);
}

function makefly() {

    for (var i = 0; i < gBalloons.length; i++) {
        if (gBalloons[i].bottom < 600){
            gBalloons[i].bottom += Math.floor(Math.random() * 10);
            var curBalloon = document.querySelector(gBalloons[i].class);
            // console.log(document.querySelector(gBalloons[i].class));
            curBalloon.style.bottom = gBalloons[i].bottom + 'px';
            // console.log('curBalloon.style.bottom', curBalloon.style.bottom);
            // console.log(document.querySelector(gBalloons[i].class));
        }
    }
}

function popBalloon(elBalloon){
    console.log(elBalloon);
    elBalloon.classList.add('poped');
}