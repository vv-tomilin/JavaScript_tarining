'use strict';

//. https://www.youtube.com/watch?v=mNaSkyNVKLU

const requestUrl = 'http://getpost.itgid.info/index2.php?auth=zhrgB3DxC8LoG7Gcilzg&action=2';

fetch(requestUrl)
	.then(data => {
		console.log(data);
		return data.text();
	})
	.then(data => {
		console.log(data);
	})