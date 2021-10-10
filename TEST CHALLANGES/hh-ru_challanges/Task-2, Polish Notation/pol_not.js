'use strict';

const str1 = '2+1';
const str2 = '(2+21*23)+45'; 
const str3 = 'd2+d45+(3+d789)';
const str4 = 'd665+68+d155';
const str5 = 'd5646354654+651616464646+d48484+d5566';
const str6 = '21+25+45+5+2';
const str7 = '(1>4)*(4>3)+3';
const str8 = '10+5*2-1*3*6';
const str9 = '(1>3)+(3>2)*2+(1+2)';
const str10 = 'd4*d4';

const currentStr = str10;

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
            } else {

                //* dN+N, dN*N.....
                if (!stack[stack.length - 1].includes('d') && stack[stack.length - 2].includes('d')) {
                    
                    const cutNum = Number.parseInt(stack[stack.length - 2].split('').slice(1).join('')); //* убираю d
                    const dN = [];

                    for (let i = 0; i < cutNum; i++) {
                        dN.push(i + 1);
                    }

                    switch (currentToken) {

                        case '*':
                            const calc1 = [];

                            for (let j = 0; j < dN.length; j++) {
                                calc1.push(String(Number.parseInt(dN[j]) * Number.parseInt(stack[stack.length - 1])));
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc1);
                            break;

                        case '+':
                            const calc2 = [];

                            for (let j = 0; j < dN.length; j++) {
                                calc2.push(String(Number.parseInt(dN[j]) + Number.parseInt(stack[stack.length - 1])));
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc2);
                            break;

                        case '-':
                            const calc3 = [];

                            for (let j = 0; j < dN.length; j++) {
                                calc3.push(String(Number.parseInt(dN[j]) - Number.parseInt(stack[stack.length - 1])));
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc3);
                            break;

                        case '>':
                            const calc4 = [];

                            for (let j = 0; j < dN.length; j++) {
                                const res = Number.parseInt(dN[j]) > Number.parseInt(stack[stack.length - 1]);

                                if (res) {
                                    calc4.push('1');
                                } else calc4.push('0');
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc4);
                            break;
                    }
                }

                //* dN+dN, dN*dN.....
                if (stack[stack.length - 1].includes('d') && stack[stack.length - 2].includes('d')) {

                    const cutNumPrev = Number.parseInt(stack[stack.length - 2].split('').slice(1).join('')); //* убираю d
                    const cutNumTop = Number.parseInt(stack[stack.length - 1].split('').slice(1).join('')); //* убираю d

                    const dNPrev = [];
                    const dNTop = [];

                    for (let i = 0; i < cutNumPrev; i++) {
                        dNPrev.push(i + 1);
                    }

                    for (let i = 0; i < cutNumTop; i++) {
                        dNTop.push(i + 1);
                    }

                    switch (currentToken) {

                        case '*':
                            const calc1 = [];

                            for (let j = 0; j < dNPrev.length; j++) {

                                for (let k = 0; k < dNTop.length; k++) {

                                    const res = String(Number.parseInt(dNPrev[j]) * Number.parseInt(dNTop[k]));
                                    calc1.push(res);
                                }
                            }

                            calc1.sort((a,b) => a-b);

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc1);
                            break;
                    }
                }
            }
        }
    }

    resEasy = stack[stack.length - 1];

    console.log('Результат', resEasy);//! 000000000000000000000000
    console.log(stack); //! 000000000000000000000000
}


function createRPN (calcArr) {

    //* Это - СИНТАКСИЧЕСКИЙ компилятор

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

    //* Это - ЛЕКСИЧЕСКИЙ компилятор (создает входной массив данных для Синтаксического анализатора)

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