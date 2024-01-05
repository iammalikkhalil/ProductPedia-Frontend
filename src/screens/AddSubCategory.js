import {View, Text, TextInput} from 'react-native';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';

import {useSelector} from 'react-redux';

import {AddCategories} from '../redux/actions/Action';

import axios from 'axios';

import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {postSubCategoryApi} from '../redux/constants/Apis';
import DropdownComponent from '../components/Dropdown';

export default function AddSubCategory() {
  const categoriesList = useSelector(state => state.CategoryReducers);

  const [subCategoryName, setSubCategoryName] = useState('');
  const [subCategoryDiscription, setSubCategoryDiscription] = useState('');
  const [isButtonEnable, setIsButtonEnable] = useState(true);

  const [isCategoryPickerValueSelected, setIsCategoryPickerValueSelected] =
    useState(false);
  const [selectedCategoryPickerItem, setSelectedCategoryPickerItem] = useState(
    {},
  );

  async function PostData() {
    setIsButtonEnable(false);

    try {
      const obj = {
        name: subCategoryName,
        discription: subCategoryDiscription,
        category: selectedCategoryPickerItem._id,
      };
      let response = await axios.post(postSubCategoryApi, obj, {
        'Content-Type': 'application/json',
      });
      if (response.status == 200) {
        ShowToast({
          type: 'success',
          text1: 'Category Inserted Sucessfully!',
        });
        setSubCategoryName('');
        setSubCategoryDiscription('');
        setSelectedCategoryPickerItem({});
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
          <Text style={styles.inputContainerLabel}>Enter Name</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="Soap etc."
            value={subCategoryName}
            onChangeText={e => {
              setSubCategoryName(e);
            }}
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Enter Discription</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="About Subcategory"
            value={subCategoryDiscription}
            onChangeText={e => {
              setSubCategoryDiscription(e);
            }}
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Category</Text>
          <View style={styles.pickerWrapper}>
            <View style={styles.pickerContainer}>
              <DropdownComponent
                propsData={{
                  data: categoriesList,
                  value: selectedCategoryPickerItem,
                  setValue: setSelectedCategoryPickerItem,
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={PostData} disabled={!isButtonEnable}>
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
  pickerWrapper: {
    width: '60%',
    height: 40,
    paddingVertical: 4,
    justifyContent: 'center',
  },
  pickerContainer: {
    justifyContent: 'center',
    borderWidth: 2,
    borderRadius: 10,
    width: '100%',
    borderColor: Colors.secondaryBgColor,
    color: Colors.primaryFontColor,
  },
  picker: {
    height: 50,
    color: Colors.primaryFontColor,
  },
});
