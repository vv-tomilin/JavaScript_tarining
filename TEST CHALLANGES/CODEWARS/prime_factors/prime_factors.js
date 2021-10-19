'use strict';

console.log(primeFactors(86240));
console.log(primeFactors(196));

function primeFactors(n){
    let primeFactors = [];
    let curNum = n;

    let resArr = [];

    let result = [];

    while (!isPrime(curNum)) {
        if (primeFactors.length === 0) {
            for (let i = 2; i < Math.ceil(Math.sqrt(n)) + 1; i++) {
                if (curNum % i === 0) {
                    primeFactors.push(i);
                    curNum = curNum / i;
                    break;
                }
            }
        } else {

            for (let i = 2; i < Math.ceil(Math.sqrt(curNum)) + 1; i++) {
                if (curNum % i === 0) {
                    primeFactors.push(i);
                    curNum = curNum / i;
                    break;
                }
            }
        }
    }

    primeFactors.push(curNum);
    primeFactors.sort((a,b) => a-b);

    for(let i = 0; i < primeFactors.length; i++) {
        if (resArr.length === 0) {
            const left = primeFactors.indexOf(primeFactors[i]);
            const right = primeFactors.lastIndexOf(primeFactors[i]) + 1;

            resArr.push([primeFactors[i], right - left]);
        } else {
            if (resArr[resArr.length - 1][0] === primeFactors[i]) {
                continue;
            } else {
                const left = primeFactors.indexOf(primeFactors[i]);
                const right = primeFactors.lastIndexOf(primeFactors[i]) + 1;

                resArr.push([primeFactors[i], right - left]);
            }
        }
    }

    for (let i = 0; i < resArr.length; i++) {
        if (resArr[i][1] !== 1) {
            result.push(`(${resArr[i][0]}**${resArr[i][1]})`);
        } else {
            result.push(`(${resArr[i][0]})`);
        }
    }

    return result.join('');

    function isPrime(num) {
        if (num < 2) return false;
        const limit = Math.sqrt(num);
    
        for (let i = 2; i <= limit; ++i) {
            if (num % i === 0) {
                return false;
            }
        }
    
        return true;
    }
}