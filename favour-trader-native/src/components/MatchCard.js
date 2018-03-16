import React, {Component} from 'react';
import {StyleSheet, View, Text, } from 'react-native';
import { Card, Avatar, Button, } from 'react-native-elements'
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
                            onPress={() => console.log("Works!")}
                            activeOpacity={0.7}
                        />
                    </View>

                    <Text style={styles.email} >
                        {match.email}
                    </Text>
                    <Button
                        icon={{name: 'account-circle'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 10}}
                        title='View Profile' />
                    <Button
                        icon={{name: 'info'}}
                        backgroundColor='#03A9F4'
                        buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
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
    }

});

export default MatchCard;