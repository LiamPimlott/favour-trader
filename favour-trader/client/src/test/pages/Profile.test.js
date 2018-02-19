import React from 'react';
import renderer from 'react-test-renderer';
import Profile from '../../pages/Profile.js';
import AuthServiceMock from '../components/AuthServiceMock.js';

it('renders correctly', () => {
  var authServiceMock = new AuthServiceMock();
  const tree = renderer
    .create(<Profile authService={authServiceMock}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});