import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import moxios from "moxios";
import ReviewSkillsModal from '../../components/ReviewSkillsModal.js';
import toJson from 'enzyme-to-json'; //added this line

beforeEach(function () {
    const Adapter = require("enzyme-adapter-react-16");
    configure({adapter: new Adapter()});
    moxios.install();
});

describe('Testing ReviewSkillsModal component', () => {
    it('renders as expected', () => {
        const toggle = {bind:jest.fn()};
        const inVisible = false;
        const has = {map:jest.fn()};
        const wants = {map:jest.fn()};

        const wrapper = shallow(
            <ReviewSkillsModal toggle={toggle} inVisible={inVisible} has={has} wants={wants}/>
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});