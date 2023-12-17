import {StyleSheet, Text, View, FlatList, Pressable} from 'react-native';
import React, {useState, useEffect} from 'react';
import ProductCard from './ProductCard';
import {useDispatch} from 'react-redux';

import {TogleModelVisibility} from '../redux/actions/Action';

export default function Flatlist({paramsData}) {
  const dispatch = useDispatch();
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
            dispatch(TogleModelVisibility(true));
            paramsData.setModalData(item);
          }}>
          <ProductCard cardData={item} />
        </Pressable>
      )}
    />
  );
}

const styles = StyleSheet.create({});
