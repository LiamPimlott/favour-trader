import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { Button } from 'react-native-elements';

export default class FavourMessageInput extends Component {
    constructor() {
        super();
        this.state = {
            message: '',
        };
    }

    _onSubmit = () => {
        this.props.onSubmit(this.props.message);
    }

    _onCancel = () => {
        this.props.onCancel();
    }

    _onChangeText = (message) => {
        this.setState({ message });
        this.props.onChangeText(message);
    }

    render() {
        return (
            <View style={styles.columnContainer}>
                <Text>{this.props.title}</Text>
                <View style={styles.textContainer}>
                    <TextInput
                        placeholder={'Enter your message here'}
                        multiline={true}
                        numberOfLines={5}
                        onChangeText={(message) => this._onChangeText(message)}
                        value={this.props.message}
                        accessible={true}
                        accessibilityLabel={'enterMessage'}
                        style={{
                            height: 400,
                            width: 310,
                            borderWidth: 1,
                            borderColor: 'black',
                            borderRadius: 2,
                            textAlignVertical: 'top',
                            marginTop: 10,
                        }}
                    />
                </View>
                <View style={styles.container}>
                    <Button
                        title={'← Offered Favours'}
                        onPress={this._onCancel}
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 125,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                        accessible={true}
                        accessibilityLabel={'Offered Favours'}
                        containerStyle={{ marginTop: 20 }}
                    />
                    <Button
                        title={'Request Trade'}
                        onPress={this._onSubmit}
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 125,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                        accessible={true}
                        accessibilityLabel={'Request Trade'}
                        containerStyle={{ marginTop: 20 }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    textContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    columnContainer: {
        flexDirection: 'column',
    }
});
