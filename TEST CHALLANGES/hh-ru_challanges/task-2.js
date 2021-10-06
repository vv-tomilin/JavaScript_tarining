const str1 = '6+d2+(d2855+d2*3+30)+4548+d48';
const str2 = '2*133';
console.log(str2);

const numEtalon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['*', '+', '-', '>', '(', ')'];

// const operatorsPriority = {
//     greater: 1,        //? ">"
//     addition: 2,       //? "+"
//     subtraction: 2,    //? "-"
//     multiplication: 3, //? "*"
// };

let numStack = [];
let operatorsStack = [];

parserStr(str2);

function parserStr(str) {

    const strElements = str.split('');

    let numStackCounter = 0; //* счетчик числового стека

    for (let i = 0; i < strElements.length; i++) {

        const isNumberPrevChar = numEtalon.includes(strElements[i - 1]); //* является ли числом предыдущий символ

        const numStackTopCurrent = numStack[numStack.length - 1]; //* верхний элемент стэка

        //* Формирую токен из числа или dN и ложу его в стэк с числами
        if (strElements[i] === 'd') {
            numStack.push(strElements[i]);

            numStackCounter +=1;
        }

        if (isNumber(strElements[i])) {
            const numToken = [];

            //* двузначный токен
            if (isNumberPrevChar || strElements[i - 1] === 'd') {
                numToken.push(strElements[i - 1]);
                numToken.push(strElements[i]);

                numStack.pop(numStackTopCurrent);
                numStackCounter -= 1;

                numStack.push(numToken.join(''));
                numStackCounter +=1;
            } else {
                numStack.push(strElements[i]);
                numStackCounter +=1;
            }

            //* токен с количеством символов > 2
            if (numStack.length > 1) {

                if (numStackTopCurrent.split('').length > 1 && isOperator(strElements[i - numStackTopCurrent.split('').length - 1])) {
                    const bigNumToken = [...numStackTopCurrent.split('')];

                    bigNumToken.push(strElements[i]);

                    numStack.pop(numStackTopCurrent);
                    numStackCounter -= 1;

                    numStack.push(bigNumToken.join(''));
                    numStackCounter +=1;
                }
            }
        }

        //* формирую токен из оператора и ложу его в стэк с операторами
        if (isOperator(strElements[i])) {
            operatorsStack.push(strElements[i]);
        }

        if (i + 1 > strElements.length - 1) {
            console.log('End', numStackCounter, numStack[numStackCounter - 1]);
        }
    }

    console.log('Counter: ',numStackCounter);

    console.log("Numbers: ", numStack);
    console.log("Operators: ", operatorsStack);
    
}

function isNumber(char) {
    return numEtalon.includes(char);
}

function isOperator(char) {
    return operators.includes(char);
}

