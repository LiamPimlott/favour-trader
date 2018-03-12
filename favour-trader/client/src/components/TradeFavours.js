import React, { Component } from 'react';
import { Button, Tabs, Card } from 'antd';
import FavoursList from "./FavoursList";
const TabPane = Tabs.TabPane;

class TradeFavours extends Component {
    
    render() {
        return (
            <Card 
                bodyStyle={{padding: '0px'}} 
                actions={[<Button>Save Changes</Button>, <Button>Discard Changes</Button>]}
            >
                <Tabs 
                    size="large" 
                    tabBarStyle={{margin: '15px 0px 0px 0px'}}
                >
                    <TabPane tab="Offeror's Favours" key="offeror">
                        <FavoursList
                            favours={this.props.favours["offeror"]}
                            isEditable={(this.props.currentUserId === this.props.offeror.id)}
                            toggleFavourCompleted={this.props.toggleFavourCompleted}
                        />
                    </TabPane>
                    <TabPane tab="Offeree's Favours" key="offeree">
                        <FavoursList
                            favours={this.props.favours["offeree"]}
                            isEditable={(this.props.currentUserId === this.props.offeree.id)}
                            toggleFavourCompleted={this.props.toggleFavourCompleted}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        );
    }
}

export default TradeFavours;