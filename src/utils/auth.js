import auth from '@react-native-firebase/auth';
import {ToastAndroid} from 'react-native';

export const singIn = (kimlikNo, password) => {
   auth()
      .signInWithEmailAndPassword(kimlikNo, password)
      .then(() => {
         ToastAndroid.show('Logged in', ToastAndroid.SHORT);
      })
      .catch(err => {
         ToastAndroid.show('Logged in Error', ToastAndroid.SHORT);
         console.log(err);
      });
};

export const singUp = (kimlikNo, password) => {
   auth()
      .createUserWithEmailAndPassword(kimlikNo, password)
      .then(() => {
         ToastAndroid.show('Signed Up', ToastAndroid.SHORT);
      })
      .catch(err => {
         ToastAndroid.show('Signed Up Error', ToastAndroid.SHORT);
         console.log(err);
      });
};
