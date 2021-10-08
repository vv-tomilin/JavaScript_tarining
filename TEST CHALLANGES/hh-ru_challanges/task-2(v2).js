'use strict';

const str1 = '2+1';
const str2 = '(1*21+23)*45'; //! WARNING !!!!!! Возможен БАГ когда первым символом стоит скобка
const str3 = 'd2+d45+3+d789';
const str4 = 'd665+68+d155';
const str5 = 'd5646354654+651616464646+d48484+d5566';
const str6 = '21*23*45'; //? 483 (21+23) Full = 21 735
const str7 = '(5>4)*2';
const str8 = '10+5*2';

const currentStr = str8;

const numsEtalon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
const opersEtalon = ['*', '+', '-', '>', '(', ')'];

let numStack = [];
let operatorsStack = [];

function calcVariations(str) {
    
    const charsArr = str.split('');

    let tokenCreator = [];
    let numStackCounter = 0;

    let result = 0;
    
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

            if (token !== '') {

                numStack.push(token);
                numStackCounter += 1;

                tokenCreator = [];
            }

            if (operatorsStack.length === 0) {

                operatorsStack.push(currentChar);

            } else if(numStack.length > 1) { //* сюда заходим только если есть минимум 2 операнда в стеке

                const topElemOpersStack = operatorsStack[operatorsStack.length - 1];

                const topElemNumsStack = numStack[numStackCounter - 1];
                const prevElemNumsStack = numStack[numStackCounter - 2];

                const topNumSearchDN = topElemNumsStack.includes('d');
                const prevNumSearchDN = prevElemNumsStack.includes('d');

                switch (currentChar) {
                    case '*':
                        //* смотрю на стек с операторами
                        switch (topElemOpersStack) {
                            case '*':
                                if (!topNumSearchDN && !prevNumSearchDN) {
                                    const calc = Number.parseInt(prevElemNumsStack) * Number.parseInt(topElemNumsStack);

                                    numStack.pop(numStack[numStack.length - 1]);
                                    numStack.pop(numStack[numStack.length - 2]);
                                    numStackCounter -= 2;

                                    numStack.push(String(calc));
                                    numStackCounter += 1;

                                    operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                                    operatorsStack.push(currentChar);
                                }
                                break;
                            case '+':
                                operatorsStack.push(currentChar);
                                break;
                            case '-':
                                operatorsStack.push(currentChar);
                                break;
                            case '>':
                                operatorsStack.push(currentChar);
                                break;
                            case '(':
                                operatorsStack.push(currentChar);
                                break;
                            case ')':
                                operatorsStack.push(currentChar);
                                break;
                        }
                        break;
                    case '+':
                        switch (topElemOpersStack) {
                            case '*':
                                if (!topNumSearchDN && !prevNumSearchDN) {
                                    
                                    const calc = Number.parseInt(prevElemNumsStack) * Number.parseInt(topElemNumsStack);

                                    numStack.pop(numStack[numStack.length - 1]);
                                    numStack.pop(numStack[numStack.length - 2]);
                                    numStackCounter -= 2;

                                    numStack.push(String(calc));
                                    numStackCounter += 1;

                                    operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                                    operatorsStack.push(currentChar);
                                }
                                break;
                            case '+':
                                if (!topNumSearchDN && !prevNumSearchDN) {
                                    const calc = Number.parseInt(prevElemNumsStack) + Number.parseInt(topElemNumsStack);

                                    numStack.pop(numStack[numStack.length - 1]);
                                    numStack.pop(numStack[numStack.length - 2]);
                                    numStackCounter -= 2;

                                    numStack.push(String(calc));
                                    numStackCounter += 1;

                                    operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                                    operatorsStack.push(currentChar);
                                }
                                break;
                            case '-':
                                if (!topNumSearchDN && !prevNumSearchDN) {
                                    const calc = Number.parseInt(prevElemNumsStack) - Number.parseInt(topElemNumsStack);

                                    numStack.pop(numStack[numStack.length - 1]);
                                    numStack.pop(numStack[numStack.length - 2]);
                                    numStackCounter -= 2;

                                    numStack.push(String(calc));
                                    numStackCounter += 1;

                                    operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                                    operatorsStack.push(currentChar);
                                }
                                break;
                        }
                        break;
                    case '>':
                        operatorsStack.push(currentChar);
                        break;
                    case '(':
                        operatorsStack.push(currentChar);
                        break;
                    case ')':
                        operatorsStack.push(currentChar);
                        break;
                }
            } else {
                operatorsStack.push(currentChar);
            }
        }

        if (endLine) {
            const token = tokenCreator.join('');

            numStack.push(token);
            numStackCounter += 1;

            tokenCreator = [];

            const topElemOpersStack = operatorsStack[operatorsStack.length - 1];

            const topElemNumsStack = numStack[numStackCounter - 1];
            const prevElemNumsStack = numStack[numStackCounter - 2];

            const topNumSearchDN = topElemNumsStack.includes('d');
            const prevNumSearchDN = prevElemNumsStack.includes('d');

            if (numStack.length === 2 && (operatorsStack.length === 1)) {

                console.log('numStack:', numStack, 'opersStack:', operatorsStack);

                switch (topElemOpersStack) {
                    case '*':
                        if (!topNumSearchDN && !prevNumSearchDN) {
                            result = Number.parseInt(prevElemNumsStack) * Number.parseInt(topElemNumsStack);
    
                            numStack.pop(numStack[numStack.length - 1]);
                            numStack.pop(numStack[numStack.length - 2]);
                            numStackCounter -= 2;
    
                            operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                        }
                        break;
                    case '+':
                        if (!topNumSearchDN && !prevNumSearchDN) {
                            result = Number.parseInt(prevElemNumsStack) + Number.parseInt(topElemNumsStack);
    
                            numStack.pop(numStack[numStack.length - 1]);
                            numStack.pop(numStack[numStack.length - 2]);
                            numStackCounter -= 2;
    
                            operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                        }
                        break;
                    case '-':
                        if (!topNumSearchDN && !prevNumSearchDN) {
                            result = Number.parseInt(prevElemNumsStack) - Number.parseInt(topElemNumsStack);
    
                            numStack.pop(numStack[numStack.length - 1]);
                            numStack.pop(numStack[numStack.length - 2]);
                            numStackCounter -= 2;
    
                            operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                        }
                        break;
                    // case '>':
                    //     operatorsStack.push(currentChar);
                    //     break;
                    // case '(':
                    //     operatorsStack.push(currentChar);
                    //     break;
                    // case ')':
                    //     operatorsStack.push(currentChar);
                    //     break;
                }
            }
        }

        while(numStack.length > 1 && operatorsStack.length > 1) {

            const topElemOpersStack = operatorsStack[operatorsStack.length - 1];

            const topElemNumsStack = numStack[numStackCounter - 1];
            const prevElemNumsStack = numStack[numStackCounter - 2];

            const topNumSearchDN = topElemNumsStack.includes('d');
            const prevNumSearchDN = prevElemNumsStack.includes('d');

            switch (topElemOpersStack) {
                case '*':
                    if (!topNumSearchDN && !prevNumSearchDN) {
                        const calc = Number.parseInt(prevElemNumsStack) * Number.parseInt(topElemNumsStack);

                        numStack.pop(numStack[numStack.length - 1]);
                        numStack.pop(numStack[numStack.length - 2]);
                        numStackCounter -= 2;

                        numStack.push(String(calc));
                        numStackCounter += 1;

                        operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                    }
                    break;
                case '+':
                    if (!topNumSearchDN && !prevNumSearchDN) {
                        const calc = Number.parseInt(prevElemNumsStack) + Number.parseInt(topElemNumsStack);

                        numStack.pop(numStack[numStack.length - 1]);
                        numStack.pop(numStack[numStack.length - 2]);
                        numStackCounter -= 2;

                        numStack.push(String(calc));
                        numStackCounter += 1;

                        operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                    }
                    break;
                case '-':
                    if (!topNumSearchDN && !prevNumSearchDN) {
                        const calc = Number.parseInt(prevElemNumsStack) - Number.parseInt(topElemNumsStack);

                        numStack.pop(numStack[numStack.length - 1]);
                        numStack.pop(numStack[numStack.length - 2]);
                        numStackCounter -= 2;

                        numStack.push(String(calc));
                        numStackCounter += 1;

                        operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                    }
                    break;
            }

            if (numStack.length === 2 && (operatorsStack.length === 1)) {

                console.log('numStack 2:', numStack, 'opersStack 2:', operatorsStack);
    
                switch (topElemOpersStack) {
                    case '*':
                        if (!topNumSearchDN && !prevNumSearchDN) {
                            result = Number.parseInt(prevElemNumsStack) * Number.parseInt(topElemNumsStack);
    
                            numStack.pop(numStack[numStack.length - 1]);
                            numStack.pop(numStack[numStack.length - 2]);
                            numStackCounter -= 2;
    
                            operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                        }
                        break;
                    case '+':
                        if (!topNumSearchDN && !prevNumSearchDN) {
                            result = Number.parseInt(prevElemNumsStack) + Number.parseInt(topElemNumsStack);
    
                            numStack.pop(numStack[numStack.length - 1]);
                            numStack.pop(numStack[numStack.length - 2]);
                            numStackCounter -= 2;
    
                            operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                        }
                        break;
                    case '-':
                        if (!topNumSearchDN && !prevNumSearchDN) {
                            result = Number.parseInt(prevElemNumsStack) - Number.parseInt(topElemNumsStack);
    
                            numStack.pop(numStack[numStack.length - 1]);
                            numStack.pop(numStack[numStack.length - 2]);
                            numStackCounter -= 2;
    
                            operatorsStack.pop(operatorsStack[operatorsStack.length - 1]);
                        }
                        break;
                    // case '>':
                    //     operatorsStack.push(currentChar);
                    //     break;
                    // case '(':
                    //     operatorsStack.push(currentChar);
                    //     break;
                    // case ')':
                    //     operatorsStack.push(currentChar);
                    //     break;
                }
            }
        }
    }

    console.log(result); //! RESULT RESULT RESULT RESULT RESULT RESULT RESULT RESULT

    console.log('Numbers Stack:', numStack, numStackCounter);
    console.log('Operators Stack:', operatorsStack);
}

console.log(currentStr);
calcVariations(currentStr);