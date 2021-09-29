'use strict'

const numArr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
const names = ['Viktor', 'Max', 'Alexey', 'Mikhail', 'Bob', 'Kevin', 'Stuart', 'Cezar', 'Wolfgang', 'Yuriy'];

numArr.forEach((num, index, arr) => {
    const res = num * 2 / 100;
    console.log(`Index[${index}] = ${res}, ${arr[index]}, ${this}`);
});
console.log('\n');

names.forEach((name) => {
    const res = name + ` ${Math.floor(Math.random() * 1000)}`
    console.log(res);
});
console.log('\n');

//* ====================================================== //

const mapNumsArr = numArr.map((num) => {
    return num * 2;
});

console.log(mapNumsArr);
console.log('\n');

//* ===================================================== //

const defaultSortArr = numArr.sort();
const defaultNamesSort = names.sort();
console.log('Default ', defaultSortArr, defaultNamesSort);

const standartNumSort = numArr.sort((a, b) => a - b);
const standartNamesSort = names.sort((a, b) => a - b);
console.log('Standart ', standartNumSort, standartNamesSort);

const revertNumSort = numArr.sort((a, b) => b - a);
const revertNamesSort = names.sort((a, b) => b - a);
console.log('Revert', revertNumSort, revertNamesSort);

console.log('\n');

//* ===================================================== //

console.log(numArr.reverse());
console.log(names.reverse());

console.log('\n');

//* ===================================================== //

console.log(numArr.join());
console.log(names.join());

console.log(numArr.join(''));
console.log(names.join(''));

console.log(numArr.join('-'));
console.log(names.join(' '));

console.log('\n');

//* ===================================================== //

console.log(numArr.reduce((total, num) => total + num));

const avarage = numArr.reduce((total, num, index, arr) => {
    total += num;

    if(index === arr.length - 1) {
        return total / arr.length;
    } else {
        return total;
    }
});

const overFour = numArr.reduce((total, num) => {
    if (num > 4) {
        total.push(num);
    }

    return total;
}, []);

console.log('Avarage ', avarage);
console.log('Over four', overFour);

console.log('\n');

//* ===================================================== //

const numSplice = [15, 54, 68, 98, 35, 19, 37, 24];
const stringsSplice = ['bolt', 'lego', 'lohnes'];

console.log(numSplice);
const spliseArr = numSplice.splice(3, 4, ...stringsSplice);
console.log(numSplice);
console.log(spliseArr);

console.log('\n');

//* ===================================================== //

const numSlice = [15, 75, 49, 654, 541, 615, 53, 44819, 354, 4, 94];

console.log(numSlice);
const sliceArr = numSlice.slice(4, 7);
console.log(sliceArr);
console.log(numSlice);

console.log('\n');

//* ===================================================== //

const arr1 = [15, 54, 68, 98, 35, 19, 37, 24];
const arr2 = [121, 75, 49, 654, 541, 615, 53, 44819, 354, 4, 94];

console.log(arr1.concat(arr2));

console.log('\n');

//* ===================================================== //

console.log('Is there a Victor? ', names.includes('Viktor'));
console.log('Is there a >victor? ', names.includes('viktor'));
console.log('Is there a Leonard? ', names.includes('Leonard'));

console.log('\n');

//* ===================================================== //

console.log('Is there a Victor? ', names.indexOf('Viktor'));
console.log('Is there a >victor? ', names.indexOf('viktor'));
console.log('Is there a Leonard? ', names.indexOf('Leonard'));

console.log('\n');

//* ===================================================== //

const alex = 'Alexey';
console.log(alex.lastIndexOf('exey'));

console.log('\n');

//* ===================================================== //