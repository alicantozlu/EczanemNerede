import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Button from '../Components/Button';

export default function Nav({navigation}) {
   const [city, setCity] = useState('');
   useEffect(() => {
      setCity('Ana Sayfa');
   }, []);
   return (
      <View>
         <Text>{city}</Text>
         <Pressable
            style={styles.st}
            onPress={() => {
               navigation.navigate('NotRegHomePage');
            }}>
            <Text>NotRegHomePage</Text>
         </Pressable>

         <Pressable
            style={styles.st}
            onPress={() => {
               navigation.navigate('NotRegMapScreen');
            }}>
            <Text>NotRegMapScreen</Text>
         </Pressable>

         <Pressable
            style={styles.st}
            onPress={() => {
               navigation.navigate('Login');
            }}>
            <Text>Login</Text>
         </Pressable>

         <Pressable
            style={styles.st}
            onPress={() => {
               navigation.navigate('Registration');
            }}>
            <Text>Registration</Text>
         </Pressable>

         <Pressable
            style={styles.st}
            onPress={() => {
               navigation.navigate('SplashScreen');
            }}>
            <Text>SplashScreen</Text>
         </Pressable>

         <Pressable
            style={styles.st}
            onPress={() => {
               navigation.navigate('RegHomePage');
            }}>
            <Text>RegHomePage</Text>
         </Pressable>

         <Pressable
            style={styles.st}
            onPress={() => {
               navigation.navigate('RegPharmacy');
            }}>
            <Text>Kayıtlı Eczaneler</Text>
         </Pressable>

         <Pressable
            style={styles.st}
            onPress={() => {
               navigation.navigate('Mesajlar');
            }}>
            <Text>ContactsScreen</Text>
         </Pressable>

         <Pressable
            style={styles.st}
            onPress={() => {
               navigation.navigate('Chat');
            }}>
            <Text>Mesajlaşma Ekranı</Text>
         </Pressable>

         <Pressable
            style={styles.st}
            onPress={() => {
               navigation.navigate('UserProfile');
            }}>
            <Text>UserProfile</Text>
         </Pressable>
      </View>
   );
}

const styles = StyleSheet.create({
   st: {
      width: 200,
      height: 40,
      backgroundColor: '#ddd',
      marginTop: 15,
   },
});
