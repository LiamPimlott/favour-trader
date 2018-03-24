import React, {Component} from 'react';
import {StyleSheet, View, Text, } from 'react-native';
import { Card, Avatar, Button, Icon} from 'react-native-elements'
import ReviewSkillsModal from "./ReviewSkillsModal";
class MatchCard extends React.Component{
    state = {
        modalVisible: false,
    };

    setModalVisible() {
        this.setState({modalVisible: !this.state.modalVisible});
    }

    render() {
        const { match } = this.props;
        return (
            <View key={match._id}>
                <Card
                    title={match.name.first + ' ' + match.name.last}>
                    <View style={styles.avatar}>
                        <Avatar
                            large
                            rounded
                            source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg"}}
                            activeOpacity={0.7}
                        />
                    </View>

                    <Text style={styles.email} >
                        {match.email}
                    </Text>
                    <Button
                        icon={<Icon name={'account-circle'} color={'white'} />}
                        backgroundColor='#03A9F4'
                        buttonStyle={styles.button}
                        title='View Profile' 
                        onPress = {this.props.passUserID.bind(this,match._id)}/>
                    <Button
                        icon={<Icon name={'info'} color={'white'} />}
                        backgroundColor='#03A9F4'
                        buttonStyle={styles.button}
                        title='Review Skills'
                        onPress={() => {
                            this.setModalVisible(!this.state.modalVisible, match.has, match.wants);
                        }}
                    />
                </Card>
                {
                    (this.state.modalVisible) ? (
                        <ReviewSkillsModal toggle={this.setModalVisible.bind(this)} isVisible={this.state.modalVisible} has={match.has} wants={match.wants}/>
                    ) : (<View />)
                }
            </View>
        )
    }
}

const styles = StyleSheet.create({
    email: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
    avatar: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        borderRadius: 0,
        marginLeft: 0,
        marginRight: 0,
        marginBottom: 10,
        width: 300
    }
});

export default MatchCard;