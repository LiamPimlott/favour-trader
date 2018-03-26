import React from 'react';
import { Button } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import AuthService from "../components/AuthService";
import HomeScreen from '../views/HomeScreen.js';
import Login from '../views/Login.js';
import Signup from '../views/Signup.js';
import Trades from '../views/Trades.js';
import CreateTrade from '../views/CreateTrade.js';
import UserProfile from '../views/UserProfile.js';
import CurrentUserProfile from '../views/CurrentUserProfile.js';
import TradeOverview from '../views/TradeOverview.js';

const DrawerScreens = DrawerNavigator({
    Login: {
        screen: Login,
        navigationOptions: {
            header: null,
            drawerLabel: () => null,
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
                  header: null,
                  drawerLabel: () => null,
        },
    },
    Trades: {
        screen: Trades,
        navigationOptions: {
            title: 'My Trades',
        },
    },
    UserProfile: {
        screen: CurrentUserProfile,
        navigationOptions: {
            title: 'My Profile',
        },
    },
    MatchProfile: {
        screen: UserProfile,
        navigationOptions: {
            title: 'User Profile',
            drawerLabel: () => null,
        },
    },
    CreateTrade: {
        screen: CreateTrade,
        navigationOptions: {
            title: 'Create Trade',
            drawerLabel: () => null,
        },
    },
    TradeOverview: {
        screen: TradeOverview,
        navigationOptions: {
            title: 'Trade Overview',
            drawerLabel: () => null,
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
                headerLeft: <Button color={'rgba(0, 0, 0, 0)'} onPress={() => navigation.navigate('DrawerToggle')} title={'☰'} accessible={true} accessibilityLabel={'☰ navigation'}/>,
                headerRight: <Button color={'grey'} onPress={doLogout} title={'Log out'} accessible={true} accessibilityLabel={'Log out'}/>,
            }); 
        },
    },
});