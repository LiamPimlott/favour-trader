'use strict';

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    login(email, password) {
        I.fillField('~Email-Address', email);
        I.fillField('~Password', password );
        I.tap('~Login');
    },

    goToSignup() {
        I.tap('Sign Up')
    }

}
