//import liraries
import React, {Component} from 'react';
import {
   View,
   Text,
   StyleSheet,
   Pressable,
   TouchableOpacity,
} from 'react-native';

// create a component
const RegHomePage = ({navigation}) => {
   return (
      <View style={styles.container}>
         <TouchableOpacity
            style={styles.TO_Styles}
            onPress={() => {
               navigation.navigate('RegPharmacy');
            }}>
            <Text style={styles.TO_textStyles}>Yakındaki Eczaneler</Text>
         </TouchableOpacity>

         <TouchableOpacity
            style={styles.TO_Styles}
            onPress={() => {
               navigation.navigate('ContactsScreen'); //
            }}>
            <Text style={styles.TO_textStyles}>Mesajlara Git</Text>
         </TouchableOpacity>

         <TouchableOpacity
            style={styles.TO_Styles}
            onPress={() => {
               navigation.navigate('UserProfile');
            }}>
            <Text style={styles.TO_textStyles}>Profil</Text>
         </TouchableOpacity>
      </View>
   );
};

// define your styles
const styles = StyleSheet.create({
   container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
   },
   TO_Styles: {
      alignItems: 'center',
      marginVertical: 10,
      width: 250,
      padding: 20,
      backgroundColor: 'red',
      borderRadius: 8,
   },
   TO_textStyles: {
      fontWeight: 'bold',
      color: '#fff',
      fontSize: 18,
      textAlign: 'center',
   },
});

//make this component available to the app
export default RegHomePage;
