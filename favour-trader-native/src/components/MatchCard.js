import React, {Component} from 'react';
import {StyleSheet, View, Text, Button, } from 'react-native';

class MatchCard extends React.Component{

    render() {
        const { match } = this.props;
        return (
            <View key={match._id} style={styles.matches}>
                <Text style={styles.email} >
                    {match.email}
                </Text>
                <Button title={'view profile'} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    matches: {
        borderColor: 'black',
        borderWidth: 0.5,
        padding: 2,
        marginBottom: 15,
        shadowColor: '#000000',
        shadowOffset: {
            width: 0,
            height: 3
        },
        shadowRadius: 5,
        shadowOpacity: 1.0
    },
    email: {
        fontSize: 15,
        marginBottom: 10
    }
});

export default MatchCard;