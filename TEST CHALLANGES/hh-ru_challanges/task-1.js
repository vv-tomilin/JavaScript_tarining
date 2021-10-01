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
            console.log();
        } else return;
    }

    function calculateMaxBonus(managers, amounts) {
        const maxCalc = Math.floor(amounts.reduce((total, item) => {
            return Math.floor(Number.parseInt(total) + Number.parseInt(item));
        }) / managers );

        for (let i = maxCalc; i > 0; i--) {
            const calc = amounts.reduce((sum, amount) => sum + Math.floor(amount / i), 0);
            if (calc >= managers) {
                return i;
            }
        }
        return 0;
    }

    console.log(calculateMaxBonus(managers, amounts));
    readline.close();

}).on('close', () => process.exit(0));