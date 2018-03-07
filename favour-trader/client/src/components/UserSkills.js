import React, { Component } from 'react';
import { Button, Tabs/*, List*/, Card } from 'antd';    // List not used
import SkillsList from "./SkillsList";
const TabPane = Tabs.TabPane;

class UserSkills extends Component {
    
    render() {
        return (
            <Card bodyStyle={{padding: '0px'}}>
                <Tabs 
                    size="large" 
                    tabBarStyle={{margin: '15px 0px 0px 0px'}}
                    tabBarExtraContent={ this.props.isCurrentUser 
                        ? (<Button
                                onClick={this.props.toggleNewSkillModal}
                                type="primary"
                                icon="plus" 
                                style={{marginRight: "15px"}}
                            >
                                New Skill
                            </Button>) 
                        : ''
                    }
                >
                    <TabPane tab="Skills I Have" key="has">
                        <SkillsList
                            skillSet="has"
                            skills={this.props.skills["has"]}
                            isCurrentUser={this.props.isCurrentUser}
                            toggleDeleteSkillConfirm={this.props.toggleDeleteSkillConfirm}
                        />
                    </TabPane>
                    <TabPane tab="Skills I Need" key="wants">
                        <SkillsList
                            skillSet="wants"
                            skills={this.props.skills["wants"]}
                            isCurrentUser={this.props.isCurrentUser}
                            toggleDeleteSkillConfirm={this.props.toggleDeleteSkillConfirm}
                        />
                    </TabPane>
                </Tabs>
            </Card>
        );
    }
}

export default UserSkills