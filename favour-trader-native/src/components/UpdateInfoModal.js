import React, {Component} from 'react';
import {StyleSheet, View, Modal, KeyboardAvoidingView, Text} from 'react-native';
import {Card, Button, Input} from 'react-native-elements';

class UpdateInfoModal extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: null,
            missingFields: false
        };
    }

    componentDidMount() {
        const {isOpen, userProfile} = this.props;
        this.setState({
            isOpen: isOpen,
            firstName: userProfile.firstName,
            lastName: userProfile.lastName,
            country: userProfile.country,
            state: userProfile.state,
            city: userProfile.city,
            postalCode: userProfile.postalCode,
            about: userProfile.about
        })
    }

    update() {
        if (this.state.firstName !== '' &&
            this.state.lastName !== '' &&
            this.state.country !== '' &&
            this.state.state !== '' &&
            this.state.city !== ''
        ) {
           this.props.updateInfo(
                this.state.firstName,
                this.state.lastName,
                this.state.postalCode,
                this.state.city,
                this.state.state,
                this.state.country,
                this.state.about);
            this.props.toggle();
        } else {
            this.setState({missingFields: true});
        }
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.isOpen}
                onRequestClose={() => {
                    this.setState({isOpen: false})
                }}>
                    <Card
                        title={'Update Info'}>
                        <View style={{}}>
                            <Input
                                placeholder='First Name'
                                defaultValue={this.state.firstName}
                                onChangeText={(text) => {this.setState({firstName: text})}}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                placeholder='Last Name'
                                defaultValue={this.state.lastName}
                                onChangeText={(text) => {this.setState({lastName: text})}}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                placeholder='Country'
                                defaultValue={this.state.country}
                                onChangeText={(text) => {this.setState({country: text})}}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                placeholder='State'
                                defaultValue={this.state.state}
                                onChangeText={(text) => {this.setState({state: text})}}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                placeholder='City'
                                defaultValue={this.state.city}
                                onChangeText={(text) => {this.setState({city: text})}}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                placeholder='Postal Code'
                                defaultValue={this.state.postalCode}
                                onChangeText={(text) => {this.setState({postalCode: text})}}
                            />
                        </View>
                        <View style={styles.input}>
                            <Input
                                placeholder='About'
                                defaultValue={this.state.about}
                                onChangeText={(text) => {this.setState({about: text})}}
                            />
                        </View>
                        <View style={styles.rowAlign}>
                            <Button
                                buttonStyle={styles.submitButton}
                                title='update Info'
                                onPress={() => {
                                    this.update();
                                }}/>
                            <Button
                                buttonStyle={styles.closeButton}
                                title='Close'
                                onPress={() => {
                                    this.props.toggle();
                                }}/>
                        </View>

                        {this.state.missingFields ? (<Text>Missing Required Fields</Text>) : (<View />)}
                    </Card>
            </Modal>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    submitButton: {
        marginBottom: 15,
        marginTop: 15,
        width: 150,
    },
    closeButton: {
        marginBottom: 15,
        marginTop: 15,
        width: 150,
        backgroundColor: 'red'
    },
    input: {
        marginTop: 10,
        marginBottom: 15,
    },
    rowAlign: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
});

export default UpdateInfoModal;