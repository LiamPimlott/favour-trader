import React, { Component } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { Button, List } from 'react-native-elements';
import FavourListItem from './FavourListItem.js';

export default class FavourList extends Component {
    constructor() {
        super();
        this.state = {
            selected: (new Map()),
        };
    }

    componentDidMount() {
        if (this.props.initialSelected.length !== 0) {
            this.setState({
                selected: this.props.initialSelected,
            });
        }
    }

    _keyExtractor = (item, index) => item._id;

    _onPressItem = (id) => {
        // updater functions are preferred for transactional updates
        this.setState((state) => {
            // copy the map rather than modifying state.
            const selected = new Map(state.selected);
            selected.set(id, !selected.get(id)); // toggle
            return { selected };
        });
    };

    _onSubmit = () => {
        this.props.onSubmit(this.state.selected);
    }

    _onCancel = () => {
        this.props.onCancel();
    }

    _renderItem = ({ item }) => (
        <FavourListItem
            id={item}
            onPressItem={this._onPressItem}
            selected={!!this.state.selected.get(item)}
            title={item.category.skill}
            subtitle={item.description}
        />
    );

    render() {
        return (
            <View>
                <Text>{this.props.title}</Text>
                <List style={styles.container}>
                    <FlatList
                        data={this.props.data}
                        extraData={this.state}
                        keyExtractor={this._keyExtractor}
                        renderItem={this._renderItem}
                    />
                </List>
                <View style={styles.buttonContainer}>
                    <Button
                        title={'← Previous'}
                        onPress={this._onCancel}
                        accessible={true}
                        accessibilityLabel={'Previous'}
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 125,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                        containerStyle={{ marginTop: 20 }}
                    />
                    <Button
                        title={'Continue →'}
                        onPress={this._onSubmit}
                        accessible={true}
                        accessibilityLabel={'Continue'}
                        buttonStyle={{
                            backgroundColor: "rgba(92, 99,216, 1)",
                            width: 125,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 5
                        }}
                        containerStyle={{ marginTop: 20 }}
                    />
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7851a9',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonContainer: {
        paddingLeft: 10,
        paddingRight: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
});