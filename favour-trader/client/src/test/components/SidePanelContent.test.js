import React from 'react';
import renderer from 'react-test-renderer';
import SidePanelContent from '../../components/SidePanelContent.js';
import AuthServiceMock from './AuthServiceMock.js';

it('renders correctly', () => {
    var authServiceMock = new AuthServiceMock();
    const tree = renderer
        .create(<SidePanelContent authService={authServiceMock} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});