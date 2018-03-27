'use strict';

let I;

module.exports = {

    _init() {
        I = require('../../steps_file.js')();
    },

    filterMatches(category) {
        I.tap('Select Filter');
        I.tap(category);
    },

    goToMatchProfile(profile) {
        I.tap(profile);
    },

    goToReviewSkills(user) {
        I.tap(proifle);
    },

    goToMyProfile() {
        I.tap("MENU");
        I.tap("My Profile");
    },

    goToMyTrades(){
        I.tap("MENU");
        I.tap("My Trades");
    }


};
