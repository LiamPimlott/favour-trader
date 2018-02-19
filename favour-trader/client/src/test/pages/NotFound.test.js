import React from 'react';
import renderer from 'react-test-renderer';
import NotFound from '../../pages/NotFound.js';
import AuthServiceMock from '../components/AuthServiceMock.js';

it('renders correctly', () => {
  const tree = renderer
    .create(<NotFound/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});