import React, { Component } from 'react';
import Dock from 'react-dock';
import axios from 'axios'
import './SidePanelContent.css';

class SidePanelContent extends Component {
    constructor() {
        super();
        this.state = {
            allSkills: [],
            hasSkills: [],
        };
    }

    componentDidMount() {
        axios.get('/api/skills/all')
            .then(res => res.data)
            .then(data => this.setState({ allSkills: data }));
    }

    renderAllSkills() {
        const { allSkills } = this.state;

        return (
            <div>
                {
                    (allSkills !== []) ? (
                        <ul>
                            {
                                allSkills.map(function (skill) {
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

    renderHasSkills() {
        return (
            <div>
                <button className={'SidePanelContent-btn'}>Add new skill</button>
            </div>
        );
    }

    renderWantSkills() {
        return (
            <div>
                <button className={'SidePanelContent-btn'}>Add new skill</button>
            </div>
        );
    }

    render() {
        return (
            <div className={'SidePanelContent'}>
                Skills I Have:
                <div>
                {
                    this.renderHasSkills()
                }
                </div>
                <hr/>
                Skills I'm Looking for:
                <div>
                {
                    this.renderWantSkills()
                }
                </div>
                <hr/>
                ALL SKILLS:
                <ul>
                {
                    this.renderAllSkills()
                }
                </ul>
                <hr/>
            </div>
        );
    }
}

export default SidePanelContent;