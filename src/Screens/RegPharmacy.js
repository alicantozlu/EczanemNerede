import React, {useEffect, useState, useRef} from 'react';
import {
   Image,
   Modal,
   StyleSheet,
   Text,
   TouchableOpacity,
   View,
} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';
import {withSafeAreaInsets} from 'react-native-safe-area-context';
import {firebase} from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function RegPharmacy({navigation, route}) {
   const [origin, setOrigin] = useState();
   const [destination, setDestination] = useState();
   const map = useRef();
   const GOOGLE_MAPS_APIKEY = '';
   const [dataSource, setDataSource] = useState([]);
   const [dataSource2, setDataSource2] = useState([]);
   const GEOLOCATION_SETTINGS = {
      enableHighAccuracy: true,
      distanceFilter: 1,
      maximumAge: 1000,
   };
   const [visible, setVisible] = React.useState(false);
   const [visible2, setVisible2] = React.useState(false);

   const [eczaneAdi, setEczaneAdi] = useState();
   const [eczaneAdresi, setEczaneAdresi] = useState();
   const [eczaneNumarasi, setEczaneNumarasi] = useState();
   const [eczaneMaili, setEczaneMaili] = useState();

   function reverseString(str) {
      var splitString = str.split('');
      var reverseArray = splitString.reverse();
      var joinArray = reverseArray.join('');
      return joinArray;
   }

   const setUpUserLocation = () => {
      Geolocation.getCurrentPosition(async data => {
         console.log(
            'Konumum: ' + data.coords.latitude + ' ' + data.coords.longitude,
         );
         setOrigin({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
         });
      });
   };

   const getRegisteredPharmacies = async () => {
      Geolocation.getCurrentPosition(async data => {
         const {latitude, longitude} = data.coords;
         Geocoder.from(latitude, longitude)
            .then(json => {
               console.log({result: json.results[0]});
               var formatted_address = json.results[0].formatted_address;
               var t = reverseString(formatted_address);
               var g = t.substring(t.indexOf('T ,') + 3);
               var h = g.substring(0, g.indexOf(' ') + 1);
               var il = h.substring(0, h.indexOf('/'));
               var r = h.substring(h.indexOf('/') + 1);
               var z = r.indexOf('/');
               if (z == -1) {
                  r = r.substring(0, r.indexOf(' '));
               } else {
                  r = r.substring(0, z);
               }
               const district = reverseString(r);
               const city = reverseString(il);
               console.log(district + ' ' + city);
               const header = {
                  headers: {
                     authorization:
                        '', // API KEY FROM COLLECTAPI
                     'content-type': 'application/json',
                  },
               };
               
               axios
                  .get(
                     `https://api.collectapi.com/health/dutyPharmacy?ilce=${district}&il=${city}`,
                     header,
                  )
                  .then(res => {
                     //console.log({res});
                     const data = res.data.result;
                     setDataSource(data);
                  });

               axios
                  .get(
                     '', // YOUR API
                  )
                  .then(res2 => {
                     const data2 = res2.data.result;
                     setDataSource2(data2);
                  });
            })
            .catch(error => console.log(error));
      });
   };

   Geocoder.from(41.89, 12.49)
      .then(json => {
         //var addressComponent = json.results[0].address_components[0];
         //console.log(addressComponent);
      })
      .catch(error => console.log(error));

   useEffect(() => {
      Geocoder.init('AIzaSyDqzdtI9OMH__I6VwNQfdslefn2W1DTNp8');
      setUpUserLocation();
      getRegisteredPharmacies();
   }, []);

   const onMarkerClicked = ({nativeEvent}) => {
      //console.log({nativeEvent});
      setDestination({
         latitude: nativeEvent.coordinate.latitude,
         longitude: nativeEvent.coordinate.longitude,
         latitudeDelta: 0.05,
         longitudeDelta: 0.05,
      });
   };

   const ModalPoup = ({visible, children}) => {
      return (
         <Modal transparent visible={visible}>
            <View style={styles.modalBackground}>
               <View style={styles.modalContainer}>{children}</View>
            </View>
         </Modal>
      );
   };

   const ModalPoup2 = ({visible, children}) => {
      return (
         <Modal transparent visible={visible2}>
            <View style={styles.modalBackground}>
               <View style={styles.modalContainer}>{children}</View>
            </View>
         </Modal>
      );
   };

   const onTitlePressed = val => {
      setVisible(true);
      setEczaneAdi(val.name);
      setEczaneAdresi(val.address);
      setEczaneNumarasi(val.phone);
      setEczaneMaili(val.mail);
   };

   const onTitlePressed2 = val => {
      setVisible2(true);
      setEczaneAdi(val.name);
      setEczaneAdresi(val.address);
      setEczaneNumarasi(val.phone);
   };

   const [isLoading, setIsLoading] = useState(false);

   const createChat = async () => {
      if (!firebase.auth().currentUser.email || !eczaneMaili) return;
      setIsLoading(true);
      const response = await firebase
         .firestore()
         .collection('chats')
         .add({
            users: [firebase.auth().currentUser.email, eczaneMaili],
         });
      setIsLoading(false);
      navigation.navigate('Chat', {id: response.id});
   };

   return (
      <View style={styles.container}>
         <ModalPoup visible={visible}>
            <View style={{flexDirection: 'row'}}>
               <View style={{flex: 1, alignItems: 'center'}}>
                  <Image
                     source={require('../Images/Eczane.jpeg')}
                     style={{height: '45%', width: '90%'}}
                  />
                  <View style={{marginTop: 15, alignItems: 'flex-start'}}>
                     <Text style={styles.infoEczane}>
                        Eczane Ad??: {eczaneAdi}
                     </Text>
                     <Text style={styles.infoEczane}>
                        Adres: {eczaneAdresi}
                     </Text>
                     <Text style={styles.infoEczane}>
                        Telefon Numaras??: {eczaneNumarasi}
                     </Text>
                     <Text style={styles.infoEczane}>
                        Mail Adresi: {eczaneMaili}
                     </Text>
                  </View>
                  <TouchableOpacity
                     style={{
                        marginTop: 10,
                        backgroundColor: '#14f191',
                        padding: 20,
                        borderRadius: 15,
                     }}
                     onPress={() => {
                        setVisible(false);
                        createChat();
                     }}
                     loading={isLoading}>
                     <Text style={{fontSize: 20}}>Mesaj G??nder</Text>
                  </TouchableOpacity>
               </View>
               <View style={{}}>
                  <TouchableOpacity
                     onPress={() => setVisible(false)}
                     style={{height: 30}}>
                     <Image
                        source={require('../Images/close.png')}
                        style={{height: 20, width: 20}}
                     />
                  </TouchableOpacity>
               </View>
            </View>
         </ModalPoup>

         <ModalPoup2 visible={visible2}>
            <View style={{flexDirection: 'row'}}>
               <View style={{flex: 1, alignItems: 'center'}}>
                  <Image
                     source={require('../Images/Eczane.jpeg')}
                     style={{height: '50%', width: '90%'}}
                  />
                  <View style={{marginTop: 15, alignItems: 'flex-start'}}>
                     <Text style={styles.infoEczane}>
                        Eczane Ad??: {eczaneAdi}
                     </Text>
                     <Text style={styles.infoEczane}>
                        Adres: {eczaneAdresi}
                     </Text>
                     <Text style={styles.infoEczane}>
                        Telefon Numaras??: {eczaneNumarasi}
                     </Text>
                  </View>
               </View>
               <View style={{}}>
                  <TouchableOpacity
                     onPress={() => setVisible2(false)}
                     style={{height: 30}}>
                     <Image
                        source={require('../Images/close.png')}
                        style={{height: 20, width: 20}}
                     />
                  </TouchableOpacity>
               </View>
            </View>
         </ModalPoup2>

         {origin && (
            <MapView
               ref={r => (map.current = r)}
               provider={PROVIDER_GOOGLE}
               style={styles.map}
               region={origin}
               onMarkerPress={onMarkerClicked}>
               <Marker
                  coordinate={{
                     latitude: origin.latitude,
                     longitude: origin.longitude,
                  }}>
                  <View style={styles.circle}>
                     <View style={styles.stroke} />
                     <View style={styles.core} />
                  </View>
               </Marker>
               {origin && destination && (
                  <MapViewDirections
                     origin={origin}
                     destination={destination}
                     apikey={GOOGLE_MAPS_APIKEY}
                     strokeWidth={3}
                     strokeColor="hotpink"
                     onReady={result => {
                        map.current.fitToCoordinates(result.coordinates, {
                           edgePadding: {
                              right: 20,
                              bottom: 20,
                              left: 20,
                              top: 20,
                           },
                        });
                     }}
                  />
               )}
               {dataSource &&
                  dataSource.map((val, key) => {
                     return (
                        <Marker
                           zIndex={1}
                           key={key}
                           pinColor={'red'}
                           coordinate={{
                              latitude: parseFloat(
                                 val.loc.substring(0, val.loc.indexOf(',')),
                                 7,
                              ),
                              longitude: parseFloat(
                                 val.loc.substring(val.loc.indexOf(',') + 1),
                                 7,
                              ),
                           }}
                           onCalloutPress={() => onTitlePressed2(val)}>
                           <MapView.Callout>
                              <View style={{alignItems: 'center'}}>
                                 <Text>{'ECZANE ' + val.name}</Text>
                                 <Text>{'...'}</Text>
                              </View>
                           </MapView.Callout>
                        </Marker>
                     );
                  })}
               {dataSource2 &&
                  dataSource2.map((val, key) => {
                     console.log(val);
                     return (
                        <Marker
                           zIndex={2}
                           key={key}
                           pinColor={'blue'}
                           coordinate={{
                              latitude: parseFloat(
                                 val.loc.substring(0, val.loc.indexOf(',')),
                                 7,
                              ),
                              longitude: parseFloat(
                                 val.loc.substring(val.loc.indexOf(',') + 1),
                                 7,
                              ),
                           }}
                           onCalloutPress={() => onTitlePressed(val)}>
                           <MapView.Callout>
                              <View style={{alignItems: 'center'}}>
                                 <Text>{val.name}</Text>
                                 <Text>{'...'}</Text>
                              </View>
                           </MapView.Callout>
                        </Marker>
                     );
                  })}
            </MapView>
         )}
      </View>
   );
}

const styles = StyleSheet.create({
   container: {
      ...StyleSheet.absoluteFillObject,
      height: '100%',
      width: '100%',
      alignItems: 'center',
   },
   map: {
      ...StyleSheet.absoluteFillObject,
   },
   cont: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#afa',
   },
   itemCon: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
   },
   item: {
      fontSize: 17,
      fontWeight: 'bold',
   },
   circle: {
      width: 26,
      height: 26,
      borderRadius: 50,
      shadowColor: '#000',
      shadowOffset: {width: 2, height: 2},
      shadowOpacity: 0.9,
   },
   stroke: {
      width: 26,
      height: 26,
      borderRadius: 50,
      backgroundColor: '#7e74ed',
      zIndex: 1,
   },
   core: {
      width: 18,
      height: 18,
      position: 'absolute',
      top: 4,
      left: 4,
      right: 4,
      bottom: 4,
      backgroundColor: '#e9e8f7',
      zIndex: 2,
      borderRadius: 50,
   },
   modalBackground: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.5)',
      justifyContent: 'center',
      alignItems: 'center',
   },
   modalContainer: {
      width: '80%',
      backgroundColor: 'white',
      paddingHorizontal: 20,
      paddingVertical: 20,
      borderRadius: 20,
      elevation: 20,
   },
   infoEczane: {
      fontSize: 15,
      paddingVertical: 5,
   },
});
