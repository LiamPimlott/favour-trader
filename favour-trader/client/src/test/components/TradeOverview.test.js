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
    const offererName = 'testor';
    const offereeName = 'testee';
    const tradeStatus = 'completed' ；
    const tradeMessage = 'perfect! amazing!';
    mount(
        <MemoryRouter>
            <TradeCard offererName={offererName} offereeName={offereeName} tradeStatus={tradeStatus} tradeMessage={tradeMessage} />
        </MemoryRouter>
    )
});