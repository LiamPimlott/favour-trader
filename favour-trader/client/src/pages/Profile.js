import React, { Component } from 'react';
import axios from 'axios'
import { Card, Modal, Button, Icon, Row, Col } from 'antd';
import UserOverview from "../components/UserOverview";
import EditUserOverview from "../components/EditUserOverview";
import NewSkillModal from "../components/NewSkillModal";
import CreateTradeModal from "../components/CreateTradeModal";
import UserSkills from '../components/UserSkills';
import SkillsList from '../components/SkillsList';
import './Profile.css';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            userId: '',
            overview: {
                firstName: '',
                lastName: '',
                country: '',
                state: '',
                city: '',
                postalCode: '',
                about: '',
            },
            skills: {
                has: [],
                wants: [],
            },
            skillCategories: [],
            isCurrentUser: false,
            editUserVisible: false,
            confirmEditUser: false,
            showNewSkillModal:false,
            confirmNewSkill: false,
            createTradeModalOpen: false,
        };
    }

    saveEditUserFormRef = (form) => {
        this.editUserForm = form;
    }

    toggleEditUserModal = () => {
        this.setState({ editUserVisible: !this.state.editUserVisible });
    }

    handleEditUserSave = () => {
        const editUserForm = this.editUserForm;
        const { authService } = this.props;
        editUserForm.validateFields((err, values) => {
            if (err) {
                return;
            }

            const config = {
                headers: {
                    Authorization: authService.getToken()
                }
            };

            this.setState({ confirmEditUser: true });
            axios.put('api/users/update',{
                name: {
                    first: values.firstName,
                    last: values.lastName
                },
                address: {
                    postalCode: values.postalCode,
                    city: values.city,
                    state: values.state,
                    country: values.country
                },
                about: values.about
            }, config)
            .then(res => res.data.user)
            .then(updatedUser => this.setState({
                overview: {
                    firstName: updatedUser.name.first,
                    lastName: updatedUser.name.last,
                    country: updatedUser.address.country,
                    state: updatedUser.address.state,
                    city: updatedUser.address.city,
                    postalCode: updatedUser.address.postalCode,
                    about: updatedUser.about,
                },
                confirmEditUser: false,
                editUserVisible: false,
            }))
            .then(() => editUserForm.resetFields())
            .catch((err) => {
                this.setState({ confirmEditUser: false, editUserVisible: false });
                console.log(err);
            });   
        });
    }

    saveNewSkillFormRef = (form) => {
        this.newSkillForm = form;
    }

    toggleNewSkillModal = () => {
        this.setState(
            { showNewSkillModal: !this.state.showNewSkillModal },
            () => this.newSkillForm.resetFields()
        );
    }

    handleNewSkillSave = () => {
        const newSkillForm = this.newSkillForm;
        newSkillForm.validateFields((err, values) => {
            if (err) {
                return;
            }
            const { authService } = this.props;
            const updatedSkills = [
                ...this.state.skills[values.skillSet],
                {
                    category: values.skillCategory,
                    description: values.description,
                }
            ];
            const config = {
                headers: {
                    Authorization: authService.getToken()
                }
            };
            this.setState({ confirmNewSkill: true });
            axios.put('api/users/update', { [values.skillSet]: updatedSkills }, config)
            .then(res => res.data.user)
            .then(updatedUser => this.setState({
                skills: {
                    has: updatedUser.has,
                    wants: updatedUser.wants,
                },
                confirmNewSkill: false,
                showNewSkillModal: false,
            }))
            .then(() => newSkillForm.resetFields())
            .catch((err) => {
                this.setState({ confirmNewSkill: false, showNewSkillModal: false });
                console.log(err);
            });   
        });
    }

    handleSkillDelete = (skillSet, toDeleteId) => {
        const { authService } = this.props;
        const config = {
            headers: {
                Authorization: authService.getToken()
            }
        };
        const updatedSkills = this.state.skills[skillSet].filter( skill => skill._id !== toDeleteId );
        return axios.put('api/users/update', { [skillSet]: updatedSkills }, config)
        .then(res => res.data.user)
        .then(updatedUser => this.setState({
            skills: {
                has: updatedUser.has,
                wants: updatedUser.wants,
            }
        }))
        .catch((err) => {
            console.log(err);
        });   
    }

    confirmDeleteSkill = (skillSet, toDeleteId) => {
        const handleDelete = () => this.handleSkillDelete(skillSet, toDeleteId);
        const settings = {
            title: 'Are you sure?',
            content: 'This Skill will be deleted permanently.',
            okText: 'Delete',
            okType: 'danger',
            onOk: handleDelete
        };
        Modal.confirm(settings);
    }

    componentDidMount() {
        const { authService } = this.props;
        const { match: { params } } = this.props;
        this.mounted = true;
        if (authService.loggedIn()) {
            const config = {
                headers: {
                    Authorization: authService.getToken()
                }
            };

            const profileEndpoint = params.userId ? 
                `/api/users/${params.userId}/profile` :
                `/api/users/profile`;

            axios.get(profileEndpoint, config)
                .then(res => res.data.user)
                .then(userData => this.setState({
                    overview: {
                        firstName: userData.name.first,
                        lastName: userData.name.last,
                        country: userData.address.country,
                        state: userData.address.state,
                        city: userData.address.city,
                        postalCode: '',
                        about: userData.about,
                    },
                    skills: {
                        has: userData.has,
                        wants: userData.wants,
                    },
                    isCurrentUser: (userData._id === authService.getProfile().id)
                }))
                .catch( err => {
                    console.log(err);
                });

            axios.get("api/skills/all")
                .then(res => res.data)
                .then(categories => this.setState({
                    skillCategories: categories,
                }))
                .catch( err => {
                    console.log(err);
                })
        }
    }
    componentWillUnmount() {
        this.mounted = false;
    }

    toggleCreateTradeModal = () => {
        this.setState({
            createTradeModalOpen: !this.state.createTradeModalOpen,
        });
    }

    render() {
        const { authService } = this.props;
        const { isCurrentUser } = this.state;
        return (
            <div id='user-profile-page'>
                <Row>
                    <UserOverview
                        isCurrentUser={isCurrentUser} 
                        profileId={this.state.profileId}
                        overview={this.state.overview}
                        onEditUser={this.toggleEditUserModal}
                    />
                </Row>
                <Row>
                    <UserSkills 
                        isCurrentUser={isCurrentUser}
                        skills={this.state.skills} 
                        toggleNewSkillModal={this.toggleNewSkillModal}
                        toggleDeleteSkillConfirm={this.confirmDeleteSkill}
                    />
                </Row>
                { isCurrentUser 
                    ? '' 
                    : (
                        <Row type='flex' justify='space-around' align='middle'>
                            <Button
                                type='primary'
                                size='large'
                                icon='swap'
                                style={{marginTop: '50px'}}
                                onClick={this.toggleCreateTradeModal}
                            >
                                Offer a Trade!
                            </Button>
                        </Row>
                    )
                }
                <EditUserOverview
                    ref={this.saveEditUserFormRef}
                    overview={this.state.overview}
                    visible={this.state.editUserVisible}
                    onCancel={this.toggleEditUserModal}
                    onSave={this.handleEditUserSave}
                    confirmUpdate={this.state.confirmEditUser}
                />
                <NewSkillModal
                    ref={this.saveNewSkillFormRef}
                    categories={this.state.skillCategories}
                    visible={this.state.showNewSkillModal}
                    onCancel={this.toggleNewSkillModal}
                    onSave={this.handleNewSkillSave}
                    confirmNew={this.state.confirmNewSkill}
                />
                <CreateTradeModal requestableSkills={this.state.skills.wants}
                    username={this.state.overview.firstName}
                    authService={authService}
                    offereeId={this.state.userId}
                    isOpen={this.state.createTradeModalOpen}
                    toggle={this.toggleCreateTradeModal}/>
            </div>
        );
    }
}

export default Profile;