import React, {Component} from 'react';
import {Text, StyleSheet, View, TextInput} from 'react-native';

export default class Input extends Component {
   state = {
      text: '',
   };
   render() {
      return (
         <TextInput
            {...this.props}
            style={styles.TI_Style}
            value={this.state.text}
            onChangeText={text => this.setState({text})}
            ref={this.props.inputRef}
         />
      );
   }
}

const styles = StyleSheet.create({
   TI_Style: {
      width: '100%',
      height: 38,
      borderBottomColor: 'gray',
      borderBottomWidth: 2,
      fontSize: 15,
      marginBottom: '5%',
      paddingBottom: 0,
   },
});
