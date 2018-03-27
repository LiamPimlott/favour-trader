import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import moxios from "moxios";
import MatchCard from '../../components/MatchCard.js';
import toJson from 'enzyme-to-json'; //added this line

beforeEach(function () {
    const Adapter = require("enzyme-adapter-react-16");
    configure({adapter: new Adapter()});
    moxios.install();
});

describe('Testing MatchCard component', () => {
    it('renders as expected', () => {
        const match ={
            _id : 'testId',
            name : { fisrt : '',
                    last  : ''},
            email : '',
            has : '',
            wants : ''
        }
        const bind = {bind:jest.fn()};
        const userId='';
        const passUserID={bind:jest.fn()};
        const wrapper = shallow(
            <MatchCard match={match} bind={bind} userId={userId} passUserID={passUserID}/>
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});