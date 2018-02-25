import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'antd'; 
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

class ReviewSkillsModal extends Component {
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
                  <h6 style={{fontWeight: 'bold'}}>Skilled at:</h6>
                  <ul>
                    {
                      user.has.map( (skill) => {
                                      return (<li key={skill._id}> {skill.skill} </li>)
                                  }, this)
                    }
                  </ul> 
                  <h6 style={{fontWeight: 'bold'}}>Interested in:</h6>
                  <ul>
                    {
                      user.wants.map( (skill) => {
                                      return (<li key={skill._id}> {skill.skill} </li>)
                                  }, this)
                    }
                  </ul> 
                </ModalBody>
                <ModalFooter>
                  <Button type="primary" onClick={toggle}>
						<Link to="/Profile/">
							View Profile
						</Link>
				  </Button>
                  <Button onClick={toggle}>OK</Button>
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

export default ReviewSkillsModal;