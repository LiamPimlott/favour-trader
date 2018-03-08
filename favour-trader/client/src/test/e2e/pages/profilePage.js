'use strict';

let I;

module.exports = {
    _init() {
        I = require('../steps_file.js')();
    },
    buttons: {
        profile: "//a[@href='/Profile']",
    },
    navigateToMyProfilePage() {
        I.seeElement(this.buttons.profile);
        I.click(this.buttons.profile);
        I.seeElement('#user-profile-page');
    },
    editAddress() {
        I.waitForVisible(".anticon-edit", 5);
        I.see("Edit Profile");
        I.click(".anticon-edit");
        I.fillField("#state", "Manitoba");
        I.fillField("#city", "Winnipeg");
        I.fillField("#postalCode", "R3T 2N2");
        I.click('Save');
        I.waitForDetached("Save", 3);
        I.see("GJ");
        I.see("Manitoba");
        I.see("Winnipeg");
    },
    addSkill() {
        I.waitForText("New Skill", 5);
        I.click("New Skill");
        I.click("Skills I Have");
        I.click("//div[contains(text(),'Select a Category')]");
        I.click("//li[contains(text(), 'Cooking')]");
        I.fillField("#description","I love cooking");
        I.click('Save');
        I.waitForDetached("Save", 3);
        I.see("GJ");
        I.see("I love cooking");
    }
}
