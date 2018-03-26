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
        const navigation = {navigate:jest.fn()};
        const borderColor = 'white';
        const iconName = 'add-circle';
        const iconColour = 'grey';
        const subtitleText = 'Tap icon to add';


        const wrapper = shallow(
            <ProfileSkills borderColor={borderColor} iconName={iconName} iconColour={iconColour}
                           subtitleText={subtitleText} />
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});