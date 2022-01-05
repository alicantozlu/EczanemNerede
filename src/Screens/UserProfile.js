//import liraries
import React, {Component, useEffect, useState} from 'react';
import auth, {firebase} from '@react-native-firebase/auth';
import {View, Text, StyleSheet} from 'react-native';
import Button_LogReg from '../Components/Button_LogReg';

// create a component
const UserProfile = ({navigation}) => {
   //const [name, setName] = useState('');
   const [email, setEmail] = useState('');

   useEffect(() => {
      firebase.auth().onAuthStateChanged(user => {
         //setName(user?.displayName ?? '');
         setEmail(user?.email ?? '');
      });
   }, []);

   const handleOnSubmit = () => {
      auth()
         .signOut()
         .then(() => {
            navigation.replace('NotRegHomePage');
         })
         .catch(error => alert(error.message));
   };

   return (
      <View style={styles.container}>
         <View
            style={{
               flex: 1,
               alignItems: 'center',
               justifyContent: 'center',
               marginTop: 20,
            }}>
            <View style={styles.avatar}>
               <Text style={styles.avatarLabel}>
                  {email
                     .split(' ')
                     .reduce((prev, current) => `${prev}${current[0]}`, '')}
               </Text>
            </View>
            <Text style={{fontSize: 20, padding: 15}}>{email}</Text>
            <Button_LogReg handleOnPress={handleOnSubmit} text="Çıkış" />
         </View>
      </View>
   );
};

// define your styles
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
   },
   avatar: {
      width: 96,
      height: 96,
      backgroundColor: '#2196f3',
      borderRadius: 50,
      alignItems: 'center',
      justifyContent: 'center',
   },
   avatarLabel: {
      fontSize: 20,
      color: 'white',
   },
});

//make this component available to the app
export default UserProfile;
