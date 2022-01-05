import {firebase} from '@react-native-firebase/auth';
import React, {Component, useEffect, useState} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {ScrollView, TouchableOpacity} from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Contact from '../Components/Contact';
import firestore from '@react-native-firebase/firestore';

const ConstactsScreen = ({navigation}) => {
   const [chats, setChats] = useState([]);

   useEffect(() => {
      return firebase
         .firestore()
         .collection('chats')
         .where('users', 'array-contains', firebase.auth().currentUser.email)
         .onSnapshot(querySnapshot => {
            setChats(querySnapshot.docs);
         });
   }, [firebase.auth().currentUser.email]);

   return (
      <SafeAreaView style={styles.container}>
         <ScrollView style={{width: '95%'}}>
            <View style={styles.containerView}>
               {chats.map(chat => (
                  <React.Fragment key={chat.id}>
                     <Contact
                        name={chat
                           .data()
                           .users.find(
                              x => x !== firebase.auth().currentUser.email,
                           )}
                        subtitle="No messages yet!"
                        onPress={() => {
                           navigation.navigate('Chat', {id: chat.id});
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
