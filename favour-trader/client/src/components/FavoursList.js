import React, { Component } from "react";
import { List, Checkbox } from 'antd';

class FavoursList extends Component {
    render() {
        return (
            <List
                style={{overflow: 'scroll', height: '350px', padding: '0px 20px 0px 20px'}}
                dataSource={this.props.favours}
                renderItem={item => (
                    <List.Item 
                        key={item._id}
                        actions={ this.props.isEditable ? [<Checkbox 
                            defaultChecked={item.completed}
                            onChange={() => this.props.toggleFavourCompleted(this._id)}
                        />] : [<Checkbox 
                            checked={item.completed}
                            disabled={true}
                        />]}
                        style={{padding: '20px'}}
                    >
                        <List.Item.Meta
                            title={<span>{item.skillId.skill}{item.completed ? '(completed)' : ''}</span> }
                            description={item.description}
                        />
                    </List.Item>
                )}
            />  
        );
    }
}

export default FavoursList;