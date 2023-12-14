import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function FindItemByKey(data, key, setData) {
    console.log("FindItemByKey calling");
    data.forEach(element => {
        if (element.id === key) {
            console.log("params: ",element.id, key);
          console.log(element);  
        }
    });
}