import React, { Component} from "react";
import { Card, Row, Col, Button, Icon, Popover, List } from 'antd';

class TradeTerms extends Component{

    renderTermsList(terms) {
        console.log(terms);
        return (
            <List
                itemLayout="horizontal"
                dataSource={terms}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            title={<a href="https://ant.design">{item.skillId}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
        );

    }


    render() {
        const {offererName, offereeName} = this.props.overview;
        const { offereeTerms, offerorTerms } = this.props.tradeTerms;
        return (
            <Row type="flex" gutter={16} justify="space-between">
                <Col span={12}>
                    <Card title={offereeName}>
                        {this.renderTermsList(offereeTerms)}
                    </Card>
                </Col>

                <Col span={12}>
                    <Card title={offererName}>
                        {this.renderTermsList(offerorTerms)}
                    </Card>
                </Col>
            </Row>
        );
    }
}

export default TradeTerms;
