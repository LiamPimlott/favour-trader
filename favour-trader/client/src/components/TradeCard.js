import React, { Component } from 'react';
import { Card, Button, Icon } from 'antd';
import { Link } from 'react-router-dom';

class TradeCard extends Component {
    renderIcon() {
        return <Icon key={this.props.trade._id} type={'swap'}/>;
    }

    render() {
        const { trade, source, userId } = this.props;
        const title = this.renderIcon();
        const offerorName = (trade.offeror.id === userId) ? 'You' : trade.offeror.name.first;
        const offereeName = (trade.offeree.id === userId) ? 'You' : trade.offeree.name.first;
        return (
            <Card title={[offerorName, " " ,title, " ", offereeName]} style={{ width: 300, marginTop: '10px' }}>
                <p style={{margin: '20px', height: '70px', width: '210px', fontSize: '13px'}}>
                    Wow, a trade!
                </p>
                <Button type="primary" style={{marginTop: '0px'}}>
                    <Link to={`/trades/${source}/${trade._id}`}>
                        View Trade
                    </Link>
                </Button>
            </Card>
        );
    }
}

export default TradeCard;