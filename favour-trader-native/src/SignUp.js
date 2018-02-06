import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image, ScrollView, Alert } from 'react-native';
import { StackNavigator } from 'react-navigation';

export default class SignUp extends React.Component {
	static navigationOptions = { 
		header: null 
	};
	render(){
		const { navigate } = this.props.navigation;
		
		return(
			<View style={styles.container}>
				
				<Image source={require('../images/test.jpg')} style={styles.backgroundImage}></Image>   
				<Text style={styles.title} >Ready to start trading?</Text>
				<Text style={styles.intro} >We just need a bit of info to get you going..</Text>  
				
				<KeyboardAvoidingView behavior="padding" style={styles.container}>
					<ScrollView style={ {top: '5%'} } contentContainerStyle={{justifyContent: 'center'}}> 
					
						<Text style={styles.sectionDetail} >Account Details</Text>					
						<TextInput
							placeholder="username"
							style={styles.input}
							ref={(input) => this.usernameInput = input}
							onChangeText={(username) => this.setState({username})}
							onSubmitEditing={() => this.passwordInput.focus()} 
						/>
						<TextInput
							placeholder="password"
							style={styles.input}
							secureTextEntry
							ref={(input) => this.passwordInput = input}
							onChangeText={(password) => this.setState({password})}
							onSubmitEditing={() => this.passwordConfirmInput.focus()} 
						/>
						<TextInput
							placeholder="confirm password"
							style={styles.inputSectionEnd}
							secureTextEntry 
							ref={(input) => this.passwordConfirmInput = input}
							onChangeText={(passwordConfirm) => this.setState({passwordConfirm})}
							onSubmitEditing={() => this.firstNameInput.focus()} 
						/>
						<Text style={styles.sectionDetail} >Personal</Text>	
						<TextInput
							placeholder="First Name" 
							style={styles.input}
							ref={(input) => this.firstNameInput = input}
							onSubmitEditing={() => this.lastNameInput.focus()} 
							onChangeText={(firstName) => this.setState({firstName})}
						/>
						<TextInput
							placeholder="Last Name" 
							style={styles.inputSectionEnd}
							ref={(input) => this.lastNameInput = input}
							onChangeText={(lastName) => this.setState({lastName})}
							onSubmitEditing={() => this.emailInput.focus()} 
						/>
						<Text style={styles.sectionDetail} >Email</Text>	
						<TextInput
							placeholder="e-mail address" 
							style={styles.input} 
							ref={(input) => this.emailInput = input}
							onChangeText={(email) => this.setState({email})}							
							onSubmitEditing={() => this.emailConfirmInput.focus()} 
						/>
						<TextInput
							placeholder="confirm e-mail address" 
							style={styles.input}
							ref={(input) => this.emailConfirmInput = input}
							onChangeText={(emailConfirm) => this.setState({emailConfirm})}
						/>
						<TouchableOpacity 
							style={styles.buttonContainer}
							onPress = { 
								() => {
								//TODO: functionality here has a/some bug(s)
								//if you never enter anything in a text field it will crash when you try to sign up
								if(this.state.password != this.state.passwordConfirm)
									Alert.alert('Sorry theres been a problem :(', 'Looks like your passwords do not match! Try entering them again.');
								else if(this.state.email != this.state.emailConfirm) 
									Alert.alert('Sorry theres been a problem :(', 'Looks like your emails do not match! Try entering them again.'); 
								else
								{ 
									Alert.alert('Account Created', 'An account has been created under the name ' + this.state.username + '.  Happy Trading! :)'); 
									navigate('Login');
								}
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
	backgroundImage: {
		position: 'absolute',
		bottom: 0        
	},
	buttonContainer: { 
		backgroundColor: '#6F4B9B',
		justifyContent: 'center',
		height: '8%',
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
		backgroundColor: '#9978C2',
		padding: 20,
		marginBottom: 5,      
		fontSize: 20,
		width: 400
	},
	inputSectionEnd: { 
		backgroundColor: '#9978C2',
		padding: 20,
		marginBottom: 20,      
		fontSize: 20,
		width: 400
	},
  
});
