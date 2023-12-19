import React, {useState, useEffect} from 'react';
import {Image, View, StyleSheet} from 'react-native';
import splashImage from '../assets/splashImage.png';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default Splash = ({navigation}) => {
  const [role, setRole] = useState('');

  async function checkRole() {
    const value = await AsyncStorage.getItem('role');
    console.log("async value: ",value);
    if (value != null) {
      if (value == 'true') {
        setRole('true');
      } else {
        setRole('false');
      }
    } else {
      setRole('false');
    }
  }

  useEffect(() => {
    checkRole();
  }, []);

  useEffect(() => {
    if (role != '') {
      setTimeout(() => {
        navigation.replace('NewDashboard', {role: role});
      }, 2000);
    }
  }, [role]);

  return (
    <View style={styles.container}>
      <Image source={splashImage} style={styles.splashImage} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splashImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
});
