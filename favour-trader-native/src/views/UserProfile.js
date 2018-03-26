import React, { Component } from 'react';
import { AppRegistry, SectionList, Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Button, Icon } from 'react-native-elements'
import Drawer from '../components/Drawer.js';
import AuthService from "../components/AuthService";
import axios from 'axios';
import ProfileCard from "../components/ProfileCard";
import ProfileSkills from "../components/ProfileSkills.js";

export default class UserProfile extends React.Component {
    // Create new component that extends this
    constructor() {
        super();
        this.state = {
            profileId: '',
            isCurrentUser: false,
            userProfile: '',
            overview: {
                firstName: '',
                lastName: '',
                country: '',
                state: '',
                city: '',
                postalCode: '',
                about: '',
                gotData: ''
            },
            name: {
                first: '',
                last: '',
            },
            email: '',
            has: [],
            want: [],
            loaded: false
        }
        this.authService = new AuthService();
    }

    componentDidMount() {
        this.mounted = true;
        this.getProfileId();
    }

    componentWillUnmount() {
        this.mounted = false;
        this.setState({ profileId: '' });
        if (this.props.navigation.state.params !== undefined &&
            this.props.navigation.state.params !== null &&
            this.props.navigation.state.params.profileID !== null) {
            this.props.navigation.state.params.profileID = '';
        }
    }

    async getProfileId() {
        if (this.props.navigation.state.params && this.props.navigation.state.params !== undefined && this.props.navigation.state.params.profileID) {
            this.setState({
                profileId: this.props.navigation.state.params.profileID,
                isCurrentUser: false,
            }, this.fetchProfile);
        } else {
            const profile = await this.authService.getProfile();
            this.setState({
                profileId: profile.id,
                isCurrentUser: true,
            }, this.fetchProfile);
        }
    }


    async fetchProfile() {
        const { profileId } = this.state;
        let endpoint = `http://favour-trader-test.appspot.com/api/users/${profileId}/profile/`;
        if (this.authService.loggedIn() && this.mounted) {
            const profile = await this.authService.getProfile();
            this.authService.getToken()
                .then(token => {
                    const config = {
                        headers: {
                            Authorization: token,
                        },
                    };

                    axios.get(endpoint, config)
                        .then(res => res.data)
                        .then(profileInfo => {
                            if (this.mounted) {
                                this.setState({
                                    userProfile: profileInfo.user,
                                    overview: {
                                        firstName: profileInfo.user.name.first,
                                        lastName: profileInfo.user.name.last,
                                        country: profileInfo.user.address.country,
                                        state: profileInfo.user.address.state,
                                        city: profileInfo.user.address.city,
                                        postalCode: profileInfo.user.address.postalCode,
                                        about: profileInfo.user.about,
                                        gotData: 'yes',

                                    },
                                    has: profileInfo.user.has,
                                    wants: profileInfo.user.wants,
                                    loaded: true
                                })
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
        }
    }

    handleNewSkillSave = (skillsType, newSkill) => {
        this.fetchProfile().then(() => {
            const body = {};
            skillsType === 'has' ? body.has = newSkill.concat(this.state.has) : body.wants = newSkill.concat(this.state.wants);
            this.authService.getToken().then(
                (token) => {
                    const config = {
                        headers: {
                            Authorization: token
                        }
                    };
                    axios.put('http://favour-trader-test.appspot.com/api/users/update', body, config)
                        .then((res) => {
                            this.setState({
                                has: res.data.user.has,
                                wants: res.data.user.wants
                            });
                        })
                }
            )
        })


    }

    render() {
        const { navigate } = this.props.navigation;
        return (
            this.state.loaded ? (
                <View>
                    <ProfileCard updateUser={this.handleNewSkillSave}
                        isCurrentUser={this.state.isCurrentUser}
                        userProfile={this.state.overview} />
                    < ProfileSkills isCurrentUser={this.state.isCurrentUser}  has={this.state.has} wants={this.state.wants} />
                    {
                        this.state.isCurrentUser ? (
                            <View></View>
                        ) : (
                                <Button
                                    icon={<Text style={{ color: 'white' }}>⇌</Text>}
                                    backgroundColor='#03A9F4'
                                    buttonStyle={styles.button}
                                    title='Offer Trade'
                                    accessible={true}
                                    accessibilityLabel={'offerTrade'}
                                    onPress={() => {
                                        navigate('CreateTrade', {
                                            requestableFavours: this.state.has,
                                            recipientFirstName: this.state.overview.firstName,
                                            recipientLastName: this.state.overview.lastName,
                                            recipientId: this.state.profileId,
                                        })
                                    }} />

                            )
                    }
                </View>) : (<View />)

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    button: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        width: 300
    }
});

