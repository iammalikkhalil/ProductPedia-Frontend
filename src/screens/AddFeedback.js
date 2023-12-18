import {View, Text, TextInput} from 'react-native';
import {StyleSheet, TouchableOpacity, Alert} from 'react-native';
import React, {useState, useEffect} from 'react';
import DropdownComponent from '../components/Dropdown';

import {useSelector} from 'react-redux';

import axios from 'axios';

import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {getFilteredProductsApi, postFeedbackApi} from '../redux/constants/Apis';

export default function AddFeedback() {
  const categoriesList = useSelector(state => state.CategoryReducers);
  const [selectedCategory, setSelectedCategory] = useState({});
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [reference, setReference] = useState('');
  const [discription, setDiscription] = useState('');
  const [isSubmitButtonEnable, setIsSubmitButtonEnable] = useState(true);
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState({});
  useEffect(() => {
    setSelectedProduct({});
    getProducts();
  }, [selectedCategory]);

  async function getProducts() {
    if (Object.keys(selectedCategory).length != 0) {
      try {
        const response = await axios.put(
          getFilteredProductsApi,
          {
            id: selectedCategory._id,
            sortBy: 'category',
          },
          {
            headers: {
              'Content-Type': 'application/json',
            },
          },
        );
        const combinedArray = [
          ...response.data.local,
          ...response.data.international,
        ];
        setProducts(combinedArray);
      } catch (error) {
        console.error('Error getting products:', error);
      }
    }
  }

  async function PostData() {
    if (
      name == '' ||
      phone == '' ||
      Object.keys(selectedProduct).length == 0 ||
      discription == '' ||
      reference == ''
    ) {
      ShowToast({
        type: 'error',
        text1: 'Please Fill All Feilds!',
      });
    } else {
      setIsSubmitButtonEnable(false);
      try {
        const obj = {
          name: name,
          email: email,
          phoneNo: phone,
          productId: selectedProduct._id,
          reference: reference,
          discription: discription,
        };
        let response = await axios.post(postFeedbackApi, obj, {
          'Content-Type': 'application/json',
        });
        if (response.status == 200) {
          ShowToast({
            type: 'success',
            text1: 'Thanks for your Feedback!',
          });
          setName('');
          setEmail('');
          setPhone('');
          setSelectedCategory({});
          setSelectedProduct({});
          setReference('');
          setDiscription('');
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
  }

  return (
    <View>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Name</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="Your Name"
            value={name}
            onChangeText={e => {
              setName(e);
            }}
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Email</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="Optional"
            value={email}
            onChangeText={e => {
              setEmail(e);
            }}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Phone #</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="03xxxxx"
            value={phone}
            onChangeText={e => {
              setPhone(e);
            }}
            keyboardType="number-pad"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Category</Text>
          <View style={styles.pickerWrapper}>
            <View style={styles.pickerContainer}>
              <DropdownComponent
                propsData={{
                  data: categoriesList,
                  setValue: setSelectedCategory,
                  value: selectedCategory,
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Product</Text>
          <View style={styles.pickerWrapper}>
            <View style={styles.pickerContainer}>
              <DropdownComponent
                propsData={{
                  data: products,
                  setValue: setSelectedProduct,
                  value: selectedProduct,
                }}
              />
            </View>
          </View>
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Reference</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="wheres you find it"
            value={reference}
            onChangeText={e => {
              setReference(e);
            }}
            keyboardType="default"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Enter Discription</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="what can be improved"
            value={discription}
            onChangeText={e => {
              setDiscription(e);
            }}
            multiline
            keyboardType="default"
          />
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
});
