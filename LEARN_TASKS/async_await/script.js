'use strict';

//. https://www.youtube.com/watch?v=SHiUyM_fFME

const url = 'https://jsonplaceholder.typicode.com/todos/3';

function delay(ms) {
	return new Promise(resolve => {
		setTimeout(() => resolve(), ms);
	});
}

async function asyncFunction() {
	console.log('Start...');
	await delay(2000);
	const response = await fetch(url);
	const data = await response.json();
	console.log(data);
}

asyncFunction();