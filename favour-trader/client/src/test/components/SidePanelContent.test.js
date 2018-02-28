import React from 'react';
import renderer from 'react-test-renderer';
import SidePanelContent from '../../components/SidePanelContent.js';
import AuthServiceMock from './AuthServiceMock.js';
import {MemoryRouter} from 'react-router-dom';

it('renders correctly', () => {
    var authServiceMock = new AuthServiceMock();
    const tree = renderer
        .create(<MemoryRouter>
            <SidePanelContent authService={authServiceMock} />
        </MemoryRouter>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});