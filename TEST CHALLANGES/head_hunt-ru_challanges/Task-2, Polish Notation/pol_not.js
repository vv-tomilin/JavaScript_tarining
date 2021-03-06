'use strict';

const str1 = '2+2';
const str2 = '(2+21*23)+45'; 
const str3 = 'd2+d45+(3+d789)';
const str4 = 'd665+68+d155';
const str5 = 'd5646354654+651616464646+d48484+d5566';
const str6 = '21+25+45+5+2';
const str7 = '(1>4)*(4>3)+3';
const str8 = '10+5*2-1*3*6';
const str9 = '(1>3)+(3>2)*2+(1+2)';
const str10 = 'd4-d4';
const str11 = 'd2>(d3+1)'; //* dN && [...]
const str12 = '(d2+3)>2'; //* [...] && dN
const str13 = '5>(d2+d3)';
const str14 = '(d2+d2)>(d2+3)';

const str1val = 'd4+d4';
const str2val = 'd4+(d6>2)';

const test1 = '(d4+2)*d3+(d6>2)+3';

const currentStr = str2val;
console.log(currentStr);

const numsEtalon = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'd'];
const opersEtalon = ['*', '+', '-', '>', '(', ')'];

const calcArr = tokensArrCreated(currentStr);
const rpnArr = createRPN (calcArr);
const calcVars = calculateVariations(rpnArr);

calculationOfProbabilities(calcVars);

function calculationOfProbabilities(calcVars) {

    let resultArr = [];

    let current = null;

    if (Array.isArray(calcVars)) {
        for (let i = 0; i < calcVars.length; i++) {

            const curElem = calcVars[i];
            const res = [];
    
            if (resultArr.length !== 0 && current !== null) {
                
                if (curElem !== current) {
                    const right = calcVars.lastIndexOf(curElem);
                    const left = calcVars.indexOf(curElem);
    
                    let quantity = (right + 1) - (left + 1);
    
                    quantity += 1;
    
                    res.push(curElem);
                    res.push(quantity);
                    resultArr.push(res);
    
                    current = curElem;
                }
    
            } else {
    
                const right = calcVars.lastIndexOf(curElem);
                const left = calcVars.indexOf(curElem);
    
                let quantity = (right + 1) - (left + 1);
    
                quantity += 1;
    
                res.push(curElem);
                res.push(quantity);
                resultArr.push(res);
    
                current = curElem;
            }
        }
    
        for (let j = 0; j < resultArr.length; j++) {
    
            const numOne = resultArr[j][1];
            const numTwo = calcVars.length;
    
            const percent = String((numOne * 100 / numTwo).toFixed(2));
    
            console.log(`${resultArr[j][0]} ${percent}`);
        }
    } else {
        console.log(`${calcVars} 100.00`);
    }
}

function calculateVariations(rpnArr) {

    let stack = [];
    let result = 0;

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

            if (!stack[stack.length - 1].includes('d') 
                && !stack[stack.length - 2].includes('d') 
                && !Array.isArray(stack[stack.length - 1])
                && !Array.isArray(stack[stack.length - 2])) {

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
                if (!stack[stack.length - 1].includes('d') 
                    && stack[stack.length - 2].includes('d') 
                    && !Array.isArray(stack[stack.length - 1])) {
                    
                    const cutNum = Number.parseInt(stack[stack.length - 2].split('').slice(1).join('')); //* ???????????? d
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
                } else

                //* dN+dN, dN*dN.....
                if (stack[stack.length - 1].includes('d') && stack[stack.length - 2].includes('d')) {

                    const cutNumPrev = Number.parseInt(stack[stack.length - 2].split('').slice(1).join('')); //* ???????????? d
                    const cutNumTop = Number.parseInt(stack[stack.length - 1].split('').slice(1).join('')); //* ???????????? d

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

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc1);
                            break;
                        
                        case '+':
                            const calc2 = [];

                            for (let j = 0; j < dNPrev.length; j++) {

                                for (let k = 0; k < dNTop.length; k++) {

                                    const res = String(Number.parseInt(dNPrev[j]) + Number.parseInt(dNTop[k]));
                                    calc2.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc2);
                            break;

                        case '-':
                            const calc3 = [];

                            for (let j = 0; j < dNPrev.length; j++) {

                                for (let k = 0; k < dNTop.length; k++) {

                                    const res = String(Number.parseInt(dNPrev[j]) - Number.parseInt(dNTop[k]));
                                    calc3.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc3);
                            break;

                        case '>':
                            const calc4 = [];

                            for (let j = 0; j < dNPrev.length; j++) {

                                for (let k = 0; k < dNTop.length; k++) {

                                    const res = Number.parseInt(dNPrev[j]) > Number.parseInt(dNTop[k]);
                                    
                                    if (res) {
                                        calc4.push('1');
                                    } else calc4.push('0');
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc4);
                            break;
                    }
                } else

                //* dN ?? [...]
                if (stack[stack.length - 2].includes('d') && Array.isArray(stack[stack.length - 1])) {
                    
                    const cutNum = Number.parseInt(stack[stack.length - 2].split('').slice(1).join('')); //* ???????????? d

                    const dN = []; //* [1, 2, .....] ???? ????????????

                    for (let i = 0; i < cutNum; i++) {
                        dN.push(i + 1);
                    }

                    switch (currentToken) {

                        case '*':
                            const calc1 = [];

                            for (let j = 0; j < dN.length; j++) {

                                for (let k = 0; k < stack[stack.length - 1].length; k++) {

                                    const res = String(dN[j] * Number.parseInt(stack[stack.length - 1][k]));
                                    calc1.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc1);
                            break;

                        case '+':
                            const calc2 = [];

                            for (let j = 0; j < dN.length; j++) {

                                for (let k = 0; k < stack[stack.length - 1].length; k++) {

                                    const res = String(dN[j] + Number.parseInt(stack[stack.length - 1][k]));
                                    calc2.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc2);
                            break;

                        case '-':
                            const calc3 = [];

                            for (let j = 0; j < dN.length; j++) {

                                for (let k = 0; k < stack[stack.length - 1].length; k++) {

                                    const res = String(dN[j] - Number.parseInt(stack[stack.length - 1][k]));
                                    calc3.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc3);
                            break;

                        case '>':
                            const calc4 = [];

                            for (let j = 0; j < dN.length; j++) {

                                for (let k = 0; k < stack[stack.length - 1].length; k++) {

                                    const res = dN[j] > Number.parseInt(stack[stack.length - 1][k]);
                                    
                                    if (res) {
                                        calc4.push('1');
                                    } else calc4.push('0');
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc4);
                            break;
                    }
                } else

                //* [...] ?? dN
                if (Array.isArray(stack[stack.length - 2]) && stack[stack.length - 1].includes('d')) {
                    
                    const cutNum = Number.parseInt(stack[stack.length - 1].split('').slice(1).join('')); //* ???????????? d

                    const dN = []; //* [1, 2, .....] ???? ????????????

                    for (let i = 0; i < cutNum; i++) {
                        dN.push(i + 1);
                    }

                    switch (currentToken) {

                        case '*':
                            const calc1 = [];

                            for (let j = 0; j < stack[stack.length - 2].length; j++) {

                                for (let k = 0; k < dN.length; k++) {
                                    const res = String(Number.parseInt(stack[stack.length - 2][j]) * dN[k]);
                                    calc1.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc1);
                            break;

                        case '+':
                            const calc2 = [];

                            for (let j = 0; j < stack[stack.length - 2].length; j++) {

                                for (let k = 0; k < dN.length; k++) {
                                    const res = String(Number.parseInt(stack[stack.length - 2][j]) + dN[k]);
                                    calc2.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc2);
                            break;

                        case '-':
                            const calc3 = [];

                            for (let j = 0; j < stack[stack.length - 2].length; j++) {

                                for (let k = 0; k < dN.length; k++) {
                                    const res = String(Number.parseInt(stack[stack.length - 2][j]) - dN[k]);
                                    calc3.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc3);
                            break;

                        case '>':
                            const calc4 = [];

                            for (let j = 0; j < stack[stack.length - 2].length; j++) {

                                for (let k = 0; k < dN.length; k++) {
                                    const res = Number.parseInt(stack[stack.length - 2][j]) > dN[k];
                                    
                                    if (res) {
                                        calc4.push('1');
                                    } else calc4.push('0');
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc4);
                            break;
                    }
                } else

                //* [...] ?? N
                if (Array.isArray(stack[stack.length - 2]) 
                    && !stack[stack.length - 1].includes('d') 
                    && !Array.isArray(stack[stack.length - 1])) {

                        switch (currentToken) {
                            case '*':
                                const calc1 = [];
                                
                                for (let i = 0; i < stack[stack.length - 2].length; i++) {
                                    const res = String(Number.parseInt(stack[stack.length - 2][i]) * Number.parseInt(stack[stack.length - 1]));
                                    calc1.push(res);
                                }

                                stack.pop(stack[stack.length - 1]);
                                stack.pop(stack[stack.length - 2]);
                                stack.push(calc1);
                                break;

                            case '+':
                                const calc2 = [];
                                
                                for (let i = 0; i < stack[stack.length - 2].length; i++) {
                                    const res = String(Number.parseInt(stack[stack.length - 2][i]) + Number.parseInt(stack[stack.length - 1]));
                                    calc2.push(res);
                                }

                                stack.pop(stack[stack.length - 1]);
                                stack.pop(stack[stack.length - 2]);
                                stack.push(calc2);
                                break;

                            case '-':
                                const calc3 = [];
                                
                                for (let i = 0; i < stack[stack.length - 2].length; i++) {
                                    const res = String(Number.parseInt(stack[stack.length - 2][i]) - Number.parseInt(stack[stack.length - 1]));
                                    calc3.push(res);
                                }

                                stack.pop(stack[stack.length - 1]);
                                stack.pop(stack[stack.length - 2]);
                                stack.push(calc3);
                                break;

                            case '>':
                                const calc4 = [];
                                
                                for (let i = 0; i < stack[stack.length - 2].length; i++) {
                                    const res = Number.parseInt(stack[stack.length - 2][i]) > Number.parseInt(stack[stack.length - 1]);
                                    
                                    if (res) {
                                        calc4.push('1');
                                    } else calc4.push('0');
                                }

                                stack.pop(stack[stack.length - 1]);
                                stack.pop(stack[stack.length - 2]);
                                stack.push(calc4);
                                break;
                        }
                } else

                //* N ?? [...]
                if (!stack[stack.length - 2].includes('d') 
                    && !Array.isArray(stack[stack.length - 2]) 
                    && Array.isArray(stack[stack.length - 1])) {
                        switch (currentToken) {
                            case '*':
                                const calc1 = [];
                                
                                for (let i = 0; i < stack[stack.length - 1].length; i++) {
                                    const res = String(Number.parseInt(stack[stack.length - 2]) * Number.parseInt(stack[stack.length - 1][i]));
                                    calc1.push(res);
                                }

                                stack.pop(stack[stack.length - 1]);
                                stack.pop(stack[stack.length - 2]);
                                stack.push(calc1);
                                break;

                            case '+':
                                const calc2 = [];
                                
                                for (let i = 0; i < stack[stack.length - 1].length; i++) {
                                    const res = String(Number.parseInt(stack[stack.length - 2]) + Number.parseInt(stack[stack.length - 1][i]));
                                    calc2.push(res);
                                }

                                stack.pop(stack[stack.length - 1]);
                                stack.pop(stack[stack.length - 2]);
                                stack.push(calc2);
                                break;

                            case '-':
                                const calc3 = [];
                                
                                for (let i = 0; i < stack[stack.length - 1].length; i++) {
                                    const res = String(Number.parseInt(stack[stack.length - 2]) - Number.parseInt(stack[stack.length - 1][i]));
                                    calc3.push(res);
                                }

                                stack.pop(stack[stack.length - 1]);
                                stack.pop(stack[stack.length - 2]);
                                stack.push(calc3);
                                break;

                            case '>':
                                const calc4 = [];
                                
                                for (let i = 0; i < stack[stack.length - 1].length; i++) {
                                    const res = Number.parseInt(stack[stack.length - 2]) > Number.parseInt(stack[stack.length - 1][i]);
                                    
                                    if (res) {
                                        calc4.push('1');
                                    } else calc4.push('0');
                                }

                                stack.pop(stack[stack.length - 1]);
                                stack.pop(stack[stack.length - 2]);
                                stack.push(calc4);
                                break;
                        }
                } else

                //* [...] ?? [...]
                if (Array.isArray(stack[stack.length - 2]) && Array.isArray(stack[stack.length - 1])) {

                    switch (currentToken) {
                        case '*':
                            const calc1 = [];

                            for (let j = 0; j < stack[stack.length - 2].length; j++) {

                                for (let k = 0; k < stack[stack.length - 1].length; k++) {

                                    const res = String(Number.parseInt(stack[stack.length - 2][j]) * Number.parseInt(stack[stack.length - 1][k]));
                                    calc1.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc1);
                            break;

                        case '+':
                            const calc2 = [];

                            for (let j = 0; j < stack[stack.length - 2].length; j++) {

                                for (let k = 0; k < stack[stack.length - 1].length; k++) {

                                    const res = String(Number.parseInt(stack[stack.length - 2][j]) + Number.parseInt(stack[stack.length - 1][k]));
                                    calc2.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc2);
                            break;

                        case '-':
                            const calc3 = [];

                            for (let j = 0; j < stack[stack.length - 2].length; j++) {

                                for (let k = 0; k < stack[stack.length - 1].length; k++) {

                                    const res = String(Number.parseInt(stack[stack.length - 2][j]) - Number.parseInt(stack[stack.length - 1][k]));
                                    calc3.push(res);
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc3);
                            break;

                        case '>':
                            const calc4 = [];

                            for (let j = 0; j < stack[stack.length - 2].length; j++) {

                                for (let k = 0; k < stack[stack.length - 1].length; k++) {

                                    const res = Number.parseInt(stack[stack.length - 2][j]) > Number.parseInt(stack[stack.length - 1][k]);
                                    
                                    if (res) {
                                        calc4.push('1');
                                    } else calc4.push('0');
                                }
                            }

                            stack.pop(stack[stack.length - 1]);
                            stack.pop(stack[stack.length - 2]);
                            stack.push(calc4);
                            break;
                    }
                }
            }
        }

    }

    result = stack[stack.length - 1];

    if (Array.isArray(result)) {
        return result.sort((a,b) => a-b);
    } else return result;
}

function createRPN (calcArr) {

    //* ?????? - ???????????????????????????? ????????????????????

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
                        //* ???????? ???????????? ??????????????????, ???? ?????????????????????? ?????????????? ???????????????? ???? ??????????
                        if (stack[stack.length - 1] === '*') {
                            exitArr.push(stack[stack.length - 1]); //* ???????????????? ?? ???????????????? ???????????? ?????????????? ?????????????? ?? ??????????
                            stack.pop(stack[stack.length - 1]); //* ???????????? ???? ?????????? ?????????????? ?????????????? ?? ??????????
                            stack.push(currentToken); //* ???????????????? ?????????????? ?????????????? ?? ????????
                        }

                        //* ???????? ???????? ??????????????????????
                        if (stack[stack.length - 1] === '+' 
                            || stack[stack.length - 1] === '-' 
                            || stack[stack.length - 1] === '>') {
                                stack.push(currentToken); //* ???????????? ?????????????????? ?????????????? ?????????????? ?? ????????
                            }

                            //* ???????? ?????????????????????? ????????????
                            if (stack[stack.length - 1] === '(') {
                                stack.push(currentToken); //* ???????????? ?????????????????? ?????????????? ?????????????? ?? ????????
                            }
                        break;

                    case '+':

                        //* ???????? ???????? ?????????????????????? ?????? ?????????????? ?? ??????????
                        if (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '+' || stack[stack.length - 1] === '-') {

                            exitArr.push(stack[stack.length - 1]); //* ???????????????? ?? ???????????????? ???????????? ?????????????? ?????????????? ?? ??????????
                            stack.pop(stack[stack.length - 1]); //* ???????????? ???? ?????????? ?????????????? ?????????????? ?? ??????????
                            stack.push(currentToken); //* ???????????????? ?????????????? ?????????????? ?? ????????
                        }

                        //* ???????? ???????? ??????????????????????
                        if (stack[stack.length - 1] === '>') {
                                stack.push(currentToken); //* ???????????? ?????????????????? ?????????????? ?????????????? ?? ????????
                            }

                        //* ???????? ?????????????????????? ????????????
                        if (stack[stack.length - 1] === '(') {

                            //* ???????? "("
                            if (stack[stack.length - 1] === '(') {
                                stack.push(currentToken); //* ???????????? ?????????????????? ?????????????? ?????????????? ?? ????????
                            }
                        }
                        break;

                    case '-':
                        //* ???????? ???????? ?????????????????????? ?????? ?????????????? ?? ??????????
                        if (stack[stack.length - 1] === '*') {
                            exitArr.push(stack[stack.length - 1]); //* ???????????????? ?? ???????????????? ???????????? ?????????????? ?????????????? ?? ??????????
                            stack.pop(stack[stack.length - 1]); //* ???????????? ???? ?????????? ?????????????? ?????????????? ?? ??????????
                            stack.push(currentToken); //* ???????????????? ?????????????? ?????????????? ?? ????????
                        }

                        //* ???????? ???????????? ??????????????????, ???? ?????????????????????? ?????????????? ???????????????? ???? ??????????
                        if (stack[stack.length - 1] === '+' || stack[stack.length - 1] === '-') {
                            exitArr.push(stack[stack.length - 1]); //* ???????????????? ?? ???????????????? ???????????? ?????????????? ?????????????? ?? ??????????
                            stack.pop(stack[stack.length - 1]); //* ???????????? ???? ?????????? ?????????????? ?????????????? ?? ??????????
                            stack.push(currentToken); //* ???????????????? ?????????????? ?????????????? ?? ????????
                        }

                        //* ???????? ???????? ??????????????????????
                        if (stack[stack.length - 1] === '>') {
                                stack.push(currentToken); //* ???????????? ?????????????????? ?????????????? ?????????????? ?? ????????
                            }

                        //* ???????? ?????????????????????? ????????????
                        if (stack[stack.length - 1] === '(') {

                            //* ???????? "("
                            if (stack[stack.length - 1] === '(') {
                                stack.push(currentToken); //* ???????????? ?????????????????? ?????????????? ?????????????? ?? ????????
                            }
                        }
                        break;

                    case '>':
                        //* ???????? ???????? ?????????????????????? ?????? ?????????????? ?? ??????????
                        if (stack[stack.length - 1] === '*' || stack[stack.length - 1] === '+' || stack[stack.length - 1] === '-') {
                            exitArr.push(stack[stack.length - 1]); //* ???????????????? ?? ???????????????? ???????????? ?????????????? ?????????????? ?? ??????????
                            stack.pop(stack[stack.length - 1]); //* ???????????? ???? ?????????? ?????????????? ?????????????? ?? ??????????
                            stack.push(currentToken); //* ???????????????? ?????????????? ?????????????? ?? ????????
                        }

                        if (stack[stack.length - 1] === '(') {

                            //* ???????? "("
                            if (stack[stack.length - 1] === '(') {
                                stack.push(currentToken); //* ???????????? ?????????????????? ?????????????? ?????????????? ?? ????????
                            }
                        }
                        break;

                    case '(':
                        stack.push(currentToken);
                        break;

                    case ')':
                        while (stack[stack.length - 1] !== '(') {
                            exitArr.push(stack[stack.length - 1]); //* ???????????????? ?? ???????????????? ???????????? ?????????????? ?????????????? ?? ??????????
                            stack.pop(stack[stack.length - 1]); //* ???????????? ???? ?????????? ?????????????? ?????????????? ?? ??????????
                        }

                        if (stack[stack.length - 1] === '(') {
                            stack.pop(stack[stack.length - 1]); //* ???????????? ???? ?????????? ?????????????? ?????????????? ?? ??????????
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

    //* ?????? - ?????????????????????? ???????????????????? (?????????????? ?????????????? ???????????? ???????????? ?????? ?????????????????????????????? ??????????????????????)

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