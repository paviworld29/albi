import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  Button,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import React, {useState} from 'react';
import {hp, wp} from '../Components/Config';

import {COLORS, IMAGE, font} from '../Constant/index';
import Modal from 'react-native-modal';
import { ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API } from '../API/Base_Api';
import showToast from '../Components/ShowToast';
import { Popup } from '../Components/NoticeModel';
import AppProvider from '../providers/AppProvider';

const ContactScreen = ({navigation}) => {
  const [modelLogoutOpen, modelLogoutClose] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [popup, setpopup] = useState(false);
const{ItemIdUser, setItemIdUser} = useState(AppProvider)
  
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };


const DeleteUserApi = async () => {


  var myHeaders = new Headers();

  const Token = await AsyncStorage.getItem('token')
 console.log(Token)

  myHeaders.append("Authorization", `Bearer ${Token}`);
  myHeaders.append("Accept", "application/json");


  var formdata = new FormData();
  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: {},
    // redirect: 'follow'
  };


  fetch(`${BASE_API}deleteAccount`, requestOptions)
  .then(response => response.json())
  .then(result =>{ 
    if(result?.success){
      showToast('Your account is deleted successfully.')
      setModalVisible(!isModalVisible)
      AsyncStorage.removeItem('token');
      navigation.navigate('SigninORreg')


    }console.log(result)})
  .catch(error => console.log('error', error));


}

const handleUserLogout = async() =>{

  try {
    // const Token = await AsyncStorage.getItem('token')
    await AsyncStorage.removeItem('@homeScreen')
     await AsyncStorage.removeItem('token');
     await AsyncStorage.removeItem('status');

     navigation.navigate('SigninORreg')
    
  } catch (error) {
      alert(error)
  }

}


  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{alignSelf: 'center', right: 20}}>
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
          source={IMAGE.Frame}
          style={{
            width: 41,
            height: 37,
          }}
          resizeMode={'contain'}
        />
        <View style={{width: 20}}></View>
      </View>
<View style={{height:HEIGHT/1.1}}>
<ScrollView>
  
  <TouchableOpacity 
          onPress={() => navigation.navigate('AccountInfoScreen')}
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: hp(9),
            width: WIDTH / 1.15,
            marginVertical:10
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#101010',fontFamily:font.semibold,}}>
            Account Info
          </Text>
          <Image
            source={IMAGE.greaterthanicon}
            style={{
              width: 21.3,
              height: 20,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
  
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            width: WIDTH / 1.15,
            marginVertical:10
          }}
          onPress={() => navigation.navigate('Notifications')}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#101010',fontFamily:font.semibold,}}>
            Notifications
          </Text>
          <Image
            source={IMAGE.greaterthanicon}
            style={{
              width: 21.3,
              height: 20,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
  
        <TouchableOpacity 
        // onPress={()=>navigation.navigate('PreviewProfileScreen')}
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            width: WIDTH / 1.15,
            marginVertical:10
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#101010',fontFamily:font.semibold,}}>
            Help & Support
          </Text>
          <Image
            source={IMAGE.greaterthanicon}
            style={{
              width: 21.3,
              height: 20,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
  
        <TouchableOpacity
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            width: WIDTH / 1.15,
            marginVertical:10
          }}
          onPress={() => navigation.navigate('Aboutalbi')}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#101010',fontFamily:font.semibold,}}>
            About Albi
          </Text>
          <Image
            source={IMAGE.greaterthanicon}
            style={{
              width: 21.3,
              height: 20,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
  
        <TouchableOpacity 
        // onPress={()=>navigation.navigate('ViewFeaturesScreen')}
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            width: WIDTH / 1.15,
            marginVertical:10
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#101010',fontFamily:font.semibold,}}>
            Terms & Policies
          </Text>
          <Image
            source={IMAGE.greaterthanicon}
            style={{
              width: 21.3,
              height: 20,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
  
        <TouchableOpacity 
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            width: WIDTH / 1.15,
            marginVertical:10
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#101010',fontFamily:font.semibold,}}>
            Restore Purchase
          </Text>
          <Image
            source={IMAGE.greaterthanicon}
            style={{
              width: 21.3,
              height: 20,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
  
        <TouchableOpacity  onPress={() => navigation.navigate('Mysubscription')}
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            width: WIDTH / 1.15,
            marginVertical:10
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#101010',fontFamily:font.semibold,}}>
            My Subscription
          </Text>
          <Image
            source={IMAGE.greaterthanicon}
            style={{
              width: 21.3,
              height: 20,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
  
        <Modal isVisible={isModalVisible}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 19,
              paddingVertical:25
            }}>
            <View
              style={{
                alignSelf: 'center',
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: WIDTH / 1.2,
  
                // marginTop: ,
              }}>
              <View></View>
              <Text style={{color: '#000000', fontSize: 16, fontWeight: 'bold',fontFamily:font.medium}}>
                Notice
              </Text>
              <TouchableOpacity onPress={()=>setModalVisible(!isModalVisible)}>
                <Image
                  source={IMAGE.closesecond}
                  style={{
                    width: 12,
                    height: 12,
                    left: 20,
                  }}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
  
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontWeight: '400',
                textAlign: 'center',
                marginTop: 20,
                width:WIDTH/1.4,
                alignSelf:'center',
                fontFamily:font.normal
              }}>
              Are you sure you want to delete <Text style={{fontWeight:'bold'}}>your</Text> account?
              {/* This cannot be undone. */}
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: 15,
                fontWeight: '400',
                textAlign: 'center',
                marginTop: 25,
                width:WIDTH/1.4,
                alignSelf:'center',
                fontFamily:font.normal
              }}>
              This cannot be undone.
            </Text>
            <TouchableOpacity style={styles.button} onPress={()=>{DeleteUserApi()}}>
              <Text style={[styles.ButtonText]}>Delete Account</Text>
            </TouchableOpacity>
          </View>
        </Modal>
  
        <TouchableOpacity
          onPress={toggleModal}
          style={{
            alignSelf: 'center',
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: 10,
            width: WIDTH / 1.15,
            marginVertical:10
          }}>
          <Text style={{fontSize: 16, fontWeight: '600', color: '#101010',fontFamily:font.semibold,}}>
            Delete Account
          </Text>
  
          <Image
            source={IMAGE.greaterthanicon}
            style={{
              width: 21.3,
              height: 20,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <View style={styles.horizontalLine} />
        <Popup
          onclose={val => {
            handleUserLogout()
            setpopup(!popup);
          }}
          modelvisible={popup}
          alerts={'Logout'}
          message={'Are you sure you want to Logout?'}
          onRetrun={() => {
       
            setpopup(!popup);
          }}
        />
        <TouchableOpacity onPress={()=> setpopup(!popup)}>
          <Text
            style={{
              color: '#101010',
              fontSize: 16,
              fontWeight: '500',
              marginTop: 25,
              alignSelf: 'center',
              fontFamily:font.medium
            }}>
            Logout
          </Text>
        </TouchableOpacity>
        <View style={{height:20}}>

        </View>
        <NoticeModel
      onclose={val=>{
        handleUserLogout();
        modelLogoutClose(!modelLogoutOpen);
      }}
      modelvisible={modelLogoutOpen}
      modelbtnTitle={'Logout'}
      Notice={'Notice'}
      description={`Are you sure you want to logout?`}
      note={'This cannot be undone.'}
      onRetrun={() => {
         
        modelLogoutClose(!modelLogoutOpen);
      }}
      />
  </ScrollView>
</View>
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
    marginTop: 65,
  },
  button: {
    paddingVertical: 15,
    width: WIDTH / 1.5,
    backgroundColor: COLORS.Black,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop:30
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily:font.semibold
  },

  horizontalLine: {
    height: 1,
    backgroundColor: '#858585',
    marginVertical: 10,
    border: 1,
    width: WIDTH / 1.1,

    alignSelf: 'center',
  },
});
export default ContactScreen;
