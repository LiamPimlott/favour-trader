Feature('Edit Profile');

Scenario('Change Address', (I, loginPage, profilePage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    profilePage.navigateToMyProfilePage();
    profilePage.editAddress();
});

Scenario('add Skills @addSkill', (I, loginPage, profilePage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    profilePage.navigateToMyProfilePage();
    profilePage.addSkill();
});