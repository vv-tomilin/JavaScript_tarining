'use strict';

const str1='2+2';
const str2='(2+21*23)+45'; 
const str3='d2+d45+(3+d789)';
const str4='d665+68+d155';
const str5='d5646354654+651616464646+d48484+d5566';
const str6='21+25+45+5+2';
const str7='(1>4)*(4>3)+3';
const str8='10+5*2-1*3*6';
const str9='(1>3)+(3>2)*2+(1+2)';
const str10='d4-d4';
const str11='d2>(d3+1)'; //* d && [...]
const str12='(d2+3)>2'; //* [...] && d
const str13='5>(d2+d3)';
const str14='(d2+d2)>(d2+3)';

const str1val='d4+d4';
const str2val='d4+(d6>2)';

const test1='(d100+100000)*d100+(d100>100000)+100000*(d100*d100)+(d100+d100)*d100';
const test2='d1000+d2000';

const currentStr=test1;
console.log(currentStr);

const nEt=['0','1','2','3','4','5','6','7','8','9','d'];
const oEt=['*','+','-','>','(',')'];

const calcArr=lexC(currentStr);
const rpnArr=sntxC(calcArr);
console.log(rpnArr);
const calcVars=clcVars(rpnArr);
console.log(calcVars);

main(calcVars);

function main(calcVars){

    let resultArr=[];

    let current=null;

    if(isAr(calcVars)){
        for(let i=0;i<calcVars.length;i++){

            const curElem=calcVars[i];
            const res=[];
    
            if(resultArr.length !== 0 && current !== null){
                
                if(curElem !== current){
                    const right=calcVars.lastIndexOf(curElem);
                    const left=calcVars.indexOf(curElem);
    
                    let quantity=(right+1)-(left+1);
    
                    quantity += 1;
    
                    res.push(curElem);
                    res.push(quantity);
                    resultArr.push(res);
    
                    current=curElem;
                }
    
            } else {
    
                const right=calcVars.lastIndexOf(curElem);
                const left=calcVars.indexOf(curElem);
    
                let quantity=(right+1)-(left+1);
    
                quantity += 1;
    
                res.push(curElem);
                res.push(quantity);
                resultArr.push(res);
    
                current=curElem;
            }
        }
    
        for(let j=0;j<resultArr.length;j++){
    
            const numOne=resultArr[j][1];
            const numTwo=calcVars.length;
    
            const percent=str((numOne*100 / numTwo).toFixed(2));
    
            console.log(`${resultArr[j][0]} ${percent}`);
        }
    } else {
        console.log(`${calcVars} 100.00`);
    }
}

function clcVars(rpnArr){

    let s=[];
    let rs=0;

    for(let i=0;i<rpnArr.length;i++){

        const cT=rpnArr[i];

        const isNumber=(str) => {
            const chars=str.split('');
            return nEt.includes(chars[0]);
        };
        const isOperator=oEt.includes(cT);

        if(isNumber(cT)||cT==='d'){

            s.push(cT);
        }

        if(isOperator){

            console.log(s, i, cT);//!000000000000000000000000000000

            if(!s[s.length-1].includes('d') 
                && !s[s.length-2].includes('d') 
                && !isAr(s[s.length-1])
                && !isAr(s[s.length-2])){

                switch (cT){
                    case '*':
                        const c1=int(s[s.length-2])*int(s[s.length-1]);
                        stMut(s,s[s.length-1],s[s.length-2],str(c1));
                        break;
                    case '+':
                        const c2=int(s[s.length-2])+int(s[s.length-1]);
                        stMut(s,s[s.length-1],s[s.length-2],str(c2));
                        break;
                    case '-':
                        const c3=int(s[s.length-2])-int(s[s.length-1]);
                        stMut(s[s.length-1],s[s.length-2],str(c3));
                        break;
                    case '>':
                        const log=int(s[s.length-2]) > int(s[s.length-1]);
                        let c4='';
                        if(log){
                            c4='1';
                        } else {
                            c4='0';
                        }
                        stMut(s,s[s.length-1],s[s.length-2],c4);
                        break;
                }
            } else {
                if(!s[s.length-1].includes('d') 
                    && s[s.length-2].includes('d') 
                    && !isAr(s[s.length-1])){
                    const cut=int(s[s.length-2].split('').slice(1).join(''));
                    const d=[];
                    for(let i=0;i<cut;i++){
                        d.push(i+1);
                    }
                    switch (cT){
                        case '*':
                            const c1=[];
                            for(let j=0;j<d.length;j++){
                                c1.push(str(int(d[j])*int(s[s.length-1])));
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c1);
                            break;
                        case '+':
                            const c2=[];
                            for(let j=0;j<d.length;j++){
                                c2.push(str(int(d[j])+int(s[s.length-1])));
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c2);
                            break;
                        case '-':
                            const c3=[];
                            for(let j=0;j<d.length;j++){
                                c3.push(str(int(d[j])-int(s[s.length-1])));
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c3);
                            break;

                        case '>':
                            const c4=[];
                            for(let j=0;j<d.length;j++){
                                const res=int(d[j]) > int(s[s.length-1]);
                                if(res){
                                    c4.push('1');
                                } else c4.push('0');
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c4);
                            break;
                    }
                } else if(s[s.length-1].includes('d') && s[s.length-2].includes('d')){
                    const cutP=int(s[s.length-2].split('').slice(1).join(''));
                    const cutT=int(s[s.length-1].split('').slice(1).join(''));
                    const dP=[];
                    const dT=[];
                    for(let i=0;i<cutP;i++){
                        dP.push(i+1);
                    }
                    for(let i=0;i<cutT;i++){
                        dT.push(i+1);
                    }
                    switch (cT){
                        case '*':
                            const c1=[];
                            for(let j=0;j<dP.length;j++){
                                for(let k=0; k<dT.length; k++){
                                    const res=str(int(dP[j])*int(dT[k]));
                                    c1.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c1);
                            break;
                        case '+':
                            const c2=[]
                            for(let j=0;j<dP.length;j++){
                                for(let k=0; k<dT.length; k++){
                                    const res=str(int(dP[j])+int(dT[k]));
                                    c2.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c2);
                            break;

                        case '-':
                            const c3=[];
                            for(let j=0;j<dP.length;j++){
                                for(let k=0; k<dT.length; k++){
                                    const res=str(int(dP[j])-int(dT[k]));
                                    c3.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c3);
                            break;

                        case '>':
                            const c4=[];

                            for(let j=0;j<dP.length;j++){

                                for(let k=0; k<dT.length; k++){

                                    const res=int(dP[j]) > int(dT[k]);
                                    
                                    if(res){
                                        c4.push('1');
                                    } else c4.push('0');
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c4);
                            break;
                    }
                } else if(s[s.length-2].includes('d') && isAr(s[s.length-1])){
                    const cut=int(s[s.length-2].split('').slice(1).join(''));
                    const d=[];
                    for(let i=0;i<cut;i++){
                        d.push(i+1);
                    }
                    switch (cT){
                        case '*':
                            const c1=[];
                            for(let j=0;j<d.length;j++){
                                for(let k=0; k<s[s.length-1].length; k++){
                                    const res=str(d[j]*int(s[s.length-1][k]));
                                    c1.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c1);
                            break;
                        case '+':
                            const c2=[];
                            for(let j=0;j<d.length;j++){
                                for(let k=0; k<s[s.length-1].length; k++){
                                    const res=str(d[j]+int(s[s.length-1][k]));
                                    c2.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c2);
                            break;
                        case '-':
                            const c3=[];
                            for(let j=0;j<d.length;j++){
                                for(let k=0; k<s[s.length-1].length; k++){
                                    const res=str(d[j]-int(s[s.length-1][k]));
                                    c3.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c3);
                            break;
                        case '>':
                            const c4=[];
                            for(let j=0;j<d.length;j++){
                                for(let k=0; k<s[s.length-1].length; k++){
                                    const res=d[j] > int(s[s.length-1][k]);
                                    
                                    if(res){
                                        c4.push('1');
                                    } else c4.push('0');
                                }
                            }
                            s.pop(s[s.length-1]);
                            s.pop(s[s.length-2]);
                            s.push(c4);
                            stMut(s,s[s.length-1],s[s.length-2],c4);
                            break;
                    }
                } else if(isAr(s[s.length-2]) && s[s.length-1].includes('d')){
                    const cut=int(s[s.length-1].split('').slice(1).join(''));
                    const d=[];
                    for(let i=0;i<cut;i++){
                        d.push(i+1);
                    }
                    switch (cT){
                        case '*':
                            const c1=[];
                            for(let j=0;j<s[s.length-2].length;j++){
                                for(let k=0; k<d.length; k++){
                                    const res=str(int(s[s.length-2][j])*d[k]);
                                    c1.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c1);
                            break;
                        case '+':
                            const c2=[];
                            for(let j=0;j<s[s.length-2].length;j++){
                                for(let k=0; k<d.length; k++){
                                    const res=str(int(s[s.length-2][j])+d[k]);
                                    c2.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c2);
                            break;
                        case '-':
                            const c3=[];
                            for(let j=0;j<s[s.length-2].length;j++){
                                for(let k=0; k<d.length; k++){
                                    const res=str(int(s[s.length-2][j])-d[k]);
                                    c3.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c3);
                            break;
                        case '>':
                            const c4=[];
                            for(let j=0;j<s[s.length-2].length;j++){
                                for(let k=0; k<d.length; k++){
                                    const res=int(s[s.length-2][j]) > d[k];
                                    if(res){
                                        c4.push('1');
                                    } else c4.push('0');
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c4);
                            break;
                    }
                } else if(isAr(s[s.length-2]) 
                    && !s[s.length-1].includes('d') 
                    && !isAr(s[s.length-1])){
                        switch (cT){
                            case '*':
                                const c1=[];
                                for(let i=0;i<s[s.length-2].length;i++){
                                    const res=str(int(s[s.length-2][i])*int(s[s.length-1]));
                                    c1.push(res);
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c1);
                                break;
                            case '+':
                                const c2=[];
                                for(let i=0;i<s[s.length-2].length;i++){
                                    const res=str(int(s[s.length-2][i])+int(s[s.length-1]));
                                    c2.push(res);
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c2);
                                break;
                            case '-':
                                const c3=[];
                                for(let i=0;i<s[s.length-2].length;i++){
                                    const res=str(int(s[s.length-2][i])-int(s[s.length-1]));
                                    c3.push(res);
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c3);
                                break;
                            case '>':
                                const c4=[];
                                for(let i=0;i<s[s.length-2].length;i++){
                                    const res=int(s[s.length-2][i]) > int(s[s.length-1]);
                                    if(res){
                                        c4.push('1');
                                    } else c4.push('0');
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c4);
                                break;
                        }
                } else if(!s[s.length-2].includes('d') 
                    && !isAr(s[s.length-2]) 
                    && isAr(s[s.length-1])){
                        switch (cT){
                            case '*':
                                const c1=[];
                                for(let i=0;i<s[s.length-1].length;i++){
                                    const res=str(int(s[s.length-2])*int(s[s.length-1][i]));
                                    c1.push(res);
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c1);
                                break;
                            case '+':
                                const c2=[];
                                for(let i=0;i<s[s.length-1].length;i++){
                                    const res=str(int(s[s.length-2])+int(s[s.length-1][i]));
                                    c2.push(res);
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c2);
                                break;
                            case '-':
                                const c3=[];
                                for(let i=0;i<s[s.length-1].length;i++){
                                    const res=str(int(s[s.length-2])-int(s[s.length-1][i]));
                                    c3.push(res);
                                }
                                s.pop(s[s.length-1]);
                                s.pop(s[s.length-2]);
                                s.push(c3);
                                stMut(s,s[s.length-1],s[s.length-2],c3);
                                break;
                            case '>':
                                const c4=[];
                                for(let i=0;i<s[s.length-1].length;i++){
                                    const res=int(s[s.length-2]) > int(s[s.length-1][i]);
                                    if(res){
                                        c4.push('1');
                                    } else c4.push('0');
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c4);
                                break;
                        }
                } else if(isAr(s[s.length-2]) && isAr(s[s.length-1])){
                    switch (cT){
                        case '*':
                            const c1=[];
                            for(let j=0;j<s[s.length-2].length;j++){
                                for(let k=0; k<s[s.length-1].length; k++){
                                    const res=str(int(s[s.length-2][j])*int(s[s.length-1][k]));
                                    c1.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c1);
                            break;
                        case '+':
                            const c2=[];
                            for(let j=0;j<s[s.length-2].length;j++){
                                for(let k=0; k<s[s.length-1].length; k++){
                                    const res=str(int(s[s.length-2][j])+int(s[s.length-1][k]));
                                    c2.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c2);
                            break;
                        case '-':
                            const c3=[];
                            for(let j=0;j<s[s.length-2].length;j++){
                                for(let k=0; k<s[s.length-1].length; k++){
                                    const res=str(int(s[s.length-2][j])-int(s[s.length-1][k]));
                                    c3.push(res);
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c3);
                            break;
                        case '>':
                            const c4=[];
                            for(let j=0;j<s[s.length-2].length;j++){
                                for(let k=0; k<s[s.length-1].length; k++){
                                    const res=int(s[s.length-2][j]) > int(s[s.length-1][k]);
                                    
                                    if(res){
                                        c4.push('1');
                                    } else c4.push('0');
                                }
                            }
                            stMut(s,s[s.length-1],s[s.length-2],c4);
                            break;
                    }
                } else if(!s[s.length-2].includes('d')
                    &&!isAr(s[s.length-2])
                    &&s[s.length-1].includes('d')){
                        const cut=int(s[s.length-1].split('').slice(1).join(''));
                        const d=[];
                        for(let i=0;i<cut;i++){
                            d.push(i+1);
                        }
                        switch(cT){
                            case '*':
                                const c1=[];
                                for(let i=0;i<d.length;i++){
                                    const res=str(int(s[s.length-2])*d[i]);
                                    c1.push(res);
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c1);
                                break;
                            case '+':
                                const c2=[];
                                for(let i=0;i<d.length;i++){
                                    const res=str(int(s[s.length-2])+d[i]);
                                    c2.push(res);
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c2);
                                break;
                            case '-':
                                const c3=[];
                                for(let i=0;i<d.length;i++){
                                    const res=str(int(s[s.length-2])-d[i]);
                                    c3.push(res);
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c3);
                                break;
                            case '>':
                                const c4=[];
                                for(let i=0;i<d.length;i++){
                                    const res=str(int(s[s.length-2])>d[i]);
                                    if(res){
                                        c4.push('1');
                                    } else c4.push('0');
                                }
                                stMut(s,s[s.length-1],s[s.length-2],c4);
                                break;
                        }
                    }
            }
        }
    }

    rs=s[s.length-1];

    if(isAr(rs)){
        return rs.sort((a,b) => a-b);
    } else return rs;
}

function sntxC (calcArr){
    let ex=[];
    let s=[];

    for(let i=0;i<calcArr.length;i++){

        const cT=calcArr[i];

        const isNumber=(str) => {
            const chars=str.split('');
            return nEt.includes(chars[0]);
        };
        const isOperator=oEt.includes(cT);

        if(isNumber(cT)||cT==='d'){
            ex.push(cT)
        }

        if(isOperator){
            if(s.length===0){
                s.push(cT);
            } else {
                switch (cT){
                    case '*':
                        if(s[s.length-1]==='*'){
                            ex.push(s[s.length-1]);
                            s.pop(s[s.length-1]);
                            s.push(cT);
                        }
                        if(s[s.length-1]==='+' 
                            ||s[s.length-1]==='-' 
                            ||s[s.length-1]==='>'){
                                s.push(cT);
                            }
                            if(s[s.length-1]==='('){
                                s.push(cT);
                            }
                        break;

                    case '+':
                        if(s[s.length-1]==='*'||s[s.length-1]==='+'||s[s.length-1]==='-'){

                            ex.push(s[s.length-1]);
                            s.pop(s[s.length-1]);
                            s.push(cT);
                        }
                        if(s[s.length-1]==='>'){
                                s.push(cT);
                            }
                        if(s[s.length-1]==='('){
                            if(s[s.length-1]==='('){
                                s.push(cT);
                            }
                        }
                        break;
                    case '-':
                        if(s[s.length-1]==='*'){
                            ex.push(s[s.length-1]);
                            s.pop(s[s.length-1]);
                            s.push(cT);
                        }
                        if(s[s.length-1]==='+'||s[s.length-1]==='-'){
                            ex.push(s[s.length-1]);
                            s.pop(s[s.length-1]);
                            s.push(cT);
                        }
                        if(s[s.length-1]==='>'){
                            s.push(cT);
                        }
                        if(s[s.length-1]==='('){
                            if(s[s.length-1]==='('){
                                s.push(cT);
                            }
                        }
                        break;
                    case '>':
                        if(s[s.length-1]==='*'||s[s.length-1]==='+'||s[s.length-1]==='-'){
                            ex.push(s[s.length-1]);
                            s.pop(s[s.length-1]);
                            s.push(cT);
                        }

                        if(s[s.length-1]==='('){
                            if(s[s.length-1]==='('){
                                s.push(cT);
                            }
                        }
                        break;
                    case '(':
                        s.push(cT);
                        break;
                    case ')':
                        while (s[s.length-1] !== '('){
                            ex.push(s[s.length-1]);
                            s.pop(s[s.length-1]);
                        }

                        if(s[s.length-1]==='('){
                            s.pop(s[s.length-1]);
                        }
                }
            }
        }
    }

    while (s.length > 1){
        ex.push(s[s.length-1]);
        s.pop(s[s.length-1]);
    }

    ex.push(s[s.length-1]);
    s.pop(s[s.length-1]);

    return ex;
}

function lexC(str){
    const charsArr=str.split('');

    let tokens=[];

    let cTCreate=[];

    for(let i=0;i<charsArr.length;i++){

        const currentChar=charsArr[i];

        const isNumberCurr=nEt.includes(currentChar);
        const isOperatorCurr=oEt.includes(currentChar);

        const endLine=i+1 > charsArr.length-1;

        if(isNumberCurr||currentChar==='d'){
            cTCreate.push(currentChar);
        } else if(isOperatorCurr){
            const token=cTCreate.join('');

            if(token !== ''){
                tokens.push(token);

                cTCreate=[];
            }

                tokens.push(currentChar);
        }

        if(endLine){
            const token=cTCreate.join('');

            tokens.push(token);

            cTCreate=[];
        }
    }

    return tokens;
}

function stMut(s,t,p,c){
    s.pop(t);
    s.pop(p);
    s.push(c);
}

function isAr(a){
    return Array.isArray(a);
};

    function int(n){
        return Number.parseInt(n);
    }

    function str(s){
        return String(s);
    }