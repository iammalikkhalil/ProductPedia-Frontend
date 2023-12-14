import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';
import socketServices from '../utils/SocketService';
import {useFocusEffect} from '@react-navigation/native';

export default () => {
  const [lat, setLat] = useState(0.0);
  const [long, setLong] = useState(0.0);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!isConnected) {
      setIsConnected(socketServices.connected);
    }
  }, []);

  useEffect(() => {
    if (isConnected) {
      const onReceiveMessage = msg => {
        let obj = JSON.parse(msg);
        setLat(obj.latitude);
        setLong(obj.longitude);
        console.log('my obj is ..', obj);
      };

      socketServices.on('receiveMessage', onReceiveMessage);
    }
  }, [isConnected]);

  // Add a new useEffect to re-render the marker when lat and long change
  useEffect(() => {
    if (isConnected) {
      // Marker will be updated when lat and long change
    }
  }, [lat, long, isConnected]);

  return (
    <View style={styles.container}>
      {isConnected ? (
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.map}
          region={{
            latitude: lat,
            longitude: long,
            latitudeDelta: 0.04,
            longitudeDelta: 0.04,
          }}>
          <Marker coordinate={{latitude: lat, longitude: long}} />
        </MapView>
      ) : (
        <Text>Socket is not connected</Text>
      )}
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
