import React from 'react';
import ReactDOM from 'react-dom';
import App from '../App.js';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('<App />', () => {
    beforeEach(() => {
        configure({ adapter: new Adapter() });
    })

    it('renders without crashing', () => {
        const div = document.createElement('div');
        ReactDOM.render(<App />, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('has correct initial state', () => {
        const initialState = {
            posts: [],
        };
        const component = shallow(<App/>);
        expect(component.state()).toEqual(initialState);
    });

    it('contains an input', () => {
        const component = mount(<App/>);
        const input = component.find('input');
        expect(input).not.toBeNull();
    });

    it('contains a form', () => {
        const component = mount(<App/>);
        const form = component.find('form');
        expect(form).not.toBeNull();
    });
})