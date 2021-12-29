//import liraries
import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Button_LogReg from '../Components/Button_LogReg';

// create a component
const UserProfile = () => {
   const handleOnSubmit = () => {
      console.log('asd');
   };

   return (
      <View style={styles.container}>
         <Button_LogReg handleOnPress={handleOnSubmit} text="Çıkış" />
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
export default UserProfile;
