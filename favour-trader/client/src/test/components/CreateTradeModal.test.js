import React from 'react';
import moxios from 'moxios';
import CreateTradeModal from '../../components/CreateTradeModal.js';
import AuthServiceMock from '../components/AuthServiceMock.js';
import {shallow, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';

beforeEach(function () {
    configure({ adapter: new Adapter() });
    moxios.install();
});

afterEach(function () {
    moxios.uninstall();
});

it('renders correctly', () => {
    let authServiceMock = new AuthServiceMock();
    const tree = shallow(
        <MemoryRouter>
            <CreateTradeModal authService={authServiceMock} />
        </MemoryRouter>)
});