import React from 'react';
import renderer from 'react-test-renderer';
import UserProfileModal from '../../components/UserProfileModal.js';

it('renders correctly', () => {
  const user = {
    name: {
      first: 'Jane',
      last: 'Doe',
    },
    email: 'jane.doe@example.com',
  };
  const tree = renderer
    .create(<UserProfileModal isOpen={true} user={user} toggle={() => true} />)
    .toJSON();
    expect(tree).toMatchSnapshot();
});