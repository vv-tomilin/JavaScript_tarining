'use strict';

export default class User {

	constructor(login, password) {
		this.login = login;
		this.password = password;
	}

	#test = 'privat var';
	set test(test) {
		this.#test = test;
	}

	get test() {
		return console.log(this.#test);
	}

	validatePassword() {
		if (this.password.length > 6) {
			return true;
		}
		else {
			return false;
		}
	}
}