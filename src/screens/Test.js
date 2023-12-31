import {
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import NewDashboardCard from '../components/NewDashboardCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Icon from 'react-native-vector-icons/Octicons';
import Colors from '../assets/Colors';
import LinearGradient from 'react-native-linear-gradient';
import NewHeader from '../components/NewHeader';
import {ScrollView, GestureHandlerRootView} from 'react-native-gesture-handler';
import NewDisclaimer from '../components/NewDisclaimer';
import DisclamerModel from '../models/DisclamerModel';
import DrawerModel from '../models/DrawerModel';

export default function Test(props) {
  // const [modelVisible, setModelVisible] = useState(booleanRole);
  const [modelVisible, setModelVisible] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  function Navigator(params) {
    props.navigation.navigate(`${params}`);
  }

  return (
    <GestureHandlerRootView style={styles.container}>
      <NewHeader props={{setDrawerVisible}} />
      <ScrollView>
        <View style={styles.flexContainer}>
          <TouchableOpacity
            style={styles.flexItem}
            onPress={() => {
              Navigator('Explore');
            }}>
            <NewDashboardCard
              propsData={{
                bgColor: '#d5f5ff',
                color: '#4e9ec8',
                icon: 'compass-outline',
                text: 'Explore',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flexItem}
            onPress={() => {
              Navigator('ShowFeedback');
            }}>
            <NewDashboardCard
              propsData={{
                bgColor: '#bfeec4',
                color: '#21694c',
                icon: 'message-star-outline',
                text: 'Feedback',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flexItem}
            onPress={() => {
              Navigator('AddFeedback');
            }}>
            <NewDashboardCard
              propsData={{
                bgColor: '#bfeec4',
                color: '#21694c',
                icon: 'message-star-outline',
                text: 'Feedback',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flexItem}
            onPress={() => {
              Navigator('BarcodeScanner');
            }}>
            <NewDashboardCard
              propsData={{
                bgColor: '#c1c6fe',
                color: '#8973d9',
                icon: 'barcode-scan',
                text: 'Scan Barcode',
              }}
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.flexItem}
            onPress={() => {
              Navigator('AddCountry');
            }}>
            <NewDashboardCard
              propsData={{
                bgColor: '#ffe9d5',
                color: '#deb974',
                icon: 'flag-plus-outline',
                text: 'Add country',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flexItem}
            onPress={() => {
              Navigator('AddCompany');
            }}>
            <NewDashboardCard
              propsData={{
                bgColor: '#d9e5f9',
                color: '#459880',
                icon: 'office-building-outline',
                text: 'Add Company',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flexItem}
            onPress={() => {
              Navigator('AddCategory');
            }}>
            <NewDashboardCard
              propsData={{
                bgColor: '#ffe9d5',
                color: '#deb974',
                icon: 'gamepad-circle-outline',
                text: 'Add category',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flexItem}
            onPress={() => {
              Navigator('AddSubCategory');
            }}>
            <NewDashboardCard
              propsData={{
                bgColor: '#bfeec4',
                color: '#21694c',
                icon: 'arrow-right-bottom',
                text: 'Add Subcategory',
              }}
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.flexItem}
            onPress={() => {
              Navigator('AddProduct');
            }}>
            <NewDashboardCard
              propsData={{
                bgColor: '#feffb3',
                color: '#ca8c1e',
                icon: 'cart-plus',
                text: 'Add Product',
              }}
            />
          </TouchableOpacity>
          <View style={{width: 165}}>
          </View>
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  break: {
    height: 20,
  },
});
