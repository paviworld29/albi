import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import {COLORS, IMAGE, font} from '../Constant/index';
import {hp, wp} from '../Components/Config';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const SearchFriend = ({navigation}) => {
const accesstoContact =async()=>{
 
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      );
      // console.log('contact',granted)
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        navigation.navigate('EnableNotification');
      }
    } catch (error) {}
  

}
  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.Yellow} />
      <View style={{flexDirection:'row',justifyContent:'space-between',width:WIDTH/1.2,alignSelf:'center',marginTop:25}}>
{Platform.OS==='ios'?(
   <TouchableOpacity
   onPress={() => navigation.goBack()}
   style={{alignSelf: 'center', top:15}}>
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
  <View style={{width:20}}></View>
)}
       <TouchableOpacity 
       onPress={()=>{
        navigation.navigate('EnableNotification');
       }}
       style={{alignSelf: 'center', }}>
        <Text
          style={{
            color: '#000000',
            fontWeight: '700',
            fontSize: 16,
            marginTop: 35,
            fontFamily:font.bold,

          }}>
          Skip
        </Text>
      </TouchableOpacity>
      </View>
     

      <Image
        source={IMAGE.Friend}
        style={{
          width: WIDTH / 1,
          height: HEIGHT / 2.3,
          marginTop: Platform.OS==='ios'?40: 25,
          alignSelf: 'center',

        }}
        resizeMode={'contain'}
      />
      <View style={{marginTop: 20, alignItems: 'center'}}>
        <Text style={{color: COLORS.Black, fontSize: 24, fontWeight: '700',fontFamily:font.bold}}>
          Search Friends
        </Text>
      </View>
      <View style={{marginTop: 10}}>
        <Text style={styles.agreementText}>
          You can find friends from your connected {'\n'}contact list.
        </Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() =>
          Platform.OS=='android'?accesstoContact():navigation.navigate('EnableNotification')
        //  navigation.navigate('EnableNotification')
         }>
        <Text style={[styles.ButtonText]}>Access to contact list</Text>
      </TouchableOpacity>
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
    position: 'absolute',
    bottom: 45,
    alignSelf: 'center',
  },
  agreementText: {
    fontSize: 14,
    textAlign: 'center',
    color: '#000000B2',
    fontWeight: '400',
    fontFamily:font.normal
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: '700',
    fontFamily:font.bold,
    color: '#FFFFFF',
  },
});

export default SearchFriend;
