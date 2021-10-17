'use strict';

console.log(list([ {name: 'Bart'}, {name: 'Lisa'}, {name: 'Maggie'} ]));

function list(names) {
    return names.map((obj, i, arr) => {
        if (arr.length === 1) {
            return obj.name;
        }

        if (i === arr.length - 1) {
            return `& ${obj.name}`;
        }

        if (i === arr.length - 2) {
            return `${obj.name}`;
        }

        return `${obj.name},`;
    }).join(' ');
}