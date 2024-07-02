import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import {font} from '../Constant';
import AppProvider from '../providers/AppProvider';
import {BASE_API} from '../API/Base_Api';
import showToast from './ShowToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const ResendOtp = ({type}) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const {OTPValue, OTPverify, setOTPverify, phoneNumber} =
    useContext(AppProvider);

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }

      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  });

  const sendOTP = () => {
    // setMinutes(2);
    setSeconds(42);
  };
  useEffect(() => {
    sendOTP();
  }, [OTPValue]);
  const resendOTP = () => {
    // setMinutes(2);

    var formdata = new FormData();
    formdata.append('mobile', phoneNumber.mobile_number);
    formdata.append('type', type);
    formdata.append('country_code', phoneNumber.country_code);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${BASE_API}mobileVerification`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log('res>>>>>', result);
        if (result?.success == true) {
          showToast(result?.data?.mobile_otp);
          setOTPverify(result?.data?.mobile_otp);
          console.log('otp', result);
        }
      })

      .catch(error => {
        console.log('flfl', error);
      });
    setSeconds(42);
  };

  return (
    <View>
      {/* <Text
        style={{
          ...styles.decription,
          color: '#000',
          marginTop: 10,
          marginHorizontal: WIDTH / 12,
          bottom: 15,
        }}>
        Resend Code in 42 seconds.
      </Text> */}
      {seconds > 0 ? (
        <Text
          style={{
            ...styles.decription,
            color: '#000',
            marginTop: 10,
            marginHorizontal: WIDTH / 12,
            bottom: 15,
          }}>
          Resend Code in {seconds < 10 ? `0${seconds}` : seconds} seconds.
        </Text>
      ) : (
        <TouchableOpacity onPress={() => resendOTP()}>
          <Text
            style={{
              ...styles.decription,
              color: '#000',
              marginTop: 10,
              marginHorizontal: WIDTH / 12,
              bottom: 15,
            }}>
            Resend OTP?
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
};
const styles = StyleSheet.create({
  decription: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    marginTop: 2,
    fontFamily: font.semibold,
  },
});
export default ResendOtp;
