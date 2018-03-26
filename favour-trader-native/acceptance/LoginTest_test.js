
Feature('LoginTest');

Scenario('test something', (I) => {
    I.wait(10);
    I.fillField('~Email-Address', 'example@gmail.com');
    I.fillField('~Password', 'password' );
    I.tap('~Login')
});
