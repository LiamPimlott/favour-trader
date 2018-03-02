import React from 'react';
import TradeCard from '../../components/TradeCard.js';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moxios from "moxios";
import { MemoryRouter } from 'react-router-dom'


beforeEach(function () {
    configure({ adapter: new Adapter() });
    moxios.install();
});

it('renders correctly', () => {
    const source = 'active';
    const userId = 1;
    const trade = {
        offeror: {
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
        },
        offeree: {
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
        },

    };
    mount(
        <MemoryRouter>
            <TradeCard source={source} userId={userId} trade={trade} />
        </MemoryRouter>
    )
});