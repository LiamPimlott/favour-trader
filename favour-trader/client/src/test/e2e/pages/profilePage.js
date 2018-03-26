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
        I.waitForText("About Me", 5);
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
        I.see("Manitoba");
        I.see("Winnipeg");
    },
    addSkillIHave() {
        I.waitForText("New Skill", 5);
        I.click("New Skill");
        I.click("Skills I Have");
        I.click("//div[contains(text(),'Select a Category')]");
        I.click("//li[contains(text(), 'Dancing')]");
        I.fillField("#description","Disco");
        I.click('Save');
        I.waitForDetached("Save", 3);
        I.see("CK");
        I.see("Disco");
    },
    addSkillINeed() {
        I.waitForText("New Skill", 5);
        I.click("New Skill");
        I.click("Skills I Need");
        I.click("//div[contains(text(),'Select a Category')]");
        I.click("//li[contains(text(), 'Programming')]");
        I.fillField("#description","I suck at React");
        I.click('Save');
        I.waitForDetached("Save", 3);
        I.see("CK");
        I.click("//*[contains(text(), 'Skills I Need')]");
        I.see("I suck at React");
    }
};