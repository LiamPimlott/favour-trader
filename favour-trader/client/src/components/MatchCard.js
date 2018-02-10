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
                        <CardText>Some quick example text to build on the card title and make up the bulk of the card's
                            content.</CardText>
                        <Button size={'sm'} color={'primary'} onClick={reveal}>View Profile</Button>
                    </CardBody>
                </Card>
            </Col>
        );
    }
}

export default MatchCard;