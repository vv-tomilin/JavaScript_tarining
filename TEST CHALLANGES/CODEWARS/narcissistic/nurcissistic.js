'use strict';

console.log(narcissisticTwoVersion(1453));

function narcissistic(value) {
    const destructValue = String(value).split('');
    
    return destructValue.map((num) => {
        return Number.parseInt(num)**destructValue.length;
    })
    .reduce((total, current) => total + current) === value ? true : false;
}

function narcissisticTwoVersion(value) {
    return value.toString()
                .split('')
                .map((num, i, arr) => {
                    return Number.parseInt(num)**arr.length;
                })
                .reduce((total, current) => total + current) === value ? true : false;
}