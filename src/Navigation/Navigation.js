import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../Screens/MapScreen';
import Registration from '../Screens/Registration';
import Login from '../Screens/Login';
import RegPharmacy from '../Screens/RegPharmacy';
import ForgotPassword from '../Screens/ForgotPassword';
import ChatScreen from '../Screens/ChatScreen';
import HomePage from '../Screens/HomePage';

const Stack = createStackNavigator();

function Navigation() {
   return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Home" component={HomePage} />
            <Stack.Screen
               name="Maps"
               component={MapScreen}
               options={{headerShown: false}}
            />
            <Stack.Screen
               name="Registration"
               component={Registration}
               options={{headerShown: false}}
            />
            <Stack.Screen
               name="Login"
               component={Login}
               options={{headerShown: false}}
            />
            <Stack.Screen
               name="RegPharmacy"
               component={RegPharmacy}
               options={{headerShown: false}}
            />
            <Stack.Screen
               name="ForgotPas"
               component={ForgotPassword}
               options={{headerShown: false}}
            />
            <Stack.Screen
               name="Chat"
               component={ChatScreen}
               options={{headerShown: false}}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default Navigation;
