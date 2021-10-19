'use strict';

console.log(isPrimeV2(11));

//! Использован метод перебора делителей

function isPrime(n) {
    let res = false;
    let isComposite = false;
    const sqrt = Math.sqrt(n);

    if (n <= 1){
        res = false;
    } else if (n == 2 || n == 3){

        res = true;

    } else if(n % 2 == 0 || n % 3 == 0) {

        res = false;

    } else{

        for(let i = 5; i <= sqrt; i += 6){
            if (n % i == 0){
                isComposite = true;
                break;
            }
        }
    
        if (!isComposite){
            for(let i=7; i <= sqrt; i += 6){
                if (n % i == 0){
                    isComposite = true;
                    break;
                }
            }
        }
    
        if (isComposite){
            res = false;
        } else {
            res = true;
        }
    }

    return res;
}

//* ниже другой вариант
//? ВОПРОС: Why have most of the top solutions used the square root of num as the limit? Being unable to decide on a limit made me forfeit.I appreciate the help!
//? ОТВЕТ: because if number isn't didived by prime numbers or all numbers that less than or equal to its square root is a prime

function isPrimeV2(num) {
    if (num < 2) return false;
    const limit = Math.sqrt(num);

    for (let i = 2; i <= limit; ++i) {
        if (num % i === 0) {
            return false;
        }
    }

    return true;
}