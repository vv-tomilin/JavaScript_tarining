'use strict';

//& Задачка 1
//. https://learn.javascript.ru/task/ucfirst
//* Напишите функцию ucFirst(str), возвращающую строку str с заглавным первым символом.
//#region 

let str = 'мендельсон';

console.log(ucfirst(str));

function ucfirst(str) {

	if (!str) return str;

	return str[0].toUpperCase() + str.slice(1);
}

//#endregion
//&=====================================================

//& Задачка 2
//. https://learn.javascript.ru/task/check-spam
//* Напишите функцию checkSpam(str), возвращающую true, если str содержит 'viagra' или 'XXX', а иначе false.
//* Функция должна быть нечувствительна к регистру
//#region 
const spamArr = ['buy ViAgRA now', 'free xxxxx', 'innocent rabbit'];

for (let i = 0; i < spamArr.length; i++) {
	console.log(checkSpam(spamArr[i]));
}

function checkSpam(str) {

	if (str.toLowerCase().includes('viagra') || str.toLowerCase().includes('xxx')) {
		str = 'spam!!!'
	}
	else str = 'no spam'

	return str;
}

//#endregion
//&=====================================================

//& Задачка 3
//. https://learn.javascript.ru/task/truncate
//* Создайте функцию truncate(str, maxlength), которая проверяет длину строки str и, если она превосходит maxlength, 
//* заменяет конец str на "…", так, чтобы её длина стала равна maxlength.
//* Результатом функции должна быть та же строка, если усечение не требуется, либо, если необходимо, усечённая строка.
//#region 
const str1 = 'Однажды в студеную летнюю пору я из дому вышел, был сильный мороз!',
	str2 = 'Ветер мглою небо кроет, вихри снежные крутя.',
	str3 = 'Во поле береза стояла!';
const strArr = [str1, str2, str3];

for (let string of strArr) {
	console.log(truncate(string, 35));
}

function truncate(str, maxlength) {

	let res = '';

	if (str.length > maxlength) {
		res = str.slice(0, maxlength) + '...';
	}
	else {
		res = str;
	}

	return res;
}

//#endregion
//&=====================================================

//& Задачка 4
//. https://learn.javascript.ru/task/extract-currency
//* Есть стоимость в виде строки "$120". То есть сначала идёт знак валюты, а затем – число.
//* Создайте функцию extractCurrencyValue(str), которая будет из такой строки выделять числовое значение и возвращать его.
//#region 
const prices = ['$153', '$12', '$198'];

for (let price of prices) {
	console.log(extractCurrencyValue(price));
}

function extractCurrencyValue(str) {
	return + str.slice(1);
}
//#endregion
//&=====================================================