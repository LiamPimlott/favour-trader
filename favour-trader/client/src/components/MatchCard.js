import React, { Component } from 'react';
import { Card, Button, Col } from 'antd';
import Avatar from 'react-avatar';

class MatchCard extends Component {
    render() {
        const {user, reveal} = this.props;
        return (
            <Col span={8}>
                <Card title={user.name.first + " " + user.name.last.charAt(0) + "."} style={{ width: 300, marginTop: '10px' }}>
					<Avatar style={{marginBottom: '20px'}} src="http://lorempixel.com/400/200/" size="100" round={true} />
					<textarea 
						readOnly
						style={{height: '100px', width: '225px', fontSize: '13px', overflow: "hidden"}}>
						{user.about}
					</textarea>
                    <Button size={'sm'} color={'primary'} onClick={reveal} style={{marginTop: '10px'}}>View Profile</Button>
                </Card>
            </Col>
        );
    }
}

export default MatchCard;