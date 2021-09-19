//* BIND, CALL, APPLY

//* ---------------------------------------------------------------//
const $ = document.querySelector.bind(document);

const header = document.querySelector('h1');
console.log(header);

console.log($ === document.querySelector);

const header2 = $('h2');
console.log(header2);

const user = {
    firstName: 'Petya',
    lastName: 'Petrov',

    sayName() {
        console.log(`My name is ${this.firstName} ${this.lastName}`);
    }
};

user.sayName();

setTimeout(user.sayName, 1000);
setTimeout(function() {
    user.sayName();
}, 1500);

const sayYourName = user.sayName.bind(user);
setTimeout(sayYourName, 2000);


//* ------------------------------------------------------------------------//

