Feature('Edit Profile');

Scenario('Change Address', (I, loginPage, profilePage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    profilePage.navigateToMyProfilePage();
    profilePage.editAddress();
});

Scenario('add Skills @addSkillIHave', (I, loginPage, profilePage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    profilePage.navigateToMyProfilePage();
    profilePage.addSkillIHave();
});

Scenario('add Skills @addSkillINeed', (I, loginPage, profilePage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    profilePage.navigateToMyProfilePage();
    profilePage.addSkillINeed();
});