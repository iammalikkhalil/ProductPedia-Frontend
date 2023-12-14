import React, {useEffect, useState} from 'react';
import {useSelector} from 'react-redux';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Pressable,
  Image,
  useWindowDimensions,
} from 'react-native';
import DropdownComponent from '../components/Dropdown';

import axios from 'axios';
import {RadioButton, ToggleButton} from 'react-native-paper';

import ProductCard from '../components/ProductCard';
import ProductModel from '../models/ProductModel';
import {getFilteredProductsApi} from '../redux/constants/Apis';
import Flatlist from '../components/Flatlist';
import FlatlistTabView from '../components/FlatlistTabView';
export default function Explore() {
  const dummyModelObj = {
    productImage: '',
    name: '',
    categoryId: {
      name: '',
      companyLogo: '',
    },
    companyId: {
      companyLogo: '',
      country: {
        name: '',
      },
    },
  };

  const categoriesList = useSelector(state => state.CategoryReducers);
  const companiesList = useSelector(state => state.CompanyReducers);
  const [pickerData, setPickerData] = useState([]);
  const [isPickerValueSelected, setIsPickerValueSelected] = useState(false);
  const [selectedPickerItem, setSelectedPickerItem] = useState({});
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(dummyModelObj);
  const [sortBy, setSortBy] = useState('category');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSortChange = value => {
    setSortBy(value);
    setIsPickerValueSelected(false);
    setFilteredProducts([]);
    setSelectedPickerItem({});
  };

  async function updateProductsList() {
    try {
      setIsLoading(true);
      const response = await axios.put(
        getFilteredProductsApi,
        {
          id: selectedPickerItem._id,
          sortBy,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setFilteredProducts(response.data);
      if (Object.keys(selectedPickerItem).length != 0) {
        setIsPickerValueSelected(true);
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Error getting products:', error);
    }
  }

  useEffect(() => {
    switch (sortBy) {
      case 'company':
        setPickerData(companiesList);
        break;
      default:
        setPickerData(categoriesList);
        break;
    }
  }, [sortBy]);

  useEffect(() => {
    updateProductsList();
  }, [selectedPickerItem]);

  return (
    <>
      {modalVisible ? (
        <ProductModel props={{setModalVisible, item: modalData}} />
      ) : (
        <View style={styles.container}>
          <View style={styles.radioButtonContainer}>
            <Text>Search by </Text>
            <RadioButton.Item
              label="Category"
              value="category"
              status={sortBy == 'category' ? 'checked' : 'unchecked'}
              onPress={() => handleSortChange('category')}
            />
            <RadioButton.Item
              label="Company"
              value="company"
              status={sortBy == 'company' ? 'checked' : 'unchecked'}
              onPress={() => handleSortChange('company')}
            />
          </View>
          <View style={styles.pickerContainer}>
            <DropdownComponent
              propsData={{
                data: pickerData,
                setValue: setSelectedPickerItem,
              }}
            />
          </View>
          {isLoading ? (
            <ActivityIndicator size="large" color={Colors.primaryFontColor} />
          ) : isPickerValueSelected ? (
            <FlatlistTabView
              paramsData={{
                data: filteredProducts,
                setModalVisible,
                setModalData,
              }}
            />
          ) : (
            <></>
          )}
        </View>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBgColor,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  radioButtonContainer: {
    marginLeft: 7,
    flexDirection: 'row',
    alignItems: 'center',
  },
  pickerContainer: {
    margin: 10,
    borderWidth: 3,
    borderRadius: 10,
    borderColor: Colors.secondaryBgColor,
    color: Colors.primaryFontColor,
  },
  picker: {
    height: 50,
    color: Colors.primaryFontColor,
  },
  text: {
    color: 'black',
  },
  flatlistTypeContainer: {
    flexDirection: 'row',
    marginHorizontal: 16,
    borderWidth: 2,
    justifyContent: 'space-evenly',
  },
  flatlistTypeBtn: {
    width: '45%',
  },
  flatlistTypeName: {
    fontSize: 16,
    fontWeight: '800',
  },
  abc: {},
  icon: {
    width: 20,
    height: 30,
  },
});
