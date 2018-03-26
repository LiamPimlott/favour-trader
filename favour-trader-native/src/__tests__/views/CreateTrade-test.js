import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import CreateTrade from '../../views/CreateTrade.js';
import toJson from 'enzyme-to-json'; //added this line

const Adapter = require("enzyme-adapter-react-16");
configure({adapter : new Adapter()});

describe('Testing CreateTrade component', () => {
    it('renders as expected', () => {
        const state = {navigate:jest.fn()};
        const recipientFirstName = '';
        const wrapper = shallow(
            <CreateTrade recipientFirstName={recipientFirstName} state={state}/>
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});