
'use strict';

let I;

module.exports = {

    _init() {
        I = require('../steps_file.js')();
    },

    fields: {
        firstName: "#firstName",
        lastName: '#lastName',
        email: '#emailAddress',
        password: '#password',
    },
    buttons: {
        signup: '.signup-form-button'
    },

    fillsignUpForm(firstName, lastName, emailAddress, password) {
        I.fillField(this.fields.firstName, firstName);
        I.fillField(this.fields.lastName, lastName);
        I.fillField(this.fields.email, emailAddress);
        I.fillField(this.fields.password, password);

    },

    submitForm() {
        I.click(this.buttons.signup);
    }
};
