import React from 'react';
import ReactDOM from 'react-dom';
import Post from '../../components/Post.js';
import {shallow, mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

describe('<Post />', () => {
    beforeEach(() => {
        configure({ adapter: new Adapter() });
    })

    it('renders without crashing', () => {
        const post = {
            data: {
                permalink: "/r/test",
                title: "Test Title",
            }
        }
        const div = document.createElement('div');
        ReactDOM.render(<Post post={post}/>, div);
        ReactDOM.unmountComponentAtNode(div);
    });

    it('contains the correct link', () => {
        const post = {
            data: {
                permalink: "/r/test",
                title: "Test Title",
            }
        }
        const component = mount(<Post post={post}/>);
        const link = component.find('.link');
        expect(link.props().href).toEqual('https://www.reddit.com/r/test')
    });

    it('contains the correct title', () => {
        const post = {
            data: {
                permalink: "/r/test",
                title: "Test Title",
            }
        }
        const component = mount(<Post post={post}/>);
        const link = component.find('.link');
        expect(link.props().children).toEqual('Test Title')
    });
})

