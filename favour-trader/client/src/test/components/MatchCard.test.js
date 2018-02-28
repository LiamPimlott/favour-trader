import React from 'react';
import MatchCard from '../../components/MatchCard.js';
import {mount, configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import moxios from "moxios";
import {MemoryRouter} from 'react-router-dom'


beforeEach(function () {
    configure({ adapter: new Adapter() });
    moxios.install();
});

it('renders correctly', () => {
  const user = {
    name: {
      first: 'Jane',
      last: 'Doe',
    },
    email: 'jane.doe@example.com',
  };
  mount (
        <MemoryRouter>
            <MatchCard user={user} reveal={() => true} />
        </MemoryRouter>
        )
});