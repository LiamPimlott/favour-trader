import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import moxios from "moxios";
import FavourMessageInput from '../../components/FavourMessageInput.js';
import toJson from 'enzyme-to-json'; //added this line

beforeEach(function () {
    const Adapter = require("enzyme-adapter-react-16");
    configure({adapter: new Adapter()});
    moxios.install();
});

describe('Testing FavourMessageInput component', () => {
    it('renders as expected', () => {
        const wrapper = shallow(
            <FavourMessageInput />
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});