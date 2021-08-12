import React from 'react';
import {
   StyleSheet,
   Text,
   View,
   Image,
   Pressable,
   ScrollView,
} from 'react-native';
import Button_LogReg from '../Components/Button_LogReg';
import Input from '../Components/Input';

export default function Registration({navigation}) {
   return (
      <View style={styles.container}>
         <View style={styles.V_Logo}>
            <Image
               style={styles.I_Logo}
               resizeMode="contain"
               source={require('../Images/LES.png')}
            />
         </View>
         {/* -------------------------------------------------------------------------- */}
         <View style={styles.V_Entry}>
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
            <View style={styles.V_P}>
               <Pressable
                  onPress={() => {
                     navigation.navigate('Login');
                  }}>
                  <Text style={styles.T_P}>Giriş Yap</Text>
               </Pressable>
            </View>

            <View style={styles.V_B_Login}>
               <Button_LogReg text="Kaydı Tamamla" />
            </View>
         </View>
         <View style={styles.V_Bottom}></View>
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      flex: 1,
      backgroundColor: '#fff',
   },
   V_Logo: {
      flex: 2,
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
   TI_TC: {},
   TI_PW: {},
   TI_Style: {
      flex: 1,
      borderBottomColor: 'gray',
      borderBottomWidth: 2,
      fontSize: 15,
      marginBottom: '4%',
      paddingBottom: 0,
   },
   V_P: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
   },
   T_P: {fontSize: 14, fontWeight: 'bold'},
   V_B_Login: {},
   V_Bottom: {flex: 1},
});
