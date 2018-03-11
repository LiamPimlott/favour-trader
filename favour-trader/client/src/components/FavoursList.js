import React, { Component } from "react";
import { List, CheckBox } from 'antd';

class FavoursList extends Component {
    render() {
        return (
            <List
                style={{overflow: 'scroll', height: '350px', padding: '0px 20px 0px 20px'}}
                dataSource={this.props.favours}
                renderItem={item => (
                    <List.Item 
                        key={item._id}
                        actions={ this.props.isCurrentUser ? [<CheckBox 
                            type="danger"
                            icon="delete"
                            onChange={() => this.props.toggleFavourCompleted(this._id)}
                        />] : []}
                        style={{padding: '20px'}}
                    >
                        <List.Item.Meta
                            title={<a>{item.skillID.category.skill}</a>}
                            description={item.description}
                        />
                    </List.Item>
                )}
            />  
        );
    }
}

export default SkillsList;