import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import GeoLocation from '../utils/GeoLocation';
import {Text} from 'react-native-animatable';

export default props => {
  const {lat, long} = GeoLocation();
  const [latitude, setLatitude] = useState(lat);
  const [longitude, setLongitude] = useState(long);
  const [flag, setFlag] = useState(1);
  
  useEffect(() => {
    if (lat != 0 && long != 0) {
      setLatitude(lat);
      setLongitude(long);
      console.log(latitude, longitude);
    } else {
      if (flag < 10) {
        setFlag(flag + 1);
      }
    }
  }, [flag]);

  // useEffect(() => {
  //   if (props.props.latitude == 0 || props.props.longitude == 0) {
  //     if (latitude == 0 && longitude == 0) {
  //       getCurrentLocation();
  //     }
  //   } else {
  //     getPreviousLocation();
  //   }
  // }, [flag]);

  const getPreviousLocation = () => {
    setLatitude(props.props.latitude);
    setLatitude(props.props.latitude);
    setLongitude(props.props.longitude);
    setLongitude(props.props.longitude);
  };

  const getCurrentLocation = () => {
    setLatitude(lat);
    setLongitude(long);
    setFlag(flag + 1);
  };

  // const [region, setRegion] = useState({
  //   latitude: latitude,
  //   longitude: longitude,
  //   latitudeDelta: 0.04,
  //   longitudeDelta: 0.04,
  // });

  // useEffect(() => {
  //   if (region.latitude == 0) {
  //     setRegion({
  //       latitude: parseFloat(latitude),
  //       longitude: parseFloat(longitude),
  //       latitudeDelta: 0.04,
  //       longitudeDelta: 0.04,
  //     });
  //   }
  // }, [region]);

  // const handleRegionChange = newRegion => {
  //   setRegion(newRegion);
  // };

  // const handleDone = () => {
  //   props.props.setIsMapVisible(false);
  //   props.props.setLatitude(region.latitude);
  //   props.props.setLongitude(region.longitude);
  // };

  return (
    <View style={styles.container}>
      <Text>{latitude}</Text>
      <Text>{longitude}</Text>
      {/* <MapView
        provider={PROVIDER_GOOGLE}
         style={styles.map}
         region={region}
         onRegionChange={handleRegionChange}>
         <Marker
           coordinate={{latitude: region.latitude, longitude: region.longitude}}
         />
       </MapView>
       <Button title="Done" onPress={handleDone} /> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'flex-end',
    alignItems: 'center',
    paddingBottom: 5,
  },
  map: {
    width: '100%',
    height: '100%',
    ...StyleSheet.absoluteFillObject,
  },
});
