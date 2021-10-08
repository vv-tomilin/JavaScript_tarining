'use strict';

const str1 = '2+1';
const str2 = '21+23+45';
const str3 = 'd2+d45+3+d789';
const str4 = 'd665+68+d155';
const str5 = 'd5646354654+651616464646+d48484+d5566';

const currentStr = str3;

const numsEtalon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const opersEtalon = ['*', '+', '-', '>', '(', ')'];

let numStack = [];
let operatorsStack = [];

function calcVariations(str) {
    
    const charsArr = str.split('');

    let tokenCreator = [];
    let numStackCounter = 0;
    
    for (let i = 0; i < charsArr.length; i++) {
        
        const currentChar = charsArr[i];
        //. const nextChar = charsArr[i + 1];

        const isNumberCurr = numsEtalon.includes(currentChar);
        const isOperatorCurr = opersEtalon.includes(currentChar);

        const endLine = i + 1 > charsArr.length - 1;

        const topStackElem = numStack[numStackCounter - 1];

        if (isNumberCurr || currentChar === 'd') {
            tokenCreator.push(currentChar);
        } 
        else if (isOperatorCurr) {

            const token = tokenCreator.join('');

            numStack.push(token);
            numStackCounter += 1;

            tokenCreator = [];

            console.log('Top elem OPER =>', numStack[numStackCounter - 1], numStack, 'Count', numStackCounter); //! ==================
        }

        if (endLine) {
            const token = tokenCreator.join('');

            numStack.push(token);
            numStackCounter += 1;

            tokenCreator = [];
        }

        console.log('Top elem END =>', numStack[numStackCounter - 1], numStack, 'Count', numStackCounter); //! ==================
    }

    console.log(numStack, numStackCounter);
}

console.log(currentStr);
calcVariations(currentStr);