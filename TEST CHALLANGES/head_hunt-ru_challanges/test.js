'use strict';

const isArr = function(arr) {
    const isArr =  Array.isArray(arr);
    console.log(isArr);
};

const arr = [1,2,3,'d'];
const arr2 = [1,2,3];
const a = 1;

let arrT1 = [];
let arrT2 = [];
let arrTres = [];
arrCreated()

function arrCreated() {
    console.time('arrCr');

    for (let i = 0; i < 10000; i++) {
        arrT1.push(i+1);
    }

    for (let j = 0; j < 10000; j++) {
        arrT2.push(j+1);
    }

    console.log('Начало конечного цикла');

    for (let k = 0; k < arrT1.length; k++) {

        for (let n = 0; n < arrT2.length; n++) {
            arrTres.push(arrT1[k] + arrT2[n]);
        }
    }
    
    console.timeEnd('arrCr');

    console.log(arrTres);

    console.log(endTime - startTime);
}