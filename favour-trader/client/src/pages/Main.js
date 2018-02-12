import React, {Component} from 'react';
import ContractModal from '../components/ContractModal.js';
import axios from 'axios'
import {Row} from 'reactstrap';
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
            <div>
                {
                    (matches) ? (
                        <div className={'container'}>
                            <Row>
                                {
                                    matches.map(function (match) {
                                        return (<MatchCard key={match._id} user={match}
                                                           reveal={this.toggleModal.bind(this, match)}/>)
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
                <header className={'d-flex justify-content-center'}>
                    <h1 className={'center-helper'}>Welcome to FavourTrader</h1>
                </header>
                <div className={'center-helper'}>
                    {this.renderMatches(this.state.matchedUsers)}
                </div>
                <ContractModal isOpen={this.state.modalOpen} toggle={this.toggleModal.bind(this, {})}
                               user={this.state.selectedUser}/>
            </div>
        );
    }
}

export default Main;