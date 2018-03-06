'use strict';

let I;

module.exports = {
    _init() {
        I = require('../steps_file.js')();
    },
    fields: {
        email: '#emailAddress',
        password: '#password',
    },
    buttons: {
        login: '.login-form-button',
    },

    login(email, password) {
        I.see('Favor  Trader');
        I.fillField(this.fields.email, email);
        I.fillField(this.fields.password, password);
        I.click(this.buttons.login);
    }
}
