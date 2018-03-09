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
							style={styles.inputSectionEnd}
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
									Alert.alert('Account Created', 'An account has been created under the email ' + this.state.email + '.  Happy Trading! :)'); 
									navigate('Login');
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
