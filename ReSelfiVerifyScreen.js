import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Dimensions,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState} from 'react';
import {COLORS, IMAGE} from '../Constant';
import {SelfiVerification} from '../Components/AuthAnotherDetail';
import AppProvider from '../providers/AppProvider';
import {BASE_API} from '../API/Base_Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ReSelfiVerifyScreen = ({navigation}) => {
  const [loader, setLoader] = useState();
  const {capturedImage} = useContext(AppProvider);

  const ReselfiVerification = async () => {
    setLoader(true);
    const Token = await AsyncStorage.getItem('token');
    console.log('>>>reselfi', Token);

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);
    var formdata = new FormData();
    formdata.append(
      'selfie_image',
      'data:image/png;base64,' + capturedImage?.base64,
    );
    var requestOptions = {
      method: 'POST',
      body: formdata,
      headers: myHeaders,
      redirect: 'follow',
    };
    fetch(`${BASE_API}reuploadSelfieImage`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('fjkfjj', result);
        if (result?.success) {
          navigation.navigate('Review');
          setLoader(false);
        } else {
          setLoader(false);
        }
      })

      .catch(error => {
        setLoader(false);
        // console.log('flfl', error);
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'center', right: 10}}>
          <Image
            source={IMAGE.goBack}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <Image
          source={IMAGE.applogo}
          style={{
            width: 80,
            height: 30,
          }}
          resizeMode={'contain'}
        />
        <View style={{width: 20}}></View>
      </View>
      <View style={{marginTop: 40}}>
        <SelfiVerification
          HeaderText={'Selfie \nVerification'}
          Decription={
            'We use selfies to verify that this profile is yours to keep our community safe and authentic.'
          }
        />
      </View>

      <TouchableOpacity
        onPress={() => {
          ReselfiVerification();
        }}
        style={styles.btn}>
        {loader ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.btnText}>{'Done'}</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Yellow,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: WIDTH / 1,
    marginTop: Platform.OS === 'ios' ? 60 : 40,
  },
  btn: {
    backgroundColor: '#000',
    width: WIDTH / 1.2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 10,
    position: 'absolute',
    bottom: 30,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
  },
});
export default ReSelfiVerifyScreen;
