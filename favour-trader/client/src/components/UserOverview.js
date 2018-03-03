import React, { Component } from 'react';
import { Card, Row, Col, Divider, Button } from 'antd';
import Avatar from 'react-avatar';

class UserOverview extends Component{
   
   render() {
       const { firstName, lastName, country, state, city, about} = this.props.overview;
       const renderEdit = this.props.isCurrentUser;
       return (
            <Card style={{marginBottom: '2%'}}>
                <Divider>
                    <Avatar name={firstName + " " + lastName} size={150} round={true} />
                </Divider>
                <Row>
                    <Col span={12}>
                        <h3>{ firstName + " " + lastName}</h3>
                        <p>{city + ", " + state + ", " + country}</p>
                    </Col>
                    <Col span={12}>
                        { renderEdit ? 
                            (<Button 
                                type={'primary'}
                                icon='edit'
                                style={{float: 'right'}}
                                onClick={this.props.onEditUser}
                            >Edit Profile</Button>) : 
                            ''
                        }
                    </Col>
                </Row>
                <Row>
                    <h6>About Me</h6>
                    <p>{about}</p>
                </Row>
            </Card>
        );
    }
}

export default UserOverview;