import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS, font} from '../../Constant';
import {hp, wp} from '../../Components/Config';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

import React from 'react';
import {ScrollView} from 'react-native';

const SignupScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <ScrollView>
        <Image
          source={require('..//../Constant/Images/Logoalbi.png')}
          style={{
            width: WIDTH / 1.3,
            height: HEIGHT / 4,
            alignSelf: 'center',
            marginTop: hp(12),
          }}
          resizeMode={'contain'}
        />

        <View style={{marginTop: hp(3), alignSelf: 'center'}}>
          <Text style={styles.agreementText}>
            {`By tapping sign up or log in, you agree to our terms.\nLearn how we process your data in our`}{' '}
            <Text
              style={{
                fontWeight: '600',
                color: COLORS.Black,
                textDecorationLine: 'underline',
                fontSize: 12,
                fontFamily:font.semibold
              }}>
              {' '}
              Privacy Policy.
            </Text>
          </Text>
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate('AuthProvider',{type:'login'})}
          style={{...styles.button,marginTop:80}}>
          <Text style={[styles.ButtonText]}>Sign in with Phone Number</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={()=>{navigation.navigate('MyTabs',{ screen: 'Home' })}}
          style={{...styles.button2, backgroundColor: '#000'}}>
          <Image
            source={require('..//../Constant/Images/applelogo.png')}
            style={{
              width: 16,
              height: 19,
              alignSelf:'center',
              bottom:2
            }}
            resizeMode='contain'
          />
          <Text style={[styles.ButtonText1]}> Sign in with Apple</Text>
        </TouchableOpacity>

        <TouchableOpacity
          // onPress={() => navigation.navigate('Sign In')}
          style={{...styles.button2, backgroundColor: '#3B64CD'}}>
          <Image
            source={require('..//../Constant/Images/facebooklogo.png')}
            style={{
              width: 10,
              height: 19,
              marginLeft: 15,
              bottom:2
            }}
          />
          <Text style={[styles.ButtonText1]}> Sign in with Facebook</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{...styles.button2, backgroundColor: '#EA6868'}}>
          <Image
            source={require('..//../Constant/Images/googlelogo.png')}
            style={{
              width: 17,
              height: 19,
              bottom:2
            }}
          />
          <Text style={[styles.ButtonText1]}> Sign in with Google</Text>
        </TouchableOpacity>
        <View style={{alignItems: 'center', marginTop: 25}}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}>
            <Text style={{color: '#2B2A28', fontSize: 13, fontWeight: '400',fontFamily:font.normal}}>
              Back
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
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
  button: {
    width: wp(80),
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 15,
    marginTop: hp(6),
    alignSelf: 'center',
  },
  button2: {
    width: wp(80),
    backgroundColor: COLORS.Black,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: hp(2),
    alignSelf: 'center',
    paddingVertical: 15,
  },

  agreementText: {
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.Black,
    lineHeight: 20,
    fontWeight: '400',
    fontFamily: font.normal,
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: font.semibold,
    color: COLORS.Black,
  },
  ButtonText1: {
    fontSize: 15,
    fontWeight: '600',
    fontFamily: font.semibold,
    marginLeft: 10,
    color: '#FFFFFF',
    // alignSelf:'center'
  },
});
export default SignupScreen;
