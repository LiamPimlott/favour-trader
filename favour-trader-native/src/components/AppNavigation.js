import React from 'react';
import { Button } from 'react-native';
import HomeScreen from '../views/HomeScreen.js';
import Login from '../views/Login.js';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import AuthService from "../components/AuthService";   

const DrawerScreens = DrawerNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null, // Login page should not show the navigation
            drawerLabel: () => null,
        },
    },
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            title: 'Home',
        },
    },
});

export default AppNavigation = new StackNavigator({
    StackScreens: {
        screen: DrawerScreens,
        navigationOptions: ({ navigation }) => {
            const doLogout =  () => {
                let authService = new AuthService();
                if (authService.loggedIn()) {
                    authService.logout();
                    navigation.navigate('Login');
                }
            };
            return ({
                headerLeft: <Button color={'rgba(0, 0, 0, 0)'} onPress={() => navigation.navigate('DrawerToggle')} title={'☰'} />,
                headerRight: <Button color={'grey'} onPress={doLogout} title={'Log out'} />,
            }); 
        },
    },
});