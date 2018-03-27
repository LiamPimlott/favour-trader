import 'react-native';
import React from 'react';
import { shallow, configure } from 'enzyme';
import Trades from '../../views/Trades.js';
import toJson from 'enzyme-to-json'; //added this line

const Adapter = require("enzyme-adapter-react-16");
configure({adapter : new Adapter()});

describe('Testing Trades component', () => {
    it('renders as expected', () => {
        const trades = {
            recipientId: '',
            recipientFirstName: 'Test User Name',
            recipientFirstName: '',
            requestableFavours: [],
            currentStep: 1,
            creator: {},
            offerableFavours: [],
            requestedFavours: (new Map()),
            offeredFavours: (new Map()),
            tradeMessage: '',
            failedAttempt: false,
        }
        const navigation = { navigate: jest.fn() };
        const wrapper = shallow(
            <Trades trades={trades} navigation={navigation}/>
        );
        expect(toJson(wrapper)).toMatchSnapshot(); //edited this line
    });
});