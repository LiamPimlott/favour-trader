'use strict';

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    updateInfo(name) {
        I.tap("Update Info");
        I.fillField('~firstName', name);
        I.hideDeviceKeyboard();
        I.tap("update Info");
    },

    updateSkill(skill) {
        I.tap("Add Skills");
        I.tap(skill);
        I.tap('Save Skills');
    },

    goToHome() {
        I.wait(2);
        I.tap("MENU");
        I.tap('Home');
    }
};
