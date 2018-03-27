import React, {Component} from 'react';
import {FlatList, StyleSheet, View, Picker, Text, Modal, TouchableOpacity} from 'react-native';
import {Divider, Button, Card, Icon, ListItem} from 'react-native-elements'
import AuthService from "../components/AuthService";
import axios from 'axios';
import MatchCard from "../components/MatchCard";


class HomeScreen extends React.Component {
    constructor() {
        super();
        this.state = {
            matches: 'Select Filter',
            matchedUsers: null,
            profileID: '',
            matchFound: false,
            toggleFilter: false,
            filters: ['wants', 'has', 'perfect'],
        };
        this.authService = new AuthService();
        this.updateMatches = this.updateMatches.bind(this);
        this.passUserID = this.passUserID.bind(this);
        this.updateFilter = this.updateFilter.bind(this);
        this.toggleFilterMenu = this.toggleFilterMenu.bind(this);
        this.renderFilters = this.renderFilters.bind(this);

    }

    passUserID(match) {
        this.props.navigation.navigate('MatchProfile', {profileID: match._id});
    }

    componentDidMount() {
        this.mounted = true;
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    updateFilter(filter) {
        this.updateMatches(filter);
        this.toggleFilterMenu();
    }

    toggleFilterMenu() {
        this.setState({toggleFilter: !this.state.toggleFilter});
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
                    .then(() => {
                        if (typeof(this.state.matchedUsers) !== 'undefined') {
                            this.setState({matchFound: true})
                        } else {
                            this.setState({matchFound: false});
                        }
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            });
        }

    };

    renderFilters() {
        return (
        this.state.filters.map((item, i) => (
            <ListItem
                key={i}
                title={item}
                onPress={() => { this.updateFilter(item) }}
            />
        )
        )
        )
    }

    _renderItem = ({item}) => (
        <MatchCard match={item} userId={item._id} passUserID={this.passUserID.bind(this, item)}/>
    );
    _keyExtractor = (item, index) => item._id;

    render() {
        return (
            <View style={styles.container}>
                <Button title={this.state.matches} onPress={this.toggleFilterMenu} buttonStyle={styles.button}/>
                {
                    this.state.toggleFilter ? (
                        <Modal
                            animationType="slide"
                            transparent={false}
                            visible={this.state.toggleFilter}
                            onRequestClose={() => {
                                this.setState({toggleFilter: false})
                            }}>
                            <Card title='Tap on one the options to filter matches?'>
                                { this.renderFilters() }
                                <Button
                                    style={{marginTop: '20'}}
                                    title={"Close"}
                                    buttonStyle={styles.button}
                                    onPress={() => {
                                        this.setState({toggleFilter: false})
                                    }}
                                />
                            </Card>
                        </Modal>
                    ) : (<View/>)
                }

                <Divider style={styles.divider}/>
                {
                    this.state.matchFound ? (
                        <FlatList
                            data={this.state.matchedUsers}
                            keyExtractor={this._keyExtractor}
                            renderItem={this._renderItem}
                        />
                    ) : (<Text>No matches found or Update selection from picker!</Text>)
                }
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    picker: {
        width: 300,
    },
    divider: {
        height: 1,
        width: 300,
        backgroundColor: 'grey'
    },
    button: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginTop: 10,
        marginBottom: 10,
        width: 300
    }
});

export default HomeScreen;