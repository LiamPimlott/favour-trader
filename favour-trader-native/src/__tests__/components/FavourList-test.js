import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import moxios from "moxios";
import FavourList from '../../components/FavourList.js';
import toJson from 'enzyme-to-json'; //added this line

beforeEach(function () {
    const Adapter = require("enzyme-adapter-react-16");
    configure({adapter: new Adapter()});
    moxios.install();
});

describe('Testing FavourList component', () => {
    it('renders as expected', () => {
        const length = 5;
        const title =`What will you do for Test user?`;
        const data ='Test skill 1';
        const onCancel=() => navigation;
        const onSubmit= {onSubmit:jest.fn()};
        const initialSelected='Test skill 2';

        const wrapper = shallow(
            <FavourList length={length} title={title} data={data} onCancel={onCancel}
                        onSubmit={onSubmit} initialSelected={initialSelected}/>
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});