import React, { Component } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Fade } from 'reactstrap';
import { Card, Icon, Button } from 'antd';
import axios from 'axios';
import SelectableSkill from './SelectableSkill.js';
import './CreateTradeModal.css';

const initialState = {
    step: 1,
    requestableSkills: [],
    requestedSkills: [],
    offeredSkills: [],
    message: '',
    redirect: false,
    failedAttempt: false,
};

class CreateTradeModal extends Component {
    constructor(props) {
        super(props);
        this.state = initialState;

        this.reset = this.reset.bind(this);
        this.nextStep = this.nextStep.bind(this);
        this.previousStep = this.previousStep.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.updateSkills = this.updateSkills.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
        this.submit = this.submit.bind(this);
    }

    componentWillReceiveProps() {
        this.reset();
    }

    componentWillMount() {
        const { authService } = this.props;
        const userProfile = this.props.authService.getProfile();
        const userEmail = userProfile.email;
        this.mounted = true;
        const config = {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authService.getToken(),
            }
        };

        axios.get('/api/users/has', {
            email: userEmail,
        }, config)
            .then(res => res.data.user)
            // This setState below causes a front end JS warning, any idea why?
            .then((user) => {
                if (this.mounted) {
                    this.setState({ offerableSkills: user.has });
                }
            })
    }

    componentWillUnmount() {
        this.reset();
        this.mounted = false;
    }

    reset() {
        this.setState({
            step: 1,
            requestableSkills: [],
            requestedSkills: [],
            offeredSkills: [],
            message: '',
            redirect: false,
            failedAttempt: false,
        });
    }

    nextStep() {
        const curStep = this.state.step;
        if (curStep !== 3) {
            this.setState({
                step: curStep + 1,
            });
        }
    }

    previousStep() {
        const curStep = this.state.step;
        if (curStep !== 1) {
            this.setState({
                step: curStep - 1,
            });
        }
    }

    updateSkills(e) {
        let requestedSkills = this.state.requestedSkills;
        let offeredSkills = this.state.offeredSkills;
        let updatedSkill;

        if (this.state.step === 1) {
            updatedSkill = requestedSkills.find(skill => skill.skillId === e.target.id);

            if (updatedSkill) {
                const index = requestedSkills.indexOf(updatedSkill);
                requestedSkills.splice(index, 1);
            }

            requestedSkills.push({
                skillId: e.target.id,
                description: e.target.value,
            });
        } else {
            updatedSkill = offeredSkills.find(skill => skill.skillId === e.target.id);

            if (updatedSkill) {
                const index = offeredSkills.indexOf(updatedSkill);
                offeredSkills.splice(index, 1);
            }

            offeredSkills.push({
                skillId: e.target.id,
                description: e.target.value,
            });
        }

        this.setState({
            requestedSkills,
            offeredSkills,
        });
    }

    handleChange(e) {
        this.setState({
            [e.target.id]: [e.target.value],
        });
    }

    toggleSelection(e) {
        let requestedSkills = this.state.requestedSkills;
        let offeredSkills = this.state.offeredSkills;
        let updatedSkill;

        if (this.state.step === 1) {
            if (e.target.checked) {
                requestedSkills.push({
                    skillId: e.target.id,
                    description: '',
                });
            } else {
                updatedSkill = requestedSkills.find(skill => skill.skillId === e.target.id);
                const index = requestedSkills.indexOf(updatedSkill);
                requestedSkills.splice(index, 1);
            }
        } else {
            if (e.target.checked) {
                offeredSkills.push({
                    skillId: e.target.id,
                    description: '',
                });
            } else {
                updatedSkill = offeredSkills.find(skill => skill.skillId === e.target.id);
                const index = offeredSkills.indexOf(updatedSkill);
                offeredSkills.splice(index, 1);
            }
        }

        this.setState({
            requestedSkills,
            offeredSkills,
        });
    }

    submit() {
        const { authService, offereeId, username, lastName } = this.props;
        const { requestedSkills, offeredSkills, message } = this.state;
        const user = authService.getProfile();
        const url = '/api/contracts/';
        const body = {
            offeror: {
                id: user.id,
                favours: offeredSkills,
                name: {
                    first: user.name.first,
                    last: user.name.last,
                },
            },
            offeree: {
                id: offereeId,
                favours: requestedSkills,
                name: {
                    first: username,
                    last: lastName,
                },
            },
            messages: message,
        };
        const headers = {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': authService.getToken(),
        };

        axios.post(url, body, { headers })
            .then(res => {
                if (res.status !== '200') {
                    // TODO: Redirect when we know where to redirect to
                    // this.setState({
                    //     redirect: true,
                    // });
                    this.props.toggle();
                } else {
                    this.setState({
                        failedAttempt: true,
                    });
                }
            });
            this.reset();
    }

    renderSkills(skillSet, skills) {
        let skillList = '';
        const { requestedSkills, offeredSkills } = this.state;

        if (skills) {
            skillList = skills.map((skill) => {
                return (
                    (skillSet === 'requestable') ? (
                        <SelectableSkill key={skill._id}
                                         skill={skill}
                                         checked={(requestedSkills.find(skill => skill.skillId === skill._id))}
                                         update={this.updateSkills}
                                         toggleSelection={this.toggleSelection} />
                    ) : (
                        <SelectableSkill key={skill._id}
                                         skill={skill}
                                         checked={offeredSkills.find(skill => skill.skillId === skill._id)}
                                         update={this.updateSkills}
                                         toggleSelection={this.toggleSelection} />
                    )
                );
            });
        }
        return (
            <table>
                <tbody>
                {skillList || <tr></tr>}
                </tbody>
            </table>
        );
    }

    renderModalBody() {
        const { username, requestableSkills } = this.props;
        const { offerableSkills } = this.state;
        switch (this.state.step) {
            default:
            case 1:
                return (
                    <ModalBody>
                        <div>
                            What would you like {username} to do for you?
                            <Card>
                                {this.renderSkills('requestable', requestableSkills)}
                            </Card>
                        </div>
                    </ModalBody>
                );
            case 2:
                return (
                    <ModalBody>
                        <div>
                            What will you do for {username} in return?
                        </div>
                        <Card>
                            {this.renderSkills('offerable', offerableSkills)}
                        </Card>
                    </ModalBody>
                );
            case 3:
                return (
                    <ModalBody>
                        <div>
                            Do you have a message for {username}?
                        </div>
                        <Card>
                            <textarea className={'messageBox'}
                                      id={'message'}
                                      placeholder={'enter your message here'}
                                      onChange={this.handleChange} />
                        </Card>
                        {
                            (this.state.failedAttempt) ? (
                                <Fade className={'errorText'}>
                                    An error occured while creating your contract, please try again later.
                                </Fade>
                            ) : (
                                ''
                            )
                        }
                    </ModalBody>
                );
        }
    }

    renderModalFooter() {
        switch (this.state.step) {
            default:
            case 1:
                return (
                    <ModalFooter>
                        <Button onClick={this.nextStep}>Offers<Icon type={'swap-right'} /></Button>
                    </ModalFooter>
                );
            case 2:
                return (
                    <ModalFooter>
                        <Button onClick={this.previousStep}>Requests <Icon type={'swap-left'} /></Button>
                        <Button onClick={this.nextStep}>Message<Icon type={'swap-right'} /></Button>
                    </ModalFooter>
                );
            case 3:
                return (
                    <ModalFooter>
                        <Button onClick={this.previousStep}>Offers <Icon type={'swap-left'} /></Button>
                        <Button onClick={this.submit}>Send <Icon type={'swap-right'} /></Button>
                    </ModalFooter>
                );
        }
    }

    renderRedirect() {
        // TODO: Redirect to "contract overview" when that exists
        // return <Redirect to={''}/>
    }

    render() {
        const { isOpen, toggle } = this.props;
        return (
            <Modal 
                isOpen={isOpen}
                toggle={toggle}
                backdrop={true}
                onCancel={this.reset}
            >
                <ModalHeader toggle={toggle}>Offer a trade</ModalHeader>
                {this.renderModalBody()}
                {this.renderModalFooter()}
            </Modal>
        );
    }
}

export default CreateTradeModal;