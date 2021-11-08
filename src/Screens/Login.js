import React, {useState} from 'react';
import {
   StyleSheet,
   Text,
   View,
   Image,
   TextInput,
   Button,
   Pressable,
   SafeAreaView,
   KeyboardAvoidingView,
} from 'react-native';
import Button_LogReg from '../Components/Button_LogReg';
import Input from '../Components/Input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

export default function Login({navigation}) {
   const [kimlikNo, setKimlikNo] = useState('');
   const [password, setPassword] = useState('');

   const handleOnSubmit = () => {
      if(kimlikNo!='' && password!=''){
         //Sign in
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View style={styles.V_Logo}>
               <Image
                  style={styles.I_Logo}
                  resizeMode="contain"
                  source={require('../Images/LES.png')}
               />
            </View>

            <View style={styles.V_Entry}>
               <Input
                  placeholder="T.C. Kimlik No"
                  placeholderTextColor="gray"
                  returnKeyType={'next'}
                  //onSubmitEditing={() => this.passwordInput.focus()}
                  blurOnSubmit={false}
                  onChangeText={value => (setKimlikNo = value)}
                  value={kimlikNo}
                  keyboardType={'numeric'}
               />

               <Input
                  placeholder="Şifre"
                  placeholderTextColor="gray"
                  secureTextEntry={true}
                  //inputRef={input => (this.passwordInput = input)}
                  onChangeText={value => (setPassword = value)}
                  value={password}
                  secureTextEntry={true}
               />

               <View style={styles.V_P}>
                  <Pressable
                     onPress={() => {
                        navigation.navigate('Registration');
                     }}>
                     <Text style={styles.T_P}>Kayıt Ol</Text>
                  </Pressable>
               </View>

               <View style={styles.V_B_Login}>
                  <Button_LogReg
                     handleOnPress={handleOnSubmit}
                     text="Sisteme Giriş Yap"
                  />
               </View>
            </View>

            <View style={styles.V_Bottom}></View>
         </KeyboardAvoidingView>
      </SafeAreaView>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   V_Logo: {
      flex: 3,
      justifyContent: 'center',
      alignContent: 'center',
      padding: 20,
   },
   I_Logo: {
      width: '100%',
      height: '100%',
   },

   V_Entry: {
      flex: 3,
      justifyContent: 'space-between',
      marginHorizontal: '4%',
   },
   V_P: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
   },
   T_P: {fontSize: 14, fontWeight: 'bold'},
   V_B_Login: {},
   V_Bottom: {flex: 2},
});
