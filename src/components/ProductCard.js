import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  Alert,
} from 'react-native';
import axios from 'axios';

import {useNavigation} from '@react-navigation/native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from '../assets/Colors';
import Ip from '../assets/Ip';
import {UpdateProductsModelData} from '../redux/actions/Action';

import {useSelector, useDispatch} from 'react-redux';
import {deleteproductApi} from '../redux/constants/Apis';

export default function ProductCard({cardData}) {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [showOptionMenu, setShowOptionMenu] = useState(false);
  const [isOptionMenuVisible, setIsOptionMenuVisible] = useState(false);

  async function checkRole() {
    const value = await AsyncStorage.getItem('role');
    if (value != null) {
      if (value == 'true') {
        setShowOptionMenu('true');
      } else {
        setShowOptionMenu('false');
      }
    } else {
      setShowOptionMenu('false');
    }
  }

  useEffect(() => {
    checkRole();
  }, [navigation]);

  async function DeleteProduct() {
    try {
      let response = await axios.delete(
        `${deleteproductApi}/${cardData.item._id}`,
      );
      console.log(response);
      if (response.status === 200) {
        Alert.alert('', response.data.msg, [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]);
      } else {
        Alert.alert('', response.data.msg, [
          {
            text: 'Ok',
            style: 'cancel',
          },
        ]);
      }
    } catch (error) {
      console.log('error in axios delete', error);
      Alert.alert('', 'Error In Deleting Product', [
        {
          text: 'Ok',
          style: 'cancel',
        },
      ]);
    }
  }

  return (
    <View style={styles.card}>
      {showOptionMenu ? (
        <View style={styles.option}>
          <TouchableOpacity
            onPress={() => {
              setIsOptionMenuVisible(!isOptionMenuVisible);
            }}>
            <Image
              style={styles.optionIcon}
              source={require('../assets/icons/menu.png')}
            />
          </TouchableOpacity>
          {isOptionMenuVisible ? (
            <View style={styles.optionMenu}>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => {
                  setIsOptionMenuVisible(false);
                  dispatch(UpdateProductsModelData(cardData.item));
                  cardData.setIsUpdateModelVisible(true);
                }}>
                <Text style={styles.optionText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.optionRow}
                onPress={() => {
                  setIsOptionMenuVisible(false);
                  Alert.alert(
                    'Are You Sure?',
                    'Do you realy want to delete Product?',
                    [
                      {
                        text: 'No',
                        style: 'cancel',
                      },
                      {
                        text: 'Yes',
                        onPress: () => {
                          DeleteProduct();
                        },
                      },
                    ],
                  );
                }}>
                <Text style={styles.optionText}>Delete</Text>
              </TouchableOpacity>
            </View>
          ) : null}
        </View>
      ) : null}
      <View style={styles.details}>
        <Text style={styles.name}>{cardData.item.name}</Text>
        <View style={styles.discription}>
          <Text style={styles.text}>{cardData.item.company.name}</Text>
          <Text style={styles.text}>|</Text>
          <Text style={styles.text}>{cardData.item.company.country.name}</Text>
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
  option: {
    position: 'absolute',
    right: 5,
    top: 5,
  },
  optionIcon: {
    position: 'absolute',
    right: 4,
    top: 5,
    width: 20,
    borderWidth: 2,
    height: 20,
  },
  optionMenu: {
    zIndex: 10,
    borderRadius: 3,
    right: 22,
    paddingVertical: 4,
    paddingHorizontal: 8,
    backgroundColor: 'white',
    elevation: 0.4,
  },
  optionRow: {
    paddingHorizontal: 2,
    paddingVertical: 3,
  },
  optionText: {
    color: 'black',
    fontSize: 14,
  },
});
