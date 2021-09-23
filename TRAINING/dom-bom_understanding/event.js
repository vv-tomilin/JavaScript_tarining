'use strict'

const buttons = document.querySelectorAll('.btn');

buttons.forEach((btn) => {
    btn.addEventListener('click', handleClick);
});

function handleClick(e) {
    console.log(e.target);
    console.log(e.currentTarget === e.target);
}