import React, { Component } from 'react';
import { Card, Button, Col } from 'antd';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

class MatchCard extends Component {
    render() {
        const {user, reveal} = this.props;
        return (
            <Col span={8}>
                <Card title={user.name.first + " " + user.name.last.charAt(0) + "."} style={{ width: 300, marginTop: '10px' }}>
					<Avatar style={{marginBottom: '20px'}} src="http://lorempixel.com/400/200/" size="100" round={true} />
					<p
						style={{height: '100px', width: '225px', fontSize: '13px'}}>
							{user.about}
					</p>
                    <Button size={'sm'} color={'primary'} style={{marginTop: '10px'}}>
						<Link to="/Profile">
							View Profile
						</Link>
					</Button>
                </Card>
            </Col>
        );
    }
}

export default MatchCard;