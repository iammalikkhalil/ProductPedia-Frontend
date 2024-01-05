import {View, Text, TextInput} from 'react-native';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import axios from 'axios';
import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {
  getSubCategoriesByCategoryIdApi,
  postproductApi,
} from '../redux/constants/Apis';
import DropdownComponent from '../components/Dropdown';

export default function AddProduct() {
  const categoriesList = useSelector(state => state.CategoryReducers);
  const companiesList = useSelector(state => state.CompanyReducers);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [isCategoryPickerValueSelected, setIsCategoryPickerValueSelected] =
    useState(false);
  const [
    isSubCategoryPickerValueSelected,
    setIsSubCategoryPickerValueSelected,
  ] = useState(false);
  const [isCompanyPickerValueSelected, setIsCompanyPickerValueSelected] =
    useState(false);
  const [selectedCategoryPickerItem, setSelectedCategoryPickerItem] = useState(
    {},
  );
  const [selectedSubCategoryPickerItem, setSelectedSubCategoryPickerItem] =
    useState({});
  const [selectedCompanyPickerItem, setSelectedCompanyPickerItem] = useState(
    {},
  );
  const [productName, setProductName] = useState('');
  const [productDiscription, setProductDiscription] = useState('');
  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true);

  async function PostData() {
    setIsSubmitButtonEnable(false);
    try {
      const obj = {
        name: productName,
        discription: productDiscription,
        company: selectedCompanyPickerItem._id,
        subCategory: selectedSubCategoryPickerItem._id,
      };
      let response = await axios.post(postproductApi, obj, {
        'Content-Type': 'application/json',
      });
      if (response.status == 200) {
        ShowToast({
          type: 'success',
          text1: 'Product Inserted Sucessfully!',
        });
        setProductName('');
        setProductDiscription('');
        setSelectedCategoryPickerItem({});
        setSelectedCompanyPickerItem({});
      } else {
        ShowToast({
          type: 'error',
          text1: 'Error! Company Not Inserted Please Try Again',
        });
      }
    } catch (error) {
      console.error('An error occurred:');
      ShowToast({
        type: 'error',
        text1: 'Error! Company Not Inserted Please Try Again',
      });
    } finally {
      setIsSubmitButtonEnable(true);
    }
  }

  async function GetSubCategoriesByCategoryIdApi() {
    try {
      const response = await axios.put(
        getSubCategoriesByCategoryIdApi,
        {
          category: selectedCategoryPickerItem._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setSubCategoriesList(response.data);
    } catch (error) {
      console.error('Error getting subCategories:', error);
    }
  }

  useEffect(() => {
    setSelectedSubCategoryPickerItem({})
    GetSubCategoriesByCategoryIdApi();
  }, [selectedCategoryPickerItem]);

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Product Name</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="Dove etc"
            value={productName}
            onChangeText={e => {
              setProductName(e);
            }}
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Discription</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="About Product"
            value={productDiscription}
            onChangeText={e => {
              setProductDiscription(e);
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
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Sub Category</Text>
          <View style={styles.pickerWrapper}>
            <View style={styles.pickerContainer}>
              <DropdownComponent
                propsData={{
                  data: subCategoriesList,
                  value: selectedSubCategoryPickerItem,
                  setValue: setSelectedSubCategoryPickerItem,
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Company</Text>
          <View style={styles.pickerWrapper}>
            <View style={styles.pickerContainer}>
              <DropdownComponent
                propsData={{
                  data: companiesList,
                  setValue: setSelectedCompanyPickerItem,
                  value: selectedCompanyPickerItem,
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={PostData} disabled={!isSubmitButtonEnable}>
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
    height: 40,
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
