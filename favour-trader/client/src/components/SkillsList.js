import React, { Component } from "react";
import { List, Tabs, Button/*, Card*/ } from 'antd';    // Card not used
//const TabPane = Tabs.TabPane;     // Not used

class SkillsList extends Component {
    render() {
        return (
            <List
                style={{overflow: 'scroll', height: '350px', padding: '0px 20px 0px 20px'}}
                dataSource={this.props.skills}
                renderItem={item => (
                    <List.Item 
                        key={item._id}
                        actions={ this.props.isCurrentUser ? [<Button 
                            type="danger"
                            icon="delete"
                            onClick={() => this.props.toggleDeleteSkillConfirm(this.props.skillSet, item._id)}
                        />] : []}
                        style={{padding: '20px'}}
                    >
                        <List.Item.Meta
                            title={<a>{item.category.skill}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />
            
        );
    }
}

export default SkillsList;