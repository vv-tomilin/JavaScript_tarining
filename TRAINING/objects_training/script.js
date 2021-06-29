'use strict';


//& Задачка 1
//. https://learn.javascript.ru/task/hello-object
//* Напишите код, выполнив задание из каждого пункта отдельной строкой (смотри ссылку)
//#region 
const user = {};
user.name = 'John';
console.log(user);
user.surename = 'Smith';
console.log(user);
user.name = 'Pete';
console.log(user);
delete user.name;
console.log(user);
//#endregion
//&=====================================================

//& Задачка 2
//. https://learn.javascript.ru/task/is-empty
//* Напишите функцию isEmpty(obj), которая возвращает true, если у объекта нет свойств, иначе false.
//#region 
//% Первый вариант
let shedule = {
	name: ''
};
console.log(isEmpty(shedule));

function isEmpty(obj) {

	const emptyOrder = Object.keys(obj).length === 0;

	if (emptyOrder) {
		return true;
	} else return false;
}

//% Второй вариант
let shedule2 = {
	name: ''
};
console.log(isEmpty2(shedule2));
function isEmpty2(obj) {
	for (let key in obj) {
		return false;
	}
	return true;
}
//#endregion
//&=====================================================

//& Задачка 3
//. https://learn.javascript.ru/task/sum-object
//* Напишите код для суммирования всех зарплат и сохраните результат в переменной sum. Должно получиться 390
//* Если объект salaries пуст, то результат должен быть 0.
//#region 
//% Вариант решения с сайта
let salaries = {
	John: 100,
	Ann: 160,
	Pete: 130
}

let sum = 0;
for (let key in salaries) {
	sum += salaries[key];
}
console.log(sum);

//% Мой вариант
let salaries = {
	John: 100,
	Ann: 160,
	Pete: 130
}
console.log(incomeSum(salaries));

function incomeSum(obj) {
	let sumItems = [];
	for (let key in obj) {
		sumItems.push(obj[key]);
	}

	const total = (acc, curVal) => acc + curVal;
	return sumItems.reduce(total);
}
//#endregion
//&=====================================================

//& Задачка 
//. 
//* 
//#region 

//#endregion
//&=====================================================

//& Задачка 
//. 
//* 
//#region 

//#endregion
//&=====================================================
