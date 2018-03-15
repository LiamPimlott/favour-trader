import React, {Component} from 'react';
import {StyleSheet, View, Picker, FlatList} from 'react-native';
import AuthService from "../components/AuthService";
import axios from 'axios';
import MatchCard from "../components/MatchCard";

export default class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            matches: '',
            matchedUsers: [],
        };
        this.authService = new AuthService();
        this.updateMatches = this.updateMatches.bind(this);
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    updateMatches = (matchFilter) => {
        if (this.authService.loggedIn() && this.mounted && matchFilter !== 'Filter the Matches') {
            this.setState({matches: matchFilter});
            const config = {
                headers: {
                    Authorization: ''
                },
                params: {
                    has: '',
                    wants: ''
                }
            };
            this.authService.getToken().then((token) => {
                config.headers.Authorization = token;
                if (this.state.matches === 'has') {
                    config.params = {
                        hasFilter: 'true',
                        wantsFilter: 'false'
                    };
                } else if (this.state.matches === 'wants') {
                    config.params = {
                        hasFilter: 'false',
                        wantsFilter: 'true'
                    };
                } else if (this.state.matches === 'perfect') {
                    config.params.has = 'true';
                    config.params.wants = 'true';
                }
                axios.get('http://favour-trader.appspot.com/api/users/matches', config)
                    .then(res => res.data.matches)
                    .then(matches => {
                        this.setState({matchedUsers: matches});
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        }

    };

    _renderItem = ({item}) => (
        <MatchCard match={item}/>
    );
    _keyExtractor = (item, index) => item._id;

    render() {
        return (
            <View style={styles.container}>
                <Picker selectedValue={this.state.matches}
                        onValueChange={this.updateMatches}
                        style={styles.picker}>
                    <Picker.Item label="Filter the Matches" value="0"/>
                    <Picker.Item label="What I Want" value="wants"/>
                    <Picker.Item label="What I Have" value="has"/>
                    <Picker.Item label="Perfect Matches" value="perfect"/>
                </Picker>

                <FlatList
                    data={this.state.matchedUsers}
                    keyExtractor={this._keyExtractor}
                    renderItem={this._renderItem}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    buttonContainer: {
        width: 400
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40
    },
    intro: {
        fontSize: 15
    },
    picker: {
        width: 200,
        borderRadius: 2,
        borderColor: 'black'
    },
});
