import React, {Component} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Icon2 from 'react-native-vector-icons/Ionicons';

// create a component
const Contact = ({name, subtitle, onPress}) => {
   return (
      <TouchableOpacity style={styles.row} onPress={onPress}>
         <View style={styles.avatar}>
            <Text style={styles.avatarLabel}>
               {name
                  .split(' ')
                  .reduce((prev, current) => `${prev}${current[0]}`, '')}
            </Text>
         </View>
         <View style={styles.textContainer}>
            <Text style={styles.name}>{name}</Text>
            <Text style={styles.subtitle}>{subtitle}</Text>
         </View>
         <View style={styles.spaceView} />
         <Icon2 name="play" size={30} color="#2196f3" />
      </TouchableOpacity>
   );
};

// define your styles
const styles = StyleSheet.create({
   row: {
      flexDirection: 'row',
      paddingVertical: 20,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
   },
   avatar: {
      width: 56,
      height: 56,
      backgroundColor: '#2196f3',
      borderRadius: 30,
      alignItems: 'center',
      justifyContent: 'center',
   },
   avatarLabel: {
      fontSize: 20,
      color: 'white',
   },
   textContainer: {
      paddingLeft: 10,
   },
   spaceView: {
      flex: 1,
   },
   subtitle: {
      marginTop: 2,
      color: '#565656',
   },
});

//make this component available to the app
export default Contact;
