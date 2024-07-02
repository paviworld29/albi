import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  Platform,
  RefreshControl,
  ActivityIndicator,
  FlatList,
  Animated,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const {width, height} = Dimensions.get('screen');
import react, {useCallback, useEffect, useRef} from 'react';
import {COLORS, IMAGE, font} from '../Constant/index';
import ToggleSwitch from 'toggle-switch-react-native';
import {useState} from 'react';
import Swiper from 'react-native-swiper';
import LinearGradient from 'react-native-linear-gradient';
import {hp} from '../Components/Config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_API, ImageUrl} from '../API/Base_Api';
import {Alert} from 'react-native';
import PlanPaginations from '../Components/PlanPagination';
import PlanCard from '../Components/PlanCard';
import {useNavigation} from '@react-navigation/native';

const PreviewProfileScreen = ({}) => {
  const navigation = useNavigation();
  const [getplan, setGetplan] = useState([]);
  const [userDetail, setUserDetail] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [loader, setLoader] = useState(false);
  useEffect(() => {
    GetUserApi();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      GetUserApi();
    }, 2000);
  }, []);

  const GetUserApi = async () => {
    setLoader(true);
    const Token = await AsyncStorage.getItem('token');
    //  console.log(Token)
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}getUser`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('fgjkfjfj', result?.data?.selfie_image);
        if (result?.data) {
          setUserDetail(result?.data);
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch(error => console.log('error', error));
  };
// console.log('im',ImageUrl + userDetail?.selfie_image,userDetail)
  return (
    <View style={styles.container}>
      <View
        style={{
          alignSelf: 'center',
          marginTop: 60,
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: width / 1.1,
        }}>
        {/* <View style={{width: 40}}></View> */}

        {Platform.OS === 'ios' ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              alignSelf: 'center',
              right: 20,
              width: 30,
              height: 30,
              borderRadius: 40,
            }}>
            <Image
              source={IMAGE.goBack}
              style={{
                width: 20,
                height: 20,
              }}
              resizeMode={'contain'}
            />
          </TouchableOpacity>
        ) : (
          <View style={{width: 20}}></View>
        )}

        <Image
          source={IMAGE.applogo}
          style={{
            width: 82,
            height: 32,
          }}
          resizeMode={'contain'}
        />
        <TouchableOpacity
          onPress={() => navigation.navigate('Contact')}
          style={{alignSelf: 'center'}}>
          <Image
            source={IMAGE.settingicon}
            style={{
              width: 31,
              height: 30,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        {/* {loader ? (
          <ActivityIndicator
            style={{
              height: HEIGHT / 3,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        ) : ( */}
          <>
         {/* { console.log('lll',userDetail?.user_images[0]?.image)} */}
            <View style={{alignSelf: 'center', marginTop: 50}}>
              <Image
                source={
                  userDetail?.user_images?.[0]?.image
                    ? {uri:ImageUrl+ userDetail?.user_images[0]?.image}
                    :
                     IMAGE.profile_pic
                }
                style={{
                  width: WIDTH/3,
                  height: HEIGHT/5.5,
                  borderRadius:20

                }}
                resizeMode={'contain'}
              />
            </View>
            <View
              style={{
                marginTop: 15,
                flexDirection: 'row',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: COLORS.Black,
                  fontSize: 24,
                  fontWeight: '700',
                  fontFamily: font.bold,
                }}>
                {userDetail?.name}
              </Text>

              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => navigation.navigate('EditProfileScreen')}>
                <Image
                  source={IMAGE.edit}
                  style={{
                    width: 19,
                    height: 25,
                    marginLeft: 20,
                  }}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 10}}>
              <Text
                style={{
                  color: '#000000B2',
                  fontSize: 14,
                  fontWeight: '400',
                  textAlign: 'center',
                  width: WIDTH / 1.5,
                  alignSelf: 'center',
                  lineHeight: 22,
                  fontFamily: font.normal,
                }}>
                {userDetail?.about_us
                  ? userDetail?.about_us
                  : "I'm a university student, I spend most of my time reading!"}
              </Text>
            </View>
          </>
        {/* )} */}

        <TouchableOpacity
          onPress={() => navigation.navigate('ProfileScreen')}
          style={{
            marginTop: 15,
            flexDirection: 'row',
            justifyContent: 'center',
          }}>
          <View style={{alignSelf: 'center'}}>
            <Image
              source={IMAGE.durbeenicon}
              style={{
                width: 20,
                height: 20,
              }}
              resizeMode={'contain'}
            />
          </View>
          <Text
            style={{
              color: COLORS.Black,
              fontSize: 14,
              fontWeight: '500',
              marginLeft: 10,
              fontFamily: font.medium,
            }}>
            Preview Profile
          </Text>
        </TouchableOpacity>

        <PlanCard data={userDetail} />
      </ScrollView>
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
    justifyContent: 'center',

    marginTop: 40,
  },
  button: {
    paddingVertical: 13,
    width: WIDTH / 1.5,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    alignItems: 'center',
    marginTop: 20,
    marginLeft: 35,
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: '700',
    // color: '#A7A8AD',
    fontFamily: font.bold,
  },
  slide1: {
    paddingVertical: 10,
    width: WIDTH / 1.1,
    alignSelf: 'center',
    borderRadius: 20,
    paddingBottom: 30,
    margin: 23,
    marginTop: 40,
  },
});

export default PreviewProfileScreen;
