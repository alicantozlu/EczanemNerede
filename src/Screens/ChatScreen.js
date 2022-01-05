import {useRoute} from '@react-navigation/core';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import {firebase} from '@react-native-firebase/auth';
import {GiftedChat} from 'react-native-gifted-chat';

const ChatScreen = ({navigation}) => {
   const route = useRoute();

   const [messages, setMessages] = useState([]);

   const [uid, setUID] = useState('');
   const [name, setName] = useState('');

   useEffect(() => {
      return firebase.auth().onAuthStateChanged(user => {
         setUID(user?.uid);
         setName(user?.displayName);
      });
   }, []);

   useEffect(() => {
      return firebase
         .firestore()
         .doc('chats/' + route.params.id)
         .onSnapshot(snapshot => {
            setMessages(snapshot.data()?.messages ?? []);
         });
   }, [route.params.id]);

   const onSend = (m = []) => {
      firebase
         .firestore()
         .doc('chats/' + route.params.id)
         .set(
            {
               messages: GiftedChat.append(messages, m),
            },
            {merge: true},
         );
   };

   return (
      <View style={{flex: 1, backgroundColor: 'white'}}>
         <GiftedChat
            messages={messages.map(x => ({
               ...x,
               createdAt: x.createdAt?.toDate(),
            }))}
            onSend={messages => onSend(messages)}
            user={{
               _id: uid,
               name: name,
            }}
         />
      </View>
   );
};

export default ChatScreen;
