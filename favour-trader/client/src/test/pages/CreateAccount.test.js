import React from 'react';
import renderer from 'react-test-renderer';
import moxios from 'moxios';
import { mount, shallow, configure } from 'enzyme';
import CreateAccount from '../../pages/CreateAccount.js';
import AuthServiceMock from '../components/AuthServiceMock.js';
import Adapter from 'enzyme-adapter-react-16';

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

it('should fill the signup form', function () {
    let formData = {firstName: 'FirstName', lastName: 'LastName', emailAddress: 'ex@ex.com', password: 'password'};
    var authServiceMock = new AuthServiceMock();
    const wrapper = mount(<CreateAccount authService={authServiceMock} />);
    //formElements
    const firstNameInput = wrapper.find('input#firstName');
    const lastNameInput = wrapper.find('input#lastName');
    const emailInput = wrapper.find('input#emailAddress');
    const passwordInput = wrapper.find('input#password');
    //fill the form
    firstNameInput.value = formData.firstName;
    lastNameInput.value = formData.lastName;
    emailInput.value = formData.emailAddress;
    passwordInput.value = formData.password;
    //verify the results
    expect(firstNameInput.value).toBe('FirstName');
    expect(lastNameInput.value).toBe('LastName');
    expect(emailInput.value).toBe('ex@ex.com');
    expect(passwordInput.value).toBe('password');
});

it('should verify error validation messages', function () {
    var authServiceMock = new AuthServiceMock();
    const wrapper = mount(<CreateAccount authService={authServiceMock} />);
    //formElements
    const firstNameInput = wrapper.find('input#firstName');
    const lastNameInput = wrapper.find('input#lastName');
    firstNameInput.value = "";
    lastNameInput.simulate('focus');
    expect(wrapper.find('.ant-form-explain').length).toBe(1);
});