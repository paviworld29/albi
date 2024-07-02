import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
} from 'react-native';
import React, {useState} from 'react';
import {COLORS, IMAGE, font} from '../Constant/index';
import {hp, wp} from '../Components/Config';
import {Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {ActivityIndicator} from 'react-native';
import {BASE_API} from '../API/Base_Api';
import { Popup } from '../Components/NoticeModel';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const EnableNotification = ({navigation}) => {
  const [loader, SetLoader] = useState(false);
  const [popup, setpopup] = useState(false);

  const EnableNotificationApi = async ({type}) => {
    SetLoader(true);

    const Token = await AsyncStorage.getItem('token');
 
    var myHeaders = new Headers();
    myHeaders.append('Authorization', `Bearer ${Token}`);
    myHeaders.append('Accept', 'application/json');

    var formdata = new FormData();
    formdata.append('status', type);
    formdata.append('type', 'app_notificationf');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${BASE_API}notificationInfo`, requestOptions)
      .then(response => response.text())
      .then(result => {
        if (result?.success == true) {
          navigation.navigate('Review');
          SetLoader(false);
        } else {
          navigation.navigate('Review');
          SetLoader(false);
        }
       })
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.Yellow} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: WIDTH / 1.2,
          alignSelf: 'center',
          marginTop: 25,
        }}>
        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{alignSelf: 'center', top: 15}}>
            <Image
              source={IMAGE.goBack}
              style={{
                width: 20,
                height: 20,
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <View style={{width: 20}}></View>
        )}
        <TouchableOpacity
          onPress={() => navigation.navigate('Review')}
          style={{alignSelf: 'center'}}>
          <Text
            style={{
              color: '#000000',
              fontWeight: '700',
              fontSize: 16,
              marginTop: 35,
              fontFamily: font.bold,
            }}>
            Skip
          </Text>
        </TouchableOpacity>
      </View>

      <Image
        source={IMAGE.HappyDP}
        style={{width: WIDTH / 1, height: HEIGHT / 2}}
        resizeMode={'contain'}
      />
      <View style={{marginTop: 1, alignItems: 'center'}}>
        <Text
          style={{
            color: COLORS.Black,
            fontSize: 24,
            fontWeight: '600',
            fontFamily: font.semibold,
          }}>
          Enable Notifications
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.agreementText}>
          Get push-notification when you match {'\n'} with someone or receive a
          message.{' '}
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => {
          setpopup(!popup)
          // Alert.alert('Are you sure enable notification', '', [
          //   {
          //     text: 'Cancel',
          //     onPress: () => EnableNotificationApi({type: '0'}),
          //     style: 'cancel',
          //   },
          //   {text: 'OK', onPress: () => EnableNotificationApi({type: '1'})},
          // ]);
        }}>
        {loader ? (
          <ActivityIndicator />
        ) : (
          <Text style={[styles.ButtonText]}>I want to be notified</Text>
        )}
      </TouchableOpacity>
      <Popup
          onclose={val => {
            EnableNotificationApi({type: '1'})
            setpopup(!popup);
          }}
          modelvisible={popup}
          alerts={'Notice'}
          message={'Are you sure enable notification'}
          onRetrun={() => {
            EnableNotificationApi({type: '0'})
            setpopup(!popup);
          }}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Yellow,
  },
  button: {
    paddingVertical: 18,
    width: WIDTH / 1.2,
    backgroundColor: COLORS.Black,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 45,
  },
  agreementText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000000B2',
    fontWeight: '400',
    fontFamily: font.normal,
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: '700',
    fontFamily: font.bold,
    color: '#FFFFFF',
  },
});

export default EnableNotification;
