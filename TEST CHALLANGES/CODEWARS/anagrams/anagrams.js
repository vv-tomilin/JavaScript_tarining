'use strict';

console.log(anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']));

function anagrams(word, words) {
    const sortCharsWord = word.split('').sort().join('');

    return words.filter((elem) => {
        const sortCharsElem = elem.split('').sort().join('');

        if (sortCharsWord === sortCharsElem) {
            return elem;
        }
    });
}