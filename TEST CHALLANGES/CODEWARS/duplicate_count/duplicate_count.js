'use strict';

console.log(duplicateCount('TexTexetoo'));

function duplicateCount(text){
    const validText = text.toLowerCase().split('');

    let count = 0;

    validText.map((char, i, arr) => {
        const calc = (arr.lastIndexOf(char) - arr.indexOf(char)) + 1;
        const pushed = arr.indexOf(char) < i;

        if (calc >= 2 && !pushed) {
            count++;
        }
    });

    return count;
}