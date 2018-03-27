import React, { Component } from 'react';
import { StyleSheet, View, Text, } from 'react-native';
import { Card, Avatar, Button, Icon } from 'react-native-elements'
import axios from 'axios';
import AuthService from "./AuthService";
import UpdateInfoModal from './UpdateInfoModal';
import AddSKillsModal from './AddSkillsModal';

class ProfileCard extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: false,
            isSkillToggleOpen: false,
            firstName: '',
            lastName: '',
            country: '',
            state: '',
            city: '',
            postalCode: '',
            about: '',
            skillCategories: null,
            gotAllSkills: false,
        };
        this.authService = new AuthService();
        this.toggleUpdateInfoModal = this.toggleUpdateInfoModal.bind(this);
        this.toggleAddSkillsModal = this.toggleAddSkillsModal.bind(this);
        this.updateInfo = this.updateInfo.bind(this);
        this.getAllSkills = this.getAllSkills.bind(this);
    }

    updateInfo(firstName,
        lastName,
        postalCode,
        city,
        state,
        country,
        about) {
        this.authService.getToken().then(
            (token) => {
                const config = {
                    headers: {
                        Authorization: token
                    }
                };
                axios.put('http://favour-trader.appspot.com/api/users/update', {
                    name: {
                        first: firstName,
                        last: lastName
                    },
                    address: {
                        postalCode: postalCode,
                        city: city,
                        state: state,
                        country: country
                    },
                    about: about
                }, config)
                    .then(res => res.data.user)
                    .then(updatedUser => this.setState({
                        firstName: updatedUser.name.first,
                        lastName: updatedUser.name.last,
                        country: updatedUser.address.country,
                        state: updatedUser.address.state,
                        city: updatedUser.address.city,
                        postalCode: updatedUser.address.postalCode,
                        about: updatedUser.about,
                        isOpen: false
                    }))
                    .catch((err) => {
                        console.log(err);
                    });
            });
    }

    getAllSkills() {
        axios.get("https://favour-trader.appspot.com/api/skills/all")
            .then(res => res.data)
            .then(categories => this.setState({
                skillCategories: categories,
                gotAllSkills: 'true'
            }))
            .catch(err => {
                console.log(err);
            })
    }


    componentWillMount() {
        this.mounted = true;
        let { userProfile } = this.props;
        this.setState({
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            country: userProfile.country,
            state: userProfile.state,
            city: userProfile.city,
            postalCode: userProfile.postalCode,
            about: userProfile.about
        });
        this.getAllSkills();
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    toggleUpdateInfoModal() {
        this.setState({ isOpen: !this.state.isOpen });
    }

    toggleAddSkillsModal() {
        this.setState({ isSkillToggleOpen: !this.state.isSkillToggleOpen });
    }

    render() {
        return (

            <View>
                <Card
                    title={this.state.firstName + ' ' + this.state.lastName}>
                    <View style={styles.avatar}>
                        <Avatar
                            large
                            rounded
                            source={{ uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg" }}
                            activeOpacity={0.7}
                        />
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ alignItems: 'flex-start' }}>
                            <Text>City: {this.state.city}</Text>
                            <Text>State: {this.state.state}</Text>
                            <Text>Country: {this.state.country}</Text>
                        </View>
                        <View style={{ alignItems: 'flex-end' }}>
                            {
                                this.props.isCurrentUser ? (
                                    <View>
                                        <Button
                                            icon={<Icon name={'info'} color={'white'} />}
                                            backgroundColor='#03A9F4'
                                            buttonStyle={styles.button}
                                            title='Update Info'
                                            accessible={true}
                                            accessibilityLabel={'updateInfo'}
                                            onPress={this.toggleUpdateInfoModal} />
                                        <Button
                                            icon={<Icon name={'add-circle'} color={'white'} />}
                                            backgroundColor='#03A9F4'
                                            buttonStyle={styles.button}
                                            title='Add Skills'
                                            accessible={true}
                                            accessibilityLabel={'addSkills'}
                                            onPress={this.toggleAddSkillsModal} />
                                    </View>
                                ) : (<View />)
                            }
                        </View>
                    </View>
                </Card>
                {
                    this.state.isOpen ?
                        (<UpdateInfoModal
                            isOpen={this.state.isOpen}
                            updateInfo={this.updateInfo}
                            toggle={this.toggleUpdateInfoModal}
                            userProfile={this.props.userProfile} />)
                        :
                        (<View />)
                }
                {
                    this.state.isSkillToggleOpen && this.state.gotAllSkills ?
                        (<AddSKillsModal
                            isOpen={this.state.isSkillToggleOpen}
                            addSkill={this.addSkill}
                            categories={this.state.skillCategories}
                            toggle={this.toggleAddSkillsModal}
                            onSubmit={this.props.updateUser}
                            userProfile={this.props.userProfile} />)
                        :
                        (<View />)
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    email: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    avatar: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    button: {
        marginTop: 10,
        borderRadius: 100,
    }

});

export default ProfileCard;