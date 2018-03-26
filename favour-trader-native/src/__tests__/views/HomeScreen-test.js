import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import HomeScreen from '../../views/HomeScreen.js';
import toJson from 'enzyme-to-json'; //added this line

const Adapter = require("enzyme-adapter-react-16");
configure({adapter : new Adapter()});

describe('Testing HomeScreen component', () => {
    it('renders as expected', () => {
        const wrapper = shallow(
            <HomeScreen/>
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});