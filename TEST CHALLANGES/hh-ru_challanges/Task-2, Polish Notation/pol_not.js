'use strict';

const str1 = '2+1';
const str2 = '(2+21*23)+45'; 
const str3 = 'd2+d45+(3+d789)';
const str4 = 'd665+68+d155';
const str5 = 'd5646354654+651616464646+d48484+d5566';
const str6 = '21+25+45+5+2';
const str7 = '(1>4)*(4>3)+3';
const str8 = '10+5*2-1*3*6';
const str9 = '(1>3)+(3>2)*2';//! WARNING почему то в стеке остается 2 числа вместо 1 и результат неверен (ошибка где то в синтаксическом анализаторе)

const currentStr = str9;

const numsEtalon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'd'];
const opersEtalon = ['*', '+', '-', '>', '(', ')'];

const calcArr = tokensArrCreated(currentStr);
console.log(currentStr);
console.log(calcArr);
console.log('Exit RPN:', createRPN (calcArr));

const rpnArr = createRPN (calcArr);

calculateVariations(rpnArr);

function calculateVariations(rpnArr) {

    let stack = [];
    let resEasy = 0;

    for (let i = 0; i < rpnArr.length; i++) {

        const currentToken = rpnArr[i];

        const isNumber = (str) => {
            const chars = str.split('');
            return numsEtalon.includes(chars[0]);
        };
        const isOperator = opersEtalon.includes(currentToken);

        if (isNumber(currentToken) || currentToken === 'd') {

            stack.push(currentToken);
        }

        if (isOperator) {

            if (!stack[stack.length - 1].includes('d') && !stack[stack.length - 2].includes('d')) {

                switch (currentToken) {
                    case '*':
                        const calc1 = Number.parseInt(stack[stack.length - 2]) * Number.parseInt(stack[stack.length - 1]);

                        stack.pop(stack[stack.length - 1]);
                        stack.pop(stack[stack.length - 2]);

                        stack.push(String(calc1));
                        break;

                    case '+':
                        const calc2 = Number.parseInt(stack[stack.length - 2]) + Number.parseInt(stack[stack.length - 1]);

                        stack.pop(stack[stack.length - 1]);
                        stack.pop(stack[stack.length - 2]);

                        stack.push(String(calc2));
                        break;
                    case '-':
                        const calc3 = Number.parseInt(stack[stack.length - 2]) - Number.parseInt(stack[stack.length - 1]);

                        stack.pop(stack[stack.length - 1]);
                        stack.pop(stack[stack.length - 2]);

                        stack.push(String(calc3));
                        break;
                    case '>':
                        const log = Number.parseInt(stack[stack.length - 2]) > Number.parseInt(stack[stack.length - 1]);

                        let calc4 = '';

                        if (log) {
                            calc4 = '1';
                        } else {
                            calc4 = '0';
                        }

                        stack.pop(stack[stack.length - 1]);
                        stack.pop(stack[stack.length - 2]);

                        stack.push(calc4);
                        break;
                }
            }
        }
    }

    resEasy = stack[stack.length - 1];

    console.log('Результат', resEasy);//! 000000000000000000000000
    console.log(stack); //! 000000000000000000000000
}


function createRPN (calcArr) {

    //* Это - СИНТАКСИЧЕСКИЙ АНАЛИЗАТОР (выводит обратную польскую запись)

    let exitArr = [];
    let stack = [];

    for (let i = 0; i < calcArr.length; i++) {

        const currentToken = calcArr[i];

        const isNumber = (str) => {
            const chars = str.split('');
            return numsEtalon.includes(chars[0]);
        };
        const isOperator = opersEtalon.includes(currentToken);

        if (isNumber(currentToken) || currentToken === 'd') {
            exitArr.push(currentToken)
        }

        if (isOperator) {
            if (stack.length === 0) {
                stack.push(currentToken);
            } else {
                switch (currentToken) {
                    case '*':
                        //* если равный приоритет, то выталкиваем верхний оператор из стека
                        if (stack[stack.length - 1] === '*') {
                            exitArr.push(stack[stack.length - 1]); //* добавляю в выходной массив верхний элемент в стеке
                            stack.pop(stack[stack.length - 1]); //* удаляю из стека верхний элемент в стеке
                            stack.push(currentToken); //* добавляю текущий элемент в стек
                        }

                        //* если выше приоритетом
                        if (stack[stack.length - 1] === '+' 
                            || stack[stack.length - 1] === '-' 
                            || stack[stack.length - 1] === '>') {
                                stack.push(currentToken); //* просто добавляем текущий елемент в стек
                            }

                            //* если открывающая скобка
                            if (stack[stack.length - 1] === '(') {
                                stack.push(currentToken); //* просто добавляем текущий елемент в стек
                            }
                        break;

                    case '+':

                        //* если ниже приоритетом чем элемент в стеке
                        if (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '+' || stack[stack.length - 1] === '-') {

                            exitArr.push(stack[stack.length - 1]); //* добавляю в выходной массив верхний элемент в стеке
                            stack.pop(stack[stack.length - 1]); //* удаляю из стека верхний элемент в стеке
                            stack.push(currentToken); //* добавляю текущий элемент в стек
                        }

                        //* если выше приоритетом
                        if (stack[stack.length - 1] === '>') {
                                stack.push(currentToken); //* просто добавляем текущий елемент в стек
                            }

                        //* если открывающая скобка
                        if (stack[stack.length - 1] === '(') {

                            //* если "("
                            if (stack[stack.length - 1] === '(') {
                                stack.push(currentToken); //* просто добавляем текущий елемент в стек
                            }
                        }
                        break;

                    case '-':
                        //* если ниже приоритетом чем элемент в стеке
                        if (stack[stack.length - 1] === '*') {
                            exitArr.push(stack[stack.length - 1]); //* добавляю в выходной массив верхний элемент в стеке
                            stack.pop(stack[stack.length - 1]); //* удаляю из стека верхний элемент в стеке
                            stack.push(currentToken); //* добавляю текущий элемент в стек
                        }

                        //* если равный приоритет, то выталкиваем верхний оператор из стека
                        if (stack[stack.length - 1] === '+' || stack[stack.length - 1] === '-') {
                            exitArr.push(stack[stack.length - 1]); //* добавляю в выходной массив верхний элемент в стеке
                            stack.pop(stack[stack.length - 1]); //* удаляю из стека верхний элемент в стеке
                            stack.push(currentToken); //* добавляю текущий элемент в стек
                        }

                        //* если выше приоритетом
                        if (stack[stack.length - 1] === '>') {
                                stack.push(currentToken); //* просто добавляем текущий елемент в стек
                            }

                        //* если открывающая скобка
                        if (stack[stack.length - 1] === '(') {

                            //* если "("
                            if (stack[stack.length - 1] === '(') {
                                stack.push(currentToken); //* просто добавляем текущий елемент в стек
                            }
                        }
                        break;

                    case '>':
                        //* если ниже приоритетом чем элемент в стеке
                        if (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '+' || stack[stack.length - 1] === '-') {
                            exitArr.push(stack[stack.length - 1]); //* добавляю в выходной массив верхний элемент в стеке
                            stack.pop(stack[stack.length - 1]); //* удаляю из стека верхний элемент в стеке
                            stack.push(currentToken); //* добавляю текущий элемент в стек
                        }

                        if (stack[stack.length - 1] === '(') {

                            //* если "("
                            if (stack[stack.length - 1] === '(') {
                                stack.push(currentToken); //* просто добавляем текущий елемент в стек
                            }
                        }
                        break;

                    case '(':
                        stack.push(currentToken);
                        break;

                    case ')':
                        while (stack[stack.length - 1] !== '(') {
                            exitArr.push(stack[stack.length - 1]); //* добавляю в выходной массив верхний элемент в стеке
                            stack.pop(stack[stack.length - 1]); //* удаляю из стека верхний элемент в стеке
                        }

                        if (stack[stack.length - 1] === '(') {
                            stack.pop(stack[stack.length - 1]); //* удаляю из стека верхний элемент в стеке
                        }
                }
            }
        }
    }

    while (stack.length > 1) {
        exitArr.push(stack[stack.length - 1]);
        stack.pop(stack[stack.length - 1]);
    }

    exitArr.push(stack[stack.length - 1]);
    stack.pop(stack[stack.length - 1]);

    return exitArr;
}

function tokensArrCreated(str) {

    //* Это - ЛЕКСИЧЕСКИЙ АНАЛИЗАТОР (создает входной массив данных для Синтаксического анализатора)

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