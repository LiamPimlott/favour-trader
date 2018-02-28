import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {shallow, configure} from 'enzyme';
import {Shallow} from 'react-test-renderer'
import Profile from '../../pages/Profile.js';
import AuthServiceMock from '../components/AuthServiceMock.js';
import toJson from 'enzyme-to-json';

import Adapter from 'enzyme-adapter-react-16';
import moxios from "moxios";

var authServiceMock;

beforeEach(function () {
    configure({adapter: new Adapter()});
    moxios.install();
    authServiceMock = new AuthServiceMock();
});

afterEach(function () {
    moxios.uninstall();
    authServiceMock = null;
});


it('renders correctly', () => {
    const tree = shallow(
        <MemoryRouter>
            <Profile authService={authServiceMock}/>
        </MemoryRouter>);
});