import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';

import HomeScreen from './src/HomeScreen';   
import Login from './src/Login';
import SignUp from './src/SignUp'; 

const NavigationApp = StackNavigator({
	Login: { screen: Login },
	Home: { screen: HomeScreen },
	SignUp: { screen: SignUp }
 	},
	{
		headerMode: 'screen'
	}
);

export default class App extends React.Component {
  render() {
    return (
		<NavigationApp />
    ); 
  }
}

const styles = StyleSheet.create({

});
