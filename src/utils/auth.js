import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

export const singIn = (email, password) => {
   console.log(email);
   auth()
      .signInWithEmailAndPassword(email, password)
      .then(() => {
         ToastAndroid.show('Logged in', ToastAndroid.SHORT);
      })
      .catch(err => {
         ToastAndroid.show('Logged in Error', ToastAndroid.SHORT);
         console.log(err);
      });
};

export const singUp = (email, password) => {
   auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
         ToastAndroid.show('Signed Up', ToastAndroid.SHORT);
      })
      .catch(err => {
         ToastAndroid.show('Signed Up Error', ToastAndroid.SHORT);
         console.log(err);
      });
};

export const signOut = () => {
   auth()
      .signOut()
      .then(() => {
         ToastAndroid.show('Signed Out', ToastAndroid.SHORT);
      });
};
