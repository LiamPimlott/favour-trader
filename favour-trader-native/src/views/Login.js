import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Image } from 'react-native';
import AuthService from "../components/AuthService";
import { Input, Icon, Button, Card, Divider } from 'react-native-elements';

export default class Login extends React.Component {
    constructor(){
        super();
        this.state = {
            failedAttempt: false,
            email: '',
            password: '',
        };
        this.authService = new AuthService();
        this.submit = this.submit.bind(this);
    }

    submit() {
        const { navigate } = this.props.navigation;
        this.authService.login(this.state.email, this.state.password)
            .then(res => {
                if (res.success && res.token) {
                    navigate('Home')
                } else {
                    this.setState({
                        failedAttempt: true,
                    });
                    if(this.state.failedAttempt){
                        this.renderErrorText(res.message);
                    }
                }
            })
            .catch(err => {
                Alert.alert('Exception', err.message);
            });
    }

    renderErrorText(message) {
        Alert.alert('Invalid Login', message);
    }

    render(){
        const { navigate } = this.props.navigation;
        return(
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Card
                    title={'Welcome to Favour ⇋ Trader'}>
                    <Text style={styles.intro}>Login to start trading!</Text>
                    <View style={styles.input}>
                        <Input
                            placeholder='E-mail Address'
                            leftIcon={
                                <Icon
                                    name='mail-outline' />
                            }
                            autoCapitalize={'none'}
                            onChangeText={(text) => this.setState({email: text})}
                        />
                    </View>
                    <View style={styles.input}>
                        <Input
                            placeholder='Password'
                            leftIcon={
                                <Icon
                                    name='lock-outline' />
                            }
                            autoCapitalize={'none'}
                            secureTextEntry={true}
                            onChangeText={(text) => this.setState({password: text})}
                        />
                    </View>

                    <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={styles.button}
                        title='Login'
                        onPress = { this.submit} />

                    <Divider style={styles.divider}/>
                    <View style={styles.footerView}>
                        <Text style={{textAlign: 'center'}}>No account?</Text>
                        <Button
                            clear={true}
                            titleStyle={{ color: "#03A9F4" }}
                            title='Sign Up'
                            onPress = { () => navigate('Signup') } />
                    </View>
                </Card>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
    },
    input: {
        marginTop: 10,
        marginBottom: 15,
    },
    button: {
        width: 300,
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 10
    },
    intro: {
        fontSize: 15,
        textAlign: 'center',
        marginBottom: 10
    },
    divider: {
        width: 300,
        backgroundColor: 'grey',
        marginTop: 15,
    },
    footerView: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    }
});