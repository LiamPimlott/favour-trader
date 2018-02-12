import React, { Component } from 'react';
import axios from 'axios'
import './SidePanelContent.css';

class SidePanelContent extends Component {
    constructor() {
        super();
        this.state = {
            allSkills: [],
            hasSkills: [],
            wantSkills: [],
        };
    }

    componentDidMount() {
        const { authService } = this.props;
        if (authService.loggedIn()) {
            const userProfile = authService.getProfile();
            const config = {
               headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': authService.getToken(),
                }
            };

            axios.get('/api/skills/all')
            .then(res => res.data)
            .then(data => this.setState({allSkills: data }));

            if (!!userProfile && userProfile.email) {
                const userEmail = userProfile.email;
                axios.post('/api/users/has', {
                    email: userEmail,
                }, config)
                .then(res => res.data.user)
                .then(user => this.setState({ hasSkills: user.has }));

                axios.post('/api/users/wants', {
                    email: userEmail,
                }, config)
                .then(res => res.data.user)
                .then(user => this.setState({ wantSkills: user.wants }));
            }
        }
    }

    renderSkills(skillSet) {
        const skills = this.state[skillSet];
        return (
            <div>
                {
                    (skills !== []) ? (
                        <ul>
                            {
                                skills.map(function (skill) {
                                    return (<li key={skill._id}> {skill.skill} </li>)
                                }, this)
                            }
                        </ul>
                    ) : (
                            ''
                    )
                }
            </div>
        );
    }

    render() {
        return (
            <div className={'SidePanelContent'}>
                Skills I Have:
                <div>
                {
                    this.renderSkills('hasSkills')
                }
                <button className={'SidePanelContent-btn'}>Add a new skill</button>
                </div>
                <hr/>
                Skills I'm Looking for:
                <div>
                {
                    this.renderSkills('wantSkills')
                }
                <button className={'SidePanelContent-btn'}>Add a new skill</button>
                </div>
                <hr/>
                All Skills:
                <ul>
                {
                    this.renderSkills('allSkills')
                }
                </ul>
                <hr/>
            </div>
        );
    }
}

export default SidePanelContent;