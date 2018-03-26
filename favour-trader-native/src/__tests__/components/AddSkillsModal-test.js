import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import moxios from "moxios";
import AddSkillsModal from '../../components/AddSkillsModal.js';
import toJson from 'enzyme-to-json'; //added this line

beforeEach(function () {
    const Adapter = require("enzyme-adapter-react-16");
    configure({adapter: new Adapter()});
    moxios.install();
});

describe('Testing AddSkillsModal component', () => {
    it('renders as expected', () => {
        const isOpen=false;
        const addSkill='';
        const categories={map:jest.fn()};
        const toggle='';
        const onSubmit='';
        const userProfile='';

        const wrapper = shallow(
            <AddSkillsModal isOpen={isOpen} addSkill={addSkill} categories={categories} toggle={toggle}
                            onSubmit={onSubmit} userProfile={userProfile}/>
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});