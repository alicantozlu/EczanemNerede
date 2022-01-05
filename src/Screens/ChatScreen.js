import React, {useState, useCallback, useEffect} from 'react';
import {GiftedChat} from 'react-native-gifted-chat';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import {useRoute} from '@react-navigation/native';
import {Text} from 'react-native';

export default function ChatScreen({navigation}) {
   const [messages, setMessages] = useState([]);

   const route = useRoute();
   console.warn(route.params.id);

   return <Text>Hi!</Text>;
}
