import React, {Component} from 'react';
import {View, StyleSheet, SafeAreaView} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/Ionicons';
import Contact from '../Components/Contact';

const ConstactsScreen = () => {
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.containerView}>
            <Contact
               name="Ali Can Tozlu"
               subtitle="Hi, I am waiting you over dinner!"
               onPress={() => {
                  alert('Hi');
               }}
            />
            <View style={styles.seperator} />
         </View>
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
      width: '95%',
      height: '93%',
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
