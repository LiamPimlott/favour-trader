import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Alert, Image } from 'react-native';
import AuthService from "../components/AuthService";

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
                <View style={styles.container}>
                    <Text style={styles.title} >Welcome to Favour Trader</Text>
                    <Text style={styles.intro}>Login to start trading!</Text>
                    <View>
                        <TextInput
                            placeholder="E-mail Address"
                            style={styles.input}
                            autoCapitalize={'none'}
                            onChangeText={(text) => this.setState({email: text})}
                        />
                        <TextInput
                            placeholder="Password"
                            style={styles.input}
                            secureTextEntry
                            autoCapitalize={'none'}
                            onChangeText={(text) => this.setState({password: text})}
                        />
                        <TouchableOpacity style={styles.buttonContainer}
                                          onPress = { this.submit }
                        >
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <TouchableOpacity
                    style={styles.buttonSignUp}
					onPress = { () => navigate('Signup') }
                >
                    <Text style={styles.buttonTextAcc}>No Account?</Text>
                    <Text style={styles.buttonText}>SIGN UP</Text>
                </TouchableOpacity>
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
        padding: 15,
        marginBottom: 5,
        fontSize: 20,
        borderWidth: 1,
        borderStyle: 'solid',
        borderColor: 'black',
        borderRadius: 10,
    },
    buttonContainer: {
        backgroundColor: '#6F4B9B',
        justifyContent: 'center',
        height: 75,
        width: 400,
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 20
    },
    buttonSignUp: {
        backgroundColor: 'transparent',
        justifyContent: 'center',
        height: 75,
        width: 200,
        borderRadius: 25
    },
    buttonTextAcc: {
        textAlign: 'center',
        fontSize: 15
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        textAlign: 'center',
    },
    intro: {
        fontSize: 20
    }
});