import React from 'react';
import renderer from 'react-test-renderer';
import MatchCard from '../../components/MatchCard.js';

it('renders correctly', () => {
  const user = {
    name: {
      first: 'Jane',
      last: 'Doe',
    },
    email: 'jane.doe@example.com',
  };
  const tree = renderer
    .create(<MatchCard user={user} reveal={() => true} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});