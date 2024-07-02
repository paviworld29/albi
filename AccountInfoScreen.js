import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import React, { useContext, useState } from 'react';
import {COLORS, IMAGE, font} from '../Constant/index';
import ToggleSwitch from 'toggle-switch-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API } from '../API/Base_Api';
import { useEffect } from 'react';
import showToast from '../Components/ShowToast';
  
const AccountInfoScreen = ({navigation}) => {
  
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();


  useEffect(() => {
  getUserData();
  }, [])
 
     const getUserData= async()=>{
    const Token = await AsyncStorage.getItem('token');
  //  console.log(Token)
  var myHeaders = new Headers();
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", `Bearer ${Token}`);
  
 
  var requestOptions = {
    method: 'GET',
    headers: myHeaders,
     redirect: 'follow'
  };
  
  fetch(`${BASE_API}getUser`, requestOptions)
  .then(response => response.json())
  .then(result =>{
    if(result?.data){
      // setUserDetail(result?.data)
      console.log('result?.data?.country_code', result?.data)  
      // Set COUNTRY_CODE & PHONE
      setPhone(`${result?.data?.country_code == undefined || null ? '' : 
        result?.data?.country_code }${' '}${result?.data?.mobile}`)
      // Set EMAIL 
        setEmail(result?.data?.email)
    }
  }
     )
  .catch(error => console.log('error', error));
     };

     const handlePhone=(val)=>{
         setPhone(val);
     };

     const handleCheckEmail = (val) => {
      let re = /\S+@\S+\.\S+/;
      let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
      
      if (re.test(val) || regex.test(val)) {
        setEmail(val);
      }
    };


    const AccountInfoApi = async ({type}) => {

  var myHeaders = new Headers();

  const Token = await AsyncStorage.getItem('token');
      if(phone||email){
        myHeaders.append("Authorization", `Bearer ${Token}`);
      myHeaders.append("Accept", "application/json");
    
      var formdata = new FormData();
      if(type == "Phone"){
        formdata.append("mobile", phone);
        formdata.append("type", "mobile");
    
      }else if(type === "Email"){
        formdata.append("email", email);
        formdata.append("type", "email");
      }
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow'
    };
    
    fetch(`${BASE_API}accountInfo`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log(result)
        if(result?.success && type == "Phone"){
            showToast('Your Phone Number is Updated successfully')
        } else if(result?.success && type == "Email"){
          showToast('Your Email Id is Updated successfully')
        }
        // getUserData()
      })
      .catch(error => console.log('error', error));
      }
}


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack('ContactScreen')}
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
        <Text style={{fontSize: 18, fontWeight: '600', color: '#101010',fontFamily:font.semibold}}>
          Account Info
        </Text>
        <View style={{width: 20}}></View>
      </View>
      <View style={styles.horizontalLine} />
      <Text
        style={{
          marginTop: 20,
          fontSize: 14,
          fontWeight: '500',
          color: '#101010',
          marginLeft: 28,
          fontFamily:font.medium
        }}>
        Phone Number
      </Text>

      <View style={styles.input}>
        <Text
          style={{
            fontSize: 16,
            fontWeight: '400',
            color: '#101010',
            marginLeft: 10,
            alignSelf: 'center',
            fontFamily:font.normal,
            paddingVertical: Platform.OS == 'ios'?8:7
          }}>
        </Text>
        <TextInput 
          defaultValue={phone}
          placeholderTextColor={'#101010'}
          style={{...styles.textinput,paddingLeft: 6}}
          onChangeText= {(val)=>handlePhone(val)}
          maxLength={20}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity onPress={()=> AccountInfoApi({type:"Phone"})}>
      <Text
        style={{
          marginTop: 15,
          fontSize: 14,
          fontWeight: '600',
          color: '#101010',
          marginLeft:28,
          fontFamily:font.semibold
        }}>
        Update My Phone Number
      </Text>
      </TouchableOpacity>
      <View style={styles.horizontalLinehalf} />

      <Text
        style={{
          marginTop: 15,
          fontSize: 14,
          fontWeight: '500',
          color: '#101010',
          marginLeft:28,
          fontFamily:font.medium
        }}>
        Email Address
      </Text>

      <TextInput
        defaultValue={email}
        placeholderTextColor={'#101010'}
        style={{...styles.input,paddingVertical:15,paddingLeft: 15}}
        onChangeText= {val => {handleCheckEmail(val)}}

      />
      <TouchableOpacity onPress={()=> AccountInfoApi({type:"Email"})}>
      <Text
        style={{
          marginTop: 15,
          fontSize: 14,
          fontWeight: '600',
          color: '#101010',
          marginLeft:28,
          fontFamily:font.semibold
        }}>
        Update My Email Address
      </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Yellow,
  },
  input: {
    width: WIDTH / 1.15,
    paddingVertical: 4,
    borderColor: 'gray',
    flexDirection: 'row',
    borderRadius: 15,
    backgroundColor: 'white',
    alignSelf: 'center',
    marginTop: 10,
  },
  textinput: {
    width: WIDTH / 1.3,
    fontSize: 16,
    fontFamily:font.normal,
    paddingVertical:8
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: WIDTH / 1,
    marginTop: 60,
  },
  horizontalLinehalf: {
    height: 1,
    backgroundColor: '#858585',
    marginVertical: 10,
    border: 1,
    width: WIDTH / 1.1,

    alignSelf: 'center',
    marginTop: 23,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#858585',
    marginVertical: 10,
    border: 1, 
    // width: WIDTH / 1.1,

    // alignSelf: 'center',
  },
});
export default AccountInfoScreen;
