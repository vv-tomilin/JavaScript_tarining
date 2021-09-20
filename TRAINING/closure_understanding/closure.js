'use strict'

//* Замыкания (closures)

function CounterConstructor() {
    let count = 0;

    return function() {
        count++;

        return count;
    }
}

function counter(displaySelector, clickSelector) {
    const counter = CounterConstructor();
    clickSelector.addEventListener('click', () => {
        displaySelector.textContent = counter();
    });
}

const counter1Selector = document.querySelector('#counter1');
const btnCounter1Selector = document.querySelector('#btn-counter1');

const counter2Selector = document.querySelector('#counter2');
const btnCounter2Selector = document.querySelector('#btn-counter2');

const counter1 = counter(counter1Selector, btnCounter1Selector);
const counter2 = counter(counter2Selector, btnCounter2Selector);

counter1();
counter2();



//* ============================================================== //

function urlGenerator(domain) {
    return function(url) {
        return console.log(`https://${url}.${domain}/`);
    }
}

const comUrl = urlGenerator('com');
comUrl('test');

const ruUrl = urlGenerator('ru');
ruUrl('rustest');

//* ============================================================ //

function bind(context, fn) {
    return function(...args) {
        fn.apply(context, args);
    }
}

function logPerson() {
    console.log(`Person: ${this.name}, ${this.age}, ${this.job}`);
}

const personMikhail = {name: 'Михаил', age: '35', job: 'Front-end'};
const personElena = {name: 'Елена', age: '30', job: 'Back-end'};

bind(personMikhail, logPerson)();
bind(personElena, logPerson)();