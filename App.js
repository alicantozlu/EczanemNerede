import 'react-native-gesture-handler';
import React, {useState, useEffect} from 'react';
import Navigation from './src/Navigation/Navigation';
import auth from '@react-native-firebase/auth';
import NotRegMapScreen from './src/Screens/Not_Registered_Pages/NotRegMapScreen';
import AuthStackNavigator from './src/Screens/AuthStackNavigator';
import Reg_HomePage from './src/Screens/Registered_Pages/Reg_HomePage';

const App = () => {
   const [currentUser, setCurrentUser] = useState(null);
   const [isLoading, setIsLoading] = useState(null);

   const onAuthStateChanged = async user => {
      await setCurrentUser(user);
      setIsLoading(false);
   };

   useEffect(() => {
      const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
      return subscriber;
   }, []);

   if (isLoading) {
      return null;
   }

   return (
      <Navigation>
         {currentUser ? <Reg_HomePage /> : <AuthStackNavigator />}
      </Navigation>
   );
};

export default App;
