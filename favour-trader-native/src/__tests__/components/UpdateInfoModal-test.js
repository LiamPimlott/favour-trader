import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import moxios from "moxios";
import UpdateInfoModal from '../../components/UpdateInfoModal.js';
import toJson from 'enzyme-to-json'; //added this line

beforeEach(function () {
    const Adapter = require("enzyme-adapter-react-16");
    configure({adapter: new Adapter()});
    moxios.install();
});

describe('Testing UpdateInfoModal component', () => {
    it('renders as expected', () => {
        const isOpen= false;
        const updateInfo={bind:jest.fn()};
        const toggle={bind:jest.fn()};
        const userProfile={
            firstName: '',
            lastName: '',
            country: '',
            state: '',
            city: '',
            postalCode: '',
            about: ''
        };

        const wrapper = shallow(
            <UpdateInfoModal isOpen={isOpen} updateInfo={updateInfo} toggle={toggle}
                             userProfile={userProfile}/>
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});