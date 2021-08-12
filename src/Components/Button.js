import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';

export default function Button({title}) {
  const navigation = useNavigation();

  const onPress = () => {
    navigation.navigate('Maps');
  };

  return (
    <Pressable onPress={() => onPress()}>
      <Text>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({});
