import React from 'react';
import { Button } from 'react-native';
import HomeScreen from '../views/HomeScreen.js';
import Login from '../views/Login.js';
import Signup from '../views/Signup.js';
import { StackNavigator, DrawerNavigator } from 'react-navigation';

// Add conditional logic based on AuthService (When AuthService is merged in)

const DrawerScreens = DrawerNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null, // Login page should not show the navigation
        },
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
        },
    },
	Signup: {
        screen: Signup,
        navigationOptions: {
            title: 'Signup',
			header: null, // Signup page should not show the navigation
        },
    },
});

export default AppNavigation = new StackNavigator({
    StackScreens: {
        screen: DrawerScreens,
        navigationOptions: ({ navigation }) => {
            return ({
                headerLeft: <Button color= {'rgba(0, 0, 0, 0)'} onPress={() => navigation.navigate('DrawerToggle')} title={'☰'} />,
            });
        },
    },
});