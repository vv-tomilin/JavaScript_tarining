'use strict';

function drawChessBoard(x, y) {

	const mainCount = y;

	let firstCount = x;
	let secondCount = x;

	let arrFirst = [];
	let arrSecond = [];

	for (let index = 0; index < mainCount; index++) {

		for (let i = 0; i < firstCount; i++) {
			arrFirst.push('#');
			arrFirst.push(' ');
		}

		for (let k = 0; k < secondCount; k++) {
			arrSecond.push(' ');
			arrSecond.push('#');
		}

		console.log(arrFirst.join(''));
		console.log(arrSecond.join(''));

		arrFirst.length = 0;
		arrSecond.length = 0;
	}
}

drawChessBoard(4, 2);