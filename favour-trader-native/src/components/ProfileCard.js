import React, {Component} from 'react';
import {StyleSheet, View, Text, } from 'react-native';
import { Card, Avatar, Button, Icon} from 'react-native-elements'

class ProfileCard extends React.Component{

    render() {
        const { name } = this.props;
        const { email } = this.props;
        return (
            <View >
                <Card
                    title={name.first + ' ' + name.last}>
                    <View style={styles.avatar}>
                        <Avatar
                            large
                            rounded
                            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                            activeOpacity={0.7}
                        />
                    </View>

                    <Text style={styles.email} >
                        {email}
                    </Text>
                    
                    
                </Card>
                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    email: {
        fontSize: 20,
        marginTop: 20,
        textAlign: 'center',
    },
    avatar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20,
        marginBottom: 20,
    },
    
});

export default ProfileCard;