import React, { Component } from 'react';
import { AppRegistry, SectionList, Image, StyleSheet, View, Text, TextInput, TouchableOpacity } from 'react-native';
import { StackNavigator } from 'react-navigation';
import Drawer from '../components/Drawer.js';
import AuthService from "../components/AuthService";
import axios from 'axios';
import ProfileCard from "../components/ProfileCard";
import ProfileSkills from "../components/ProfileSkills.js";
import UserProfile from './UserProfile.js';

export default class CurrentUserProfile extends UserProfile {
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
});

