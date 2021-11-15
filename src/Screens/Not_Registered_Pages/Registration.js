import React, {useState} from 'react';
import {
   StyleSheet,
   Text,
   View,
   Image,
   Pressable,
   KeyboardAvoidingView,
   SafeAreaView,
   Alert,
} from 'react-native';
import Button_LogReg from '../../Components/Button_LogReg';
import Input from '../../Components/Input';
import {singUp} from '../../utils/auth';

export default function Registration({navigation}) {
   const [email, setEmail] = useState('');
   const [password, setPassword] = useState('');

   const handleOnSubmit = () => {
      if (email != '' && password != '') {
         singUp(email, password);
      }
   };

   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View style={styles.viewLogo}>
               <Image
                  style={styles.I_Logo}
                  resizeMode="contain"
                  source={require('../../Images/LES.png')}
               />
            </View>
            {/* -------------------------------------------------------------------------- */}
            <View style={styles.viewFormBilgileri}>
               <Input
                  placeholder="Email"
                  placeholderTextColor="gray"
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  onChangeText={value => setEmail(value)}
                  value={email}
                  keyboardType={'email-address'}
                  //   onSubmitEditing={() => this.mailInput.focus()}
                  //  inputRef={input => (this.tcKimlikInput = input)}
               />
               <Input
                  placeholder="Şifre"
                  placeholderTextColor="gray"
                  onChangeText={value => setPassword(value)}
                  returnKeyType={'go'}
                  secureTextEntry={true}
                  value={password}
                  //  inputRef={input => (this.passwordInput = input)}
               />
               {/* -------------------------------------------------------------------------- */}
               <View style={styles.viewStyleGirisYap}>
                  <Pressable
                     onPress={() => {
                        navigation.navigate('Login');
                     }}>
                     <Text style={styles.textStyleGirisYap}>Giriş Yap</Text>
                  </Pressable>
               </View>

               <Button_LogReg
                  text="Kaydı Tamamla"
                  handleOnPress={handleOnSubmit}
               />
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
   viewLogo: {
      flex: 2,
      justifyContent: 'center',
      alignContent: 'center',
      padding: 20,
   },
   I_Logo: {
      width: '100%',
      height: '100%',
   },
   viewFormBilgileri: {
      flex: 2,
      justifyContent: 'space-between',
      marginHorizontal: '4%',
   },
   viewStyleGirisYap: {
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   textStyleGirisYap: {
      fontSize: 14,
      fontWeight: 'bold',
      marginBottom: 15,
   },
   V_Bottom: {
      flex: 1,
   },
});
