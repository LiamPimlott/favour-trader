import React, { Component } from 'react';
import { Card, Button, } from 'antd';
import { Link } from 'react-router-dom';
import Avatar from 'react-avatar';

class MatchCard extends Component {
    render() {
        const {user, reveal} = this.props;
        return (
            <Card title={user.name.first + " " + user.name.last.charAt(0) + "."} id={'match-card'}>
                <Avatar style={{marginBottom: '20px'}} src="http://lorempixel.com/400/200/" size={125} round={true} />
                <a className="active" style={ {position: 'absolute', top: '50%', color:'blue'} } onClick={reveal}>Review Skills</a>
                <p style={{margin: '20px', height: '70px', width: '210px', fontSize: '13px'}}>
                        {
                            (user.about) ?
                                ( 
                                    (user.about.length > 100) ? 
                                        (user.about.substring(0, 99) + " ...Read more on Profile") : 
                                        (user.about)
                                ) :
                                ("Check out my Profile!")
                        }
                </p>
                <Button type="primary" style={{marginTop: '0px'}}>
                    <Link to={'/Profile/'+user._id}>
                        View Profile
                    </Link>
                </Button>
            </Card>
        );
    }
}

export default MatchCard;