import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Platform,
  ActivityIndicator,
} from 'react-native';
import {COLORS, IMAGE, font} from '../../Constant';
import React, {useState} from 'react';
import * as Progress from 'react-native-progress';
import ComponentManager from '../../Components/ComponentManager';
import {useContext} from 'react';
import AppProvider from '../../providers/AppProvider';
import {BASE_API} from '../../API/Base_Api';
import showToast from '../../Components/ShowToast';
import moment from 'moment';
import {PermissionsAndroid} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {DODModel, Popup} from '../../Components/NoticeModel';
import Geolocation from '@react-native-community/geolocation';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const AuthProvider = ({navigation, route}) => {
  const [componetState, setComponetState] = useState(1);
  const [modelvisible, setModelVisible] = useState(false);
  const [message, setMassage] = useState('');

  const {
    phoneNumber,
    SetPhoneNumber,
    OTPValue,
    full_Name,
    setFull_Name,
    last_Name,
    setLast_Name,
    email,
    setEmail,
    dates,
    setDates,
    gender_select,
    setGender_select,
    select,
    setSelect,
    gender_pefer,
    setgender_pefer,
    showMoreInfo,
    setShowMoreInfo,
    country,
    setCountry,
    Secondcountry,
    setSecondCountry,
    setreligion_select,
    selectImage1,
    setSelectImage1,
    capturedImage,
    setCapturedImage,
    checkValidEmail,
    signupLoader,
    setSignupLoader,
    setAdminreview,
    selectedCountry,
    selectedsecondcountry,
    OTPverify,
    setOTPverify,
  } = useContext(AppProvider);
  const age = `${moment().format('YYYY')}` - `${moment(dates).format('YYYY')}`;
  const genderselect =
    gender_select == 1 ? 'Man' : gender_select == 2 ? 'Women' : 'Non-binary';
  const genderpeferselect =
    gender_pefer == 1 ? 'Man' : gender_pefer == 2 ? 'Women' : 'Non-binary';
  const TotalComponet = 13;

  const handleComponent = async () => {
    if (TotalComponet >= componetState) {
      switch (componetState) {
        case 1:
          if (phoneNumber.mobile_number.length >= 4) {
            var formdata = new FormData();
            formdata.append('mobile', phoneNumber.mobile_number);
            formdata.append('type', route?.params?.type);
            formdata.append('country_code', phoneNumber.country_code);
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow',
            };
            fetch(`${BASE_API}mobileVerification`, requestOptions)
              .then(response => response.json())
              .then(result => {
                if (result?.success == true) {
                  showToast(result?.data?.mobile_otp);
                  setOTPverify(result?.data?.mobile_otp);
                  console.log('otp', result);
                  if (route?.params?.type == 'login') {
                    AsyncStorage.setItem('token', result?.token);
                  }
                  setAdminreview(result?.data?.status);
                  setComponetState(componetState + 1);
                  setSignupLoader(false);
                } else {
                  setComponetState(componetState);
                  setModelVisible(!modelvisible);
                  setMassage(result?.error);
                  setSignupLoader(false);
                }
              })
              .catch(error => {
                setSignupLoader(false);
              });
          } else {
            setModelVisible(!modelvisible);
            setMassage('Please enter phone number');
            setSignupLoader(false);
          }
          break;
        case 2:
          if (OTPValue && OTPverify) {
            setSignupLoader(true);
            if (OTPValue == OTPverify) {
              if (route?.params?.type == 'login') {
                setSignupLoader(false);
                navigation.navigate('MyTabs', {screen: 'Home'});
              } else {
                setComponetState(componetState + 1);
                setSignupLoader(false);
              }
            } else {
              setModelVisible(!modelvisible);
              setMassage('Mismatch OTP');
              setSignupLoader(false);
            }
          }
          break;
        case 3:
          if (full_Name && last_Name) {
            setComponetState(componetState + 1);
          } else {
            if (full_Name) {
              setModelVisible(!modelvisible);
              setMassage('Please enter last name');
            } else {
              setModelVisible(!modelvisible);
              setMassage('Please enter first name');
            }
          }
          break;
        case 4:
          if (checkValidEmail == false && email) {
            var formdata = new FormData();
            formdata.append('email', email);
            var requestOptions = {
              method: 'POST',
              body: formdata,
              redirect: 'follow',
            };
            fetch(`${BASE_API}checkEmail`, requestOptions)
              .then(response => response.json())
              .then(result => {
                if (result?.success == false) {
                  setComponetState(componetState + 1);
                  setSignupLoader(false);
                } else {
                  setModelVisible(!modelvisible);
                  setMassage(result?.error);
                  setSignupLoader(false);
                }
              })
              .catch(error => {
                setSignupLoader(false);
              });
          } else {
            setModelVisible(!modelvisible);
            setMassage('Please enter email');
            setSignupLoader(false);
          }
          break;
        case 5:
          if (dates) {
            if (age >= 18) {
              setpopup(!popup);
            } else {
              setModelVisible(!modelvisible);
              setMassage('Please select age 18+');
            }
          }
          break;
        case 6:
          if (gender_select) {
            setComponetState(componetState + 1);
          }
          break;
        case 7:
          if (gender_pefer) {
            setComponetState(componetState + 1);
          }
          break;
        case 8:
          if (select.length <= 5 && select.length > 0) {
            setComponetState(componetState + 1);
          } else {
            setModelVisible(!modelvisible);
            setMassage('Please select up to 5');
          }
          break;
        case 9:
          if (showMoreInfo?.detail) {
            setComponetState(componetState + 1);
          }
          break;
        case 10:
          if (country || Secondcountry) {
            setSignupLoader(true);
            var formdata = new FormData();
            formdata.append('first_name', full_Name);
            formdata.append('last_name', last_Name);
            formdata.append('email', email);
            formdata.append('dob', moment(dates).format('YYYY-MM-DD '));
            formdata.append('gender', genderselect);
            formdata.append('interested_in', genderpeferselect);
            {
              select?.map(e => formdata.append('hobbies[]', e?.detail?.name));
            }
            formdata.append('enable_notification', '1');
            formdata.append('terms_condition', '1');
            formdata.append('countries[]', selectedCountry?.id);
            {
              selectedsecondcountry?.id &&
                formdata.append('countries[]', selectedsecondcountry?.id);
            }

            formdata.append('religious_beliefs[]', showMoreInfo?.detail?.name);
            formdata.append('mobile', phoneNumber.mobile_number);
            formdata.append('country_code', phoneNumber.country_code);
            var requestOptions = {
              method: 'POST',
              url: `${BASE_API}signup`,
              responseType: "json",
              headers: { 
                Accept: "application/json",
                "Content-Type": "multipart/form-data",
            
              },
              data : formdata
            };
            fetch(`${BASE_API}signup`, requestOptions)
              .then(response => response.json())
              .then(result => {
                // console.log('RESPONSE-----------------.....', result);
                if (result?.success == false) {
                  setModelVisible(!modelvisible);
                  setMassage(result?.error);
                  setSignupLoader(false);
                } else {
                  setComponetState(componetState + 1);
                  AsyncStorage.setItem('token', result?.token);
                  setSignupLoader(false);
                }
              })
              .catch(error => {
                setSignupLoader(false);
              });
          }
          break;
        case 11:
          if (selectImage1.length >= 4) {
            setSignupLoader(true)
            var myHeaders = new Headers();
            const Token = await AsyncStorage.getItem('token');    
                    myHeaders.append("Accept", "application/json");
                    myHeaders.append('Authorization', `Bearer ${Token}`);
            
            var formdata = new FormData();
            
                selectImage1?.map(e => {

                  formdata.append(
                    'image[]',
                    {
                      uri: e[0].path,
                      type: e[0].mime,
                      name: e[0].fileName,
                    },
                    e[0].name,
                  );
                });
            
            var requestOptions = {
              method: 'POST',
              headers: myHeaders,
              body: formdata,
              redirect: 'follow'
            };
            fetch(`${BASE_API}imageUpload`, requestOptions)
              .then(response => response.json())
              .then(result => {
                // console.log(result)
              if(result?.success ==true){
                setComponetState(componetState + 1);
            setSignupLoader(false)

              }else{
                setSignupLoader(false)
              }
              })
              .catch(error =>setSignupLoader(false));
            // setComponetState(componetState + 1);
          } else {
            setModelVisible(!modelvisible);
            setMassage('Minimum 4 required');
            setSignupLoader(false)
          }
          break;
        case 12:
          if (capturedImage?.uri) {
            setSignupLoader(true);
            const Token = await AsyncStorage.getItem('token');
            var myHeaders = new Headers();
            myHeaders.append('Accept', 'application/json');
            myHeaders.append('Authorization', `Bearer ${Token}`);
            var formdata = new FormData();
            formdata.append(
              'selfie_image',
              'data:image/png;base64,' + capturedImage?.base64,
            );
            var requestOptions = {
              method: 'POST',
              body: formdata,
              headers: myHeaders,
              redirect: 'follow',
            };
            fetch(`${BASE_API}reuploadSelfieImage`, requestOptions)
              .then(response => response.json())
              .then(result => {
                if (result?.success) {
                  setComponetState(componetState + 1);
                  AsyncStorage.setItem('token', result?.token);
                  setSignupLoader(false);
                } else {
                  setSignupLoader(false);
                }
              })
              .catch(error => {
                setSignupLoader(false);
              });
          }
          break;
        case 13:
          if (Platform.OS === 'android') {
            try {
              const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                  title: 'Access Permission',
                  message: "App needs access to your phone's location.",
                },
              );
              if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                navigation.navigate('SearchFriend');
                SetPhoneNumber('');
                setFull_Name('');
                setLast_Name('');
                setEmail('');
                setDates('');
                setGender_select('');
                setgender_pefer('');
                setSelect('');
                setCountry('');
                setSecondCountry('');
                setreligion_select('');
                setShowMoreInfo('');
                setCapturedImage('');
                setSelectImage1('');
              }
            } catch (error) {}
          } else if (Platform.OS === 'ios') {
            Geolocation.requestAuthorization();
            Geolocation.getCurrentPosition(
              position => {
                if (position?.coords) {
                  navigation.navigate('SearchFriend');
                }
              },
              error => {},
              {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
            );
          }
      }
    }
  };
  const handleBack = () => {
    if (1 < componetState) {
      setComponetState(componetState - 1);
    } else navigation.goBack();
  };
  const [popup, setpopup] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => handleBack()}
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
        <Image
          source={IMAGE.applogo}
          style={{
            width: 80,
            height: 30,
          }}
          resizeMode={'contain'}
        />
        <View style={{width: 20}}></View>
      </View>
      <View style={{alignSelf: 'center', marginTop: 40}}>
        <Progress.Bar
          progress={componetState / TotalComponet}
          width={WIDTH / 1.2}
          height={6}
          color={'#000'}
          padding={0}
          borderRadius={100}
          borderWidth={2}
        />
      </View>
      <View style={{width: WIDTH, height: HEIGHT / 1.45, marginTop: 10}}>
        <ComponentManager
          components={componetState}
          type={route?.params?.type}
        />
        <DODModel
          onclose={val => {
            setpopup(!popup);
          }}
          modelvisible={popup}
          dates={dates}
          onRetrun={() => {
            setComponetState(componetState + 1);
            setpopup(!popup);
          }}
        />
      </View>
      <Popup
        onclose={val => {
          setModelVisible(!modelvisible);
        }}
        modelvisible={modelvisible}
        alerts={'Alert'}
        message={message}
        single={'single'}
        onRetrun={() => {
          setModelVisible(!modelvisible);
        }}
      />
      <TouchableOpacity onPress={handleComponent} style={styles.btn}>
        {signupLoader ? (
          <ActivityIndicator />
        ) : (
          <Text style={styles.btnText}>
            {route?.params?.type == 'login'
              ? componetState == 2
                ? 'Done'
                : 'Next'
              : componetState == 12
              ? 'Done'
              : componetState == 13
              ? 'Allow Location'
              : 'Next'}
          </Text>
        )}
      </TouchableOpacity>
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
    marginTop: Platform.OS === 'ios' ? 70 : 40,
  },
  btn: {
    backgroundColor: '#000',
    width: WIDTH / 1.2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 10,
  },
  btnText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: font.bold,
  },
});

export default AuthProvider;
