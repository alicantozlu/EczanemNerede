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

   function reverseString(str) {
      var splitString = str.split(''); // var splitString = "hello".split("");
      // ["h", "e", "l", "l", "o"]

      // Step 2. Use the reverse() method to reverse the new created array
      var reverseArray = splitString.reverse(); // var reverseArray = ["h", "e", "l", "l", "o"].reverse();
      // ["o", "l", "l", "e", "h"]

      // Step 3. Use the join() method to join all elements of the array into a string
      var joinArray = reverseArray.join(''); // var joinArray = ["o", "l", "l", "e", "h"].join("");
      // "olleh"

      //Step 4. Return the reversed string
      return joinArray; // "olleh"
   }

   reverseString('hello');

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
                        'apikey 2m5sxldyGFNWq0alxUPQtP:7pDrUScGSUukba2puOIFT9',
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
                           title={val.name/* + ' Eczanesi'*/}
                           description={'Telefon: ' + val.phone}
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
});
