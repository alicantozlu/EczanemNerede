import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {Text} from 'react-native';

export default function ChatScreen({navigation}) {
   const [messages, setMessages] = useState();
   const route = useRoute();
   const [uid, setUID] = useState('');
   const [name, setName] = useState('');

   console.warn(route.params.id);

   useEffect(() => {
      return firebase.auth().onAuthStateChanged(user => {
         setUID(user?.uid);
         setName(user?.displayName);
      });
   }, []);

   useEffect(() => {
      firebase
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
      <GiftedChat
         messages={messages}
         onSend={messages => onSend(messages)}
         user={{
            _id: uid,
            name: name,
         }}
      />
   );
}
