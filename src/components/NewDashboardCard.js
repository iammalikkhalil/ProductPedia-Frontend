import {StyleSheet, Text, View} from 'react-native';
import React from 'react';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../assets/Colors';

export default function NewDashboardCard({propsData}) {
  return (
    <View style={[styles.cardContainer, {backgroundColor: propsData.bgColor}]}>
      <Icon name={propsData.icon} color={propsData.color} size={40} />
      <Text style={styles.text}>{propsData.text}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  cardContainer: {
    margin: 10,
    width: 165,
    borderRadius: 20,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    height: 130,
  },
  text: {
    color: Colors.primaryFontColor,
    fontSize: 16,
    textTransform: 'uppercase',
    marginTop: 10,
  },
});
