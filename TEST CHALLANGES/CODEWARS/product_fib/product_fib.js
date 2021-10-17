'use strict';

console.log(productFib(714));

function productFib(prod){

    let fib = [0, 1];

    while ((fib[fib.length - 2] * fib[fib.length - 1]) < prod) {
        fib.push(fib[fib.length - 2] + fib[fib.length - 1]);
    }

    const prodIsFib = (fib[fib.length - 2] * fib[fib.length - 1]) === prod;
    
    return [fib[fib.length - 2], fib[fib.length - 1], prodIsFib];
}