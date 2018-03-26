import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import SignUp from '../../views/Signup.js';
import toJson from 'enzyme-to-json'; //added this line

const Adapter = require("enzyme-adapter-react-16");
configure({adapter : new Adapter()});

describe('Testing SignUp component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <SignUp />
    );
   expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
 });
});