import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
} from 'react-native';
import React from 'react';
import {COLORS, font} from '../Constant/index';
import {hp, wp} from '../Components/Config';
import {IMAGE} from '../Constant';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const ProfileDenied = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.Yellow} />
      {Platform.OS==='ios' ?(
   <TouchableOpacity
   onPress={() => navigation.goBack()}
   style={{}}>
   <Image
     source={IMAGE.goBack}
     style={{
       width: 20,
       height: 20,
       top:50,left:30
      
     }}
     resizeMode={'contain'}
   />
 </TouchableOpacity>
):(
null
)}
      <Image
        source={IMAGE.OnBoardingFirst}
        style={{
          width: WIDTH / 1.3,
          height: HEIGHT / 6,
          alignSelf: 'center',
          marginTop: 40,
        }}
        resizeMode={'contain'}
      />
      <View style={{marginTop: 15, alignItems: 'center'}}>
        <Text style={{color: COLORS.Black, fontSize: 18, fontWeight: '700',fontFamily:font.bold}}>
          Your profile needs some fixin’
        </Text>

        <Image
          source={IMAGE.Sad}
          style={{
            width: WIDTH / 1,
            height: HEIGHT / 2.8,
            bottom: 2,
            marginLeft: 50,
          }}
          resizeMode={'contain'}
        />

        <Text style={styles.agreementText}>
          Oops, it seems your profile didn't meet our guidelines. Take a look at
          our guidelines to ensure your photos match our standards for joining
          our community. Give it another shot!
        </Text>
      </View>
      <View style={{position: 'absolute', bottom: 50, alignSelf: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('ReSelfiVerifyScreen')}>
          <Text style={[styles.ButtonText]}>Reupload Photos</Text>
        </TouchableOpacity>

        <View style={{marginTop: 12, alignItems: 'center'}}>
          <TouchableOpacity
            onPress={() => navigation.navigate('TroubleSigning')}>
            <Text style={{color: '#FFFFFF', fontSize: 13, fontWeight: '600',fontFamily:font.semibold}}>
              Contact Support
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Yellow,
    paddingHorizontal: 20,
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
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily:font.bold
  },

  agreementText: {
    fontSize: 14,
    lineHeight: 20,
    color: '#000000B2',
    textAlign: 'left',
    marginTop: 8,
    fontWeight: '400',
    alignSelf: 'center',
    width:WIDTH/1.31,
    fontFamily:font.normal
  },
});

export default ProfileDenied;
