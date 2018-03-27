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

/*
Scenario("Offer a Trade @offerTrade", (I) => {
    I.click("Offer a Trade!");
    I.check("//input[@class='checkbox'][1]");
    I.fillField("//textarea[@class='descriptionBox'][1]", "I would like to learn fencing");
    I.click("Offers");
    I.check("//td[contains(text(), 'Nuclear Physics')]/..//td[@class='checkboxTD']/input");
    I.fillField("//td[contains(text(), 'Nuclear Physics')]/..//textarea[@class='descriptionBox']", "I can help you get plasma");
    I.click("Message");
    I.fillField('textarea#message.messageBox', "This is a good trade");
    I.click('')

});
*/