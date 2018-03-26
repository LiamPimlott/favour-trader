/*
Feature('Matches');

Scenario('View Perfect Matches @perfectMatches', (I, loginPage, mainPage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    I.see("Matched Traders");
    mainPage.showButtons();
    mainPage.clickPerfectMatch();
});

Scenario('View Have Matches @haveMatches', (I, loginPage, mainPage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    I.see("Matched Traders");
    mainPage.showButtons();
    mainPage.clickWhatIHave();
});

Scenario('View Wants Matches @wantsMatches', (I, loginPage, mainPage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    I.see("Matched Traders");
    mainPage.showButtons();
    mainPage.clickWhatIWant();
});

Scenario('View a What I Have match profile @whatIHaveMatch', (I, loginPage, mainPage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    I.waitForText("Matched Traders");
    I.see("Matched Traders");
    mainPage.showButtons();
    mainPage.clickWhatIHave();
    I.waitForText("Shark H.", 5);
    I.click("//button[@title='View Profile'][1]");
    I.see("Shark Hamil");
});

Scenario('No perfect matches @perfectMatchNotFound', (I, loginPage, mainPage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    I.waitForText("Matched Traders");
    I.see("Matched Traders");
    mainPage.showButtons();
    mainPage.clickPerfectMatch();
    I.waitForText("Sorry, No Matches");
    I.see("Sorry, No Matches :( Try updating the skills you are seeking.");
});
*/