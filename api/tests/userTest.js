var assert = require('assert');
var User = require('../models/users');

// Create user with empty fields
var user = new User();
user.save((error) => {
	assert.equal(error.errors['name'].message, 'Name is required.');
	assert.equal(error.errors['email'].message, 'Email Address is required.');
	assert.equal(error.errors['password'].message, 'Password is required.');
	assert.equal(error.errors['address'].message, 'Address is required.');	
});

//create the user with invalid last name
var user1 = new User({name: {first: 'test', last: 'te'}});
user1.address = {number: 20};
user1.password = '123';
user1.email = 'example@gmail.com';
user1.save((error) => {
	assert.equal(error.message, 'Last Name is too Short.');
});