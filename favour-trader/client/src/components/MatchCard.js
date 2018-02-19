import React, {Component} from 'react';
import { Card, Button, Col } from 'antd';

class MatchCard extends Component {
    render() {
        const {user, reveal} = this.props;
        return (
            <Col span={8}>
                <Card title={user.name.first + " " + user.name.last.charAt(0) + "."} style={{ width: 300 }}>
                    <Button size={'sm'} color={'primary'} onClick={reveal}>View Profile</Button>
                </Card>
            </Col>
        );
    }
}

export default MatchCard;