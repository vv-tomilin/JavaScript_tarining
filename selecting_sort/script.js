'use strict';
//*            0   1    2     3   4   5  6   7     8    9  10  11  12    13   14    15    16  17  18 19   20
const sort = [16, 565, 4646, 654, 38, 8, 98, 36, 98646, 7, 89, 96, 765, 6987, 432, 5768, 234, 67, 3, 87, 158];


//console.log(selectionSortMax(sort));
console.log(selectionSortMin(sort));


function selectionSortMax(array) {

	for (let j = 0; j < array.length; j++) {

		let max = -Infinity;
		let index = null;

		for (let i = 0; i < array.length - j; i++) {
			if (array[i] > max) {
				max = array[i];
				index = i;
			}
		}

		const buff = array[array.length - 1 - j];
		array[array.length - 1 - j] = max;
		array[index] = buff;

	}

	return array;
}


function selectionSortMin(array) {

	for (let j = 0; j < array.length - 1; j++) {

		let min = Infinity;
		let index = null;

		for (let i = j; i < array.length; i++) {
			if (array[i] < min) {
				min = array[i];
				index = i;
			}
		}

		const buff = array[j];
		array[j] = array[index];
		array[index] = buff;
	}

	return array;
}