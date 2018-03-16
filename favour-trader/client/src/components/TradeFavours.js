import React, { Component } from 'react';
import { Button, Tabs, Card } from 'antd';
import FavoursList from "./FavoursList";
const TabPane = Tabs.TabPane;

class TradeFavours extends Component {
    
    render() {
        const {
            offeror, offeree, isUserOfferor, 
            status, favours, userUpdatedFavours,
            toggleFavourCompleted,favoursEdited, 
            saveFavoursWaiting, saveEditedFavours,
            cancelEditedFavours,
        } = this.props;
        return (
            <Card 
                bodyStyle={{padding: '0px'}} 
                actions={favoursEdited ? 
                    [
                        <Button
                            type='primary'
                            icon='save'
                            ghost
                            loading={saveFavoursWaiting}
                            onClick={saveEditedFavours}
                        >
                            Save Changes
                        </Button>,
                        <Button
                            type='danger'
                            icon='delete'
                            ghost
                            onClick={cancelEditedFavours}
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
                            favours={isUserOfferor ? userUpdatedFavours : favours["offeror"]}
                            contractStatus={status}
                            isEditable={isUserOfferor}
                            toggleFavourCompleted={toggleFavourCompleted}
                        />
                    </TabPane>
                    <TabPane tab={offeree.firstName + "'s Promised Favours"} key="offeree">
                        <FavoursList
                            favours={isUserOfferor ? favours["offeree"] : userUpdatedFavours}
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