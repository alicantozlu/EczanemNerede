//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import { signOut } from '../../utils/auth';
// create a component
const Reg_HomePage = () => {
   return (
      <View style={styles.container}>
         <Text>Reg_HomePage</Text>

         <Text>---------------</Text>

         <Text onPress={signOut}>Log Out</Text>
      </View>
   );
};

// define your styles
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#2c3e50',
   },
});

//make this component available to the app
export default Reg_HomePage;
