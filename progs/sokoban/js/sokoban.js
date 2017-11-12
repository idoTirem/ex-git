'use strict'
//[2, 4],
console.log('sokoban');
// all the levels!
var LEVELS = [
    {
        num: 1,
        size: 10,
        wallsPos: [[0, 1], [5, 6], [5, 7], [5, 8], [5, 9],
        [2, 6], [0, 0], [0, 1], [6, 8], [6, 7], [6, 8], [6, 9], [7, 8]],
        gamerpos: [5, 5],
        boxesPos: [[1, 3], [2, 2], [3, 3], [4, 4]],
        targetsPos: [[1, 2], [2, 3], [3, 4], [4, 5]]

    },
    {
        num: 2,
        size: 10,
        wallsPos: [[0, 1], [5, 6], [5, 7], [5, 8], [5, 9], [2, 4],
        [2, 6], [0, 0], [0, 1], [6, 8], [6, 7], [6, 8], [6, 9], [7, 8]],
        gamerpos: [3, 5],
        boxesPos: [[1, 2], [2, 3], [3, 4], [4, 5]],
        targetsPos: [[1, 1], [2, 2], [3, 3], [4, 4]]
    }
];

var gLevelNum = 0;
var gRunTime = 0;
var gStepcount = 0;
var gBoard;
var gGamerPos;
var intervalId;

//on page load!
function initGame() {
    var levelNum = gLevelNum;
    gBoard = buildBoard(levelNum);
    renderBoard(gBoard);
    if (intervalId > 0) {
        clearInterval(intervalId);
        gRunTime = 0;
    }
}

// restart
function restart() {
    initGame();
}

// Returns the board
function buildBoard(levelNum) {
    var board = [];
    for (var i = 0; i < LEVELS[levelNum].size; i++) {
        board[i] = [];
        for (var j = 0; j < LEVELS[levelNum].size; j++) {
            board[i][j] = {
                object: ''
            }
        }
    }
    //sets the objects in the bord
    for (var i = 0; i < LEVELS[levelNum].size; i++) {
        for (var j = 0; j < LEVELS[levelNum].size; j++) {
            // console.log(LEVELS[levelNum].wallsPos.length, ' wallsPos length');
            // console.log(LEVELS[levelNum].boxesPos.length, ' boxesPos length');
            // console.log(LEVELS[levelNum].targetsPos.length, ' targetsPos length');

            if (i === 0 || i === LEVELS[levelNum].size - 1 || j === 0 || j === LEVELS[levelNum].size - 1) {//sets outer walls
                board[i][j].object = 'wall'
            }
            for (var k = 0; k < LEVELS[levelNum].wallsPos.length; k++) { //sets walls
                var idx = LEVELS[levelNum].wallsPos[k][0];
                var jdx = LEVELS[levelNum].wallsPos[k][1];
                // console.log(idx, jdx, 'walls');
                board[idx][jdx].object = 'wall';
            }
            for (var k = 0; k < LEVELS[levelNum].boxesPos.length; k++) { //sets boxes
                var idx = LEVELS[levelNum].boxesPos[k][0];
                var jdx = LEVELS[levelNum].boxesPos[k][1];
                // console.log(idx, jdx, 'boxes');
                board[idx][jdx].object = 'box';
            }
            for (var k = 0; k < LEVELS[levelNum].targetsPos.length; k++) { //sets targets
                var idx = LEVELS[levelNum].targetsPos[k][0];
                var jdx = LEVELS[levelNum].targetsPos[k][1];
                // console.log(idx, jdx, 'tar');
                board[idx][jdx].object = 'target';
            }
            var idx = LEVELS[levelNum].gamerpos[0];
            var jdx = LEVELS[levelNum].gamerpos[1];
            // console.log(idx, jdx, 'gamerpos');
            board[idx][jdx].object = 'gamer';
            gGamerPos = [idx, jdx];
            console.log(gGamerPos[0], gGamerPos[1]);
        }
    }
    console.table(board);
    return board;
}

//Print the board as a table
function renderBoard(board) {
    var strHtml = ''
    for (var i = 0; i < board.length; i++) {
        var row = board[i];
        strHtml += '<tr>';
        for (var j = 0; j < row.length; j++) {
            var tdId = 'cell-' + i + '-' + j;
            var className = board[i][j].object;
            strHtml += '<td id="' + tdId + '" onmousedown="cellClicked(this, event.button)"  ' +
                'class="    ' + className + '" value="' + board[i][j].object + '" >';
            strHtml += '</td>';
        }
        strHtml += '</tr>';
    }
    var elBoard = document.querySelector('#board');
    elBoard.innerHTML = strHtml;
}

//Called when a cell (td) is clicked
function cellClicked(elCell) {
    intervalId = setInterval(gameTime, 10);
    console.log(intervalId);
    // gameTime();
    var cellCoord = getCellCoord(elCell.id);
    var clickI = cellCoord.i;
    var clickJ = cellCoord.j;
    if (clickI === gGamerPos[0] && clickJ === gGamerPos[1]) {
        // console.log('hit the player!!!');
    } else if (Math.abs((clickI - gGamerPos[0]) * (clickJ - gGamerPos[1])) === 0 &&
        Math.abs((clickI - gGamerPos[0]) - (clickJ - gGamerPos[1])) === 1) {
        // console.log(gBoard[clickI][clickJ].object, ' gBoard[clickI][clickJ].object ');
        switch (gBoard[clickI][clickJ].object) {

            case 'wall':
                // console.log('in to the wall');
                break;

            case 'target':
                // console.log('go to target');
                moveThePlayer(clickI, clickJ);
                break;

            case 'box':
                // console.log('phosh the box');
                if (checkBoxMove(clickI, clickJ)) {
                    moveThePlayer(clickI, clickJ);
                }
                break;

            case 'point':
                // console.log('leve target');
                if (checkBoxMove(clickI, clickJ)) {
                    moveThePlayer(clickI, clickJ);
                }
                break;


            default:
                moveThePlayer(clickI, clickJ);
                break;
        }
    }
    if (checkGameOver()) {
        console.log('true clearinterval');
        clearInterval(intervalId);
        if (confirm('next level?')) {
            if (gLevelNum < LEVELS.length) {
                // gLevelNum++;
                initGame();
            } else {
                var strHtml = '<img src="img/win.jpg">';
                var elBoard = document.querySelector('#board');
                elBoard.innerHTML = strHtml;
            }
        }
    }
}

//move the player
function moveThePlayer(clickI, clickJ) {
    gStepcount++;
    document.querySelector(".stepcount").innerHTML = gStepcount;
    // console.log('gBoard[clickI][clickJ].object???', gBoard[clickI][clickJ].object);
    if (gBoard[clickI][clickJ].object === 'target') {
        gBoard[clickI][clickJ].object = 'gamerontarget';
    } else if (gBoard[clickI][clickJ].object === 'point') {
        gBoard[clickI][clickJ].object = 'gamerontarget';
        // checkBoxMove(clickI, clickJ);
    } else {
        gBoard[clickI][clickJ].object = 'gamer'
    }
    if (gBoard[gGamerPos[0]][gGamerPos[1]].object === 'gamerontarget' ||
        gBoard[gGamerPos[0]][gGamerPos[1]].object === 'point') {
        gBoard[gGamerPos[0]][gGamerPos[1]].object = 'target';
        // gBoard[clickI][clickJ].object = 'gamer';
    } else {
        gBoard[gGamerPos[0]][gGamerPos[1]].object = '';
    }
    gGamerPos = [clickI, clickJ];
    renderBoard(gBoard);
    // console.log('gBoard[clickI][clickJ].object???', gBoard[clickI][clickJ].object)
}
// phuses the box if it can! returns true if moved
function checkBoxMove(clickI, clickJ) {
    var iDiff = clickI - gGamerPos[0];
    var jDiff = clickJ - gGamerPos[1];
    // console.log('iDiff,jDiff ', iDiff, jDiff);
    switch (gBoard[clickI + iDiff][clickJ + jDiff].object) {

        case 'wall':
            // console.log('box in to the wall??');
            break;

        case 'target':
            // console.log('box in to target');
            gBoard[clickI + iDiff][clickJ + jDiff].object = 'point';
            gBoard[clickI][clickJ].object = '';
            moveThePlayer(clickI, clickJ);
            break;

        case 'box':
            // console.log('phosh the box in the box???');
            break;

        case 'point':
            // console.log('leve target');
            break;

        default:
            // console.log('default to the box???');
            gBoard[clickI + iDiff][clickJ + jDiff].object = 'box';
            moveThePlayer(clickI, clickJ);
            break;
    }
}

//Game is over when all boxes are on targets
function checkGameOver() {
    // console.log('LEVELS[gLevelNum].targetsPos.length', LEVELS[gLevelNum].targetsPos.length);
    var isGameOver = false;
    var countPoint = 0;
    for (var i = 0; i < gBoard.length; i++) {
        for (var j = 0; j < gBoard.length; j++) {
            if (gBoard[i][j].object === 'point') countPoint++;
            // console.log(countPoint, ' countPoint');
        }
    }
    if (countPoint === LEVELS[gLevelNum].targetsPos.length) {
        isGameOver = true;
        gLevelNum++;
    }
    return isGameOver;
}

function getCellCoord(strCellId) {
    var coord = {};
    coord.i = +strCellId.substring(5, strCellId.lastIndexOf('-'));
    coord.j = +strCellId.substring(strCellId.lastIndexOf('-') + 1);
    // console.log('coord', coord);
    return coord;
}

// Gets a i, j and returns string such as:  'cell-2-7' {i:2, j:7}
function getSelector(i, j) {
    return '#cell-' + i + '-' + j
}

// this function sets runtimr var if it's not "0"
function gameTime() {
    var runTime = 0;
    if (gRunTime === 0) {
        gRunTime = Date.now();
    } else {
        runTime = ((Date.now() - gRunTime) / 100).toFixed(3);
    }
    // console.log(runTime, ' = runtime','gRunTime = ',gRunTime);
    document.querySelector(".currTime").innerHTML = runTime

    return runTime;
}



