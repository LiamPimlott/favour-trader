import React, {Component} from 'react';
import TradeOverview from '../components/TradeOverview.js';
import TradeFavours from '../components/TradeFavours.js';
import axios from 'axios'
import {Row, Col, Button} from 'antd';

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
            status: '',
            messages: [],
            offeror: {
                id: '',
                firstName: '',
                lastName: '',
                requestTermination: false,

            },
            offeree: {
                id: '',
                firstName: '',
                lastName: '',
                requestTermination: false,

            },
            favours: {
                offeror: [],
                offeree: [],
            },
            currentUserId: '',
        };
    }

    componentDidMount(){
        const { authService } = this.props;
        const { match: { params } } = this.props;

        if (authService.loggedIn()) {
            const config = {
                headers: {
                    Authorization: authService.getToken()
                }
            };
            const currentUserId = authService.getProfile().id;

            axios.get(`/api/contracts/contract/${params.tradeID}`, config)
                .then(res => res.data.trade)
                .then((tradeData) => this.setState({
                    overview: {
                        offererName: tradeData.offeror.name.first + ' ' + tradeData.offeror.name.last,
                        offereeName: tradeData.offeree.name.first + ' ' + tradeData.offeree.name.last,
                        tradeStatus: tradeData.status,
                        tradeMessage: tradeData.messages[0],
                    },
                    status: tradeData.status,
                    messages: tradeData.messages,
                    offeror: {
                        id: tradeData.offeror.id,
                        firstName: tradeData.offeror.name.first,
                        lastName: tradeData.offeror.name.last,
                        requestTermination: tradeData.offeror.requestTermination,
                    },
                    offeree: {
                        id: tradeData.offeree.id,
                        firstName: tradeData.offeree.name.first,
                        lastName: tradeData.offeree.name.last,
                        requestTermination: tradeData.offeree.requestTermination,
                    },
                    favours: {
                        offeror: tradeData.offeror.favours,
                        offeree: tradeData.offeree.favours,
                    },
                    currentUserId: currentUserId,
                }) )
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        const {status, favours, offeror, offeree, currentUserId} = this.state;

        return (
            <div >
                <Row>
                    <TradeOverview overview={this.state.overview} />
                </Row>
                <Row>
                    <TradeFavours
                        status={status}
                        offeror={offeror}
                        offeree={offeree}
                        currentUserId={currentUserId}
                        favours={favours}
                        toggleFavourCompleted={this.toggleFavourCompleted}
                    />
                </Row>
                { this.state.status === "Accepted" 
                    ? ''
                    : (
                        <Row>
                            <Col span={12}  style={{textAlign: 'center'}}>
                                <Button
                                    type='primary'
                                    size='large'
                                    icon='check'
                                    style={{marginTop: '50px'}}
                                    // onClick={this.toggleCreateTradeModal}
                                >
                                    Accept Trade
                                </Button>
                            </Col>
                            <Col span={12}  style={{textAlign: 'center'}}>
                                <Button
                                    type='danger'
                                    size='large'
                                    icon='close'
                                    style={{marginTop: '50px'}}
                                    // onClick={this.toggleCreateTradeModal}
                                >
                                    Decline Trade
                                </Button>
                            </Col>
                        </Row>
                    )
                }
            </div>
        );
    }
}

export default Contract;
