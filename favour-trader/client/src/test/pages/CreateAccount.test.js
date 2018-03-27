import React from 'react';
import renderer from 'react-test-renderer';
import moxios from 'moxios';
import { mount, configure } from 'enzyme';
import CreateAccount from '../../pages/CreateAccount.js';
import AuthServiceMock from '../components/AuthServiceMock.js';
import Adapter from 'enzyme-adapter-react-16';

var authServiceMock, wrapper;
//formElements
var firstNameInput, lastNameInput, emailInput, passwordInput, submitBtn;

beforeEach(function () {
    configure({ adapter: new Adapter() });
    moxios.install()
    authServiceMock = new AuthServiceMock();
    wrapper = mount(<CreateAccount authService={authServiceMock} />);
    //formElements
    firstNameInput = wrapper.find('input#firstName');
    lastNameInput = wrapper.find('input#lastName');
    emailInput = wrapper.find('input#emailAddress');
    passwordInput = wrapper.find('input#password');
    submitBtn = wrapper.find('Button[type="primary"]');
})

afterEach(function () {
    moxios.uninstall()
    authServiceMock = null;
    wrapper = null;
    firstNameInput = null;
    lastNameInput = null;
    emailInput = null;
    passwordInput = null;
})

it('renders correctly', () => {
    const tree = renderer
        .create(<CreateAccount authService={authServiceMock} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('verify CreateAccount Page', function () {
    expect(wrapper.contains([<h5>Hone your Skills,</h5>])).toEqual(true);
    expect(wrapper.contains([<p>Get Started, its free!</p>])).toEqual(true);
    expect(wrapper.contains([<span>Submit</span>])).toEqual(true);
    expect(firstNameInput.length).toEqual(1);
    expect(lastNameInput.length).toEqual(1);
    expect(emailInput.length).toEqual(1);
    expect(passwordInput.length).toEqual(1);
});


it('should verify error validation messages on Empty fields', function () {
    firstNameInput.simulate('blur');
    lastNameInput.simulate('blur');
    emailInput.simulate('blur');
    passwordInput.simulate('blur');
    expect(wrapper.find('.ant-form-explain').length).toBe(4);
    expect(wrapper.find('.ant-form-explain').get(0).props.children).toBe('Please input your first name!');
    expect(wrapper.find('.ant-form-explain').get(1).props.children).toBe('Please input your last name!');
    expect(wrapper.find('.ant-form-explain').get(2).props.children).toBe('Please input your E-mail address!');
    expect(wrapper.find('.ant-form-explain').get(3).props.children).toBe('Please input your password!');
});

it('should verify error validation messages on invalidate fields', function () {
    firstNameInput.simulate('change', {target: {name: 'firstName', value: 'i'}});
    firstNameInput.simulate('blur');

    lastNameInput.simulate('change', {target: {name: 'lastName', value: 'i'}});
    lastNameInput.simulate('blur');

    emailInput.simulate('change', {target: {name: 'email', value: 'i'}});
    emailInput.simulate('blur');

    expect(wrapper.find('.ant-form-explain').length).toBe(3);
    expect(wrapper.find('.ant-form-explain').get(0).props.children).toBe("First name is too short!");
    expect(wrapper.find('.ant-form-explain').get(1).props.children).toBe("Last name is too short!");
    expect(wrapper.find('.ant-form-explain').get(2).props.children).toBe("The input is not valid E-mail!");
});