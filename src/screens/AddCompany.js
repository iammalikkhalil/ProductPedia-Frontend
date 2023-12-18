import {View, Text, TextInput} from 'react-native';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import {Picker} from '@react-native-picker/picker';
import {useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {useDispatch} from 'react-redux';
import {
  GetCategories,
  GetCompanies,
  GetCountries,
  AddCompanies,
} from '../redux/actions/Action';

import axios from 'axios';

import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {postCompanyApi} from '../redux/constants/Apis';
import DropdownComponent from '../components/Dropdown';

export default function AddCompany(props) {
  const dispatch = useDispatch();
  const countriesList = useSelector(state => state.CountryReducers);
  const [isPickerValueSelected, setIsPickerValueSelected] = useState(false);
  const [selectedPickerItem, setSelectedPickerItem] = useState({});
  const [companyName, setCompanyName] = useState('');
  const [companyDiscription, setCompanyDiscription] = useState('');
  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true);
  const [companyLogo, setCompanyLogo] = useState({});

  const openImagePicker = () => {
    const options = {
      mediaType: 'photo',
      includeBase64: true,
      quality: 0.5,
    };

    if (Platform.OS === 'android') {
      options.storageOptions = {
        skipBackup: true,
        path: 'images',
      };
    }

    launchImageLibrary(options, response => {
      if (response.didCancel) {
        setCompanyLogo('');
        console.log('User cancelled image picker');
      } else if (response.errorCode) {
        setCompanyLogo('');
        console.log('ImagePicker Error: ', response.errorMessage);
      } else {
        setCompanyLogo({
          uri: response.assets[0].uri,
          type: response.assets[0].type,
          fileName: response.assets[0].fileName,
        });
      }
    });
  };

  async function PostData() {
    setIsSubmitButtonEnable(false);
    try {
      const formData = new FormData();
      formData.append('name', companyName);
      formData.append('discription', companyDiscription);
      formData.append('country', selectedPickerItem._id);
      if (Object.keys(companyLogo).length != 0) {
        formData.append('file', {
          uri: companyLogo.uri,
          type: companyLogo.type,
          name: companyLogo.fileName,
        });
      }
      let response = await axios.post(postCompanyApi, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      if (response.status == 200) {
        ShowToast({
          type: 'success',
          text1: 'Company Inserted Sucessfully!',
        });
        dispatch(
          AddCompanies({
            _id: response.data.data._id,
            name: companyName,
            discription: companyDiscription,
            country: selectedPickerItem._id,
          }),
        );
        setCompanyName('');
        setCompanyDiscription('');
        setSelectedPickerItem({});
        setCompanyLogo({});
      } else {
        ShowToast({
          type: 'error',
          text1: 'Error! Company Not Inserted Please Try Again',
        });
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsSubmitButtonEnable(true);
    }
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Company Name</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="Uniliver etc."
            value={companyName}
            onChangeText={e => {
              setCompanyName(e);
            }}
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Discription</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="About Company"
            value={companyDiscription}
            onChangeText={e => {
              setCompanyDiscription(e);
            }}
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Country</Text>
          <View style={styles.pickerWrapper}>
            <View style={styles.pickerContainer}>
              <DropdownComponent
                propsData={{
                  data: countriesList,
                  setValue: setSelectedPickerItem,
                  value: selectedPickerItem,
                }}
              />
            </View>
          </View>
        </View>
        <Text style={styles.imagePickerFileName}>{companyLogo.fileName}</Text>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Company Logo</Text>
          <TouchableOpacity
            style={styles.imagePickerBtn}
            onPress={openImagePicker}
            disabled={!isSubmitButtonEnable}>
            <Text style={styles.imagePickerBtnText}>Browse</Text>
          </TouchableOpacity>
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
  companyLogoPreview: {
    marginVertical: 10,
    alignItems: 'center',
  },
  companyLogo: {
    width: 100,
    height: 100,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  chooseLogoText: {
    color: Colors.secondaryFontColor,
    fontSize: 16,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
  imagePickerBtn: {
    width: '60%',
  },
  imagePickerBtnText: {
    backgroundColor: Colors.secondaryBgColor,
    color: Colors.secondaryFontColor,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 18,
    paddingVertical: 10,
    textAlign: 'center',
    height: 50,
  },
  imagePickerFileName: {
    textAlign: 'right',
    marginTop: 10,
    marginBottom: -8,
    marginRight: 40,
    fontSize: 16,
  },
});
