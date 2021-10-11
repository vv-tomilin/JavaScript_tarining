'use strict';

const str1 = '2+1';
const str2 = '(1*21+23)*45';
const str3 = 'd2+d45+3+d789';
const str4 = 'd665+68+d155';
const str5 = 'd5646354654+651616464646+d48484+d5566';
const str6 = '21+25+45+5+2';
const str7 = '(5>4)*2';
const str8 = '10+5*2-1*3*6'; // 

const currentStr = str6;

const numsEtalon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'd'];
const opersEtalon = ['*', '+', '-', '>', '(', ')'];

function calcVariations(tokensArr=[]) {

    const startTime = Date.now();
    
    const numStack = [];
    const operStack = [];

    let numCount = 0;

    let result = 0;

    for (let i = 0; i < tokensArr.length; i++) {

        const currentToken = tokensArr[i];

        const isNumber = (str) => {
            const chars = str.split('');
            return numsEtalon.includes(chars[0]);
        };
        const isOperator = opersEtalon.includes(currentToken);

        if (isNumber(currentToken) || currentToken === 'd') {
            numStack.push(currentToken);
            numCount += 1;
        }
        
        if (isOperator) {

            if (operStack.length === 0) {

                operStack.push(currentToken);

            } else {

                const topOper = operStack[operStack.length - 1];
                const topNum = numStack[numStack.length - 1];
                const prevNum = numStack[numStack.length - 2];
                
                //* работа с простыми числами
                if (!topNum.includes('d') && !prevNum.includes('d')) {
                    if (currentToken === '*') {
                        switch (topOper) {
                            //* равный приоритет
                            case '*':
                                const calc = Number.parseInt(prevNum) * Number.parseInt(topNum);
    
                                numStack.pop(topNum);
                                numStack.pop(prevNum);
                                numCount -= 2;
    
                                numStack.push(String(calc));
                                numCount += 1;
    
                                operStack.pop(topOper);
                                operStack.push(currentToken);

                                break;
    
                            //* приоритет выше
                            case '+':
                                operStack.push(currentToken);
                                break;
                            case '-':
                                operStack.push(currentToken);
                                break;
                            case '(':
                                operStack.push(currentToken);
                                break;
                            case ')':
                                operStack.push(currentToken);
                                break;
                            case '>':
                                operStack.push(currentToken);
                                break;
                        }
                    }

                    if (currentToken === '+') {
                        switch (topOper) {
                            case '*':
                                const calc1 = Number.parseInt(prevNum) * Number.parseInt(topNum);
    
                                numStack.pop(topNum);
                                numStack.pop(prevNum);
                                numCount -= 2;
    
                                numStack.push(String(calc1));
                                numCount += 1;
    
                                operStack.pop(topOper);
                                operStack.push(currentToken);
                                break;
                            case '+':
                                const calc2 = Number.parseInt(prevNum) + Number.parseInt(topNum);
    
                                numStack.pop(topNum);
                                numStack.pop(prevNum);
                                numCount -= 2;
    
                                numStack.push(String(calc2));
                                numCount += 1;
    
                                operStack.pop(topOper);
                                operStack.push(currentToken);
                                break;
                            case '-':
                                const calc3 = Number.parseInt(prevNum) - Number.parseInt(topNum);
    
                                numStack.pop(topNum);
                                numStack.pop(prevNum);
                                numCount -= 2;
    
                                numStack.push(String(calc3));
                                numCount += 1;
    
                                operStack.pop(topOper);
                                operStack.push(currentToken);
                                break;
                            case '(':
                                operStack.push(currentToken);
                                break;
                            case ')':
                                operStack.push(currentToken);
                                break;
                            case '>':
                                operStack.push(currentToken);
                                break;
                        }
                    }

                    if (currentToken === '-') {
                        switch (topOper) {
                            case '*':
                                const calc1 = Number.parseInt(prevNum) * Number.parseInt(topNum);
    
                                numStack.pop(topNum);
                                numStack.pop(prevNum);
                                numCount -= 2;
    
                                numStack.push(String(calc1));
                                numCount += 1;
    
                                operStack.pop(topOper);
                                operStack.push(currentToken);
                                break;
                            case '+':
                                const calc2 = Number.parseInt(prevNum) + Number.parseInt(topNum);
    
                                numStack.pop(topNum);
                                numStack.pop(prevNum);
                                numCount -= 2;
    
                                numStack.push(String(calc2));
                                numCount += 1;
    
                                operStack.pop(topOper);
                                operStack.push(currentToken);
                                break;
                            case '-':
                                const calc3 = Number.parseInt(prevNum) - Number.parseInt(topNum);
    
                                numStack.pop(topNum);
                                numStack.pop(prevNum);
                                numCount -= 2;
    
                                numStack.push(String(calc3));
                                numCount += 1;
    
                                operStack.pop(topOper);
                                operStack.push(currentToken);
                                break;
                            case '(':
                                operStack.push(currentToken);
                                break;
                            case ')':
                                operStack.push(currentToken);
                                break;
                            case '>':
                                operStack.push(currentToken);
                                break;
                        }
                    }
                }
            } 
        }

        if (i + 1 > tokensArr.length - 1 && operStack.length === 1) {

            const topOper = operStack[operStack.length - 1];
            const topNum = numStack[numStack.length - 1];
            const prevNum = numStack[numStack.length - 2];

            if (!topNum.includes('d') && !prevNum.includes('d')) {
                switch (topOper) {
                    case '*':
                        result = Number.parseInt(prevNum) * Number.parseInt(topNum);
    
                        numStack.pop(topNum);
                        numStack.pop(prevNum);
                        numCount -= 2;
    
                        operStack.pop(topOper);
                        break;
                    case '+':
                        result = Number.parseInt(prevNum) + Number.parseInt(topNum);
    
                        numStack.pop(topNum);
                        numStack.pop(prevNum);
                        numCount -= 2;
    
                        operStack.pop(topOper);
                        break;
                    case '-':
                        result = Number.parseInt(prevNum) - Number.parseInt(topNum);
    
                        numStack.pop(topNum);
                        numStack.pop(prevNum);
                        numCount -= 2;
    
                        operStack.pop(topOper);
                        break;
                }
            }
        }

        if (i + 1 > tokensArr.length - 1 && operStack.length > 1) {

            while (operStack.length > 1) {

                const topOper = operStack[operStack.length - 1];
                const topNum = numStack[numStack.length - 1];
                const prevNum = numStack[numStack.length - 2];

                if (!topNum.includes('d') && !prevNum.includes('d')) {
                    switch (topOper) {
                        case '*':
                            const calc1 = Number.parseInt(prevNum) * Number.parseInt(topNum);
    
                            numStack.pop(topNum);
                            numStack.pop(prevNum);
                            numCount -= 2;
    
                            numStack.push(String(calc1));
                            numCount += 1;
    
                            operStack.pop(topOper);
                            break;
                        case '+':
                            const calc2 = Number.parseInt(prevNum) + Number.parseInt(topNum);
    
                            numStack.pop(topNum);
                            numStack.pop(prevNum);
                            numCount -= 2;
    
                            numStack.push(String(calc2));
                            numCount += 1;
    
                            operStack.pop(topOper);
                            break;
                        case '-':
                            const calc3 = Number.parseInt(prevNum) - Number.parseInt(topNum);
    
                            numStack.pop(topNum);
                            numStack.pop(prevNum);
                            numCount -= 2;
    
                            numStack.push(String(calc3));
                            numCount += 1;
    
                            operStack.pop(topOper);
                            break;
                    }
                }
            }
        }
    }

    //* ниже производим вычисление последних чисел в стеке и выдаем результат
    switch(operStack[0]) {
        case '*':
            if (!numStack[1].includes('d') && !numStack[0].includes('d')) {
                result = Number.parseInt(numStack[0]) * Number.parseInt(numStack[1]);

                numStack.pop(numStack[1]);
                numStack.pop(numStack[0]);
                numCount -= 2;

                operStack.pop(operStack[0]);
            }
            break;
        case '+':
            if (!numStack[1].includes('d') && !numStack[0].includes('d')) {
                result = Number.parseInt(numStack[0]) + Number.parseInt(numStack[1]);

                numStack.pop(numStack[1]);
                numStack.pop(numStack[0]);
                numCount -= 2;

                operStack.pop(operStack[0]);
            }
            break;
        case '-':
            if (!numStack[1].includes('d') && !numStack[0].includes('d')) {
                result = Number.parseInt(numStack[0]) - Number.parseInt(numStack[1]);

                numStack.pop(numStack[1]);
                numStack.pop(numStack[0]);
                numCount -= 2;

                operStack.pop(operStack[0]);
            }
            break;
    }

    console.log('Result =>', result);

    console.log('Nubers Stack:', numStack, numCount);
    console.log('Operators Stack:', operStack);

    const endTime = Date.now();
    console.log('Потраченно времени:', endTime - startTime);
}

console.log(currentStr);
const tokensArr = tokensArrCreated(currentStr);
console.log(tokensArr);
calcVariations(tokensArr);

function tokensArrCreated(str) {

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