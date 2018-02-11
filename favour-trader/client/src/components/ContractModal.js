import React, { Component } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ContractModal extends Component {
    render() {
      const { isOpen, toggle, user } = this.props;
      return (
        <div>
        { 
          (user && user.address) ? (
            <div>
              <Modal isOpen={isOpen} toggle={toggle} backdrop={false}>
                <ModalHeader toggle={toggle}>{user.email}</ModalHeader>
                <ModalBody>
                  <div>
                    User address: {
                      Object.keys(user.address).map((value) => {
                        return (
                          <p key={value}> {value}: {user.address[value]} </p>
                        );
                      })
                    }
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="primary" onClick={toggle}>Make an Offer</Button>
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

export default ContractModal;