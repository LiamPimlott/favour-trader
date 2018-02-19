import React from 'react';
import renderer from 'react-test-renderer';
import SidePanel from '../../components/SidePanel.js';
import AuthServiceMock from './AuthServiceMock.js';

it('renders correctly', () => {
  var authServiceMock = new AuthServiceMock();
  const tree = renderer
    .create(<SidePanel isVisible={true} authService={authServiceMock} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});