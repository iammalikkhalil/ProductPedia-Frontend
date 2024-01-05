import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Flatlist from './Flatlist';
import Colors from '../assets/Colors';

import ProductModel from '../models/ProductModel';
import UpdateProductModel from '../models/UpdateProductModel';

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
  const [modelData, setModelData] = useState(dummyModelObj);
  const [modelVisible, setModelVisible] = useState(false);
  const [isUpdateModelVisible, setIsUpdateModelVisible] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0)

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
      {isUpdateModelVisible ? <UpdateProductModel props = {{setIsUpdateModelVisible}} /> : null}
      {modelVisible ? (
        <ProductModel props={{item: modelData, setModelVisible}} />
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
              modelVisible,
              setModelData,
              setModelVisible,
              selectedIndex,
              setSelectedIndex,
              setIsUpdateModelVisible
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
