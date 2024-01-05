import React, {useState, useEffect} from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  Pressable,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import Ip from '../assets/Ip';
import Colors from '../assets/Colors';

import {useSelector} from 'react-redux';
import axios from 'axios';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {
  updateproductApi,
  getSubCategoriesByCategoryIdApi,
} from '../redux/constants/Apis';
import DropdownComponent from '../components/Dropdown';

export default UpdateProductModel = ({props}) => {
  const modelData = useSelector(state => state.UpdateProductsModelDataReducers);
  const categoriesList = useSelector(state => state.CategoryReducers);
  const companiesList = useSelector(state => state.CompanyReducers);
  const [subCategoriesList, setSubCategoriesList] = useState([]);
  const [isCategoryPickerValueSelected, setIsCategoryPickerValueSelected] =
    useState(true);
  const [
    isSubCategoryPickerValueSelected,
    setIsSubCategoryPickerValueSelected,
  ] = useState(true);
  const [isCompanyPickerValueSelected, setIsCompanyPickerValueSelected] =
    useState(true);
  const [selectedCategoryPickerItem, setSelectedCategoryPickerItem] = useState(
    modelData.subCategory.category,
  );
  const [selectedSubCategoryPickerItem, setSelectedSubCategoryPickerItem] =
    useState(modelData.subCategory);
  const [selectedCompanyPickerItem, setSelectedCompanyPickerItem] = useState(
    modelData.company,
  );
  const [productName, setProductName] = useState(modelData.name);
  const [productDiscription, setProductDiscription] = useState(
    modelData.discription,
  );
  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true);

  async function PostData() {
    setIsSubmitButtonEnable(false);
    try {
      const product = {
        name: productName,
        discription: productDiscription,
        company: selectedCompanyPickerItem._id,
        subCategory: selectedSubCategoryPickerItem._id,
      };
      let response = await axios.put(updateproductApi, {id: modelData._id, product}, {
        'Content-Type': 'application/json',
      });
      console.log(response.data);
      if (response.status == 200) {
        ShowToast({
          type: 'success',
          text1: response.data.msg,
        });
        setProductName('');
        setProductDiscription('');
        setSelectedCategoryPickerItem({});
        setSelectedSubCategoryPickerItem({});
        setSelectedCompanyPickerItem({});
      } else {
        ShowToast({
          type: 'error',
          text1: response.data.msg,
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
    GetSubCategoriesByCategoryIdApi();
  }, [selectedCategoryPickerItem]);

  return (
    <View style={styles.centeredView}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={true}
        onRequestClose={() => {
          props.setIsUpdateModelVisible(false);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <View style={styles.closeIconContainer}>
              <Pressable
                onPress={() => {
                  props.setIsUpdateModelVisible(false);
                }}>
                <Text style={styles.closeIcon}>X</Text>
              </Pressable>
            </View>
            <View style={styles.modelContent}>
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
                    multiline={true}
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
                  <TouchableOpacity
                    onPress={PostData}
                    disabled={!isSubmitButtonEnable}>
                    <Text style={styles.btnText}>Submit</Text>
                  </TouchableOpacity>
                </View>
              </View>
              <Toast />
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
    color: 'gray',
  },
  modelContent: {
    marginBottom: 30,
    marginTop: 10,
  },
  container: {
    width: '100%',
    flexDirection: 'column',
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
