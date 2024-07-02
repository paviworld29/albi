import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Pressable,
  Platform,
} from 'react-native';
import React from 'react';
import {COLORS, font} from '../Constant/index';
import {hp, wp} from '../Components/Config';
import {IMAGE} from '../Constant';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const MatchScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.Yellow} />
      <View style={styles.header}> 

      {Platform.OS === 'ios' ?(
         <TouchableOpacity style={{width:30,height:30,borderRadius:40}}
         onPress={() => navigation.goBack()}
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
    <View style={{width: 20}}></View>
   )}
   </View>

      <View style={{marginTop:30, alignItems: 'center'}}>
        <Image
          source={IMAGE.MatchScreenLogo}
          style={{width:335, height: 321}}
          resizeMode={'contain'}
        />

        <View style={{alignSelf: 'center', width: WIDTH / 1.3}}>
          <Text
            style={{
              color: COLORS.Black,
              fontSize: 30,
              fontWeight: '600',
              textAlign: 'center',
              // marginTop: 20,
              fontFamily:font.semibold
            }}>
            You matched with Halla!
          </Text>
        </View>

        <View style={{marginTop: 15}}>
          <Text style={styles.agreementText}>
            Start a conversation now with each other.
          </Text>
        </View>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.goBack()}>
          <Text style={[styles.ButtonText]}>Say Hello!</Text>
        </TouchableOpacity>

        <View style={{marginTop: 15}}>
          <TouchableOpacity
            style={styles.swipingbtn}
            onPress={() => navigation.goBack()}>
           
          </TouchableOpacity>
          <Text
              style={{color: COLORS.Black, fontSize: 16, fontWeight: '600',position:'absolute',alignSelf:'center',top:20, fontFamily:font.bold}}>
              Keep Swiping
            </Text>
          
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
    paddingVertical: 20,
    width: WIDTH / 1.2,
    backgroundColor: COLORS.Black,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: HEIGHT / 14,
  },
  header: {
    flexDirection: 'row',
    // justifyContent: 'space-around',
    // alignSelf: 'center',
    width: WIDTH / 1,
    marginTop: 65,
    marginLeft:20,

  },
  swipingbtn: {
    paddingVertical: 30,
    width: WIDTH / 1.2,
    backgroundColor: '#000',
    borderRadius: 15,
    alignItems: 'center',
    opacity:0.1
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    fontFamily:font.bold
  },

  agreementText: {
    fontSize: 14,
    color: '#000000B2',
    fontFamily:font.normal,
    fontWeight:'400'
  },
});

export default MatchScreen;
