const PENDING_TIME = 500;

let promise = plusFive(10, 5);

promise.then((res) => {
    return res;
})
.then((data) => {
    return (divideByTwo(data, 81));
}).then((data) => {
    console.log(`Результатом вычислений является число: ${data}`);
})
.catch((err) => {console.log(err);})
.finally(() => {console.log('Finally!!!');});

function plusFive(num, count) {
    return new Promise((resolve, reject) => {

        console.log('Начинаю выполнение операций');

        if(count > 100) {
            reject(new Error(`Будет слишком долго! Не хочу ждать ${(count * PENDING_TIME)/1000} секунд`));
            return;
        }

        const res = num + 5;

        setTimeout(() => {

            console.log(`Прибавляю 5 к ${num}.`);

            setTimeout(() => {
                console.log(`Результат ${res} передаю дальше...`);
                setTimeout(() => {
                    resolve(res);
                }, PENDING_TIME)
            }, count * PENDING_TIME);
        }, 800);
    });
}

function divideByTwo(num, count) {
    return new Promise((resolve, reject) => {

        if(count > 80) {
            reject(new Error(`Будет слишком долго! Не хочу ждать ${(count * PENDING_TIME)/1000} секунд`));
            return;
        }

        const res = num / 2;

        setTimeout(() => {
            console.log(`Произвожу деление ${num} на 2.`);

            setTimeout(() => {
                console.log(`Результат ${res} передаю дальше...`);
                setTimeout(() => {
                    resolve(res);
                }, PENDING_TIME)
            }, count * PENDING_TIME);
        }, 1000);
    });
}