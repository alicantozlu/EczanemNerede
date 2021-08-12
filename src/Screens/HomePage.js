import React, {useEffect, useState} from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import Button from '../Components/Button';

export default function HomePage({navigation}) {
  const [city, setCity] = useState('');
  useEffect(() => {
    setCity('Ana Sayfa');
  }, []);
  return (
    <View>
      <Text>{city}</Text>
      <Button title={'Google Maps'} />
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
      <Pressable
        onPress={() => {
          navigation.navigate('RegPharmacy');
        }}>
        <Text>Kayıtlı Eczaneler</Text>
      </Pressable>
      <Pressable
        onPress={() => {
          navigation.navigate('ForgotPas');
        }}>
        <Text>Şifremi Unuttum</Text>
      </Pressable>
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
