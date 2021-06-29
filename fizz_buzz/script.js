'use strict';

function fizzBizzDraw() {
	let numArr = [];

	for (let i = 1; i <= 100; i++) {

		if (i % 3 == 0 && !(i % 3 == 0 && i % 5 == 0)) {
			numArr.push(`(${i}'Fizz')`);
		} else if (i % 5 == 0 && !(i % 3 == 0 && i % 5 == 0)) {
			numArr.push(`(${i}'Buzz')`);
		} else if (i % 3 == 0 && i % 5 == 0) {
			numArr.push(`(${i}'FizzBuzz')`);
		} else {
			numArr.push(i);
		}
	}

	console.log(numArr.join('-'));
}

fizzBizzDraw();