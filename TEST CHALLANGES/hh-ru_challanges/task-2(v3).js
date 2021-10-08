'use strict';

const str1 = '2+1';
const str2 = '(1*21+23)*45';
const str3 = 'd2+d45+3+d789';
const str4 = 'd665+68+d155';
const str5 = 'd5646354654+651616464646+d48484+d5566';
const str6 = '21*23*45'; //? 483 (21+23) Full = 21 735
const str7 = '(5>4)*2';
const str8 = '10+5*2';

const currentStr = str7;

console.log(currentStr);
const tokensArr = tokensArrCreated(currentStr);
console.log(tokensArr);

let numStack = [];
let operatorsStack = [];

function tokensArrCreated(str) {

    const numsEtalon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
    const opersEtalon = ['*', '+', '-', '>', '(', ')'];

    const charsArr = str.split('');

    let tokens = [];

    let currentTokenCreate = [];

    for (let i = 0; i < charsArr.length; i++) {

        const currentChar = charsArr[i];

        const isNumberCurr = numsEtalon.includes(currentChar);
        const isOperatorCurr = opersEtalon.includes(currentChar);

        const endLine = i + 1 > charsArr.length - 1;

        if (isNumberCurr || currentChar === 'd') {
            currentTokenCreate.push(currentChar);
        } else if (isOperatorCurr) {
            const token = currentTokenCreate.join('');

            if (token !== '') {
                tokens.push(token);

                currentTokenCreate = [];
            }

                tokens.push(currentChar);
        }

        if (endLine) {
            const token = currentTokenCreate.join('');

            tokens.push(token);

            currentTokenCreate = [];
        }
    }

    return tokens;
}