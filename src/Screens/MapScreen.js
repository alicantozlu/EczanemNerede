import React, {useEffect, useState} from 'react';
import {StyleSheet, Text, View} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import axios from 'axios';

export default function MapScreen() {
   const [dataSource, setDataSource] = useState([]);
   const [region, setRegion] = useState({
      latitude: 38.7004,
      longitude: 35.786,
      latitudeDelta: 28.487,
      longitudeDelta: 20.5876,
   });
   const getPharmacies = async () => {
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
   };
   useEffect(() => {
      // fetch(
      //    'https://api.collectapi.com/health/dutyPharmacy?ilce=%C3%87ankaya&il=Ankara',
      //    {
      //       method: 'GET',
      //       hostname: 'api.collectapi.com',
      //       port: null,
      //       path: '/health/dutyPharmacy?ilce=%C3%87ankaya&il=Ankara',
      //       headers: {
      //          authorization:
      //             'apikey 5LTegKaMLp39FKI8o4GLH9:3XJF8lzEdrDCFrabxLzYbz',
      //          'content-type': 'application/json',
      //       },
      //    },
      // )
      //    .then(response => response.json())
      //    .then(responseJson => {
      //       setDataSource(responseJson.result);
      //       rnr;

      //       // console.log('type = ', responseJson.result);
      //    })
      //    .catch(error => {
      //       console.log(error);
      //    });
      getPharmacies();
   }, []);
   return (
      <View style={styles.container}>
         <MapView provider={PROVIDER_GOOGLE} style={styles.map} region={region}>
            {dataSource &&
               dataSource.map((val, key) => {
                  return (
                     <Marker
                        key={key}
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
