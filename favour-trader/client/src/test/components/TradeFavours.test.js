import React from 'react';
import TradeFavours from '../../components/TradeFavours.js';
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
    const offeror = {
        firstName: "offeror",
        lastName: "testerberg",
        id: "123"
    }
    const offeree = {
        firstName: "offeree",
        lastName: "testerly",
        id: "456"
    }
    const isUserOfferor = true;
    const favoursEdited = false;
    const saveFavoursWaiting = false;
    const favours = {
        offeror: [
            {
                _id: "123",
                completed: false,
                description: "this is a test favour.",
                skillId: {
                    _v: 0,
                    _id: "456",
                    skill: "Plumbing",
                }
            }
        ],
        offeree: [
            {
                _id: "789",
                completed: false,
                description: "this is a test favour.",
                skillId: {
                    _v: 0,
                    _id: "1011",
                    skill: "Painting",
                }
            }
        ]
    };

    const userUpdatedFavours= {
        offeror: [
            {
                _id: "123",
                completed: false,
                description: "this is a test favour.",
                skillId: {
                    _v: 0,
                    _id: "456",
                    skill: "Plumbing",
                }
            }
        ],
        offeree: [
            {
                _id: "789",
                completed: false,
                description: "this is a test favour.",
                skillId: {
                    _v: 0,
                    _id: "1011",
                    skill: "Painting",
                }
            }
        ]
    };

    const toggleFavourCompleted = function() {return true};
    const saveEditedFavours = function() {return true};
    const cancelEditedFavours = function() {return true};
    
    mount(
        <MemoryRouter>
            <TradeFavours
                status={status}
                offeror={offeror}
                offeree={offeree}
                isUserOfferor={isUserOfferor}
                favoursEdited={favoursEdited}
                saveFavoursWaiting={saveFavoursWaiting}
                favours={favours}
                userUpdatedFavours={userUpdatedFavours}
                toggleFavourCompleted={toggleFavourCompleted}
                saveEditedFavours={saveEditedFavours}
                cancelEditedFavours={cancelEditedFavours}
            />
        </MemoryRouter>
    )

});