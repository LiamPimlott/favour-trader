import React, {Component} from 'react';
import TradeOverview from '../components/TradeOverview.js';
import axios from 'axios'
import {Row, Col} from 'antd';

class Contract extends Component {
    constructor() {
        super();
        this.state = {
            overview: {
                offereeName: '',
                offererName: '',
                tradeStatus: '',
                tradeMessage: '',
            },
            trade: ''
        };
    }

    componentDidMount(){
        const { authService } = this.props;
        const { match: { params } } = this.props;

        console.log(params.tradeID);
        if (authService.loggedIn()) {
            const config = {
                headers: {
                    Authorization: authService.getToken()
                }
            };

            axios.get(`/api/contracts/contract/${params.tradeID}`, config)
                .then(res => res.data.trade)
                .then((tradeData) => this.setState({
                    overview: {
                        offererName: tradeData.offeror.name.first + ' ' + tradeData.offeror.name.last,
                        offereeName: tradeData.offeree.name.first + ' ' + tradeData.offeree.name.last,
                        tradeStatus: tradeData.status,
                        tradeMessage: tradeData.messages[0],
                    }
                }) )
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        const { match: { params } } = this.props;
        return (
            <div >
                <Row type="flex" justify="center">
                    <Col span={12}>
                        <TradeOverview overview={this.state.overview} />
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Contract;
