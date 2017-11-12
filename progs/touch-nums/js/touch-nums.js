'use strict'
console.log('touch-nums');


var runTime = 0;
var gSize = 16;
var gGameBord = getGameBord();
var gNextNum = 1;
renderBoard(gGameBord);


function getGameBord() {
    var nums = [];
    var numsBord = [];
    for (var i = 0; i < gSize; i++) {
        nums.push(i + 1);
    }
    // console.log(nums);
    var squrSize = Math.sqrt(gSize);
    var count = 0;
    for (var i = 0; i < squrSize; i++) {
        numsBord.push([]);
        for (var j = 0; j < squrSize; j++) {
            var randIndex = Math.floor(Math.random() * (gSize - count));
            numsBord[i][j] = nums[randIndex];
            nums.splice(randIndex, 1);
            count++;
            // console.table (numsBord);
            // console.log (nums);
            // console.log ('index', randIndex);
        }
    }
    return numsBord;
}

// function gameTurn(gGameBord) {
//     var size = Math.pow(gGameBord.length, 2);
//     // var isCorrect = true;

//     var nums = [];
//     for (var i = 0; i < size; i++) {
//         nums.push(i + 1);
//     }
//     while (nextNum <= size) {
//         // var clickedNum = numClick();
//         // if (clickedNum === nextNum) {
//         //     var numIndex = getNumIndex();

//         // }
//     }
// }

function renderBoard(gGameBord) {
    var strHtml = ''
    for (var i = 0; i < gGameBord.length; i++) {
        var row = gGameBord[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            strHtml += '<td onclick="numClick(this)">';
            strHtml += gGameBord[i][j];
            strHtml += '</td>';
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('#board')
    elBoard.innerHTML = strHtml;
}

function numClick(elCell) {
    var size = gSize;
    var cellVal = +elCell.innerHTML;
    gameTime();
    console.log('click', cellVal);
    if (cellVal === gNextNum) {
        gNextNum++
        console.log(gNextNum, elCell.attributes);
        elCell.className += 'clicked';
        console.log(elCell.attributes);
    }
    if (gNextNum === size+1){
        console.log('vvvvvv');
        runTime = (Date.now() - runTime)/1000;
        bestTime(runTime);
    }
}

// this function sets runtimr var if it's not "0"
function gameTime(){
    if (runTime === 0){
        runTime = Date.now();
    } 
}

// this function cul the best time and stors it to localstorage
function bestTime(runTime){
    var previousTime = localStorage.getItem('time');
    if (previousTime <= 0){
        localStorage.setItem('time', runTime);
    }
    if (runTime > previousTime){
        console.log('prev');
    }
        else if(runTime <= previousTime){
            localStorage.setItem('time', runTime);
            console.log('thistime');
        }
        document.querySelector(".bestTime").innerHTML = localStorage.getItem('time');;
}

function handelExtrim(elStateSelactor){
    console.log('extrim!!');
    var isExtrim = elStateSelactor.value;
    console.log('extrim!!', isExtrim);
    return isExtrim;
}

function handelSzie(elSizeSelctor){
    // console.log('size!!!', gSize);
    gSize = +elSizeSelctor.value;
    // console.log('size!!!', gSize);
    
    gGameBord = getGameBord();
    renderBoard(gGameBord);
}