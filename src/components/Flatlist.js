import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import ProductCard from './ProductCard';

export default function Flatlist({paramsData}) {
  const flatlistRef = useRef(null);

  useEffect(() => {
    if (
      paramsData.selectedIndex !== undefined &&
      paramsData.data &&
      paramsData.selectedIndex >= 0 &&
      paramsData.selectedIndex < paramsData.data.length &&
      flatlistRef.current
    ) {
      flatlistRef.current.scrollToIndex({
        index: paramsData.selectedIndex,
        animated: true,
        viewPosition: 0,
      });
    }
  }, [paramsData.selectedIndex, paramsData.data]);
  

  let length;
  if (paramsData.data == undefined) {
    length = 1;
  } else {
    length = paramsData.data.length;
  }

  return (
    <FlatList
      ref={flatlistRef}
      style={styles.flatList}
      data={paramsData.data}
      keyExtractor={(item, index) => index.toString()}
      getItemLayout={(data, index) => ({
        length: ITEM_HEIGHT,
        offset: ITEM_HEIGHT * index,
        index,
      })}
      ListEmptyComponent={() => (
        <Text
          style={{
            textAlign: 'center',
            padding: 20,
            display: length == 0 ? 'flex' : 'none',
          }}>
          No Item Found
        </Text>
      )}
      renderItem={({item, index}) => (
        <Pressable
          onPress={() => {
            paramsData.setSelectedIndex(index);
            paramsData.setModelVisible(true);
            paramsData.setModelData(item);
          }}>
          <ProductCard cardData={item} />
        </Pressable>
      )}
    />
  );
}

const ITEM_HEIGHT = 100;

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 65,
  },
});
