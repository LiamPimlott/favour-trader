Feature('Edit Profile');

Scenario('Change Address @changeAddress', (I, loginPage, profilePage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    profilePage.navigateToMyProfilePage();
    profilePage.editAddress();
});

Scenario('Add Skills I Have @addSkillIHave', (I, loginPage, profilePage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    profilePage.navigateToMyProfilePage();
    profilePage.addSkillIHave();
});

Scenario('Add Skills I Need @addSkillINeed', (I, loginPage, profilePage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    profilePage.navigateToMyProfilePage();
    profilePage.addSkillINeed();
});