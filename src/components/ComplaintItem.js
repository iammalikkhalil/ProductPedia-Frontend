import {View, Text, StyleSheet} from 'react-native';
import React from 'react'
import Colors from '../assets/Colors';

export default function ComplaintItem({item}) {
    return (
    <View style={styles.container}>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.heading}>Complaint Code: </Text>
              <Text style={styles.text}>{item.complaintCode}</Text>
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.item}>
              <Text style={styles.heading}>Detail: </Text>
              <Text style={styles.text}>{item.complaintDetails}</Text>
            </View>
          </View>
        </View>
  )
}
const styles = StyleSheet.create({
    container: {
      borderWidth: 2,
      marginVertical: 8,
      marginHorizontal: 15,
      borderRadius: 10,
      paddingBottom: 5,
      paddingTop: 5,
    },
    row: {
      flexDirection: 'row',
      paddingVertical: 2,
      paddingHorizontal: 15,
      justifyContent: 'space-between',
    },
    item: {
      flexDirection: 'row',
      paddingVertical: 1,
      paddingHorizontal: 2,
      borderRadius: 10,
    },
    heading: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.primaryFontColor,
    },
    text: {
      fontSize: 16,
      fontWeight: 'bold',
      color: Colors.primaryFontColor,
    },
  });