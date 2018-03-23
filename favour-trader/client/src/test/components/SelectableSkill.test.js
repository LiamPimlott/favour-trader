import React from 'react';
import renderer from 'react-test-renderer';
import SelectableSkill from '../../components/SelectableSkill.js';
import AuthServiceMock from './AuthServiceMock.js';

it('renders correctly', () => {
  var authServiceMock = new AuthServiceMock();
  const tree = renderer
    .create(<SelectableSkill key={123}
        skill={{
            _id: 123,
            category: {
              _id: 456,
              skill: 'plumber'

            }
        }}
        checked={true}
        update={() => {}}
        toggleSelection={() => {}} />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});