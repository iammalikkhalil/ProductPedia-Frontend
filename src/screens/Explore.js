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
import {
  getFilteredProductsApi,
  getSubCategoriesByCategoryIdApi,
} from '../redux/constants/Apis';
import Flatlist from '../components/Flatlist';
import FlatlistTabView from '../components/FlatlistTabView';
import Colors from '../assets/Colors';
import darkColors from 'react-native-elements/dist/config/colorsDark';
export default function Explore() {
  const categoriesList = useSelector(state => state.CategoryReducers);
  const companiesList = useSelector(state => state.CompanyReducers);
  const [mainPickerData, setMainPickerData] = useState([]);
  const [isTabViewVisible, setIsTabViewVisible] = useState(false);
  const [selectedMainPickerItem, setSelectedMainPickerItem] = useState({});

  const [subPickerData, setSubPickerData] = useState([]);
  const [selectedSubPickerItem, setSelectedSubPickerItem] = useState({});

  const [sortBy, setSortBy] = useState('category');
  const [dropdownLabel, setDropdownLabel] = useState('Select Category');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const handleSortChange = value => {
    setSortBy(value);
    setIsTabViewVisible(false);
    setFilteredProducts([]);
    setSelectedMainPickerItem({});
  };

  async function updateProductsList() {
    try {
      setIsLoading(true);
      let id = selectedMainPickerItem;
      let sortByText = 'company';
      if (sortBy == 'category') {
        id = selectedSubPickerItem;
        sortByText = 'subCategory';
      }
      console.log(id, sortByText);
      const response = await axios.put(
        getFilteredProductsApi,
        {
          id: id._id,
          sortBy: sortByText,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setFilteredProducts(response.data);
    } catch (error) {
      console.error('Error getting products:', error);
    } finally {
      setIsLoading(false);

      if (sortBy == 'category') {
        if (Object.keys(selectedSubPickerItem).length != 0) {
          setIsTabViewVisible(true);
        }
      } else {
        if (Object.keys(selectedMainPickerItem).length != 0) {
          setIsTabViewVisible(true);
        }
      }
    }
  }

  async function GetSubCategories() {
    try {
      setIsLoading(true);
      const response = await axios.put(
        getSubCategoriesByCategoryIdApi,
        {
          category: selectedMainPickerItem._id,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );
      setSubPickerData(response.data);
    } catch (error) {
      console.error('Error getting products:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    switch (sortBy) {
      case 'company':
        setMainPickerData(companiesList);
        setDropdownLabel('Select Company');
        break;
      default:
        setMainPickerData(categoriesList);
        setDropdownLabel('Select Category');
        break;
    }
  }, [sortBy]);

  useEffect(() => {
    setIsTabViewVisible(false);
    setSelectedSubPickerItem({});
    if (sortBy == 'category') {
      GetSubCategories();
    } else {
      updateProductsList();
    }
  }, [selectedMainPickerItem]);

  useEffect(() => {
    setIsTabViewVisible(false);
    if (Object.keys(selectedSubPickerItem).length != 0) {
      updateProductsList();
    }
  }, [selectedSubPickerItem]);

  return (
    <View style={styles.container}>
      <View style={styles.radioButtonContainer}>
        <Text style={{color: Colors.primaryFontColor}}>Search by </Text>
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
            dropdownLabel: dropdownLabel,
            data: mainPickerData,
            value: selectedMainPickerItem,
            setValue: setSelectedMainPickerItem,
          }}
        />
      </View>

      {sortBy == 'category' ? (
        <View style={styles.pickerContainer}>
          <DropdownComponent
            propsData={{
              dropdownLabel: 'Select Subcategory',
              data: subPickerData,
              value: selectedSubPickerItem,
              setValue: setSelectedSubPickerItem,
            }}
          />
        </View>
      ) : null}

      {!isTabViewVisible ? (
        <Text
          style={{
            textAlign: 'center',
            padding: 20,
            fontSize: 15,
            color: Colors.primaryFontColor,
          }}>
          Please Select {sortBy == 'category' ? "Category and Subcategory" : "Company"}
        </Text>
      ) : null}

      {isLoading ? (
        <ActivityIndicator size="large" color={Colors.primaryFontColor} />
      ) : isTabViewVisible ? (
        <FlatlistTabView
          paramsData={{
            data: filteredProducts,
          }}
        />
      ) : null}
    </View>
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
    paddingLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 1,
    borderBottomRightRadius: 5,
    borderBottomLeftRadius: 5,
    backgroundColor: "white"
    // borderWidth: 2,
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
