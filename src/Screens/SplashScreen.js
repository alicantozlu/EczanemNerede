import React, {useState, useEffect} from 'react';
import {
   StyleSheet,
   View,
   Text,
   StatusBar,
   SafeAreaView,
   Image,
} from 'react-native';

const SplashScreen = ({navigation}) => {
   useEffect(() => {
      setTimeout(() => {
         navigation.replace('NotRegHomePage'); // NotRegHomePage Nav
      }, 5000);
   });

   const styles = {
      container: {
         flex: 1,
         justifyContent: 'center',
         alignContent: 'center',
         backgroundColor: '#fff',
      },
      V_Logo: {justifyContent: 'center', alignContent: 'center', padding: 20},
      I_Logo: {
         width: '100%',
         height: '80%',
      },
   };
   return (
      <SafeAreaView style={styles.container}>
         <View style={styles.V_Logo}>
            <Image
               style={styles.I_Logo}
               resizeMode="contain"
               source={require('../Images/LES.png')}
            />
         </View>
      </SafeAreaView>
   );
};

export default SplashScreen;
