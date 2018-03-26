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
        I.click("Save Profile");
        I.waitForDetached("Save Profile", 3);
        I.see("Manitoba");
        I.see("Winnipeg");
    },
    addSkillIHave(category = 'Dancing', description = "Disco") {
        I.waitForText("New Skill", 5);
        I.click("New Skill");
        I.click("Skills I Have");
        I.click("//div[contains(text(),'Select a Category')]");
        I.click("//li[contains(text(), '" + category + "')]");
        I.fillField("#description", description);
        I.click("Save Skill");
        I.waitForDetached("Save Skill", 3);
        I.click("//div[contains(text(), 'Skills I Have')]")
        I.see(description);
    },
    addSkillINeed(category = 'Programming', description = "I suck at React") {
        I.waitForText("New Skill", 5);
        I.click("New Skill");
        I.click("Skills I Need");
        I.click("//div[contains(text(),'Select a Category')]");
        I.click("//li[contains(text(), '" + category + "')]");
        I.fillField("#description", description);
        I.click('Save Skill');
        I.waitForDetached("Save Skill", 3);
        I.click("//div[contains(text(), 'Skills I Need')]");
        I.see(description);
    }
};