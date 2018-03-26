import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import moxios from "moxios";
import ProfileSkills from '../../components/ProfileSkills.js';
import toJson from 'enzyme-to-json'; //added this line

beforeEach(function () {
    const Adapter = require("enzyme-adapter-react-16");
    configure({adapter: new Adapter()});
    moxios.install();
});

describe('Testing ProfileSkills component', () => {
    it('renders as expected', () => {
        const wrapper = shallow(
            <ProfileSkills />
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});