import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Button from '../Components/Button';

export default function Nav({navigation}) {
   const [city, setCity] = useState('');
   useEffect(() => {
      setCity('--------------- Ana Sayfa ---------------');
   }, []);
   return (
      <View>
         <Text>{city}</Text>
         <Pressable
            onPress={() => {
               navigation.navigate('NotRegHomePage');
            }}>
            <Text>NotRegHomePage</Text>
         </Pressable>

         <Text>------</Text>

         <Pressable
            onPress={() => {
               navigation.navigate('NotRegMapScreen');
            }}>
            <Text>NotRegMapScreen</Text>
         </Pressable>

         <Pressable
            onPress={() => {
               navigation.navigate('Registration');
            }}>
            <Text>Registration</Text>
         </Pressable>

         <Pressable
            onPress={() => {
               navigation.navigate('Login');
            }}>
            <Text>Login</Text>
         </Pressable>
         <Text>-----------------------------</Text>

         <Button title={'Google Maps'} />

         <Pressable
            onPress={() => {
               navigation.navigate('RegPharmacy');
            }}>
            <Text>Kayıtlı Eczaneler</Text>
         </Pressable>
         <Text>---------------</Text>

         <Pressable
            onPress={() => {
               navigation.navigate('Chat');
            }}>
            <Text>Mesajlaşma Ekranı</Text>
         </Pressable>
      </View>
   );
}

const styles = StyleSheet.create({});
