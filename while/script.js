'use strict';

//% Пример использования цикла while вместо for
//* Нужно когда мы не знаем сколько будет итераций цикла
//! Возможно могут спросить на собеседовании

let number = parseInt(prompt('Enter your number'));

while (number > 0) {

	const d = number % 10;
	number = parseInt(number / 10);

	console.log(d);

}