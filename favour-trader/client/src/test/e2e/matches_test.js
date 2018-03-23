
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
    mainPage.clickWhatIHave;
});

Scenario('View Wants Matches @wantsMatches', (I, loginPage, mainPage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    I.see("Matched Traders");
    mainPage.showButtons();
    mainPage.clickWhatIWant();
});