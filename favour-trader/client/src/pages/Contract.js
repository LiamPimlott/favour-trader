import React, {Component} from 'react';
//import TradeOverview from '../components/TradeOverview.js';
import axios from 'axios'
import {Row, Col} from 'antd';

class Contract extends Component {
    constructor() {
        super();
        this.state = {
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


            axios.get(`/api/contracts/${params.tradeID}`, config)
                .then(res => res.data)
                .then((tradeData) => console.log(tradeData) )
                .catch((err) => {
                    console.log(err);
                });
        }
    }

    render() {
        const { match: { params } } = this.props;
        

        return (
            <div className={'center-helper'}>
                <p>hey</p>
            </div>
        );
    }    
}

export default Contract;