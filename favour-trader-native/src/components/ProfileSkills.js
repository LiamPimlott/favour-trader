import React, { Component } from 'react';
import { View, StyleSheet, Text, FlatList } from 'react-native';
import { List, ListItem, ButtonGroup } from 'react-native-elements'; // 0.17.0

import "@expo/vector-icons"; // 5.2.0

export default class ProfileSkills extends Component {
  state = {
    index: 0
  }

  updateIndex = (index) => {
    this.setState({ index })
  }
  renderSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderList() {
    const { has } = this.props;
    const { wants } = this.props;
    const list = [
      {
        title: 'Appointments',
        icon: 'av-timer'
      },
      {
        title: 'Trips',
        icon: 'flight-takeoff'
      },
    ]
    if (this.props.has && this.props.wants) {
      if (this.state.index == 0) {
        return (
          has.map((item, i) => (
            <ListItem
              hideChevron={true}
              key={i}
              title={item.category.skill}
            />
          ))
        );
      }
      if (this.state.index == 1) {
        return (
          wants.map((item, i) => (
            <ListItem
              hideChevron={true}
              key={i}
              title={item.category.skill}
            />
          ))
        );

      }
    }
  }

  render() {
    return (
      <View >
        <ButtonGroup
          selectedBackgroundColor="pink"
          onPress={this.updateIndex}
          selectedIndex={this.state.index}
          buttons={['Has', 'Wants']}
          containerStyle={{ height: 30 }} />
        <View >
          <List >
            {this.renderList()}
          </List>
        </View>
      </View>

    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    justifyContent: 'center',
  },

});