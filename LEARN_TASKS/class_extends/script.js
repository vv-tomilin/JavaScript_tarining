'use strict';

import Student from './Student.js';
import User from '/User.js';

let login = 'Ivan',
	password = '12345knvlkdfvml67',
	nick = 'Black Dog';

let person = new User(login, password);
let student = new Student(login, password, nick);

console.log(student);
student.test;
student.test = 'переопределен чечрез set';
student.test;
