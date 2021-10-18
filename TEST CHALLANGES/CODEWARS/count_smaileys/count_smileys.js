'use strict';

console.log(countSmileys([':)',':(',':D',':O',':-;']));

function countSmileys(arr) {
    
    if (arr.length === 0) {
        return 0;
    }
    
    let count = 0;

    arr.forEach((smile, i) => {
        if (smile.length === 2) {
            const s = smile.split('');
            if ((s[0] === ':' || s[0] === ';') && (s[1] === ')' || s[1] === 'D')) count++;
        }

        if (smile.length === 3) {
            const s = smile.split('');
            if ((s[0] === ':' || s[0] === ';') 
                && (s[1] === '-' || s[1] === '~')
                && (s[2] === ')' || s[2] === 'D')) count++;
        }
    });

    return count;
}