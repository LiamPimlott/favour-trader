import React, { Component } from 'react';
import UserOverview from "../components/UserOverview";
import EditUserOverview from "../components/EditUserOverview";
import NewSkillModal from "../components/NewSkillModal";
import { Card, Button, Icon, Row, Col } from 'antd';
import axios from 'axios'
import './Profile.css';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
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
        this.setState({ showNewSkillModal: !this.state.showNewSkillModal });
    }

    handleNewSkillSave = () => {
        const newSkillForm = this.newSkillForm;
        newSkillForm.validateFields((err, values) => {
            if (err) {
                return;
            }
            const { authService } = this.props;
            const updatedSkills = [...this.state.skills[values.skillSet], {
                category: values.skillCategory,
                description: values.description,
            }];
            const config = {
                headers: {
                    Authorization: authService.getToken()
                }
            };
            this.setState({ confirmingNewSkill: true });
            axios.put('api/users/update', { [values.skillSet]: updatedSkills }, config)
            .then(res => res.data.user)
            .then(updatedUser => this.setState({
                skills: {
                    has: updatedUser.has,
                    wants: updatedUser.wants,
                },
                confirmingNewSkill: false,
                showNewSkillModal: false,
            }))
            .then(() => newSkillForm.resetFields())
            .catch((err) => {
                this.setState({ confirmingNewSkill: false, showNewSkillModal: false });
                console.log(err);
            });   
        });
    }

    componentDidMount() {
        const { authService } = this.props;
        const { match: { params } } = this.props;

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

    renderSkills(skillSet) {
        const skills = this.state.skills[skillSet];
        return (
            (skills !== [] ) ? (
                skills.map(function (skill) {
                    return (
                        <Card key={skill._id} id={'skill'} title={skill.category.skill} extra={<a href="#"><Icon type={'delete'}/></a>}>
                            <p>{skill.description}</p>
                        </Card> )
                })
            ) : ('')
        );
    }

    render() {
        return (
            <div>
                <UserOverview
                    isCurrentUser={this.state.isCurrentUser} 
                    profileId={this.state.profileId}
                    overview={this.state.overview}
                    onEditUser={this.toggleEditUserModal}
                />
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
                    confirmUpdate={this.state.confirmNewSkill}
                />
                <Row type="flex" justify="space-around">
                    <Col span={12}>
                        <Card title={'Looking For'} extra={
                            <Button
                                onClick={this.toggleNewSkillModal}
                                type="primary"
                                shape="circle"
                                icon="plus" />
                            }
                        >
                            {this.renderSkills('wants')}
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card title={'Skills I Want'} extra={<a href="#"><Icon type={'plus'}/></a>}>
                            {this.renderSkills('has')}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Profile;