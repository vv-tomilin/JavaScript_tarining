'use strict';

//& Задачка 1
//% Напишите функцию camelize(str), которая преобразует строки вида «my-short-string» в «myShortString».
//%То есть дефисы удаляются, а все слова после них получают заглавную букву.
//#region 
const text = 'my-short-string';

console.log(camelize(text));

function camelize(str) {

	return str
		.split('-')
		.map((word, index) => index == 0 ? word : word[0].toUpperCase() + word.slice(1))
		.join('');
}
//#endregion
//&==================================================

//& Задачка 2
//% У вас есть массив объектов user, и в каждом из них есть user.name.
//% Напишите код, который преобразует их в массив имён.
//#region 
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let users = [vasya, petya, masha];

let names = users
	.map(user => user.name);

console.log(names);
//#endregion
//&===================================================

//& Задачка 3
//% У вас есть массив объектов user, и у каждого из объектов есть name, surname и id.
//% Напишите код, который создаст ещё один массив объектов с параметрами id и fullName, 
//% где fullName – состоит из name и surname
//#region 

let vasya = { name: "Вася", surname: "Пупкин", id: 1 };
let petya = { name: "Петя", surname: "Иванов", id: 2 };
let masha = { name: "Маша", surname: "Петрова", id: 3 };

let users = [vasya, petya, masha];

const usersMapped = users.map(user => {
	return user = {
		fullName: `${user.name} ${user.surname}`,
		id: user.id
	}
});

//* МОЖНО ТАК (ВМЕСТО "return" ИСПОЛЬЗОВАТЬ () )
// const usersMapped = users.map(user => ({

// 	fullName: `${user.name} ${user.surname}`,
// 	id: user.id

// }));

console.log(usersMapped);
//#endregion
//&=========================================================

//& Задачка 4
//% Напишите функцию sortByAge(users), которая принимает массив объектов со свойством age и сортирует их по нему.
//#region 
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 28 };

let arr = [vasya, petya, masha];

sortByAge(arr);

function sortByAge(arr) {

	arr.sort((a, b) => a.age - b.age);

	console.log(arr);
}
//#endregion
//&=================================================

//& Задачка 5
//% Напишите функцию getAverageAge(users), которая принимает массив 
//% объектов со свойством age и возвращает средний возраст.
//#region 
let vasya = { name: "Вася", age: 25 };
let petya = { name: "Петя", age: 30 };
let masha = { name: "Маша", age: 29 };

let arr = [vasya, petya, masha];

console.log(getAverageAge(arr));

function getAverageAge(users) {
	return users.reduce((total, user) => total + user.age, 0) / arr.length;
}
//#endregion
//&==================================================

//& Задачка 6
//% Напишите функцию unique(arr), которая возвращает массив, содержащий только уникальные элементы arr.
//#region 
function unique(arr) {
	
	let res = [];

	for(let str of arr){
		if(!res.includes(str)){
			res.push(str);
		}
	}

	return res;
}

let strings = ["кришна", "кришна", "харе", "харе",
	"харе", "харе", "кришна", "кришна", ":-O"
];
console.log(unique(strings));
//#endregion
//&===============================================

//& Задачка 7
//. https://learn.javascript.ru/task/create-array
//#region 
let styles = ['Джаз', 'Блюз'];
console.log(styles);

styles.push('Рок-н-ролл');
console.log(styles);

styles[Math.floor((styles.length - 1) / 2)] = 'Классика';
console.log(styles);

console.log(styles.shift());
console.log(styles);

styles.unshift('Рэп', 'Регги');
console.log(styles);
//#endregion
//&=================================================

//& Задачка 7
//. 




