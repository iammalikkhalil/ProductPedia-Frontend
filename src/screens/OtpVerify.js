import { 
  View, Text, TextInput, StyleSheet, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useState, useEffect} from 'react';
import ShowToast from '../components/ShowToast';
import Toast from 'react-native-toast-message';
import Header from '../components/Header';
import Colors from '../assets/Colors';
import Ip from '../assets/Ip';

export default function OtpVerify(props) {
  const data = props.route.params.data;
  const response = props.route.params.response;
  const [otp, setOtp] = useState('');
  async function PostData() {
    if (otp == response.otp) {
      const apiEndpoint = Ip + 'user/postuser';
      try {
        let response = await fetch(apiEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        });
        if (response.ok) {
          response = await response.json()
          await AsyncStorage.setItem('user', JSON.stringify(response.data));
          ShowToast({
            type: 'success',
            text1: response.msg,
          });
          setTimeout(()=>{
            props.navigation.replace('UserDashboard')
          },2000)
        } else {
            ShowToast({
              type: 'error',
              text1: "Error! Try Again",
            });
        }
      } catch (error) {
        console.error('An error occurred:', error);
      }
    } else {
      ShowToast({
        type: 'error',
        text1: "Wrong OTP",
      });
    }
  }

  return (
    <View style={styles.container}>
      <Header headerText="Verify OTP" />

      <View style={styles.inputContainer}>
        <Text style={styles.inputContainerLabel}>
          Hi {'Name'} we sended you OTP on the number {'+92304xxxxxxxxx'} please
          Verify your OTP.
        </Text>
        <TextInput
          style={styles.inputContainerInputFeild}
          placeholderTextColor="gray"
          placeholder="000 000"
          onChangeText={e => {
            setOtp(e);
          }}
          keyboardType="numeric"
        />
        <TouchableOpacity style={styles.btnContainer} onPress={PostData}>
          <Text style={styles.btnText}>Submit</Text>
        </TouchableOpacity>
      </View>
      <Toast/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.primaryBgColor,
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  inputContainer: {
    width: '100%',
    height: '90%',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputContainerLabel: {
    color: Colors.primaryFontColor,
    fontSize: 16,
    marginBottom: 20,
  },
  inputContainerInputFeild: {
    color: Colors.primaryFontColor,
    width: '60%',
    fontSize: 16,
    borderWidth: 2,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 10,
    borderColor: Colors.secondaryBgColor,
    textAlign: 'center',
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