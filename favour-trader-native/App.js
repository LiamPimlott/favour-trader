import React, { Component } from 'react';
import { StyleSheet, Text, View, Button, Alert, KeyboardAvoidingView } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from './src/components/Drawer.js';

export default class App extends React.Component {
  render() {
    return (
		<Drawer />
    );
  }
}

const styles = StyleSheet.create({

});
