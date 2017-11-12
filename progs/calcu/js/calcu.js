'use strict'
console.log('calcu')


var gNum1 = null;
var gNum2 = null;
var gOper = '';
var strHtml = ' ';

function addDigit(digit) {
    if (gNum2 === null) {
        gNum1 = (gNum1 * 10) + digit;
        disply(gNum1);
    } else {
        gNum2 = (gNum2 * 10) + digit;
        disply(gNum2);

    }
}

function digitPrassed(elDigit) {
    var digit = +elDigit.innerText;
    if (gNum1 === null) {
        gNum1 = digit;
        disply(gNum1);
    } else {
        addDigit(digit);
    }
}

function operatorPrassed(elOper) {
    console.log('goper befor if =', gOper);

    gOper = (elOper.innerText !== ' ') ? elOper.innerText : gOper;
    var strHtml = '';
    var isNum2 = (gNum2 === null) ? true : false;
    console.log('goper after if =', gOper);
    console.log('isNum2?', isNum2);
    var result;
    switch (gOper) {
        case '-':
        case '+':
        case '*':
        case '%':
        case '/':
            if (isNum2) {
                disply(gNum1 + gOper);
                gNum2 = 0;
            } else {
                gNum1 = getResult();
                gNum2 = null;
                disply(gNum1 + gOper);
                gNum2 = 0;
            }
            break;
        case '=':
            var eldisplay = document.querySelector('.display').innerText;
            console.log(eldisplay, 'diiiiiissssss play');
            // if (isNaN(+eldisplay)) {
            var Oper = eldisplay.substring((eldisplay.indexOf(' ') + 1),
                eldisplay.lastIndexOf(' '));
            gOper = (Oper > '') ? Oper : gOper;
            console.log(gOper, 'isnan this oper ensted of =');
            // } else {
            //     console.log(gOper, ' not a nun this oper ensted of =');
            // }
            gNum1 = getResult();
            gNum2 = null;
            disply(gNum1);
            gNum2 = 0;
            break;

        default:
            break;

    }
}

function equlPressd() {

}

function getResult() {
    var eldisplay = document.querySelector('.display').innerText;
    var oper = eldisplay.substring((eldisplay.indexOf(' ') + 1), eldisplay.lastIndexOf(' '));
    strHtml = '';
    switch (oper) {
        case '-':
            var result = gNum1 - gNum2;
            break;
        case '+':
            var result = gNum1 + gNum2;
            break;
        case '*':
            var result = gNum1 * gNum2;
            break;
        case '%':
            var result = gNum1 * gNum / 100;
            break;
        case '/':
            var result = gNum1 / gNum2;
            break;
        default:
            var result = gNum1;
            break;
    }
    return result;
}

function buttonPressd(params) {
    console.log('button befor if =', button);

    var button = (params.innerText !== ' ') ? params.innerText : button;
    var strHtml = '';
    var isNum2 = (gNum2 === null) ? true : false;
    console.log('button after if =', button);
    console.log('isNum2?', isNum2);
    var result;
    switch (button) {
        case 'mc':
            console.log(button, 'this button');
            break;
        case 'mr':
            console.log(button, 'this button');
            break;
        case 'ms':
            console.log(button, 'this button');
            break;
        case 'm+':
            console.log(button, 'this button');
            break;
        case 'm-':
            console.log(button, 'this button');
            break;
        case 'ce':
            gNum1 = null;
            gNum2 = null;
            gOper = '';
            strHtml = ' ';
            var display = document.querySelector('.display');
            display.innerHTML = strHtml;
            break;
        case '+/-':
            gNum1 *= -1;
            gNum1 = getResult();
            gNum2 = null;
            disply(gNum1);
            gNum2 = 0;
            console.log(button, 'this button');
            break;
        case 'root':
            gNum1 = Math.sqrt(gNum1, 2);
            gNum1 = getResult();
            gNum2 = null;
            disply(gNum1);
            gNum2 = 0;
            console.log(button, 'this button');
            break;
        case '.':
            // gNum1 = gNum1*1.0;
            // gNum1 = getResult();
            // gNum2 = null;
            // disply(gNum1);
            // gNum2 = 0;
            console.log(button, 'this button');
            break;
        case '1/x':
            console.log(button, 'this button');
            var num = gNum1;
            gNum1 = 1 / num;
            gNum1 = getResult();
            gNum2 = null;
            disply(gNum1);
            gNum2 = 0;

            break;

        default:
            break;
    }
}

function disply(str) {
    var eldisplay = document.querySelector('.display');
    strHtml = '';
    // console.log(eldisplay, 'display');
    // console.log(str, 'str');
    if (gNum1 === null) {
        strHtml = '0'
    } else if (gNum2 === null) {
        strHtml += str;
        // console.log(strHtml, 'strhtml');
    } else {
        strHtml = gNum1;
        strHtml += ' '
        strHtml += gOper;
        strHtml += ' '
        strHtml += gNum2;
    }
    eldisplay.innerHTML = strHtml;
    console.log(strHtml, 'strhtml doneS');
}

