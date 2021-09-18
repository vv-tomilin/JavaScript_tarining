//* Повторение по свойству "prototype"

function Person(firstName, lastName, born) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.born = born;
}

Person.prototype.age = function() {
    const now = new Date().getFullYear();

    return now - this.born;
}

const iam = new Person('Vasyliy', 'Tomilin', 1991);

console.log(iam.firstName, iam.lastName, iam.born);
console.log('Age: ', iam.age());


function Auto(brandName, speed, maxFuel) {
    this.brandName = brandName;
    this.speed = speed;
    this.maxFuel = maxFuel;
}
Auto.prototype.drive = function() {

    if (this.maxFuel > 0) {
        return console.log(this.maxFuel = this.maxFuel - 5);
    }

    return console.log('Топливо закончилось!');
}

const audi = new Auto('Audi', 150, 45);
const nissan = new Auto('Nissan', 120, 60);

console.log(`audi & nissan methid "drive()" - are they the same? :
            ${audi.drive === nissan.drive ? 'yes' : 'no'}`);

console.log('Brand: ' + audi.brandName, '\nSpeed: ' + audi.speed, '\nmaxFuel: ' + audi.maxFuel);
console.log('Brand: ' + nissan.brandName, '\nSpeed: ' + nissan.speed, '\nmaxFuel: ' + nissan.maxFuel);

audi.drive();
audi.drive();
audi.drive();

nissan.drive();
nissan.drive();
nissan.drive();
