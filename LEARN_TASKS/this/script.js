'use strict';

document.querySelector('.b-1').addEventListener('click', f1);

let p = document.querySelectorAll('p');

p.forEach(function (item) {
	item.onclick = () => {
		this.style.backgroundColor = 'blue';
	};
});

function f1() {
	this.style.backgroundColor = 'blue';
}
