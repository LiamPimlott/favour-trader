import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';
import AuthService from "../components/AuthService";

export default class SignUp extends React.Component {
	constructor(){
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
		const { navigate } = this.props.navigation;

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
	 
	render(){
		return(
			<View style={styles.container}>
				<Text style={styles.title} >Ready to start trading?</Text>
				<Text style={styles.intro} >We just need a bit of info to get you going..</Text>  

				<KeyboardAvoidingView behavior="padding" style={styles.container}>
					<ScrollView style={ {top: '20%'} } contentContainerStyle={{justifyContent: 'center'}}> 
						<TextInput
							placeholder="First Name" 
							style={styles.input}
							ref={(input) => this.firstNameInput = input}
							onSubmitEditing={() => this.lastNameInput.focus()} 
							onChangeText={(firstName) => this.setState({firstName})}
						/>
						<TextInput
							placeholder="Last Name" 
							style={styles.input}
							ref={(input) => this.lastNameInput = input}
							onChangeText={(lastName) => this.setState({lastName})}
							onSubmitEditing={() => this.emailInput.focus()} 
						/>
						<TextInput
							placeholder="e-mail address" 
							style={styles.input} 
							ref={(input) => this.emailInput = input}
							onChangeText={(email) => this.setState({email})}							
							onSubmitEditing={() => this.passwordInput.focus()} 
						/>
						<TextInput
							placeholder="Password"
							style={styles.input}
							secureTextEntry
							ref={(input) => this.passwordInput = input}
							onChangeText={(password) => this.setState({password})}
						/>
						<TouchableOpacity 
							style={styles.buttonContainer}
							onPress = { 
								() => {
									this.submit();
								}
							}  
						>
						<Text style={styles.buttonText}>SIGN UP</Text> 
						</TouchableOpacity>						
					</ScrollView>       
				</KeyboardAvoidingView>
			</View> 
		);
	}
}

const styles = StyleSheet.create({
	container: {  
		flex: 1,
		backgroundColor: 'transparent',
		alignItems: 'center'
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
		padding: 15,
        marginBottom: 5,
        fontSize: 20,
        borderWidth: 1,
        borderStyle: 'solid',
		width: 400,
        borderColor: 'black',
        borderRadius: 10,
	},
});
