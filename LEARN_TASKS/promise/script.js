'use strict';

console.log('Start...');

const promise = new Promise((resolve, reject) => {

	return new Promise(() => {
		setTimeout(() => {

			const data = {
				server: 'back',
				name: 'aws',
			};

			console.log('One step modified data...');
			data.oneModified = true
			reject(data);
		}, 1000);
	});
}).then(data => {
	return new Promise(resolve => {
		setTimeout(() => {
			console.log('After one step', data);
			console.log('Two step modified data...');
			data.twoModified = 12;
			resolve(data);
		}, 1000);
	});
}).then(dataMod => {
	setTimeout(() => {
		console.log('After two step', dataMod);
		console.log('Stop process mod!');
	}, 1000);
}).catch((err) => {
	console.log('Error', err);
})