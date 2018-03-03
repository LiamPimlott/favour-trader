import React, { Component } from 'react';
import { Icon } from 'antd';
import './SelectableSkill.css';

class SelectableSkill extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: props.checked,
            expanded: true,
            description: '',
        };

        this.toggleExpansion = this.toggleExpansion.bind(this);
        this.toggleSelection = this.toggleSelection.bind(this);
    }

    toggleExpansion() {
        this.setState({
            expanded: !this.state.expanded,
        });
    }

    toggleSelection(e) {
        this.setState({
            selected: !this.state.selected,
            expanded: true,
        }, this.props.toggleSelection(e));
    }

    testSelect(e) {
        this.props.toggleSelection(e);
    }

    render() {
        const { skill, update, checked } = this.props;
        const { selected, expanded } = this.state;
        return (
            <tr className={'skillItem'}>
                <td className={'checkboxTD'}>
                    <input type={'checkbox'}
                        className={'checkbox'}
                        id={skill._id}
                        checked={checked}
                        onChange={this.toggleSelection}/>
                </td>
                <td>
                    {skill.skill}
                    {
                        (selected && expanded) ? (
                            <div>
                                {
                                    <textarea className={'descriptionBox'}
                                        id={skill._id}
                                        placeholder={'add a description (optional)'}
                                        onChange={update}/>
                                }
                            </div>
                        ) : (
                            ''
                        )
                    }
                </td>
                <td className={'expansionTD'}>
                    {
                    (selected) ? (
                        <Icon type={(expanded) ? ('up') : ('down')}
                            className='icon'
                            onClick={this.toggleExpansion}/>
                    ) : (
                        ''
                    )
                    }
                </td>
            </tr>
        );
    }
}

export default SelectableSkill;