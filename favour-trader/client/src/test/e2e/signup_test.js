
Feature('register');

Scenario('User already exist', (I, signupPage) => {
    I.amOnPage('/');
    I.click("//a[@href='/create-account']");
    signupPage.fillsignUpForm('ismail', 'acceptance', 'acceptance@test.com', 'password');
    signupPage.submit();
    I.waitForText('Email already exists or required fields missing.');
    I.see('Email already exists or required fields missing.')
});

Scenario('Sign up validation @signupValidation', (I, signupPage) => {
    I.amOnPage('/');
    I.click("//a[@href='/create-account']");
    signupPage.fillsignUpForm('', '', '', '');
    I.pressKey('Tab');
    I.see("Please input your first name!");
    I.see("Please input your last name!");
    I.see("Please input your E-mail address!");
    I.see("Please input your password!");

    signupPage.fillsignUpForm('i', 'i', 'i', '');
    I.pressKey('Tab');
    I.see("First name is too short!");
    I.see("Last name is too short!");
    I.see("The input is not valid E-mail!");
    I.see("Please input your password!");
});
