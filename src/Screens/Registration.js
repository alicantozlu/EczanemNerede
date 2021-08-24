import React from 'react';
import {
   StyleSheet,
   Text,
   View,
   Image,
   Pressable,
   KeyboardAvoidingView,
   SafeAreaView,
} from 'react-native';
import Button_LogReg from '../Components/Button_LogReg';
import Input from '../Components/Input';

export default function Registration({navigation}) {
   return (
      <SafeAreaView style={styles.container}>
         <KeyboardAvoidingView style={{flex: 1}} behavior="padding">
            <View style={styles.viewLogo}>
               <Image
                  style={styles.I_Logo}
                  resizeMode="contain"
                  source={require('../Images/LES.png')}
               />
            </View>
            {/* -------------------------------------------------------------------------- */}
            <View style={styles.viewFormBilgileri}>
               <Input
                  placeholder="Ad Soyad"
                  placeholderTextColor="gray"
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  //   onSubmitEditing={() => this.tcKimlikInput.focus()}
               />
               <Input
                  placeholder="T.C. Kimlik No"
                  placeholderTextColor="gray"
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  //   onSubmitEditing={() => this.mailInput.focus()}
                  //  inputRef={input => (this.tcKimlikInput = input)}
               />
               <Input
                  placeholder="Mail"
                  placeholderTextColor="gray"
                  returnKeyType={'next'}
                  blurOnSubmit={false}
                  //  onSubmitEditing={() => this.passwordInput.focus()}
                  //  inputRef={input => (this.mailInput = input)}
               />
               <Input
                  placeholder="Şifre"
                  placeholderTextColor="gray"
                  returnKeyType={'go'}
                  secureTextEntry={true}
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

               <Button_LogReg text="Kaydı Tamamla" />
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
      flex: 3,
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
