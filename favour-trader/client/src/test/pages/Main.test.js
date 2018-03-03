import React from 'react';
import renderer from 'react-test-renderer';
import Main from '../../pages/Main.js';
import { mount, configure } from 'enzyme';
import AuthServiceMock from '../components/AuthServiceMock.js';
import moxios from "moxios";
import Adapter from "enzyme-adapter-react-16/build/index";

var authServiceMock, wrapper;

beforeEach(function () {
    configure({ adapter: new Adapter() });
    moxios.install();
    authServiceMock = new AuthServiceMock();
    wrapper = mount(<Main authService={authServiceMock} />);
});

afterEach(function () {
    moxios.uninstall();
    authServiceMock = null;
    wrapper = null;
});


it('renders correctly', () => {
  var authServiceMock = new AuthServiceMock();
  const tree = renderer
    .create(<Main authService={authServiceMock}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('verify Main Page', function () {
    expect(wrapper.contains([<h1>Matched Traders</h1>])).toEqual(true);
});