import React, { Component} from "react";
import { Card, Row, Col, Button, Icon, Popover } from 'antd';
class TradeOverview extends Component{
    render() {
        const {status, offeror, offeree, messages} = this.props;
        const title = (
            <Row>
                <Col span={8} sm={10}>
                    <h5>{offeror.firstName}</h5>
                </Col>
                <Col span={8} sm={4}>
                    <Icon type={'swap'} style={{ fontSize: 32, color: '#7E57C2' }}/>
                </Col>
                <Col span={8} sm={10}>
                    <h5>{offeree.firstName}</h5>
                </Col>
            </Row>
        );
        return (
            <Card style={{marginBottom: '2%'}} title={title}>
                    <Row>
                        <Col span={24} id={'trade-status'} style={{textAlign: 'center'}}>
                            <Popover content="Trade's Current Status" trigger="hover">
                                <Button size ="large" type="primary" >{status}</Button>
                            </Popover>
                        </Col>
                    </Row>
                    <Row>
                        <h6>Message from {offeror.firstName},</h6>
                        <p>{ !messages ? ('No message given.') : (messages)}</p>
                    </Row>
            </Card>
        );
    }
}

export default TradeOverview;
