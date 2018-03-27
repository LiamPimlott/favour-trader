'use strict';

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    createTrade(skillOffered, skillRequested) {
        I.tap(skillOffered);
        I.tap("Continue");
        I.tap(skillRequested);
        I.tap("Continue");
        I.tap("Request Trade");
    },

}
