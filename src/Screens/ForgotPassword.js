import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

export default function ForgotPassword({navigation}) {
  return (
    <View style={styles.container}>
      <Text>Unutmasaydın.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
