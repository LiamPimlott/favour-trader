import React, { Component } from 'react';
import { View, StyleSheet, Text, Modal } from 'react-native';
import { List, ListItem, ButtonGroup, Card, Button, Icon } from 'react-native-elements'; // 0.17.0

import "@expo/vector-icons";
import axios from "axios/index";
import AuthService from "./AuthService"; // 5.2.0

export default class ProfileSkills extends Component {
    constructor() {
        super();
        this.state = {
            index: 0,
            toggleDelete: false,
            targetSkill: null,
            skills: {
                has: null,
                wants: null,
            },
        };
        this.deleteSkill = this.deleteSkill.bind(this);
        this.deleteSkillToggle = this.deleteSkillToggle.bind(this);
        this.updateIndex = this.updateIndex.bind(this);
        this.renderList = this.renderList.bind(this);
        this.authService = new AuthService();
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.setState({
                skills: {
                    has: this.props.has,
                    wants: this.props.wants
                }
            })
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    deleteSkillToggle(id) {
        this.setState({ toggleDelete: !this.state.toggleDelete, targetSkill: id });
    }

    deleteSkill() {
        let updatedSkills = null;
        let skillSet = null;
        if (this.state.index === 0) {
            updatedSkills = this.props.has.filter(skill => skill._id !== this.state.targetSkill);
            skillSet = "has";
        } else {
            updatedSkills = this.props.has.filter(skill => skill._id !== this.state.targetSkill);
            skillSet = "wants";
        }
        this.authService.getToken().then(
            (token) => {
                const config = {
                    headers: {
                        Authorization: token
                    }
                };
                axios.put('http://favour-trader.appspot.com/api/users/update', { [skillSet]: updatedSkills }, config)
                    .then(res => res.data.user)
                    .then(updatedUser => this.setState({
                        skills: {
                            has: updatedUser.has,
                            wants: updatedUser.wants,
                        },
                        toggleDelete: false,
                    }))
                    .catch((err) => {
                        console.log(err);
                    });
            });
    }

    updateIndex = (index) => {
        this.setState({ index: index })
    }

    renderList() {

        if (this.state.skills.has && this.state.skills.wants) {
            if (this.state.index == 0) {
                return (
                    this.state.skills.has.map((item, i) => (
                        <ListItem
                            key={i}
                            hideChevron={!this.props.isCurrentUser}
                            title={item.category.skill}
                            rightIcon={{ name: 'delete-forever' }}
                            onPressRightIcon={() => { this.deleteSkillToggle(item._id) }}
                        />
                    ))
                );
            }
            if (this.state.index == 1) {
                return (
                    this.state.skills.wants.map((item, i) => (
                        <ListItem
                            key={i}
                            hideChevron={!this.props.isCurrentUser}
                            title={category.skill}
                            rightIcon={{ name: 'delete-forever' }}
                            onPressRightIcon={() => { this.deleteSkillToggle(item._id) }}
                        />
                    ))
                );
            }
        }
    }

    render() {
        return (
            <View>
                <Card>
                    <ButtonGroup
                        selectedBackgroundColor="pink"
                        onPress={this.updateIndex}
                        selectedIndex={this.state.index}
                        buttons={['Has', 'Wants']}
                        containerStyle={{ height: 30 }} />
                    <View>
                        <List>
                            {this.renderList()}
                        </List>
                    </View>
                </Card>

                {
                    this.state.toggleDelete ? (
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.toggleDelete}
                            onRequestClose={() => {this.setState({ toggleDelete: false })}}>
                            <Card title='Are you sure?'>
                                <Icon name={'cancel'} size={35} color={'red'} />
                                <Button
                                    title={"Delete"}
                                    onPress={this.deleteSkill}
                                />
                                <Button
                                    title={"Close"}
                                    onPress={() => { this.setState({ toggleDelete: false }) }}
                                />
                            </Card>
                        </Modal>
                    ) : (<View />)
                }
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        justifyContent: 'center',
    },

});