import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';

export default function Flatlist({paramsData}) {
  let length;
  if (paramsData.data == undefined) {
    length = 1;
  } else {
    length = paramsData.data.length;
  }
  return (
    <FlatList
      data={paramsData.data}
      keyExtractor={(item, index) => index.toString()}
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
            paramsData.setModalVisible(true);
            paramsData.setModalData(item);
          }}>
          <ProductCard cardData={item} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({});
