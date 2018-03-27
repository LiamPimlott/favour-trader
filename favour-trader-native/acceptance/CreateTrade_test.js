function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 3; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

let randomEmail = null;
Feature('CreateTrade');

Scenario('new User should be able to Create Trade @createTrade',
    (I, signUpPage, loginPage, homePage, userProfilePage, offerTradePage) => {
    let random = makeid();
    I.wait(5);
    randomEmail = "email"+random+"@gmail.com";
    loginPage.goToSignup();
    signUpPage.register("First Name", "Last Name", randomEmail, "password");
    loginPage.login(randomEmail, "password");
    homePage.goToMyProfile();
    userProfilePage.updateInfo("Firstname");
    userProfilePage.updateSkill('Painting');
    userProfilePage.goToHome();
    homePage.filterMatches('has');
    I.wait(4);
    homePage.goToMatchProfile("~Clark Kent profile");
    I.tap('Offer Trade');
    offerTradePage.createTrade("Painting", "Painting");
    I.wait(4);
});

Scenario('Existing User should be able to see Trades @sent',
    (I, signUpPage, loginPage, userProfilePage, homePage) => {
        I.wait(5);
        loginPage.login("example@gmail.com", "password");
        homePage.goToMyTrades();
        
    });
