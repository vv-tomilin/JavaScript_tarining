const str1 = 'd5165+d2+(d2855+d2*3+30)+4548+d48';
const str2 = 'd22*1000';
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

        if (strElements[i - 1] === 'd' && numStack.length === 1) {
            const numToken = [];

            numToken.push(strElements[i - 1]);
            numToken.push(strElements[i]);

            numStack.pop(numStackTopCurrent);
            numStackCounter -= 1;

            numStack.push(numToken.join(''));
            numStackCounter +=1;

            console.log(numStack, i); //! ==========
        }

        if (isNumber(strElements[i])) {

            //* двузначный токен
            if ((isNumberPrevChar || strElements[i - 1] === 'd') && numStack.length > 1) {
                const numToken = [];

                console.log('Search', numStack, i); //! ========== Search ERROR

                numToken.push(strElements[i - 1]);
                numToken.push(strElements[i]);

                numStack.pop(numStackTopCurrent);
                numStackCounter -= 1;

                numStack.push(numToken.join(''));
                numStackCounter +=1;

                console.log('Search', numStack, i); //! ========== Search ERROR

            } else if(numStack.length > 1){

                numStack.push(strElements[i]);
                numStackCounter +=1;

                console.log('CONCAT',numStack, i); //! ==========

            } else {

                console.log(numStack, i); //! ========== This ERROR block !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                
                if (numStack.length !== 0 && !operators.includes(strElements[i + 1])) {
                    const bigNumToken = [...numStackTopCurrent.split('')];

                    console.log('Token', bigNumToken, i); //! =================

                    bigNumToken.push(strElements[i]);

                    numStack.pop(numStackTopCurrent);
                    numStackCounter -= 1;

                    numStack.push(bigNumToken.join(''));
                    numStackCounter +=1;

                    console.log('Token', bigNumToken, i); //! =================

                    console.log(numStack, i); //! ========== This ERROR block !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

                } else if (operators.includes(strElements[i + 1])) {
                    //! THIS ERRRRRRRRRRRRRRRRRRRRRRRROR START

                    console.log('Else in', numStack, i); //! ==========

                    const token = [];

                    numStack.push(strElements[i]);
                    numStackCounter +=1;

                    console.log('Else push cur', numStack, i); //! ==========

                    token.push(numStack[numStack.length - 2]);
                    token.push(numStack[numStack.length - 1]);
                    console.log('token', token, i); //! ===============

                    console.log('numStack.length', numStack.length); //! ==========
                    console.log('numStack.length - 2', numStack[numStack.length - 2]); //! ==========

                    numStack.pop(numStack[numStack.length - 1]);
                    numStack.pop(numStack[numStack.length - 2]);
                    numStackCounter -= 2;

                    console.log('Else pop', numStack, i, numStack.length); //! ==========

                    numStack.push(token.join(''));
                    numStackCounter +=1;

                    //! ОСТАЕТСЯ d2 если здесь удалить выходит ошибка в блоке конца строки

                    console.log('Else out', numStack, i); //! ==========
                }
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

            console.log(numStack, i); //! ==========
        }

        //* формирую токен из оператора и ложу его в стек с операторами
        if (isOperator(strElements[i])) {

            //* если стек с операторами пустой то добавляем оператор в стек
            if (operatorsStack.length === 0) {
                operatorsStack.push(strElements[i]);
            }
        }

        //* конец строки
        if (i + 1 > strElements.length - 1) {
            
            if (strElements[i] !== ')') {
                console.log(numStack, i); //! ==========

                const searchDTopEl = numStack[numStackCounter - 1].includes('d');
                const searchDPrevEl = numStack[numStackCounter - 2].includes('d');

                const topNum = numStack[numStackCounter - 1];
                const prevNum = numStack[numStackCounter - 2];

                //* Здесь считаем простое выражение без dN
                if (!searchDTopEl && !searchDPrevEl) {
                    //* объект с настройками арифметических операций
                    const operationProps = {
                        firstOperand: prevNum,
                        secondOperand: topNum,
                        operator: operatorsStackTop
                    };
                    const result = mathOperation(operationProps);
                    console.log(result);
                } else {
                    //* Начинаем работу здесь если есть dN хотя бы в одном из токенов

                    //* если первый элемент в выражении с dN (пример: d6+3)
                    if (!searchDTopEl && searchDPrevEl) {
                        console.log('dN + N', prevNum);

                        const arr = prevNum.split('');
                        const resArr = [];
                        for (let j = 0; j < arr.length; j++) {
                            if (j !== 0) {
                                resArr.push(arr[j]);
                            }
                        }

                        console.log(resArr);

                    }
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

