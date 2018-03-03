import React, { Component} from "react";
import { Card, Row, Col, Button, Icon, Popover } from 'antd';

class UserOverview extends Component{
    render() {
        const {offererName, offereeName, tradeStatus, tradeMessage} = this.props.overview;
        console.log(this.props.overview);
        const title = <h5>{offereeName} <Icon type={'swap'}/>{offererName}</h5>;
        return (
            <Card style={{marginBottom: '2%'}} title={title}>
                    <Row type="flex" justify="center">
                        <Col span={12} id={'trade-status'} style={{textAlign: 'center'}}>
                            <Popover content="Current Status" trigger="hover">
                                <Button size ="large" type="primary" >{tradeStatus}</Button>
                            </Popover>
                        </Col>
                    </Row>
                    <Row type="flex" justify="space-between">
                        <Col span={12}>
                            <p><strong>Message:</strong> {(tradeMessage === "") ? ('No message') : (tradeMessage)}</p>
                        </Col>
                    </Row>

            </Card>
        );
    }
}

export default UserOverview;
