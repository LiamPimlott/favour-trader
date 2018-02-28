import React from 'react';
import renderer from 'react-test-renderer';
import moxios from 'moxios';
import CreateTradeModal from '../../components/CreateTradeModal.js';
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
        .create(<CreateTradeModal authService={authServiceMock} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});