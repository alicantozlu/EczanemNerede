import {firebase} from '@react-native-firebase/auth';
import React, {Component, useEffect} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Contact from '../Components/Contact';

const ConstactsScreen = ({navigation}) => {
   useEffect(() => {
      firebase.fire
   }, []);

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView style={{width: '95%'}}>
            <View style={styles.containerView}>
               {chats.map((chat, index) => (
                  <React.Fragment key={index}>
                     <Contact
                        name={chat.users.find(
                           x => x !== firebase.auth().currentUser.email,
                        )}
                        subtitle="No messages yet!"
                        onPress={() => {
                           navigation.navigate('Chat');
                        }}
                     />
                     <View style={styles.seperator} />
                  </React.Fragment>
               ))}
            </View>
         </ScrollView>
      </SafeAreaView>
   );
};

const chats = [
   {
      users: ['r@a.com', 'b@b.com'],
      messages: [],
   },
   {
      users: ['a@a.com', 'b@b.com'],
      messages: [],
   },
   {
      users: ['a@a.com', 'b@b.com'],
      messages: [],
   },
];

const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
   },
   containerView: {
      width: '100%',
      height: '100%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
   },
   seperator: {
      height: StyleSheet.hairlineWidth,
      width: '100%',
      backgroundColor: 'gray',
   },
});

export default ConstactsScreen;
