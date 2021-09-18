//* Повторение про свойство __proto__ [[Prototype]]

const user1 = {
    firstName: 'Vasiliy',
    lastName: 'Tomilin',
    bornYear: 1991,
    age: function() {
        const now = new Date().getFullYear();
        return console.log(now - this.bornYear);
    }
};

const user2 = {
    firstName: 'Viktor',
    lastName: 'Morchkovsky',
    bornYear: 1989,
    age: function() {
        const now = new Date().getFullYear();
        return console.log(now - this.bornYear);
    }
};

console.log(user1, user2);
console.log(user1.age === user2.age);

const userPrototype = {
    age: function() {
        const now = new Date().getFullYear();
        return console.log(now - this.bornYear);
    }
};

const user3 = {
    firstName: 'Alex',
    lastName: 'Shishkin',
    bornYear: 1989,
};
const user4 = {
    firstName: 'Boris',
    lastName: 'Lebenshtein',
    bornYear: 1989,
};

user3.__proto__ = userPrototype;
user4.__proto__ = userPrototype;

console.log(user3, user4);
console.log(user3.age === user4.age);