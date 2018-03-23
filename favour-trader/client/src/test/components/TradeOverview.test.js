import React from 'react';
import TradeOverview from '../../components/TradeOverview.js';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moxios from "moxios";
import { MemoryRouter } from 'react-router-dom'

beforeEach(function () {
    configure({ adapter: new Adapter() });
    moxios.install();
});

it('renders correctly', () => {

    const status = "Accepted";
    const messages = "Hello I am a test message!";
    const offeror = {
            id: 123,
            favours: [
                {
                    skillId: 1,
                    description: 'Test description.',
                },
            ],
            name: {
                first: 'Jane',
                last: 'Doe',
            },
    };
    const offeree = {
            id: 456,
            favours: [
                {
                    skillId: 2,
                    description: 'Test description 2.',
                },
            ],
            name: {
                first: 'John',
                last: 'Smith',
            },
    };
       
    mount(
        <MemoryRouter>
            <TradeOverview 
                status={status}
                offeror={offeror}
                offeree={offeree}
                messages={messages[0]}
            />
        </MemoryRouter>
    )

});