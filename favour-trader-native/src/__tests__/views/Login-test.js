import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Login from '../../views/Login.js';
import toJson from 'enzyme-to-json'; //added this line

const Adapter = require("enzyme-adapter-react-16");
configure({adapter : new Adapter()});

describe('Testing Login component', () => {
  it('renders as expected', () => {
    const navigation = { navigate: jest.fn() };
    const wrapper = shallow(
      <Login navigation={navigation}/>
    );
      expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
 });
});