import React, {useState} from 'react';
import {Modal, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import Colors from '../assets/Colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default DisclamierModel = ({props}) => {
  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          props.setModelVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeIconContainer}>
              <TouchableOpacity
                onPress={() => {
                  props.setModelVisible(false);
                }}>
                <Icon style={styles.closeIcon} name="window-close" />
              </TouchableOpacity>
            </View>
            <View style={styles.modelContent}>
              <Icon style={styles.alertIcon} name="alert-circle" />
              <Text style={styles.heading}>Disclamier</Text>
              <Text style={styles.body}>
                Our app categorizes products based on local and
                internet-available data. We neither engage in buying/selling nor
                endorse any products listed. Users are urged to use their
                judgment; the app provides information, but decisions to use or
                purchase are at the user's discretion. For any discrepancies
                found, please provide evidence with feedback. We will thoroughly
                review and rectify any inaccuracies.
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalView: {
    width: '85%',
    height: '65%',
    backgroundColor: 'white',
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    justifyContent: 'space-between',
  },
  closeIconContainer: {
    marginRight: 30,
    marginTop: 20,
  },
  closeIcon: {
    textAlign: 'right',
    fontSize: 30,
    color: 'gray',
  },
  modelContent: {
    marginHorizontal: 20,
    marginBottom: 10,
  },
  alertIcon: {
    textAlign: 'center',
    fontSize: 100,
    color: '#FFD700',
  },
  heading: {
    marginTop: 5,
    borderRadius: 10,
    color: '#FFD700',
    fontSize: 28,
    textAlign: 'center',
    fontWeight: '600',
  },
  body: {
    color: Colors.primaryFontColor,
    fontSize: 17,
    textAlign: 'justify',
    marginVertical: 10,
  },
});
