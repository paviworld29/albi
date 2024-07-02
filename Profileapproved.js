import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
  Platform,
} from 'react-native';
import React from 'react';
import {COLORS, font} from '../Constant/index';
import {hp, wp} from '../Components/Config';
import {IMAGE} from '../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useState } from 'react';
import { ActivityIndicator } from 'react-native';
import { BASE_API } from '../API/Base_Api';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Profileapproved = ({navigation}) => {
  const [loader,setLoder] = useState(false)



  
  const TermandConditionApi = async () => {
    setLoder(true)
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const Token = await AsyncStorage.getItem('token');
    // console.log('dfklsdjflsdjlfj',Token)
     

    myHeaders.append('Authorization', `Bearer ${Token}`);

    var formdata = new FormData();
    formdata.append('terms_conditon', '1');

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
 
    fetch(
      `${BASE_API}accept_terms_condition`,
      requestOptions,
    )
      .then(response => response.json())
      .then(result =>{
        // console.log(result
          // )

        if(result?.success == true){
          navigation.navigate('UserAround');
           setLoder(false);

        }else{
          setLoder(false)
        }
         })
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.Yellow} />

      {Platform.OS === 'ios' ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
          <Image
            source={IMAGE.goBack}
            style={{
              width: 20,
              height: 20,
              top: 50,
              left: 10,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ) : null}
      <View style={{marginTop: 70, alignItems: 'center'}}>
        <Text
          style={{
            color: COLORS.Black,
            fontSize: 18,
            fontWeight: '700',
            fontFamily: font.bold,
          }}>
          Your profile has been approved!
        </Text>

        <Image
          source={IMAGE.GroupGirl}
          style={{width: WIDTH, height: HEIGHT / 4, bottom: 50}}
          resizeMode={'contain'}
        />
        <View style={{height: HEIGHT / 2.4}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={{...styles.agreementText, marginTop: 0}}>
              Hey there! Welcome to the exciting journey of dating with Albi!
            </Text>
            <Text style={styles.agreementText}>
              In our world, we celebrate kindness and respect for everyone,
              regardless of their background, beliefs, appearance, abilities, or
              who they are. Our mission is to create a warm and safe haven
              within Albi, and we invite you to be a part of it by embracing our
              guidelines
            </Text>
            <Text style={styles.agreementText}>
              Always remember, we're your steadfast companions on this journey!
              With love and a sprinkle of Albi essence,
            </Text>

            <Text style={styles.agreementText}>-The Albi Team</Text>
            <View style={{height: 30}}></View>
          </ScrollView>
        </View>
      </View>

      <View style={{position: 'absolute', bottom: 30, alignSelf: 'center'}}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => TermandConditionApi()}>
            {loader?(<ActivityIndicator/>):(<Text style={[styles.ButtonText]}>I agree</Text>)}
          
        </TouchableOpacity>

        <View style={{alignSelf: 'center', bottom: 20}}>
          <TouchableOpacity
          // onPress={() =>
          >
            <Text
              style={{
                color: '#FFFFFF',
                fontSize: 13,
                fontWeight: '600',
                fontFamily: font.semibold,
              }}>
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
    bottom: 40,
    alignSelf: 'center',
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: font.bold,
  },

  agreementText: {
    fontSize: 14,
    color: '#000000B2',
    alignSelf: 'center',
    width: WIDTH / 1.2,
    fontWeight: '400',
    marginTop: 25,
    fontFamily: font.normal,
  },
});

export default Profileapproved;
