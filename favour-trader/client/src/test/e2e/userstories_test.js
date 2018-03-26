Feature('User Stories');

Scenario('Create profile @createProfile', (I, loginPage, signupPage, profilePage) => {
    I.amOnPage('/');
    I.click("//a[@href='/create-account']");
    signupPage.fillsignUpForm('Justine', 'Bernshine', 'justine@bernshine.com', 'password');
    signupPage.submitForm();
    I.amOnPage('/Profile');
    profilePage.editAddress();
    profilePage.addSkillIHave();
    profilePage.addSkillINeed();

});