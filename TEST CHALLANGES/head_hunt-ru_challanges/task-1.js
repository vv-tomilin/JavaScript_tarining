//* Задача 1. Премия

const readline = require('readline').createInterface(process.stdin, process.stdout);

let lineNum = 0;
let firstLineNums = [];
let amounts = [];

readline.on('line', (line) => {
    if (lineNum === 0) {
        firstLineNums = line.split(' ');
    }

    const accounts = Number.parseInt(firstLineNums[0]);
    const managers = Number.parseInt(firstLineNums[1]);

    if (lineNum <= accounts + 1) {
        if (lineNum === 0) {
            lineNum++;
        } else {
            amounts.push(line);
        }
        lineNum = lineNum + 1;

        if (lineNum > accounts + 1) {
            // comment
        } else return;
    }

    function calculateMaxBonus(managers, amounts) {
        let max = Math.floor(amounts.reduce((total, item) => {
            return Math.floor(Number.parseInt(total) + Number.parseInt(item));
        }) / managers );
        let min = 0;
        let current = 0;

        while(max != min) {
            current = Math.ceil((max + min) / 2);

            if (amounts.reduce((all, amount) => all + Math.floor(amount/current), 0) >= managers) {
                min = current;
            } else {
                max = current - 1;
            }
        }
        return current;
    }

    const result = calculateMaxBonus(managers, amounts);

    console.log(String(result));
    readline.close();

}).on('close', () => process.exit(0));