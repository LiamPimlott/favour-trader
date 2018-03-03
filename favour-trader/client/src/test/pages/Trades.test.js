import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import {shallow, configure} from 'enzyme';
import {Shallow} from 'react-test-renderer'
import Trades from '../../pages/Trades.js';
import AuthServiceMock from '../components/AuthServiceMock.js';

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
            <Trades authService={authServiceMock}/>
        </MemoryRouter>);
});