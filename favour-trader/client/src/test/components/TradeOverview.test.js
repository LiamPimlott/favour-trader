import React from 'react';
import TradeOverview from '../../components/TradeOverview.js';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moxios from "moxios";
import { MemoryRouter } from 'react-router-dom'
import renderer from 'react-test-renderer';

beforeEach(function () {
    configure({ adapter: new Adapter() });
    moxios.install();
});

it('renders correctly', () => {
    const offererName = 'testor';
    const offereeName = 'testee';
    const tradeStatus = 'completed';
    const tradeMessage = 'perfect! amazing!';
    const tree = renderer
    .create(<TradeOverview offererName={offererName} offereeName={offereeName} tradeStatus={tradeStatus} tradeMessage={tradeMessage} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});