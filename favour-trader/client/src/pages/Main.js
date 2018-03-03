import React, {Component} from 'react';
import ReviewSkillsModal from '../components/ReviewSkillsModal.js';
import axios from 'axios'
import {Row, Col} from 'antd';
import MatchCard from "../components/MatchCard";

class Main extends Component {
    constructor() {
        super();
        this.state = {
            matchedUsers: [],
            selectedUser: {},
            modalOpen: false,
        };
        this.toggleModal = this.toggleModal.bind(this);
        this.renderMatches = this.renderMatches.bind(this);
    }

    componentDidMount() {
        const { authService } = this.props;
		
        if (authService.loggedIn()) {
            const config = {
                headers: {
                    Authorization: authService.getToken()
                },
				params: {
					has: 'true',
					wants: 'true'
				}
            };

            axios.get('/api/users/matches', config)
            .then(res => res.data.matches)
            .then(matches => this.setState({matchedUsers: matches }))
            .catch( (err) => {
                console.log(err);
            });
        }
        // else should redirect to login page
    }

    toggleModal(user) {
        this.setState({
            selectedUser: user,
            modalOpen: !this.state.modalOpen,
        });
    }

    renderMatches(matches) {
        return (
            <div style={{textAlign: "center"}}>
                {
                    (matches) ? (
                        <div className={'container'}>
                            <h1>Matched Traders</h1>
                            <Row gutter={16}>
                                {
                                    matches.map(function (match) {
                                        return (
                                            <Col key={match._id} xs={24} sm={24} md={12} lg={8}>
                                                <MatchCard 
                                                    key={match._id}
                                                    user={match}
                                                    reveal={this.toggleModal.bind(this, match)}
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

    render() {
        return (
            <div>
                <div className={'center-helper'}>
                    { this.state.matchedUsers ?
                        this.renderMatches(this.state.matchedUsers) :
                        "Sorry, No Matches :( Try updating the skills you are seeking."
                    }
                </div>
                <ReviewSkillsModal isOpen={this.state.modalOpen} toggle={this.toggleModal.bind(this, {})}
                               user={this.state.selectedUser}/>
            </div>
        );
    }
}

export default Main;