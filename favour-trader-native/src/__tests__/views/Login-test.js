import 'react-native';
import React from 'react';
import { mount, shallow, configure } from 'enzyme';
import Login from '../../views/Login.js';
import toJson from 'enzyme-to-json'; //added this line
import renderer from 'react-test-renderer';


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

describe('Testing Login component', () => {

  it('renders as expected', () => {
    const navigation = { navigate: jest.fn() };
    const tree = shallow(
      <Login navigation={navigation}/>
    );
      expect(toJson(tree)).toMatchSnapshot(); //edited this line
 });

    it('should render Valid input', () => {
        const navigation = { navigate: jest.fn() };
        let tree = renderer.create(<Login navigation={navigation}/>).toJSON()

        expect(findById(tree, 'E-mail Address')).toBeDefined()
        expect(findById(tree, 'Password')).toBeDefined()
    })

    it('should render Empty input', () => {
        const navigation = { navigate: jest.fn() };
        let tree = renderer.create(<Login navigation={navigation}/>).toJSON()

        expect(findById(tree, '')).toBeUndefined()
    })

    it('should render Invalid input', () => {
        const navigation = { navigate: jest.fn() };
        let tree = renderer.create(<Login navigation={navigation}/>).toJSON()

        //Possible Typos
        expect(findById(tree, 'E-mali Addres')).toBeUndefined()
        expect(findById(tree, 'Passward')).toBeUndefined()
    })

});
