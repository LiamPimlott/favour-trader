import React from 'react';
import renderer from 'react-test-renderer';
import moxios from 'moxios';
import CreateAccount from '../../pages/CreateAccount.js';
import AuthServiceMock from '../components/AuthServiceMock.js';

beforeEach(function () {
    // import and pass your custom axios instance to this method
    moxios.install()
})

afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
})

it('renders correctly', () => {
    var authServiceMock = new AuthServiceMock();
    const tree = renderer
        .create(<CreateAccount authService={authServiceMock} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});