import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useSelector} from 'react-redux';
import Colors from '../assets/Colors';

const DropdownComponent = ({propsData}) => {
  const [value, setValue] = useState(null);
  const [focus, setFocus] = useState(false);

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle = {styles.dropdownTextStyle}
        data={propsData.data}
        onFocus={() => setFocus(true)}
        onBlur={() => setFocus(false)}
        search
        maxHeight={300}
        labelField="name"
        valueField="_id"
        placeholder={'Select item'}
        searchPlaceholder="Search..."
        value={value}
        onChange={item => {
          propsData.setValue(item);
          setFocus(false);
        }}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBgColor,
  },
  dropdown: {
    color: 'red',
    height: 50,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  label: {
    position: 'absolute',
    backgroundColor: Colors.primaryBgColor,
    left: 22,
    top: 8,
    zIndex: 999,
    fontSize: 14,
  },
  placeholderStyle: {
    color: Colors.primaryFontColor,
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Colors.primaryFontColor,
  },
  iconStyle: {
    width: 25,
    height: 25,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  dropdownTextStyle: {
    color: Colors.primaryFontColor,
  },
});
