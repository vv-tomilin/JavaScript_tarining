const str1 = '6+d2+(d2855+d2*3+30)+4548+d48';
const str2 = '2*133';
console.log(str2);

const numEtalon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const operators = ['*', '+', '-', '>', '(', ')'];

let numStack = [];
let operatorsStack = [];

parserStr(str2);

function parserStr(str) {

    const strElements = str.split('');

    let numStackCounter = 0; //* счетчик числового стека

    for (let i = 0; i < strElements.length; i++) {

        const operatorsStackTop = operatorsStack[operatorsStack.length - 1]; //* текущий верхний элемент стека операторов в цикле 

        const isNumberPrevChar = numEtalon.includes(strElements[i - 1]); //* является ли числом предыдущий символ

        const numStackTopCurrent = numStack[numStack.length - 1]; //* текущий верхний элемент стека в цикле (не может быть использован как токен)

        //* Формирую токен из числа или dN и ложу его в стек с числами
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

        //* формирую токен из оператора и ложу его в стек с операторами
        if (isOperator(strElements[i])) {
            if (operatorsStack.length === 0) {
                //* если стек с операторами пустой то добавляем оператор в стек
                operatorsStack.push(strElements[i]);
            }
        }

        //* конец строки
        if (i + 1 > strElements.length - 1) {
            
            if (strElements[i] !== ')') {
                const searchDTopEl = numStack[numStackCounter - 1].includes('d');
                const searchDPrevEl = numStack[numStackCounter - 2].includes('d');

                //* Здесь считаем простое выражение без dN
                if (!searchDTopEl && !searchDPrevEl) {
                    //* объект с настройками арифметических операций
                    const operationProps = {
                        firstOperand: numStack[numStackCounter - 2],
                        secondOperand: numStack[numStackCounter - 1],
                        operator: operatorsStackTop
                    };
                    const result = mathOperation(operationProps);
                    console.log(result);
                } else {
                    //* если есть dN хотя бы в одном из токенов
                    console.log('tis is D');
                }

            } else {
                console.log('this is - )', strElements[i]);
            }
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

function mathOperation(props={}) {
    const {firstOperand, secondOperand, operator} = props;

    const first = Number.parseInt(firstOperand);
    const second = Number.parseInt(secondOperand);
    let result;

    switch (operator) {
        case '*':
            result = first * second;
            break;
        case '+':
            result = first + second;
            break;
        case '-':
            result = first - second;
            break;
    }

    return String(result);
}

