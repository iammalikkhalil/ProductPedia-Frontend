import { useState, useEffect } from 'react';
import Geolocation from '@react-native-community/geolocation';

function GeoLocation() {
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const [flag, setFlag] = useState(0);


  useEffect(() => {
    if (lat == 0 && long == 0) {
      getLocation();
    }
  }, [flag]);

  const getLocation = () => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLat(latitude);
        setLong(longitude);
        setFlag(flag + 1)
        console.log(latitude, longitude);
      },
      (error) => {
        console.warn('Error getting location:', error);
      },
      { enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 }
    );
  };

  return { lat, long };
}

export default GeoLocation;