import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import SignUp from '../../views/Signup.js';
import toJson from 'enzyme-to-json';
import renderer from "react-test-renderer"; //added this line

const Adapter = require("enzyme-adapter-react-16");
configure({adapter : new Adapter()});

let findById = function(tree, placeholder) {
    if(tree.props && tree.props.placeholder === placeholder) {
        return tree
    }
    if(tree.children && tree.children.length > 0)
    {
        let childs = tree.children
        for(let i = 0; i < childs.length; i++)
        {
            let item = findById(childs[i], placeholder)
            if(typeof(item) !== 'undefined') {
                return item
            }
        }
    }
}

describe('Testing SignUp component', () => {
  it('renders as expected', () => {
    const wrapper = shallow(
      <SignUp />
    );
   expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
 });

    it('should render Valid input', () => {
        const navigation = { navigate: jest.fn() };
        let tree = renderer.create(<SignUp/>).toJSON()

        expect(findById(tree, 'E-mail Address')).toBeDefined()
        expect(findById(tree, 'Password')).toBeDefined()
        expect(findById(tree, 'First Name')).toBeDefined()
        expect(findById(tree, 'Last Name')).toBeDefined()
    })

    it('should render Empty input', () => {
        const navigation = { navigate: jest.fn() };
        let tree = renderer.create(<SignUp/>).toJSON()

        expect(findById(tree, '')).toBeUndefined()
    })

    it('should render Invalid input', () => {
        const navigation = { navigate: jest.fn() };
        let tree = renderer.create(<SignUp/>).toJSON()

        expect(findById(tree, 'Invalidate username ')).toBeUndefined()
        expect(findById(tree, 'Invalidate password')).toBeUndefined()
        expect(findById(tree, 'Invalidate last name')).toBeUndefined()
        expect(findById(tree, 'Invalidate first name')).toBeUndefined()
    })
});