'use strict';

import User from "./User.js";

export default class Student extends User {

	constructor(login, password, nickname){
		super(login, password);
		this.nickname = nickname;
	}

	getCourses(){
		console.log('My courses!');
	}

	validatePassword(){
		if(this.password.length > 10) return true;
		else return false;
	}
}