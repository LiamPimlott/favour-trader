import React from 'react';
import renderer from 'react-test-renderer';
import Login from '../../pages/Login.js';
import AuthServiceMock from '../components/AuthServiceMock.js';

it('renders correctly', () => {
  var authServiceMock = new AuthServiceMock();
  const tree = renderer
    .create(<Login authService={authServiceMock}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});