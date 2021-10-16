'use strict';

const nums = [3, 87, 45, 12, 7];

console.log(sumTwoSmallestNumbers(nums));

function sumTwoSmallestNumbers(numbers) {  
    const sortNums = numbers.sort((a,b) => a-b);

    return sortNums[0] + sortNums[1];
}