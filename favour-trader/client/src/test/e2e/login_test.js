
Feature('Login');

Scenario('Valid Login submission', (I, loginPage) => {
    I.amOnPage('/');
    loginPage.login('example@gmail.com', 'password');
    I.see("Matched Traders");
});

Scenario('Validation check', (I, loginPage) => {
    I.amOnPage('/');
    I.fillField(loginPage.fields.email, '');
    I.fillField(loginPage.fields.password, '');
    I.pressKey('Tab');
    I.see("Please input your E-mail address!");
    I.see("Please input your password!");
    I.fillField(loginPage.fields.email, 'i');
    I.pressKey('Tab');
    I.see("The input is not valid E-mail!");
});

Scenario('Invalid submission checks @invalid', (I, loginPage) => {
    I.amOnPage('/');
    loginPage.login('example11@gmail.com', 'password');
    I.waitForText('User not found.');
    I.see('User not found.');
    loginPage.login('example@gmail.com', 'pass');
    I.waitForText('Incorrect password.');
    I.see('Incorrect password.')
});

Scenario('should redirect me to register', (I, loginPage) => {
    I.amOnPage('/');
    I.click('register now!');
    I.see("Hone your Skills,");
});


