import React, {Component} from 'react';
import {Text, StyleSheet, View, TouchableOpacity} from 'react-native';

export default class Button_LogReg extends Component {
  render() {
    const {text} = this.props;
    return (
      <TouchableOpacity style={styles.TO_Button}>
        <Text style={styles.T_Button}>{text}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  TO_Button: {
    padding: 20,
    backgroundColor: 'red',
    borderRadius: 8,
  },
  T_Button: {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center',
  },
});
