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
                            isCurrentUser={this.props.isCurrentUser}
                            toggleFavourCompleted={this.props.toggleFavourCompleted}
                        />
                    </TabPane>
                    <TabPane tab="Offeree's Favours" key="offeree">
                        <FavoursList
                            favours={this.props.favours["wants"]}
                            isCurrentUser={this.props.isCurrentUser}
                            toggleFavourCompleted={this.props.toggleFavourCompleted}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        );
    }
}

export default UserSkills