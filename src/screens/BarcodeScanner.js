import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Colors from '../assets/Colors';
import {fonts} from 'react-native-elements/dist/config';

export default function BarcodeScanner() {
  return (
    <View style={styles.container}>
      <Text style={styles.commingSoon}>Comming Soon !</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  commingSoon: {
    color: Colors.primaryFontColor,
    fontSize: 18,
    fontWeight: '600',
  },
});
