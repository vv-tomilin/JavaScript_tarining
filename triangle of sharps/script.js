'use strict';

const count = 10;
const sharp = '#';
let sharps = [];

function triangleDraw() {

	let a = 0;

	for (let i = 0; i < count; i++) {
		a++;

		for (let k = 0; k < a; k++) {
			if(a != 0) {
				sharps.push(sharp);
			}
		}

		console.log(sharps.join(''));

		sharps.splice(0, sharps.length);

		//* второй вариант
		//sharps.length = 0; 
	}
}

triangleDraw();