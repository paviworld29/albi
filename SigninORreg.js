import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import {hp, wp} from '../../Components/Config';
import { Platform } from 'react-native';
import { COLORS, IMAGE, font } from '../../Constant';


const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SigninORreg = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}> 

{/* {Platform.OS === 'ios' ?(
   <TouchableOpacity
   onPress={() => navigation.goBack()}
   style={{marginTop:25}}
   >
   <Image
     source={IMAGE.goBack}
     style={{
       width: 20,
       height: 20,
       
     }}
     resizeMode={'contain'}
   />
 </TouchableOpacity>
):(
null)} */}
</View>
    <ScrollView>
    <Image
        source={require('..//../Constant/Images/Logoalbi.png')}
        style={{
          width: WIDTH / 1.3,
          height: HEIGHT / 4,
          alignSelf: 'center',
          marginTop: 50,
        }}
        resizeMode={'contain'}





        
      />
      <View style={{ alignItems: 'center',marginTop:35}}>
        <Text style={{color: COLORS.Black, fontSize: 18, fontWeight: '700',fontFamily:font.bold}}>
          Sign in or register to continue
        </Text>

          <TouchableOpacity  style={styles.button}onPress={() => navigation.navigate('SignupScreen')}>
            <Text style={[styles.ButtonText]}>Sign In</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{...styles.button,backgroundColor:'#000',marginTop:20}} onPress={() => navigation.navigate('AuthProvider',{type:'signup'})}>
            <Text style={[styles.ButtonText,{color:'#fff'}]}>Create account</Text>
          </TouchableOpacity>

        <View style={{marginTop: hp(10), flexDirection: 'row'}}>
          <Text style={styles.agreementText}>
            By signing in you agree to our{' '}
          </Text>
          <Text
            // onPress={() => navigation.navigate('Terms')}
            style={{
              fontWeight: '500',
              color: COLORS.Black,
              textDecorationLine: 'underline',
              fontSize: 12,
              fontFamily:font.medium,
            }}>
            Terms{' '}
          </Text>
          <Text style={styles.agreementText}>Learn how we</Text>
        </View>
        <View style={{marginTop: 5, flexDirection: 'row'}}>
          <Text style={styles.agreementText}>process your data in our </Text>
          <Text
            // onPress={() => navigation.navigate('PrivacyPolicy')}
            style={{
              fontWeight: '500',
              color: COLORS.Black,
              textDecorationLine: 'underline',
              fontSize: 12,
              fontFamily:font.medium,
            }}>
            Privacy Policy{' '}
          </Text>
          <Text style={styles.agreementText}>and</Text>
          <Text
            // onPress={() => navigation.navigate('Cookies')}
            style={{
              fontWeight:'500',
              color: COLORS.Black,
              textDecorationLine: 'underline',
              fontSize: 12,
              fontFamily:font.medium,

            }}>
            Cookies.
          </Text>
        </View>

        <View style={{ alignItems: 'center', marginTop: 30}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TroubleSigning')}>
            <Text
              style={{color: COLORS.Black, fontSize: 12, fontWeight: '400',fontFamily:font.normal,}}>
              Trouble Signing in?
            </Text>
          </TouchableOpacity>
        </View>
        
      </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Yellow,
    // alignItems: 'center',
    // paddingHorizontal: 20,
  },
  button: {
    width: wp(80),
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 15,
    marginTop: hp(10),
    alignSelf: 'center',
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignSelf: 'center',
    // width: WIDTH / 1,
    marginTop: 30,
    marginLeft:30
  },
  ButtonText: {
    fontSize: 18,
    fontWeight: '600',
    fontFamily:font.semibold,
    color: COLORS.Black,
  },
  button2: {
    width: wp(80),
    backgroundColor: COLORS.Black,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    paddingVertical: 15,

    marginTop: hp(3),
    alignSelf: 'center',
  },
  ButtonText1: {
    fontSize: 18,
    fontWeight: 'bold',

    color: '#FFFFFF',
  },

  agreementText: {
    fontSize: 12,
    textAlign: 'center',
    color: COLORS.Black,
    fontFamily:font.normal,
    fontWeight:'400'
  },
  linkText: {
    color: COLORS.Black,
    fontWeight: 'bold',
    textDecorationLine: 'underline',
  },
});

export default SigninORreg;
