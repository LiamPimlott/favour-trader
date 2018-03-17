import React, {Component} from 'react';
import AppNavigation from './AppNavigation.js';
import {AppRegistry} from 'react-native';

export default class Drawer extends Component {
  render () {
    return (
      <AppNavigation/>
    );
  }
}

AppRegistry.registerComponent('Drawer', () => Drawer);