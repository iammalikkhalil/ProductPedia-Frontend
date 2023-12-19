import React from 'react';
import {Alert, Modal, StyleSheet, Text, Pressable, View} from 'react-native';

export default function FeedbackModel({props}) {
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
          <View style={styles.modelView}>
            <View style={styles.closeIconContainer}>
              <Pressable onPress={() => props.setModelVisible(false)}>
                <Text style={styles.closeIcon}>X</Text>
              </Pressable>
            </View>
            <View style={styles.modelContent}>
              <View style={styles.discriptionContainer}>
                <Text style={styles.heading}>{props.item.name}</Text>
                <Text style={styles.headingDiscription}>
                  {props.item.phoneNo}
                </Text>
                <Text style={styles.headingDiscription}>
                  {props.item.email}
                </Text>
                <Text style={styles.line}>
                  ________________________________
                </Text>
                <View style={styles.companyDetailContainer}>
                  <View style={styles.companyDetailRow}>
                    <Text style={styles.label}>Product: </Text>
                    <Text style={styles.detail}>
                      {props.item.productId.name}
                    </Text>
                  </View>
                  <View style={styles.companyDetailRow}>
                    <Text style={styles.label}>Company: </Text>
                    <Text style={styles.detail}>
                      {props.item.productId.companyId.name}
                    </Text>
                  </View>
                  <View style={styles.companyDetailRow}>
                    <Text style={styles.label}>Category: </Text>
                    <Text style={styles.detail}>
                      {props.item.productId.categoryId.name}
                    </Text>
                  </View>
                </View>
                <Text style={styles.discription}>
                  Discription: {props.item.discription}
                </Text>
                <Text style={styles.discription}>
                  Reference: {props.item.reference}
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255, 0.8)',
  },
  modelView: {
    paddingBottom: 10,
    width: '80%',
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
  },
  closeIconContainer: {
    marginRight: 30,
    marginTop: 20,
  },
  closeIcon: {
    textAlign: 'right',
    fontSize: 30,
    color: Colors.primaryFontColor,
  },
  discriptionContainer: {
    margin: 10,
  },
  heading: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: 'black',
  },
  headingDiscription: {
    textAlign: 'center',
    fontSize: 16,
    color: 'gray',
  },
  line: {
    color: 'gray',
    opacity: 0.2,
    textAlign: 'center',
  },
  companyDetailContainer: {
    marginBottom: 15,
    marginTop: 10,
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingHorizontal: 5,
  },
  companyDetailRow: {
    paddingHorizontal: 5,
    marginVertical: 3,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  label: {
    fontSize: 16,
    color: 'black',
  },
  detail: {
    fontSize: 16,
    color: 'black',
    fontWeight: 'bold',
  },
  discription: {
    marginTop: 4,
    fontSize: 13,
    color: 'black',
    textAlign: 'justify',
    marginHorizontal: 15,
    marginBottom: 5,
  },
});
