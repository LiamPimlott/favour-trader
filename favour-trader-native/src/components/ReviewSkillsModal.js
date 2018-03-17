import React, {Component} from 'react';
import {View, Text, Modal, } from 'react-native';
import { Button, List, ListItem } from 'react-native-elements'

class ReviewSkillsModal extends React.Component {
    state = {
        isOpen: null
    };

    componentDidMount() {
        const { isVisible } = this.props;
        this.setState({isOpen: isVisible})
    }

    render() {
        const { has, wants, toggle } = this.props;

        return (
            <Modal
                animationType="slide"
                transparent={false}
                visible={this.state.isOpen}
                onRequestClose={ () => {this.setState({modalVisible: false})}}>
                <View style={{marginTop: 22}}>
                    <View>
                        <Text>Has Skills</Text>
                        <List containerStyle={{marginBottom: 20}}>
                            {
                                has.map((item, i) => (
                                    <ListItem
                                        hideChevron={true}
                                        key={i}
                                        title={item.category.skill}
                                    />
                                ))
                            }
                        </List>
                        <Text>Want Skills</Text>
                        <List containerStyle={{marginBottom: 20}}>
                            {
                                wants.map((item, i) => (
                                    <ListItem
                                        key={i}
                                        hideChevron={true}
                                        title={item.category.skill}
                                    />
                                ))
                            }
                        </List>
                        <Button onPress={ () => {toggle()} } title={"Close"}>
                        </Button>
                    </View>
                </View>
            </Modal>
        )
    }
}

export default ReviewSkillsModal;