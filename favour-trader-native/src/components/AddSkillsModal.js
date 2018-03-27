import React, { Component } from 'react';
import { StyleSheet, View, Modal, KeyboardAvoidingView, Switch, Text } from 'react-native';
import { Card, Button, Icon, Input, ListItem } from 'react-native-elements';

class AddSKillsModal extends React.Component {
    constructor() {
        super();
        this.state = {
            isOpen: null,
            missingFields: false,
            addToHas: false,
            selectedSkill: -1,
        };
        this.renderAllSkills = this.renderAllSkills.bind(this);
    }

    toggleSelection(id) {
        if (this.state.selectedSkill._id === id) {
            this.setState({
                selectedSkill: -1,
            });
        } else {
            this.setState({
                selectedSkill: id,
            });
        }
    }

    renderAllSkills() {
        const { selectedSkill } = this.state;
        const toggle = () => this.toggleSelection;
        return (
            this.props.categories.map((item) => {
                const selected = selectedSkill === item._id;
                return (
                    <ListItem
                        containerStyle={{ backgroundColor: selected ? '#2089dc' : 'white'}}
                        hideChevron={true}
                        leftIcon={<Text>⇌</Text>}
                        key={item._id}
                        title={item.skill}
                        accessible={true}
                        accessibilityLabel={`${item.skill}+ ' skill'`}
                        onPress={() => {
                            this.toggleSelection.call(this, item._id)
                        }}
                    />
                )
            })
        );
    }

    save = () => {
        if (this.selectedSkill !== -1) {
            const skillsType = this.state.addToHas ? 'has' : 'wants';
            this.props.onSubmit(skillsType, [{"category": this.state.selectedSkill}]);
        }
        this.props.toggle();
    }

    close = () => {
        this.props.toggle();
    }

    render() {
        return (
            <KeyboardAvoidingView behavior="padding">
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={this.state.isOpen}
                    onRequestClose={() => {
                        this.setState({ isOpen: false })
                    }}>
                    <View style={styles.textSwitchContainer}>
                        <Text style={styles.category}> {this.state.addToHas ? ('Add skills I have:') : ('Add skills I am looking for: ')}</Text>
                        <Switch value={this.state.addToHas} style={styles.switch}
                            onValueChange={() =>
                                this.setState({
                                    addToHas: !this.state.addToHas,
                                })} />
                    </View>
                    {
                        this.renderAllSkills()
                    }
                    <View style={styles.textSwitchContainer}>
                        <Button
                            title={"Save Skills"}
                            onPress={this.save}
                            buttonStyle={styles.submitButton}
                            accessible={true}
                            accessibilityLabel={'Save Skills'}
                        />
                        <Button
                            title={"Close"}
                            onPress={this.close}
                            buttonStyle={styles.closeButton}
                            accessible={true}
                            accessibilityLabel={'Close'}
                        />
                    </View>
                </Modal>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    textSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    category: {
        fontSize: 20,
    },
    switch: {
        transform: [{ scaleX: 1.0 }, { scaleY: 1.0}]
    },
    closeButton: {
        marginBottom: 15,
        marginTop: 15,
        width: 150,
        backgroundColor: 'red'
    },
    submitButton: {
        marginBottom: 15,
        marginTop: 15,
        width: 150,
    }
});

export default AddSKillsModal;