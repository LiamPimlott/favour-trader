import React, {Component} from 'react';
import TradeOverview from '../components/TradeOverview.js';
import axios from 'axios'
import {Row, Col} from 'antd';
import TradeTerms from "../components/TradeTerms";

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
            terms: {
                offereeTerms: [],
                offererTerms: [],
            },
            trade: ''
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

            axios.get(`/api/contracts/contract/${params.tradeID}`, config)
                .then(res => res.data.trade)
                .then((tradeData) => { this.setState({
                    overview: {
                        offererName: tradeData.offeror.name.first + ' ' + tradeData.offeror.name.last,
                        offereeName: tradeData.offeree.name.first + ' ' + tradeData.offeree.name.last,
                        tradeStatus: tradeData.status,
                        tradeMessage: tradeData.messages[0],
                    },
                    terms: {
                        offerorTerms: tradeData.offeror.favours,
                        offereeTerms: tradeData.offeree.favours,
                    }
                })
                })
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        return (
            <div >
                <TradeOverview overview={this.state.overview} />
                <TradeTerms overview={this.state.overview} tradeTerms={this.state.terms}/>
            </div>
        );
    }
}

export default Contract;
