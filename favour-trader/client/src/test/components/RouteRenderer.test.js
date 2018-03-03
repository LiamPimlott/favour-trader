import React from 'react';
import renderer from 'react-test-renderer';
import RouteRenderer from '../../components/RouteRenderer.js';
import AuthServiceMock from './AuthServiceMock.js';
import { BrowserRouter } from 'react-router-dom';

it('renders correctly', () => {
  var authServiceMock = new AuthServiceMock();
  const tree = renderer
    .create(
      <BrowserRouter>
        <RouteRenderer authService={authServiceMock} />
      </BrowserRouter>
    )
    .toJSON();
    expect(tree).toMatchSnapshot();
});