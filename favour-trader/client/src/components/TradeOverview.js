import React, { Component} from "react";
import { Card, Row, Col, Button, Icon, Popover } from 'antd';
class TradeOverview extends Component{
    render() {
        const {offererName, offereeName, tradeStatus, tradeMessage} = this.props.overview;
        const title = (
            <Row>
                <Col span={8} sm={10}>
                    <h5>{offererName}</h5>
                </Col>
                <Col span={8} sm={4}>
                    <Icon type={'swap'} style={{ fontSize: 32, color: '#7E57C2' }}/>
                </Col>
                <Col span={8} sm={10}>
                    <h5>{offereeName}</h5>
                </Col>
            </Row>
        );
        return (
            <Card style={{marginBottom: '2%'}} title={title}>
                    <Row>
                        <Col span={24} id={'trade-status'} style={{textAlign: 'center'}}>
                            <Popover content="Trade's Current Status" trigger="hover">
                                <Button size ="large" type="primary" >{tradeStatus}</Button>
                            </Popover>
                        </Col>
                    </Row>
                    <Row>
                        <h6>Message from {offererName},</h6>
                        <p>{(tradeMessage === "") ? ('No message given.') : (tradeMessage)}</p>
                    </Row>
            </Card>
        );
    }
}

export default TradeOverview;
