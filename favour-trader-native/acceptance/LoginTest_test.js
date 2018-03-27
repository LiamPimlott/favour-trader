
Feature('LoginTest');

Scenario('User should be able to login with good credentials', (I, loginPage) => {
    I.wait(10);
    loginPage.login('example@gmail.com', 'password');
    I.tap('Select Filter');
});

Scenario('User should not be able to login with bad credentials @invalid', (I, loginPage) => {
    I.wait(10);
    loginPage.login('asd@gmail.com', 'password');
    I.see('User not found');
    I.tap('OK');
    loginPage.login('example@gmail.com', 'passwor');
    I.see('Incorrect password.');
    I.tap('OK');
});