import React, { Component } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from '../components/Drawer.js';

export default class HomeScreen extends React.Component {
	render(){
		const { navigate } = this.props.navigation;
		return(
			<View style={styles.container}>
				<Text>
					Home screen!
				</Text>
			</View>
		);
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
