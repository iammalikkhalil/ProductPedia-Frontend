import {View, Text, TextInput} from 'react-native';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {AddCategories} from '../redux/actions/Action';

import axios from 'axios';

import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {postCategoryApi} from '../redux/constants/Apis';

export default function AddCategory() {
  const dispatch = useDispatch();
  const [categoryName, setCategoryName] = useState('');
  const [categoryDiscription, setCategoryDiscription] = useState('');
  const [isButtonEnable, setIsButtonEnable] = useState(true);

  async function PostData() {
    setIsButtonEnable(false);

    try {
      const obj = {
        name: categoryName,
        discription: categoryDiscription,
      };
      let response = await axios.post(postCategoryApi, obj, {
        'Content-Type': 'application/json',
      });
      if (response.status == 200) {
        ShowToast({
          type: 'success',
          text1: 'Category Inserted Sucessfully!',
        });

        //this will updates categorries data in store
        dispatch(
          AddCategories({
            _id: response.data.data._id,
            name: categoryName,
            discription: categoryDiscription,
          }),
        );
        setCategoryName('');
        setCategoryDiscription('');
      } else {
        ShowToast({
          type: 'error',
          text1: 'Error! Category Not Inserted Please Try Again',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsButtonEnable(true);
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Enter Category Name</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="Soap etc."
            value={categoryName}
            onChangeText={e => {
              setCategoryName(e);
            }}
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>
            Enter Category Discription
          </Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="About Category"
            value={categoryDiscription}
            onChangeText={e => {
              setCategoryDiscription(e);
            }}
            keyboardType="default"
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity
            onPress={PostData}
            disabled={!isButtonEnable}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBgColor,
    width: '100%',
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputContainerLabel: {
    fontSize: 16,
    color: Colors.primaryFontColor,
    width: '40%',
  },
  inputContainerInputFeild: {
    fontSize: 16,
    width: '60%',
    borderWidth: 2,
    color: Colors.primaryFontColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderColor: Colors.secondaryBgColor,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    backgroundColor: Colors.secondaryBgColor,
    color: Colors.secondaryFontColor,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    width: 100,
  },
});
