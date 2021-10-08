'use strict';

const str1 = '2+1';
const str2 = '21+23+45';
const str3 = 'd2+d45+3+d789';
const str4 = 'd665+68+d155';

console.log(str4);

const numsEtalon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const opersEtalon = ['*', '+', '-', '>', '(', ')'];

let numStack = [];
let operatorsStack = [];

calcVariations(str4);

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

        if (isNumberCurr || currentChar === 'd') {
            tokenCreator.push(currentChar);
        } 
        else if (isOperatorCurr) {
            const token = tokenCreator.join('');

            numStack.push(token);
            numStackCounter += 1;

            tokenCreator = [];
        }

        if (endLine) {
            const token = tokenCreator.join('');

            numStack.push(token);
            numStackCounter += 1;

            tokenCreator = [];
        }
    }

    console.log(numStack, numStackCounter);
}