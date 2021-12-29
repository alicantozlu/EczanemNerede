import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import Geocoder from 'react-native-geocoding';
import axios from 'axios';

export default function NotRegMapScreen() {
   const [origin, setOrigin] = useState();
   const [destination, setDestination] = useState();
   const map = useRef();
   const GOOGLE_MAPS_APIKEY = 'AIzaSyDqzdtI9OMH__I6VwNQfdslefn2W1DTNp8';
   const [dataSource, setDataSource] = useState([]);
   const GEOLOCATION_SETTINGS = {
      enableHighAccuracy: true,
      distanceFilter: 1,
      maximumAge: 1000,
   };

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
                        'apikey 0ww4o5CiMwmCSt42G6gFQp:4HRgIWQZJZwFgNVP6PYu1N',
                     /*
                        apikey 1kVhFZzsNed1xmAhCJGOmy:1SG53QWzqCtUFFN0dq074I
                        apikey 65SA4uSv7KQUV4AWxn2RAa:4QuqXIbfC3jJcfHziaXpnA
                        apikey 0t2IGaI63WSFkjOZTMT8mY:6X1MZxQTC3wpwMpVZwL4O6
                        apikey 1Aycjx6qduhKlW6ssF7SGs:3i2EpJZSBa6iUCeFRC69Py
                        apikey 0FncQs8BGeltzg2hBnnVFE:0EK1WlgIUbdrogckYylLo7
                        apikey 0ru69JLLDU3iVUSWxuEA2b:3FR8JAYVpPD9qslegCYHqb
                        apikey 6u1NmOPZlvzr63ao6iS86F:4YGPzEAnAHHYMUc0qmnn2Q
                     */
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
            })
            .catch(error => console.warn(error));
      });
   };

   Geocoder.from(41.89, 12.49)
      .then(json => {
         //var addressComponent = json.results[0].address_components[0];
         //console.log(addressComponent);
      })
      .catch(error => console.warn(error));

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

   return (
      <View style={styles.container}>
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
                           key={key}
                           title={val.name /* + ' Eczanesi'*/}
                           description={'Telefon: ' + val.phone}
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
                        />
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
});
