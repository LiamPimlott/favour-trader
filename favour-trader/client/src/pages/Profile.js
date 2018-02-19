import React, { Component } from 'react';
import {Media, Jumbotron, Container} from 'reactstrap';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Card, Icon, Row, Col, Divider, Button } from 'antd';
import axios from 'axios'
import './Profile.css';

class Profile extends Component {
    constructor() {
        super();
        this.state = {
            userName: '',
            userEmail: '',
            about: '',
            has: [],
            wants: []
        };
    }

    componentDidMount() {
        const { authService } = this.props;
        if (authService.loggedIn()) {
            const config = {
                headers: {
                    Authorization: authService.getToken()
                }
            };

            axios.get('/api/users/profile', config)
                .then(res => res.data.user)
                .then(userData => this.setState({
                    userName: userData.name.first + " " + userData.name.last,
                    userEmail: userData.email,
                    about: userData.about,
                    has: userData.has,
                    wants: userData.wants
                }))
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    renderSkills(skillSet) {
        const skills = this.state[skillSet];
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
                <Card style={{marginBottom: '2%'}}>
                    <img src="http://stylopics.com/wp-content/uploads/2013/08/Cool_Trendy_Attitude_Meaningful_fb_Timeline_Covers_Boys_Trendy_Attitude_Cover_Photos_for_Facebook_Timeline-16.jpg"
                         style={{width: '70%'}}/>
                    <Divider>Picture</Divider>
                    <Row  type={'flex'} justify={'space-between'}>
                        <Col span={8}>
                            <h5>{this.state.userName}</h5>
                            <p>{this.state.userEmail}</p>
                            <p><strong>About me:</strong> {this.state.about}</p>
                        </Col>
                        <Col span={8}>
                            <Button type={'primary'} style={{float: 'right'}}>Edit Profile</Button>
                        </Col>
                    </Row>
                </Card>
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