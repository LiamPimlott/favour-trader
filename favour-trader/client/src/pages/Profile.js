import React, { Component } from 'react';
import UserOverview from "../components/UserOverview";
import { Card, Icon, Row, Col } from 'antd';
import EditUserOverview from "../components/EditUserOverview";
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
            isCurrentUser: false,
            editUserVisible: false,
            confirmEditUser: false,
        };
    }

    showEditUser = () => {
        this.setState({ editUserVisible: true });
    }

    handleEditUserCancel = () => {
        this.setState({ editUserVisible: false });
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

    saveEditUserFormRef = (form) => {
        this.editUserForm = form;
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

            const endpoint = params.userId ? 
                `/api/users/${params.userId}/profile` :
                `/api/users/profile`;

            axios.get(endpoint, config)
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
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    renderSkills(skillSet) {
        const skills = this.state.skills[skillSet];
        return (
            (skills !== [] ) ? (
                skills.map(function (skill) {
                    return (
                        <Card key={skill._id} id={'skill'} title={skill.skill} extra={<a href="#"><Icon type={'delete'}/></a>}>
                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris accumsan interdum urna
                                eu lacinia. Fusce sed lacus ultricies nunc laoreet ornare. Pellentesque aliquam tincidunt
                                neque, sed fringilla mauris pharetra a.	</p>
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
                    onEditUser={this.showEditUser}
                />
                <EditUserOverview
                    ref={this.saveEditUserFormRef}
                    overview={this.state.overview}
                    visible={this.state.editUserVisible}
                    onCancel={this.handleEditUserCancel}
                    onSave={this.handleEditUserSave}
                    confirmUpdate={this.state.confirmEditUser}
                />
                <Row type="flex" justify="space-around">
                    <Col span={8}>
                        <Card title={'Skills I Have'} extra={<a href="#"><Icon type={'plus'}/></a>}>
                            {this.renderSkills('wants')}
                        </Card>
                    </Col>
                    <Col span={8}>
                        <Card title={'Looking For'} extra={<a href="#"><Icon type={'plus'}/></a>}>
                            {this.renderSkills('has')}
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Profile;