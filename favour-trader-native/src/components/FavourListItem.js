import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';

export default class FavourListItem extends Component {
    _onPress = () => {
        this.props.onPressItem(this.props.id);
    };

    render() {
        const { selected } = this.props;
        const borderColor = selected ? 'blue' : 'white';
        const iconName = selected ? 'check-circle' : 'add-circle';
        const iconColour = selected ? 'green' : 'grey';
        const subtitleText = selected ? 'Tap icon to remove' : 'Tap icon to add';
        return (
            <ListItem
                hideChevron={true}
                key={this.props.id}
                title={this.props.title}
                subtitle={this.props.subtitle}
                leftIcon={{ name: iconName, color: iconColour }}
                accessible={true}
                accessibilityLabel={`${this.props.title} +' favour list'`}
                leftIconOnPress={this._onPress}
            />
        );
    }
}
