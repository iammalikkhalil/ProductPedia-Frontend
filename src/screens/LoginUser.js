import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import {CommonActions} from '@react-navigation/native';

import Header from '../components/Header';
import Colors from '../assets/Colors';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import {loginApi} from '../redux/constants/Apis';

export default function LoginUser(props) {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isButtonEnable, setIsButtonEnable] = useState(true);

  async function PostData() {
    setIsButtonEnable(false);
    try {
      const obj = {
        email: userEmail,
        password: userPassword,
      };
      let response = await axios.post(loginApi, obj, {
        'Content-Type': 'application/json',
      });
      if (response.status == 200) {
        response = response.data;
        if (response.responseCode == 200) {
          await AsyncStorage.setItem('role', 'true');
          ShowToast({
            type: 'success',
            text1: response.msg,
          });
          setTimeout(() => {
            props.navigation.dispatch(
              CommonActions.reset({
                index: 0,
                routes: [
                  {
                    name: 'Dashboard',
                    params: {role: 'true'},
                  },
                ],
              }),
            );
          }, 500);
        } else {
          ShowToast({
            type: 'error', // 'success', 'error', 'info', 'warn', 'custom'
            text1: response.msg,
            navigation: props.navigation,
          });
        }
      } else {
        console.error(
          'POST request failed:',
          response.status,
          response.statusText,
        );
      }
    } catch (error) {
      console.error('An error occurred:', error);
    } finally {
      setIsButtonEnable(true);
    }
  }

  return (
    <View>
      <Header headerText="Login User" />
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Enter Email</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="example@xyz.com"
            onChangeText={e => {
              setUserEmail(e);
            }}
            keyboardType="email-address"
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.inputContainerLabel}>Enter Password</Text>
          <TextInput
            style={styles.inputContainerInputFeild}
            placeholderTextColor="gray"
            placeholder="Zx23he.@7"
            onChangeText={e => {
              setUserPassword(e);
            }}
            secureTextEntry={true}
          />
        </View>
        <View style={styles.btnContainer}>
          <TouchableOpacity onPress={PostData} disabled={!isButtonEnable}>
            <Text style={styles.btnText}>Submit</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBgColor,
    width: '100%',
    flexDirection: 'column',
    height: '90%',
    justifyContent: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginHorizontal: 20,
    marginTop: 10,
  },
  inputContainerLabel: {
    fontSize: 16,
    color: Colors.primaryFontColor,
    width: '40%',
  },
  inputContainerInputFeild: {
    fontSize: 16,
    width: '60%',
    borderWidth: 2,
    color: Colors.primaryFontColor,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderColor: Colors.secondaryBgColor,
  },
  btnContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  btnText: {
    backgroundColor: Colors.secondaryBgColor,
    color: Colors.secondaryFontColor,
    fontWeight: 'bold',
    borderRadius: 10,
    fontSize: 20,
    paddingVertical: 10,
    textAlign: 'center',
    width: 100,
  },
});
