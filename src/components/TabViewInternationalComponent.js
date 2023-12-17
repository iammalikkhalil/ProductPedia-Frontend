import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Flatlist from './Flatlist';
import Colors from '../assets/Colors';

import {useSelector} from 'react-redux';
import ProductModel from '../models/ProductModel';

export default function TabViewInternationalComponent({params}) {
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

  const reduxModelVisiblity = useSelector(
    state => state.ToggleModelVisibalityReducers,
  );
  console.log('reduxModelVisiblity', reduxModelVisiblity);
  const [modalData, setModalData] = useState(dummyModelObj);

  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(params.data);

  const handleSearch = query => {
    setSearchQuery(query);
    const filtered = params.data.filter(item =>
      item.name.toLowerCase().includes(query.toLowerCase()),
    );
    setFilteredData(filtered);
  };
  return (
    <>
      {reduxModelVisiblity ? (
        <ProductModel props={{item: modalData}} />
      ) : (
        <View>
          <TextInput
            style={styles.searchInput}
            placeholder="Search by name"
            value={searchQuery}
            onChangeText={handleSearch}
            placeholderTextColor={Colors.primaryFontColor}
          />
          <Flatlist
            paramsData={{
              data: filteredData,
              setModalData,
            }}
          />
        </View>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  searchInput: {
    height: 40,
    borderColor: Colors.secondaryBgColor,
    borderRadius: 15,
    borderWidth: 2,
    margin: 10,
    paddingLeft: 20,
    fontSize: 16,
    color: Colors.primaryFontColor,
  },
});
