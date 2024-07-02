import {View, Image, TouchableOpacity, Dimensions, Text} from 'react-native';
import React, { useState } from 'react';
import {IMAGE, font} from '../Constant';
import { BASE_API } from '../API/Base_Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const {width, height} = Dimensions.get('screen');


const Footer = ({handleChoice,data}) => {
const [like ,unlike] = useState(false)
  const UserLikeApi =async()=>{
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
myHeaders.append("Accept", "application/json");
myHeaders.append('Authorization', `Bearer ${Token}`);

var formdata = new FormData();
formdata.append("user_id", data?.matri_id);
formdata.append("status", like == true ? 1:0);

var requestOptions = {
  method: 'POST',
  headers: myHeaders,
  body: formdata,
  redirect: 'follow'
};

fetch(`${BASE_API}likeuser`, requestOptions)
.then(response => response.text())
  .then(result => 
    console.log('like',result)
    )
  .catch(error => console.log('error', error));
  }
  return (
    <View
      style={{
        position:'absolute',
        bottom: 40,
        width: width / 1.2,
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        
      }}>
      <TouchableOpacity
      onPress={()=>{
        if(handleChoice){
          handleChoice()
        }
      }}
        style={{
          alignSelf: 'center',
          width: 44,
          height: 44,
          borderRadius: 50,
          backgroundColor: '#000',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={IMAGE.rever}
          style={{
            width: 18,
            height: 20,
          }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
      <View>
        <Text style={{color: '#000', fontSize: 20, fontWeight: '700',fontFamily:font.bold,alignSelf:'center'}}>
          {`${data.first_name? `${data.first_name}${','}`:''}  ${data.age? data.age:''}` }
        </Text>
        <Text
          style={{
            color: '#fff',
            fontSize: 14,
            fontWeight: '500',
            fontFamily:font.medium,
            textAlign: 'center',
            alignSelf:'center'
          }}>{`${data.city? data.city:''} ${' '}${data.state? `${data.state}${','}`:''} ${' '}\n ${data.country? data.country:''}`}</Text>
      </View>
      <TouchableOpacity 
      onPress={()=>{
        // UserLikeApi()
        // unlike(!like)
      }}
      style={{
          alignSelf: 'center',
          width: 44,
          height: 44,
          borderRadius: 50,
          backgroundColor: '#d42b31',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Image
          source={IMAGE.like}
          style={{
            width: 22,
            height: 19,
          }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Footer;
