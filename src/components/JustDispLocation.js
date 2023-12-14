import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

export default props => {
  const [region, setRegion] = useState({
    latitude: parseFloat(props.props.latitude),
    longitude: parseFloat(props.props.longitude),
    latitudeDelta: 0.04,
    longitudeDelta: 0.04,
  });

  useEffect(() => {
    if (region.latitude == 0) {
      setRegion({
        latitude: parseFloat(props.props.latitude),
        longitude: parseFloat(props.props.longitude),
        latitudeDelta: 0.04,
        longitudeDelta: 0.04,
      });
    }
  }, [region]);

  const handleDone = () => {
    props.props.setIsMapVisible(false);
  };

  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={region}>
        <Marker
          coordinate={{latitude: region.latitude, longitude: region.longitude}}
        />
      </MapView>
      <Button title="Done" onPress={handleDone} />
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
