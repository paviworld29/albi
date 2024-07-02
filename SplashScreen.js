import React, {useEffect, useState} from 'react';
import {View, Image, StyleSheet, Dimensions, StatusBar} from 'react-native';
import {COLORS} from '../Constant/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_API} from '../API/Base_Api';
import {Popup} from '../Components/NoticeModel';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SplashScreen = ({navigation}) => {
  const [modelvisible, setModelVisible] = useState(false);

  const splashTimer = async () => {
    const data = await AsyncStorage.getItem('Appintro');
    const status = await AsyncStorage.getItem('status');
    const Token = await AsyncStorage.getItem('token');
    const home = await AsyncStorage.getItem('@homeScreen');
    // console.log('status', status);

    if (home == 'home' && Token) {
      setTimeout(() => {
        navigation.navigate('MyTabs', {screen: 'Home'});
      }, 2000);
    } else if (Token) {
      var myHeaders = new Headers();
      myHeaders.append('Accept', 'application/json');
      myHeaders.append('Authorization', `Bearer ${Token}`);

      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow',
      };

      fetch(`${BASE_API}getUser`, requestOptions)
        .then(response => response.json())
        .then(result => {
          // console.log('>>>>>>>>>>>>>>>>>>>>', result);
          if (result?.data?.selfie_verification == 0) {
            setTimeout(() => {
              navigation.navigate('Review');
            }, 2000);
          } else if (result?.data?.selfie_verification == 1) {
            setTimeout(() => {
              navigation.navigate('ProfileDenied');
            }, 2000);
          } else if (result?.data?.selfie_verification == 2) {
            setModelVisible(!modelvisible);
          } else if (result?.data?.selfie_verification == 3) {
            navigation.navigate('Profileapproved');
          }
        })
        .catch(error => console.log('error', error));
    } else if (data == 'data') {
      setTimeout(() => {
        navigation.replace('SigninORreg');
      }, 2000);
    } else {
      setTimeout(() => {
        navigation.replace('WalkThroughsscreens');
      }, 2000);
    }
  };

  useEffect(() => {
    splashTimer();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.Yellow} />
      <Image
        source={require('../Constant/Images/Logoalbi.png')}
        style={{width: WIDTH / 1.3, height: HEIGHT / 4}}
        resizeMode={'contain'}
      />
      <Popup
        onclose={val => {
          navigation.replace('SigninORreg');
          setModelVisible(!modelvisible);
        }}
        modelvisible={modelvisible}
        alerts={'Notice'}
        message={'The admin has disapproved your account.'}
        single={'single'}
        onRetrun={() => {
          setModelVisible(!modelvisible);
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.Yellow,
  },
});

export default SplashScreen;
