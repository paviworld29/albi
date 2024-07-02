// ----- import react
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import { useContext, useEffect, useState } from 'react';
import {BASE_API} from '../API/Base_Api';
// ----- use constant for colors,font
import {COLORS, font} from '../Constant/index';
// ----- use config for height/width
import {hp, wp} from '../Components/Config';
// import image
import {IMAGE} from '../Constant';
import AppProvider from '../providers/AppProvider';
import showToast from '../Components/ShowToast';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ----- take dimension
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;



const Review = ({navigation}) => {
  const GetUserApi = async () => {
    const Token = await AsyncStorage.getItem('token');
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
        AsyncStorage.setItem('status', result?.data?.selfie_verification);
        // console.log('fklfk',result)
       
       
      })
      .catch(error => console.log('error', error));
  };


  useEffect(() => {
    GetUserApi()
  }, []);

  
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.Yellow} />
      <Image
        source={IMAGE.OnBoardingFirst}
        style={{
          width: WIDTH / 1.3,
          height: HEIGHT / 6,
          alignSelf: 'center',
          marginTop: hp(7),
        }}
        resizeMode={'contain'}
      />
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={{color: COLORS.Black, fontSize: 18, fontWeight: '700',fontFamily:font.bold}}>
          Your Profile is under review
        </Text>

        <View>
          <Image
            source={IMAGE.Happy}
            style={{width: WIDTH / 1, height: HEIGHT / 2.5}}
            resizeMode={'contain'}
          />
        </View>

        <View style={{alignSelf:'center'}}>
          <Text style={styles.agreementText}>
            We're making sure you are who you say you are! Reviews can take up
            to 24hrs and we will notify you once it's complete!
            {'\n'}
            {'\n'}
            Make sure your profile always follows our photo guidelines to join
            our community. Check out our{' '}
            <Text style={{textDecorationLine: 'underline'}}>guidelines</Text>{' '}
            for more details.
          </Text>
          
        </View>
        <Text style={styles.agreementText}>
           
          </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Yellow,
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  agreementText: {
    fontSize: 14,
    color: '#000000B2',
    fontWeight:'400',
    width:WIDTH/1.2,
    fontFamily:font.normal
  },
});

export default Review;
