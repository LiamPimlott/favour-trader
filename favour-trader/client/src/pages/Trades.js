import React, {Component} from 'react';
import axios from 'axios'
import {Row, Col} from 'antd';
import TradeCard from '../components/TradeCard';
import { Link } from 'react-router-dom';

class Trades extends Component {
    constructor() {
        super();
        this.state = {
            trades: [],
            userId: 0,
        };
    }

    componentWillMount() {
        this.mounted = true;
    }

    componentDidMount() {
        const { authService } = this.props;
        const { match: { params } } = this.props;
        const endpoint = params.source ?
            `/api/contracts/${params.source}` :
            `/api/contracts/active`;
		
        if (authService.loggedIn()) {
            const profile = authService.getProfile();
            const config = {
                headers: {
                    Authorization: authService.getToken()
                },
            };

            axios.get(endpoint, config)
            .then(res => res.data)
            .then(contracts => {
                if (this.mounted) {
                    this.setState({
                        trades: contracts,
                        userId: profile.id,
                    });
                }
            })
            .catch( (err) => {
                console.log(err);
            });
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    renderTrades = () => {
        const { trades, userId } = this.state;
        const { match: { params } } = this.props;
        const source = params.source;
        return (
            <div style={{textAlign: "center"}}>
                {
                    (trades) ? (
                        <div className={'container'}>
                            <h1>Matched Traders</h1>
                            <Row gutter={16}>
                                {
                                    trades.map(trade => {
                                        return (
                                            <Col key={trade._id} xs={24} sm={24} md={12} lg={8}>
                                                <TradeCard
                                                    trade={trade}
                                                    source={source}
                                                    userId={userId}
                                                />
                                            </Col>
                                        )
                                    }, this)
                                }
                            </Row>
                        </div>
                    ) : (
                        ''
                    )
                }
            </div>
        );
    }

    renderNoTrades = () => {
        const { match: { params } } = this.props;
        const source = params.source;
        switch (source) {
            case 'active':
            default:
                return (
                    <div>
                        <h3>
                            Looks like you don't have any active trades right now.
                        </h3>
                        <Link to={'/'}>
                            Search your matches!
                        </Link>
                    </div>
                )
            case 'sent':
                return (
                    <div>
                        <h3>
                            Looks like you haven't sent any trades lately.
                        </h3>
                        <Link to={'/filterWants'}>
                            Find what you're looking for!
                        </Link>
                    </div>
                )
            case 'received':
                return (
                    <div>
                        <h3>
                            Looks like you haven't received any trades lately.
                        </h3>
                        <Link to='/filterHas'>
                            Share your skills!
                        </Link>
                    </div>
                )
        }

    }

    render() {
        return (
            <div className={'center-helper'}>
                {this.state.trades !== null && this.state.trades.length !== 0 ? this.renderTrades() : this.renderNoTrades()}
            </div>
        );
    }
}

export default Trades;