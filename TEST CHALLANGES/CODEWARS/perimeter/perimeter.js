'use strict';

console.log(perimeter(5));
console.log(perimeter(7));
console.log(perimeter(11));

function perimeter(n) {
    let fibNums = [];

    for (let i = 0; i <= n + 1; i++) {
        if (fibNums.length < 2) fibNums.push(i);
        else {
            const prevNum = fibNums[fibNums.length - 1];
            const topNum = fibNums[fibNums.length - 2];

            fibNums.push(prevNum + topNum);
        }
    }

    const sum = fibNums.reduce((total, curent) => total + curent);

    return sum * 4;
}