import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function NewHeader({props}) {
  return (
    <View style={styles.header}>
      <TouchableOpacity
        onPress={() => {
          props.setDrawerVisible(true);
        }}>
        <Icon name="menu" color="black" size={30} />
      </TouchableOpacity>
      <Text style={styles.headingText}>ProductPedia</Text>
      <Text style={{width: 30}}></Text>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    height: 50,
    width: '100%',
    alignItems: 'center',
    elevation: 5,
  },
  headingText: {
    fontSize: 20,
    fontWeight: '700',
    color: Colors.primaryFontColor,
  },
});
