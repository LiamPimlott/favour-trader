import React from 'react';
import renderer from 'react-test-renderer';
import moxios from 'moxios';
import { mount, shallow, configure } from 'enzyme';
import CreateAccount from '../../pages/CreateAccount.js';
import AuthServiceMock from '../components/AuthServiceMock.js';
import Adapter from 'enzyme-adapter-react-16';
import toJson from 'enzyme-to-json';

beforeEach(function () {
    // import and pass your custom axios instance to this method
    configure({ adapter: new Adapter() });
    moxios.install()
})

afterEach(function () {
    // import and pass your custom axios instance to this method
    moxios.uninstall()
})

it('renders correctly', () => {
    var authServiceMock = new AuthServiceMock();
    const tree = renderer
        .create(<CreateAccount authService={authServiceMock} />)
        .toJSON();
    expect(tree).toMatchSnapshot();
});

it('verify CreateAccount Page', function () {
    var authServiceMock = new AuthServiceMock();
    const wrapper = mount(<CreateAccount authService={authServiceMock} />);
    expect(wrapper.contains([<h5>Hone your Skills,</h5>])).toEqual(true);
    expect(wrapper.contains([<p>Get Started, its free!</p>])).toEqual(true);
    expect(wrapper.contains([<span>Submit</span>])).toEqual(true);
    expect(wrapper.find('input#firstName').length).toEqual(1);
    expect(wrapper.find('input#lastName').length).toEqual(1);
    expect(wrapper.find('input#emailAddress').length).toEqual(1);
    expect(wrapper.find('input#password').length).toEqual(1);
});


it('should verify error validation messages on Empty fields', function () {
    let authServiceMock = new AuthServiceMock();
    const wrapper = mount(<CreateAccount authService={authServiceMock} />);
    //formElements
    const firstNameInput = wrapper.find('input#firstName');
    const lastNameInput = wrapper.find('input#lastName');
    const emailInput = wrapper.find('input#emailAddress');
    const passwordInput = wrapper.find('input#password');

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

describe('should verify error validation messages on invalidate fields', function () {
    it('should throw first name is too short', function () {
        let authServiceMock = new AuthServiceMock();
        const wrapper = mount(<CreateAccount authService={authServiceMock} />);

        const firstNameInput = wrapper.find('input#firstName');
        firstNameInput.simulate('change', {target: {name: 'firstName', value: 'i'}});
        firstNameInput.simulate('blur');

        expect(wrapper.find('.ant-form-explain').length).toBe(1);
        expect(wrapper.find('.ant-form-explain').get(0).props.children).toBe("First name is too short!");
    });

    it('should throw last name is too short', function () {
        let authServiceMock = new AuthServiceMock();
        const wrapper = mount(<CreateAccount authService={authServiceMock} />);

        const firstNameInput = wrapper.find('input#lastName');
        firstNameInput.simulate('change', {target: {name: 'lastName', value: 'i'}});
        firstNameInput.simulate('blur');

        expect(wrapper.find('.ant-form-explain').length).toBe(1);
        expect(wrapper.find('.ant-form-explain').get(0).props.children).toBe("Last name is too short!");
    });

    it('should throw email is not valid', function () {
        let authServiceMock = new AuthServiceMock();
        const wrapper = mount(<CreateAccount authService={authServiceMock} />);

        const firstNameInput = wrapper.find('input#emailAddress');
        firstNameInput.simulate('change', {target: {name: 'email', value: 'i'}});
        firstNameInput.simulate('blur');

        expect(wrapper.find('.ant-form-explain').length).toBe(1);
        expect(wrapper.find('.ant-form-explain').get(0).props.children).toBe("The input is not valid E-mail!");
    });


});

it.skip('should error on invalid submission', function () {
    let authServiceMock = new AuthServiceMock();
    const wrapper = mount(<CreateAccount authService={authServiceMock} />);
    //formElements
    const firstNameInput = wrapper.find('input#firstName');
    const lastNameInput = wrapper.find('input#lastName');
    const emailInput = wrapper.find('input#emailAddress');
    const passwordInput = wrapper.find('input#password');
    const submitBtn = wrapper.find('Button[type="primary"]');

    firstNameInput.simulate('change', { target: {name: 'firstName', value: 'Ismail'}});
    lastNameInput.simulate('change', { target: {name: 'lastName', value: 'ismail'}});
    emailInput.simulate('change', { target: {name: 'email', value: 'example@gmail.com'}});
    passwordInput.simulate('change', { target: {name: 'password', value: 'password'}});
    submitBtn.simulate('click');
}); 