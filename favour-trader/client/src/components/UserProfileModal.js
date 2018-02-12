import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class UserProfileModal extends Component {
    render() {
      const { isOpen, toggle, user } = this.props;
      return (
        <div>
        { 
          (user && user.address) ? (
            <div>
              <Modal isOpen={isOpen} toggle={toggle} backdrop={true}>
                <ModalHeader toggle={toggle}>{user.name.first + " " + user.name.last}</ModalHeader>
                <ModalBody>
                  <h6>From:</h6>
                  <p>{user.address.city + ", " + user.address.country}</p>
                  <h6>About:</h6> 
                  <p>{user.about}</p>
                  <h6>Skilled at:</h6>
                  <ul>
                    {
                      user.has.map( (skill) => {
                                      return (<li key={skill._id}> {skill.skill} </li>)
                                  }, this)
                    }
                  </ul> 
                  <h6>Interested in:</h6>
                  <ul>
                    {
                      user.wants.map( (skill) => {
                                      return (<li key={skill._id}> {skill.skill} </li>)
                                  }, this)
                    }
                  </ul>
                  <h6>Contact:</h6> 
                  <p>{user.email}</p>
                   

                    
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle}>Offer A Trade</Button>
                  <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
              </Modal>
            </div>
          ) : (
            ''
          )
        }
        </div>
      );
  }
}

export default UserProfileModal;