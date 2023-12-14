import React, {useState} from 'react';
import {StyleSheet, Text, View, TextInput} from 'react-native';
import Flatlist from './Flatlist';
import Colors from '../assets/Colors';

export default function TabViewInternationalComponent({params}) {
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
    <View>
      <TextInput
        style={styles.searchInput}
        placeholder="Search by name"
        value={searchQuery}
        onChangeText={handleSearch}
      />
      <Flatlist
        paramsData={{
          data: filteredData,
          setModalData: params.setModalData,
          setModalVisible: params.setModalVisible,
        }}
      />
    </View>
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
  },
});