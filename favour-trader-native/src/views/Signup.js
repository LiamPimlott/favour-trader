import React, {Component} from 'react';
import {
    StyleSheet,
    View,
    Text,
    TextInput,
    TouchableOpacity,
    KeyboardAvoidingView,
    Image,
    ScrollView,
    Alert
} from 'react-native';
import {StackNavigator} from 'react-navigation';
import {Input, Icon, Button, Card, Divider} from 'react-native-elements';
import AuthService from "../components/AuthService";

export default class SignUp extends React.Component {
    constructor() {
        super();
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
        };
        this.authService = new AuthService();
        this.submit = this.submit.bind(this);
    }

    submit() {
        const {navigate} = this.props.navigation;

        this.authService.signup(
            this.state.firstName,
            this.state.lastName,
            this.state.email,
            this.state.password
        )
            .then(res => {
                if (res.success && res.token) {
                    Alert.alert('Account Created', 'An account has been created under the email ' + this.state.email + '.  Happy Trading! :)');
                    navigate('Login');
                } else {
                    Alert.alert(res.message);
                }
            })
            .catch(err => {
                message.error(err.message);
            });
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Card title={"Ready to do Favour ⇋ Trading?"}>
                    <Text>We just need a bit of info to get you going..</Text>
                    <View style={styles.input}>
                        <Input
                            leftIcon={ <Icon name={'face'} /> }
                            placeholder="First Name"
                            accessible={true}
                            accessibilityLabel={'firstName'}
                            ref={(input) => this.firstNameInput = input}
                            onSubmitEditing={() => this.lastNameInput.focus()}
                            onChangeText={(firstName) => this.setState({firstName})}
                        />
                    </View>
                    <View style={styles.input}>
                        <Input
                            leftIcon={ <Icon name={'face'} /> }
                            placeholder="Last Name"
                            accessible={true}
                            accessibilityLabel={'lastName'}
                            ref={(input) => this.lastNameInput = input}
                            onChangeText={(lastName) => this.setState({lastName})}
                            onSubmitEditing={() => this.emailInput.focus()}
                        />
                    </View>
                    <View style={styles.input}>
                        <Input
                            placeholder="E-mail Address"
                            leftIcon={ <Icon name='mail-outline'/> }
                            ref={(input) => this.emailInput = input}
                            accessible={true}
                            accessibilityLabel={'emailAddress'}
                            onChangeText={(email) => this.setState({email})}
                            onSubmitEditing={() => this.passwordInput.focus()}
                        />
                    </View>
                    <View style={styles.input}>
                        <Input
                            placeholder="Password"
                            leftIcon={ <Icon name='lock-outline'/> }
                            style={styles.input}
                            secureTextEntry
                            ref={(input) => this.passwordInput = input}
                            accessible={true}
                            accessibilityLabel={'password'}
                            onChangeText={(password) => this.setState({password})}
                        />
                    </View>
                    <Button
                        backgroundColor='#03A9F4'
                        buttonStyle={styles.button}
                        accessible={true}
                        accessibilityLabel={'signup'}
                        title='Sign Up'
                        onPress={this.submit}/>
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

    buttonContainer: {
        backgroundColor: '#6F4B9B',
        justifyContent: 'center',
        height: '10%',
        marginTop: 10,
        marginBottom: 5,
        borderRadius: 20
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 25
    },
    title: {
        fontWeight: 'bold',
        fontSize: 40,
        top: '5%',
        marginBottom: 0
    },
    intro: {
        fontSize: 20,
        top: '5%',
        marginBottom: '5%'
    },
    sectionDetail: {
        fontSize: 20,
        marginBottom: '3%'
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
});
