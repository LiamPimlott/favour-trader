import React, {Component} from 'react';
import {
    Card, CardText, CardBody, Col,
    CardTitle, CardSubtitle, Button
} from 'reactstrap';

class MatchCard extends Component {
    render() {
        const {user, reveal} = this.props;
        return (
            <Col sm="4" className={'pb-3'}>
                <Card>
                    <CardBody>
                        <CardTitle>{user.name.first}</CardTitle>
                        <CardSubtitle>{user.email}</CardSubtitle>
                        <Button size={'sm'} color={'primary'} onClick={reveal}>View Profile</Button>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default MatchCard;