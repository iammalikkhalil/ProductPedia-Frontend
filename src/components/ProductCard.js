import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../assets/Colors';
import Ip from '../assets/Ip';

export default function ProductCard({cardData}) {
  return (
    <View style={styles.card}>
      <View style={styles.details}>
        <Text style={styles.name}>{cardData.name}</Text>
        <View style={styles.discription}>
          <Text style={styles.text}>{cardData.companyId.name}</Text>
          <Text style={styles.text}>|</Text>
          <Text style={styles.text}>
            {cardData.companyId.country.name == 'Pakistan'
              ? 'Local'
              : 'International'}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 16,
    marginHorizontal: 12,
    marginVertical: 6,
    alignItems: 'center',
    elevation: 4,
    flexDirection: 'row',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 15,
    resizeMode: 'contain',
  },
  details: {
    marginLeft: 10,
    flexDirection: 'column',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
  },
  discription: {
    marginTop: 7,
    flexDirection: 'row',
    flexWrap: 'wrap',
    maxWidth: 230,
    marginBottom: 5,
  },
  text: {
    fontSize: 16,
    color: 'black',
    paddingHorizontal: 2,
  },
});
