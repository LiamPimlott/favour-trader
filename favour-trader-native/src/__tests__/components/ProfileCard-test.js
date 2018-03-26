import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import moxios from "moxios";
import ProfileCard from '../../components/ProfileCard.js';
import toJson from 'enzyme-to-json'; //added this line

beforeEach(function () {
    const Adapter = require("enzyme-adapter-react-16");
    configure({adapter: new Adapter()});
    moxios.install();
});

describe('Testing ProfileCard component', () => {
    it('renders as expected', () => {
        const updateUser='';
        const isCurrentUser=false;
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
            <ProfileCard updateUser={updateUser} isCurrentUser={isCurrentUser} userProfile={userProfile}/>
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});