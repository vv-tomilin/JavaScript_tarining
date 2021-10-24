'use strict';

console.log(moveZeros2([false,1,0,1,2,0,1,3,"a", null]), [false,1,0,1,2,0,1,3,"a",null]);
console.log(moveZeros2([1,2,0,1,0,1,0,3,0,1]), [1,2,0,1,0,1,0,3,0,1]);
console.log(test([null, 1, 2, 0, false]));

function moveZeros(arr) {
    let count = 0;
    const zeroDel = [];

    arr.forEach((item) => {
        if (item !== 0) {
            zeroDel.push(item);
        }
        else count += 1;
    });

    const zeros = new Array(count).fill(0);

    return [...zeroDel, ...zeros];
}

function test(arr) {

    return arr.filter((x) => { return x !== 0});
}

function moveZeros2 (arr) {
    return arr.filter(function(x) {return x !== 0}).concat(arr.filter(function(x) {return x === 0;}));
}