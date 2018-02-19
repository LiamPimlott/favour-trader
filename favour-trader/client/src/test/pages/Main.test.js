import React from 'react';
import renderer from 'react-test-renderer';
import Main from '../../pages/Main.js';
import AuthServiceMock from '../components/AuthServiceMock.js';

it('renders correctly', () => {
  var authServiceMock = new AuthServiceMock();
  const tree = renderer
    .create(<Main authService={authServiceMock}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});