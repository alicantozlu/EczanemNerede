import React, {useEffect, useState, useRef} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export default function NotRegMapScreen() {
   const [origin, setOrigin] = useState();
   const [destination, setDestination] = useState();

   const map = useRef();

   const GOOGLE_MAPS_APIKEY = 'AIzaSyDqzdtI9OMH__I6VwNQfdslefn2W1DTNp8';
   const [dataSource, setDataSource] = useState([]);

   const setUpUserLocation = () => {
      Geolocation.getCurrentPosition(async data => {
         setOrigin({
            latitude: data.coords.latitude,
            longitude: data.coords.longitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
         });
      });
   };

   const getRegisteredPharmacies = async () => {
      const header = {
         headers: {
            authorization:
               'apikey 5LTegKaMLp39FKI8o4GLH9:3XJF8lzEdrDCFrabxLzYbz',
            'content-type': 'application/json',
         },
      };
      axios
         .get(
            'https://api.collectapi.com/health/dutyPharmacy?ilce=%C3%87ankaya&il=Ankara',
            header,
         )
         .then(res => {
            //console.log({res});
            const data = res.data.result;
            setDataSource(data);
         });

      //TODO: seçeceğin eczanenin latitude longitude bilgileriyle set destination yap burada setDestination({latitude: ..., longitude:..., latitudeDelta: 0.05, longitudeDelta: 0.05}) şeklinde
   };

   useEffect(() => {
      setUpUserLocation();
      getRegisteredPharmacies();
   }, []);

   const onMarkerClicked = coordinate => {
      setDestination({
         latitude: coordinate.latitude,
         longitude: coordinate.longitude,
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
               region={origin}>
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
                           onPress={onMarkerClicked}
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
