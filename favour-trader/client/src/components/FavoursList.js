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
                        actions={ 
                            (this.props.contractStatus === "Accepted" ?
                                (this.props.isEditable ? 
                                    [<Checkbox 
                                        checked={item.completed}
                                        onChange={() => this.props.toggleFavourCompleted(item._id)}
                                    />]
                                :
                                    [<Checkbox 
                                        checked={item.completed}
                                        disabled={true}
                                    />]
                                )
                            :
                                []
                            )
                        }
                        style={{padding: '20px'}}
                    >
                        <List.Item.Meta
                            title={<span>{item.skillId.skill}{item.completed ? ' (completed)' : ''}</span> }
                            description={item.description}
                        />
                    </List.Item>
                )}
            />  
        );
    }
}

export default FavoursList;