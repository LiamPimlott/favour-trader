import React, { Component } from 'react';
import { Button, Tabs, Card } from 'antd';
import FavoursList from "./FavoursList";
const TabPane = Tabs.TabPane;

class TradeFavours extends Component {
    
    render() {
        const {offeror, offeree, isUserOfferor, status, favours, toggleFavourCompleted, favoursEdited} = this.props;
        return (
            <Card 
                bodyStyle={{padding: '0px'}} 
                actions={favoursEdited ? 
                    [
                        <Button
                        
                        >
                            Save Changes
                        </Button>,
                        <Button
                        
                        >
                            Discard Changes
                        </Button>
                    ] :
                    []
                }
            >
                <Tabs 
                    size="large" 
                    tabBarStyle={{margin: '15px 0px 0px 0px'}}
                >
                    <TabPane tab={offeror.firstName + "'s Promised Favours"} key="offeror">
                        <FavoursList
                            favours={favours["offeror"]}
                            contractStatus={status}
                            isEditable={isUserOfferor}
                            toggleFavourCompleted={toggleFavourCompleted}
                        />
                    </TabPane>
                    <TabPane tab={offeree.firstName + "'s Promised Favours"} key="offeree">
                        <FavoursList
                            favours={favours["offeree"]}
                            contractStatus={status}
                            isEditable={!isUserOfferor}
                            toggleFavourCompleted={toggleFavourCompleted}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        );
    }
}

export default TradeFavours;