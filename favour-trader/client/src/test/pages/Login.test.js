import React from 'react';
import renderer from 'react-test-renderer';
import moxios from 'moxios';
import { mount, configure } from 'enzyme';
import Login from '../../pages/Login.js';
import AuthServiceMock from '../components/AuthServiceMock.js';
import Adapter from 'enzyme-adapter-react-16';

var authServiceMock, wrapper;
//formElements
var emailInput, passwordInput, submitBtn;

beforeEach(function () {
    configure({ adapter: new Adapter() });
    moxios.install()
    authServiceMock = new AuthServiceMock();
    wrapper = mount(<Login authService={authServiceMock} />);
    //formElements
    emailInput = wrapper.find('input#emailAddress');
    passwordInput = wrapper.find('input#password');
    submitBtn = wrapper.find('Button[type="submit"]');
})

afterEach(function () {
    moxios.uninstall()
    authServiceMock = null;
    wrapper = null;
    emailInput = null;
    passwordInput = null;
})

it('renders correctly', () => {
    var authServiceMock = new AuthServiceMock();
    const tree = renderer
        .create(<Login authService={authServiceMock}/>)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('verify Login Page', function () {
    let cardTitle = wrapper.find('h5');
    expect(cardTitle.length).toEqual(1);
    expect(wrapper.contains([<a href="">register now!</a>])).toEqual(true);
    expect(wrapper.contains([<span>Log in</span>])).toEqual(true);
    expect(emailInput.length).toEqual(1);
    expect(passwordInput.length).toEqual(1);
});

it('should verify error validation messages on Empty fields', function () {
    emailInput.simulate('blur');
    passwordInput.simulate('blur');
    expect(wrapper.find('.ant-form-explain').length).toBe(2);
    expect(wrapper.find('.ant-form-explain').get(0).props.children).toBe('Please input your E-mail address!');
    expect(wrapper.find('.ant-form-explain').get(1).props.children).toBe('Please input your password!');
});

it('should verify error validation messages on invalidate fields', function () {
    emailInput.simulate('change', {target: {name: 'email', value: 'i'}});
    emailInput.simulate('blur');

    expect(wrapper.find('.ant-form-explain').length).toBe(1);
    expect(wrapper.find('.ant-form-explain').get(0).props.children).toBe("The input is not valid E-mail!");
});

