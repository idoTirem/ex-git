'use strict'
console.log('mineSweeper');
var gRunTime = 0;
var gBoard;

var gLevel = {
    SIZE: 4,
    MINES: 2
};

var gState = {
    isGameOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

// if(gState.isGameOn){
//     setInterval(setCurrTime,1000);
// }

//on page load!
function initGame() {
    gBoard = buildBoard(gLevel.SIZE);
    renderBoard(gBoard);
    gState.isGameOn = true;
}


// returns a board  with empty objects
function buildBoard(boardSize) {
    var mineCount = 0;
    var board = [];
    for (var i = 0; i < boardSize; i++) {
        board[i] = [];
        for (var j = 0; j < boardSize; j++) {
            board[i][j] = {
                isMine: false,
                negsCount: 0,
            }
        }
    }
    // adding mines to the array
    while (mineCount < gLevel.MINES) {
        var iRund = Math.floor(Math.random() * boardSize);
        var jRund = Math.floor(Math.random() * boardSize);
        console.log('iRund ', iRund, 'jRund ', jRund);
        if (!board[iRund][jRund].isMine) {
            board[iRund][jRund].isMine = true;
            mineCount++;
        }
    }
    console.table(board);
    return board;
}

// render the bord
function renderBoard(board) {
    var strHtml = ''

    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var tdId = 'cell-' + i + '-' + j;
            var className = 'closed'
            // onrightclick="cellMarked(elCell)"
            strHtml += '<td id="' + tdId + '" onmousedown="cellClicked(this, event.button)"  ' +
                'class="    ' + className + '" value="' + gBoard.negsCount + '" >';
            strHtml += '</td>';
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('#board');
    elBoard.innerHTML = strHtml;
    setMinesNegsCount(board);
}

//sets glevel.SIZE and glevel.MINES acording to radio butoon
function handelSzie(elSizeSelctor) {
    gLevel.SIZE = +elSizeSelctor.value;
    gLevel.MINES = +elSizeSelctor.value;
    gState.isGameOn = false;
    initGame();
}

//Sets mines-count to neighbours
function setMinesNegsCount(board) {
    console.log(gLevel.SIZE);
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        for (var j = 0; j < row.length; j++) {
            var negsCount = 0;
            // check all the negs of cell i , j 
            for (var k = 0; k <= 2; k++) {
                for (var l = 0; l <= 2; l++) {
                    var idx = i + k - 1;
                    var jdx = j + l - 1;
                    if (k === 1 && l === 1) continue;
                    else if (idx < 0 || idx > gLevel.SIZE - 1 || jdx < 0 || jdx > gLevel.SIZE - 1) continue;
                    else if (board[idx][jdx].isMine) {
                        negsCount++;
                    }
                }
            }
            board[i][j].negsCount = negsCount;
            console.log('negsCount = ', board[i][j].negsCount, ' at ', 'i', i, 'j', j)
        }
    }
}

// Called when a cell (td) is clicked
function cellClicked(elCell, button) {
    if (gState.isGameOn === false || elCell.className === 'openCell') {
        return;
    }
    gameTime();
    //for left click
    if (button === 0) {
        console.log(button, 'was clickd');
        var cellCoord = getCellCoord(elCell.id);
        var coorI = cellCoord.i;
        var coorJ = cellCoord.j;
        // check if BOOMB!
        if (gBoard[coorI][coorJ].isMine) {
            console.log('BOOM!!!');
            elCell.innerText = '💣';
            gState.isGameOn = false;
        } // if no negs
        else if (gBoard[coorI][coorJ].negsCount === 0) {
            // console.log('nebors===0 gBoard.negsCount = ', gBoard[cellCoord.i][cellCoord.j].negsCount);
            expandShown(gBoard, elCell, coorI, coorJ);

        } // if negs > 0
        else if (gBoard[coorI][coorJ].negsCount > 0) {
            // console.log('nebors>0 gBoard.negsCount = ', gBoard[cellCoord.i][cellCoord.j].negsCount);
            elCell.innerText = gBoard[coorI][coorJ].negsCount;
            elCell.className = 'openCell';
            gState.shownCount++;
        }
    }// left click end
    // for right click
    if (button === 2) {
        window.oncontextmenu = function () {
            return false;
        };
        console.log(button, 'was clickd');
        // console.log('mousedown.button === 2');
        if (elCell.innerText !== '⚑' && elCell.className !== 'openCell') {
            gState.markedCount++;
            elCell.innerText += '⚑';
        } else if (elCell.innerText === '⚑') {
            elCell.innerText = '';
            gState.markedCount--;
        }
    }// right click end
    chekEndOfTurn();
}

// checks evry click
function chekEndOfTurn() {
    if (gState.shownCount === Math.pow(gLevel.SIZE, 2)) {
        console.log('win!');
    }
}

function expandShown(board, elCell, coorI, coorJ) {
    if (elCell.innerText === 'V' || !isNaN(idx) || !isNaN(jdx)) {
        return;

    } else if (gBoard[coorI][coorJ].negsCount > 0 ) {
        elCell.className = 'openCell';
        elCell.innerText = gBoard[coorI][coorJ].negsCount;
        gState.shownCount++;
        // console.log(gState.shownCount, 'gState.shownCount of !!!!!if else!!!');
        return;
    }
    else {
        // console.log('i', coorI, 'j', coorJ, 'is 0 negs roooot' );
        // console.log('i', idx, 'j', jdx, 'is neg');
        elCell.className = 'openCell';
        elCell.innerText = 'V';
        // console.log(gState.shownCount, 'gState.shownCount of !!!!!else!!!');
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                var idx = coorI + i - 1;
                var jdx = coorJ + j - 1;
                // console.log('i', idx, 'j', jdx, 'is neg');
                if (i === 1 && j === 1) continue;
                else if (idx < 0 || idx > gLevel.SIZE - 1 || jdx < 0 || jdx > gLevel.SIZE - 1) continue;
                else {
                    var selector = getSelector(idx, jdx);
                    // console.log(selector);
                    var elNextCell = document.querySelector(selector);
                    // console.log(elNextCell);
                    elCell.className = 'openCell';
                    elCell.innerText = 'V';
                    gState.shownCount++
                    // console.log('i', idx, 'j', jdx, 'is neg');
                    expandShown(board, elNextCell, idx, jdx);
                }
            }
        }
    }
}


// Gets a string such as:  'cell-2-7' and returns {i:2, j:7}
function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}

// Gets a i, j and returns string such as:  'cell-2-7' {i:2, j:7}
function getSelector(i, j) {
    return '#cell-' + i + '-' + j;
}

// this function gets the player's name and save it to localstorage
function yourName(){
    var player1Name = prompt('enter sandman', 'yoda');
    localStorage.setItem('Player1', player1Name);
    console.log(localStorage.getItem('Player1'));
    getPlayersName();
}

// this function gets the players name and sets it to the page
function getPlayersName(){
    document.querySelector(".playersName").innerHTML = localStorage.getItem('Player1');
}

// this function sets runtimr var if it's not "0"
function gameTime(){
    if (gState.secsPassed === 0){
        gState.secsPassed = Date.now()/1000;
    } 
}

// this function checks the best time and stors it to localstorage
function bestTime(){
    var previousTime = localStorage.getItem('time');
    if (previousTime <= 0){
        localStorage.setItem('time', gState.secsPassed);
    }
    if (gState.secsPassed > previousTime){
        console.log('prev');
    }
        else if(gState.secsPassed <= previousTime){
            localStorage.setItem('time', gState.secsPassed);
            console.log('thistime');
        }
        gState.secsPassed = localStorage.getItem('time');
        document.querySelector(".bestTime").innerHTML = gState.secsPassed;
}


function setCurrTime(){
    var currTime = Date.now()/1000 - gState.secsPassed;
    document.querySelector(".currTime").innerHTML = currTime;
}

















 // //chek all the boombs if seraunded by "open" - open ths boomb
    // for (var i = 0; i < gLevel.SIZE; i++) {
    //     for (var j = 0; j < gLevel.SIZE; j++) {
    //         var negsCount = 0;
    //         var selector = getSelector(i, j);
    //         var elCell = document.querySelector(selector);

    //         if (gBoard[i][j].isMine && elCell.innerText === '') {
    //             for (var k = 0; k <= 2; k++) {
    //                 for (var l = 0; l <= 2; l++) {
    //                     var idx = i + k - 1;
    //                     var jdx = j + l - 1;
    //                     var selector = getSelector(idx, jdx);
    //                     var elCheckCell = document.querySelector(selector);
    //                     if (k === 1 && l === 1) continue;
    //                     else if (idx < 0 || idx > gLevel.SIZE - 1 || jdx < 0 || jdx > gLevel.SIZE - 1) {
    //                         negsCount++;
    //                     }
    //                     else if (elCheckCell.innerText !== '' || gBoard[idx][jdx].isMine) {
    //                         negsCount++;
    //                     }
    //                 }
    //             }
    //             // console.log(negsCount, '!!!!!!!!!!!!!!!!!!!!!!!!!!');
    //             // if (negsCount === 8) {
    //             //     console.log(elCell, 'bommb good!!!!');
    //             //     elCell.innerText = '💣';
    //                 // gState.shownCount++
    //             }
    //         }
    //         if (elCell.innerText !== '') {
    //             console.log('opened cells =', gState.shownCount)
    //         }
    //     }