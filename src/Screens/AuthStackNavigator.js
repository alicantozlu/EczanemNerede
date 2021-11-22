import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import NotRegHomePage from './Not_Registered_Pages/NotRegHomePage';
import MapScreen from './Registered_Pages/MapScreen';

const stack = createStackNavigator();

const AuthStackNavigator = () => {
   return (
      <stack.Navigator screenOptions={{headerShown: false}}>
         <stack.Screen name="NotRegHomePage" component={NotRegHomePage} />
         <stack.Screen name="MapScreen" component={MapScreen} />
      </stack.Navigator>
   );
};

export default AuthStackNavigator;
