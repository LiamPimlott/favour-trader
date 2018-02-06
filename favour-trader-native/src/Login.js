import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, KeyboardAvoidingView, Image } from 'react-native';
import { StackNavigator, NavigationActions } from 'react-navigation';

export default class Login extends React.Component {
	static navigationOptions = { 
		header: null
	}
	render(){
		const { navigate } = this.props.navigation;
		
		return( 

			<KeyboardAvoidingView behavior="padding" style={styles.container}>
				<Image source={require('../images/test.jpg')} style={styles.backgroundImage}></Image>
				<View style={styles.container}>   
						<Text style={styles.title} >Welcome to Favour Trader</Text>
						<Text style={styles.intro}>Login to start trading!</Text> 
					<View>
						<TextInput
							placeholder="username"
							style={styles.input}
							onSubmitEditing={() => this.passwordInput.focus()}
						/>
						
						<TextInput 
							placeholder="password" 
							style={styles.input}
							secureTextEntry
							ref={(input) => this.passwordInput = input}
						/>
						 
						<TouchableOpacity 
							style={styles.buttonContainer}
							onPress = { () => navigate('Home') }    
						>
							<Text style={styles.buttonText}>LOGIN</Text> 
						</TouchableOpacity> 
						
					
					</View> 
				</View> 
					<TouchableOpacity 
						style={styles.buttonSignUp}
						onPress = { () => navigate('SignUp') }
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
	backgroundImage: {
		position: 'absolute',
		bottom: 0        
	},
	input: { 
		backgroundColor: '#9978C2',
		padding: 20,
		marginBottom: 5,      
		fontSize: 20
	},
	buttonContainer: { 
		backgroundColor: '#6F4B9B',
		justifyContent: 'center',
		height: '20%',
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
	  fontSize: 45 
	}, 
	intro: { 
	  fontSize: 20 
	}
});