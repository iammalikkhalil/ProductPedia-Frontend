import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Colors from '../assets/Colors';

export default function Header({headerText}) {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>{headerText}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    marginTop: 5,
  },
  headerContainer: {
    borderRadius: 5,
    width: '98%',
    paddingVertical: 10,
    backgroundColor: Colors.secondaryBgColor,
  },
  headerText: {
    textAlign: 'center',
    fontSize: 26,
    color: Colors.secondaryFontColor,
    fontWeight: 'bold',
    marginVertical: 5,
    textTransform: 'capitalize',
  },
});
