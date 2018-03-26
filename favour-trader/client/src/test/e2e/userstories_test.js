Feature('User Stories');

Scenario('Create profile @createProfile', (I, loginPage, signupPage, profilePage) => {
    I.amOnPage('/');
    I.click("//a[@href='/create-account']");
    signupPage.fillsignUpForm('Justine', 'Bernshine', 'justine@bernshine.com', 'password');
    signupPage.submitForm();
    I.amOnPage('/Profile');
    profilePage.addSkillIHave();
    profilePage.editAddress();
    profilePage.addSkillINeed();

});

Scenario("Perfect Match Search @perfectMatch", (I, loginPage, profilePage, mainPage) => {
    I.amOnPage('/');
    loginPage.login("justine@bernshine.com", "password");
    profilePage.navigateToMyProfilePage();
    profilePage.addSkillIHave("Nuclear Physics", "I can build nukes");
    profilePage.addSkillINeed("Fencing", "I want to learn Fencing");
    mainPage.clickPerfectMatch();
    I.waitForText("Review Skills");
    I.click("Review Skills");
    I.see("Fencing");
    I.see("Nuclear Physics");
    I.click("View Profile");
    I.see("Mark Ripptoe");
});