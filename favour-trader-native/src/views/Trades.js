import React, { Component } from 'react';
import { FlatList, StyleSheet, View, Picker, Text, TextInput, TouchableOpacity } from 'react-native';
import { List, ListItem } from "react-native-elements";
import { StackNavigator } from 'react-navigation';
import AuthService from '../components/AuthService.js';
import axios from 'axios';

export default class Trades extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            source: 'active',
            trades: [],
            userId: 0,
        };
        this.authService = new AuthService();
    }

    componentDidMount() {
        this.mounted = true;
        if (this.mounted) {
            this.fetchTrades();
        }
    }

    componentWillUnmount() {
        this.mounted = false;
    }

    async fetchTrades() {
        const endpoint = `http://favour-trader.appspot.com/api/contracts/${this.state.source}`;

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
                        .then(res => res.data.contracts)
                        .then(contracts => {
                            if (this.mounted) {
                                this.setState({
                                    trades: contracts,
                                    userId: profile.id,
                                });
                            }
                        })
                        .catch((err) => {
                            console.log(err);
                        });
                })
        }
    }

    setSource = (itemValue) => {
        this.setState({
            source: itemValue,
        }, this.fetchTrades);
    }

    renderSeparator = () => {
        return (
            <View
                style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                }}
            />
        );
    };

    renderTrades() {
        return (
            <FlatList
                data={this.state.trades}
                renderItem={({ item }) => (
                    <ListItem
                        roundAvatar
                        title={`${item.offeror.name.first} ⇋ ${item.offeree.name.first}`}
                        subtitle={`This trade is currently ${item.status.toLowerCase()}`}
                        accessible={true}
                        accessibilityLabel={`${item.offeror.name.first} ⇋ ${item.offeree.name.first} + ' trade'`}
                        avatar={{ uri: 'https://cdn.onlinewebfonts.com/svg/img_104784.png' }}
                        onPress={() => {
                            this.props.navigation.navigate('TradeOverview', {
                                trade: item,
                                userId: this.state.userId
                            });
                        }}
                    />
                )}
                keyExtractor={item => item._id}
                ItemSeparatorComponent={this.renderSeparator}
            />
        );
    }

    render() {
        const { trades } = this.state;
        const { navigate } = this.props.navigation;

        return (
            <View>
                <Picker selectedValue={this.state.source}
                    onValueChange={this.setSource}
                    style={styles.picker}>
                    <Picker.Item label="Active Trades" value="active" />
                    <Picker.Item label="Sent Trades" value="sent" />
                    <Picker.Item label="Received Trades" value="received" />
                    accessible={true}
                    accessibilityLabel={`${this.state.source} + ' trade picker'`}
                </Picker>
                {
                    (trades !== null && trades instanceof Array && trades.length !== 0) ? (
                        <View>
                            <List style={styles.container}>
                                {this.renderTrades()}
                            </List>
                        </View>
                    ) : (
                            <Text> {`Looks like you don't have any ${this.state.source.toLowerCase()} trades yet.`} </Text>
                        )
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7851a9',
        alignItems: 'center',
        justifyContent: 'center',
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
    }
});
