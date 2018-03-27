'use strict';

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    register(firstname, lastname, email, password) {
        I.fillField('First Name', firstname);
        I.fillField('Last Name', lastname);
        I.fillField('E-mail Address', email);
        I.fillField('Password', password);
        I.tap('Sign Up');
        I.tap('OK');
    }
};
