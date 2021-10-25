import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import MapScreen from '../Screens/MapScreen';
import Registration from '../Screens/Not_Registered_Pages/Registration';
import Login from '../Screens/Login';
import RegPharmacy from '../Screens/RegPharmacy';
import ChatScreen from '../Screens/ChatScreen';
import HomePage from '../Screens/Nav';
import Nav from '../Screens/Nav';
import NotRegHomePage from '../Screens/Not_Registered_Pages/NotRegHomePage';
import NotRegMapPage from '../Screens/Not_Registered_Pages/NotRegMapScreen';

const Stack = createStackNavigator();

function Navigation() {
   return (
      <NavigationContainer>
         <Stack.Navigator initialRouteName="Nav">
            <Stack.Screen name="Nav" component={Nav} />
            <Stack.Screen
               name="NotRegHomePage"
               component={NotRegHomePage}
               options={{headerShown: false}}
            />
            <Stack.Screen
               name="NotRegMapScreen"
               component={NotRegMapPage}
               options={{headerShown: false}}
            />
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
               name="Chat"
               component={ChatScreen}
               options={{headerShown: false}}
            />
         </Stack.Navigator>
      </NavigationContainer>
   );
}

export default Navigation;
