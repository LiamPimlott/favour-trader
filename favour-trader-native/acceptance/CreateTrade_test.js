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
    (I, signUpPage, loginPage, homePage, userProfilePage) => {
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
    homePage.filterMatches('wants');
});

Scenario('new User should be able to Create Trade @test',
    (I, signUpPage, loginPage, userProfilePage) => {
        I.wait(5);
        loginPage.login("example@gmail.com", "password");
        userProfilePage.goToHome();
    });
