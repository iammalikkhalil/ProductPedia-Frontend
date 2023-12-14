import {StyleSheet, Text, View, Image} from 'react-native';

import Colors from '../assets/Colors';
import Icon from '../assets/errorIcon.png'

export default function Disclamier() {
  return (
      <View style={styles.disclamierContainer}>
      <Image source={Icon} style={styles.img} />
        <Text style={styles.heading}>Legal Disclamier</Text>
        <Text style={styles.body}>A disclaimer is a formal statement that lets consumers know that the seller/owner is not subject to any kind of legal liability in certain situations</Text>
      </View>
  );
}

const styles = StyleSheet.create({
  disclamierContainer: {
    marginHorizontal: 15,
    marginTop: 40,
    marginBottom: 7,
    backgroundColor: "white",
    elevation: 2,
    padding: 10,
    borderRadius: 10,
    alignItems : "center"
  },
  img: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  heading: {
    color: Colors.secondaryBgColor,
    // color: "#FFCA28",
    fontWeight: "700",
    fontSize: 30,
    marginVertical: 7,
  },
  body: {
    textAlign: "justify",
    marginVertical: 10,
    marginHorizontal: 3,
    color: Colors.primaryFontColor,
    lineHeight: 20,
    fontSize: 14,
  },
});
