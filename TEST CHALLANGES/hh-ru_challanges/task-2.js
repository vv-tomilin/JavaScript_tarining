const str1 = 'd6+d2+(d2+20)+25';
console.log(str1);

const numEtalon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['*', '+', '-', '>', '(', ')'];

let numStack = [];
let operatorsStack = [];

parserStr(str1);

function parserStr(str) {

    const strElements = str.split('');

    for (let i = 0; i < strElements.length; i++) {

        const isNumberPrevChar = numEtalon.includes(strElements[i - 1]);

        if (strElements[i] === 'd') {
            numStack.push(strElements[i]);
        }

        if (isNumber(strElements[i])) {
            const numToken = [];

            if (isNumberPrevChar || strElements[i - 1] === 'd') {
                createTokenForNumStack(numToken, numStack, strElements[i - 1], strElements[i]);
            } else {
                numStack.push(strElements[i]);
            }
        }

        if (isOperator(strElements[i])) {
            operatorsStack.push(strElements[i]);
        }
    }

    console.log("Numbers: ", numStack);
    console.log("Operators: ", operatorsStack);
}

function isNumber(char) {
    return numEtalon.includes(char);
}

function isOperator(char) {
    return operators.includes(char);
}

function createTokenForNumStack(token, stack, prevChar, currentChar) {
    token.push(prevChar);
    token.push(currentChar);

    stack.pop(prevChar);
    stack.push(token.join(''));
}

