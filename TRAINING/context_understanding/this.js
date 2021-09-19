//* Повторение THIS

function fn() {
    console.log(this);
    console.log(`"this" is window - ${this === window}`);
    console.log(`"this" is obj - ${this === obj}`);
}

const obj = {};

fn();

obj.fn = fn;

obj.fn();

//* ------------------------------------------------------------------//
window.a = 1;

const printA = () => {
    console.log(this.a);
    console.log(`"this" is window to arrow func - ${this === window}`);
};

printA();

const obj2 = {
    a: 12,
};

obj2.printA = printA;
obj2.printA(); //* выведет также "1", а не "5" 
//*            //  так как "printA" стрелочная функция
//*            //  и не имеет своего контекста вызова

//* ---------------------------------------------------------------------//

const users = [];

function getFullName () {
	return `${this.name} ${this.surname}`
}

function callBy (array, method) {
	array.map((user) => {
    user.fullName = method;
    console.log(user.fullName());
    console.log(user.fullName === this.getFullName);
    console.log(this.getFullName);
    console.log(user);
  });
}

users.push({
	name: "Алексей",
	surname: "Данчин",
})

users.push({
	name: "Тимофей",
	surname: "Данчин",
})

users.push({
	name: "Ольга",
	surname: "Марко",
})

callBy(users, getFullName);