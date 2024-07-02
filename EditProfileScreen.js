import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Platform,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import React, { useContext, useEffect, useState } from 'react';
import { MultiSelect } from 'react-native-element-dropdown';

import { COLORS, IMAGE, font } from '../Constant/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API } from '../API/Base_Api';

import { ActivityIndicator } from 'react-native';
import PlanCard from '../Components/PlanCard';
import DragImageComponent from '../Components/DragImageComponent';
import Prompts from '../Components/Prompts';
import Negotiables from '../Components/Negotiables';
import AppProvider from '../providers/AppProvider';

const EditProfileScreen = ({ navigation }) => {
  const { selectImageubdated, setSelectImageubdated } = useContext(AppProvider)
  // console.log('>>>>>>>>>>>>>>>>', selectImageubdated,)
  const [userDetail, setUserDetail] = useState([]);
  const [InterestData, setInterestData] = useState([]);
  const [loader, setLoader] = useState(false);
  const [loaderimage, setloaderImage] = useState(false);
  const [Bio, setBio] = useState('');
  const [name, setName] = useState('');
  const [Fitness, setFitness] = useState('');
  const [Zodiac, setZodiac] = useState('');
  const [relocate, setrelocate] = useState('');
  const [country, setCountry] = useState([]);
  const [familyplan, setFamilyPlan] = useState([]);
  const [familyplanselect, setFamilyPlanselect] = useState('');
  const [Workouts, setWorkouts] = useState([]);
  const [smokes, setSmoke] = useState('');
  const [smokeApi, setSmokeApi] = useState([]);
  const [language, setLanguage] = useState([]);
  const [languageselect, setLanguageselect] = useState('');
  const [childrenselect, setChildrenselect] = useState('');
  const [childrendata, setChildren] = useState([]);
  const [drinkingselect, setdrinkingselect] = useState('');
  const [Drinkingdata, setDrinkingData] = useState([]);
  const [Educationselect, setEducationselect] = useState('');
  const [Educationdata, setEducationData] = useState([]);
  const [Physiqueselect, setPhysiqueselect] = useState('');
  const [PhysiqueData, setPhysiqueData] = useState([]);
  const [Intention, setIntention] = useState([]);
  const [Intentionselect, setIntentionselect] = useState('');
  const [Pets, setPets] = useState([]);
  const [data, setDate] = useState([]);

 
  const GetUserApi = async () => {
    setloaderImage(true);
    const Token = await AsyncStorage.getItem('token');
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
        console.log('hhhh>>>',result?.data)
        setUserDetail(result?.data);
        setInterestData(result?.data?.user_hobbies);
        if (result?.success == true) {
          setloaderImage(false);
        } else {
          setloaderImage(false);
        }
      })
      .catch(error => console.log('error', error));
  };

  // <<<<<<<<<<<<Prompts Api>>>>>>>>>>>>>>>>

  useEffect(() => {
    GetUserApi();
  }, []);
  // <<<<<  Hobbies Api >>>>>>>
  const GetHobbiesApi = () => {
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(`${BASE_API}getHobbies`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setDate(result?.data);
        if (result?.response == true) {
        } else {
        }
      })
      .catch(error => { });
  };

  // <<<<< family plan >>>>>>>

  const getfamilyplanapi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}family_plans`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setFamilyPlan(result?.data);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    GetHobbiesApi();
    getfamilyplanapi();
  }, []);
  // <<<<< Smoke Api >>>>>>>

  const getsmokeApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}smoking`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setSmokeApi(result?.data);
      })
      .catch(error => console.log('error', error));
  };

  // <<<<< language Api >>>>>>>

  const getlanguageApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}languages`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLanguage(result?.data);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    getsmokeApi();
    getlanguageApi();
  }, []);
  // / <<<<< children Api >>>>>>>
  const getchildrenApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}childern`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setChildren(result?.data);
      })
      .catch(error => console.log('error', error));
  };
  // / <<<<< Intentions Api >>>>>>>
  const getIntentionsApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}intentions`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setIntention(result?.data);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    getchildrenApi();
    getIntentionsApi();
  }, []);
  // / <<<<< Education Api >>>>>>>
  const getEducationApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}educations`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setEducationData(result?.data);
      })
      .catch(error => console.log('error', error));
  };
  // / <<<<< Drinking Api >>>>>>>
  const getDrinkingApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}drinkings`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setDrinkingData(result?.data);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    getEducationApi();
    getDrinkingApi();
  }, []);
  // / <<<<< Physique Api >>>>>>>
  const getPhysiqueApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}physiques`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setPhysiqueData(result?.data);
      })
      .catch(error => console.log('error', error));
  };

  useEffect(() => {
    getPhysiqueApi();
  }, []);

  const rendleicon = () => {
    return (
      <Image
        source={IMAGE.blurgreaterthansign}
        style={{
          width: 8,
          height: 16,
          alignSelf: 'center',
          justifyContent: 'flex-end',
        }}
        resizeMode={'contain'}
      />
    );
  };
  const rendleiconsmall = () => {
    return (
      <Image
        source={IMAGE.blurgreaterthansign}
        style={{
          width: 6,
          height: 13,
          alignSelf: 'center',
          justifyContent: 'flex-end',
          // right:20
        }}
        resizeMode={'contain'}
      />
    );
  };

  //  <<Edit Profile api >>
  // console.log('jgjgjjg',Physiqueselect)
  const EditProfileApi = async () => {
    setLoader(true);

    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);
    var formdata = new FormData();
    formdata.append('about_us', Bio ? Bio : userDetail?.about_us);
    formdata.append('name', name ? name : userDetail?.name);
    formdata.append(
      'family_plans',
      familyplanselect
        ? familyplanselect[0]
        : userDetail?.userinformation?.family_plans,
    );
    formdata.append(
      'smoking',
      smokes ? smokes[0] : userDetail?.userinformation?.smoking,
    );
    formdata.append(
      'education',
      Educationselect
        ? Educationselect[0]
        : userDetail?.userinformation?.education,
    );
    formdata.append(
      'Intentions',
      Intention ? Intention[0]?.name : userDetail?.userinformation?.Intentions,
    );
    formdata.append(
      'language',
      languageselect ? languageselect[0] : userDetail?.userinformation?.language?userDetail?.userinformation?.language:'',
    );
    formdata.append(
      'children',
      childrenselect ? childrenselect[0] : userDetail?.userinformation?.children?userDetail?.userinformation?.children:'',
    );
    formdata.append(
      'drinking',
      drinkingselect ? drinkingselect[0] : userDetail?.userinformation?.drinking?userDetail?.userinformation?.drinking:'',
    );
    formdata.append(
      'physique',
      Physiqueselect ? Physiqueselect[0] : userDetail?.userinformation?.physique?userDetail?.userinformation?.physique:'',
    );
    formdata.append(
      'fitness',
      Fitness ? Fitness : userDetail?.userinformation?.fitness,
    );
    formdata.append(
      'zodiac',
      Zodiac ? Zodiac : userDetail?.userinformation?.zodiac,
    );
    formdata.append(
      'willing_to_relocate',
      relocate ? relocate : userDetail?.userinformation?.willing_to_relocate,
    );
    {selectImageubdated && selectImageubdated.map((e,i)=>{
      formdata.append(
                  `image[${i}][]`,
                  {
                    uri:e.image[0]?.path,
                    type: e.image[0]?.mime,
                    name: e.image[0]?.fileName,
                  },
                  e.image[0].name,
                )
              formdata.append(
                `index[${i}][]`,e.index
                );
    })}



    // console.log('fkfkkf>>>>>', formdata?._parts)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${BASE_API}updateProfile`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setLoader(false);
        // console.log(result);
        GetUserApi();
        setSelectImageubdated([])

      })
      .catch(error => {
        // console.log('error', error)
        setLoader(false);
      });
  };
  // console.log('langg',userDetail)
  return (
    <View style={styles.container}>
      {loaderimage ? (
        <ActivityIndicator
          style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        />
      ) : (
        <>
          <View
            style={{
              alignSelf: 'center',
              marginTop: 50,
              flexDirection: 'row',
              justifyContent: 'space-between',
              width: WIDTH / 1,
              right: 40,
            }}>
            <View style={{ width: 40 }}></View>
            <TouchableOpacity
              onPress={() => navigation.goBack('ContactScreen')}
              style={{ alignSelf: 'center', right: 25 }}>
              <Image
                source={IMAGE.goBack}
                style={{
                  width: 22,
                  height: 20,
                }}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
            <Text
              style={{
                alignSelf: 'center',
                color: '#101010',
                fontWeight: '600',
                fontSize: 18,
                fontFamily: font.semibold,
              }}>
              Edit Profile
            </Text>
            {loader ? (
              <ActivityIndicator
              // style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}
              />
            ) : (
              <TouchableOpacity
                onPress={() => {
                  EditProfileApi();
                }}
                style={{ alignSelf: 'center' }}>
                <Text
                  style={{
                    alignSelf: 'center',
                    color: '#101010',
                    fontWeight: '700',
                    fontSize: 16,
                    fontFamily: font.bold,
                  }}>
                  Save
                </Text>
              </TouchableOpacity>
            )}
          </View>
          <View style={styles.horizontalLine} />
          <ScrollView>
            <Text
              style={{
                alignSelf: 'center',
                fontSize: 24,
                fontWeight: '700',
                fontFamily: font.bold,
                marginTop: 20,
                color: '#000000',
              }}>
              {userDetail?.first_name}
            </Text>

            <Text
              style={{
                alignSelf: 'center',
                fontSize: 16,
                fontWeight: '700',
                fontFamily: font.bold,
                marginTop: 10,
                color: '#FFFFFF',
              }}>
              {userDetail?.total_complete_profile}% Complete
            </Text>
            <PlanCard onPress={'edit'} />

            <DragImageComponent userDetail={userDetail} length={userDetail?.user_images?.length} />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingVertical: 15,
                alignSelf: 'center',
                width: WIDTH / 1.1,
                marginTop: 25,
                borderRadius: 15,
                border: 1,
                borderColor: '#000000',
                borderWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: WIDTH / 1.2,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 16,
                    fontFamily: font.bold,
                    color: '#000000',

                    marginLeft: 8,
                  }}>
                  Bio
                </Text>
                <Image
                  source={IMAGE.blurgreaterthansign}
                  style={{
                    width: 21.3,
                    height: 20,
                    alignSelf: 'center',
                    // right: 10,
                  }}
                  resizeMode={'contain'}
                />
              </View>
              <TextInput
                placeholder={
                  userDetail?.about_us
                    ? userDetail?.about_us
                    : 'And write your bio'
                }
                placeholderTextColor="#101010"
                value={Bio}
                onChangeText={text => setBio(text)}
                style={{
                  fontWeight: '400',
                  fontSize: 14,
                  fontFamily: font.normal,
                  color: '#000000',
                  left: 18,
                  width: WIDTH / 1.3,
                }}
              />
            </View>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingVertical: 15,
                alignSelf: 'center',
                width: WIDTH / 1.1,
                marginTop: 25,
                borderRadius: 15,
                border: 1,
                borderColor: '#000000',
                borderWidth: 1,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: WIDTH / 1.2,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '700',
                    fontSize: 16,
                    fontFamily: font.bold,
                    color: '#000000',

                    marginLeft: 8,
                  }}>
                  Location
                </Text>
                <Image
                  source={IMAGE.blurgreaterthansign}
                  style={{
                    width: 21.3,
                    height: 20,
                    alignSelf: 'center',
                    // right: 10,
                  }}
                  resizeMode={'contain'}
                />
              </View>
              <TextInput
                placeholder={
                  // userDetail?.about_us
                  //   ? userDetail?.about_us
                  //   :
                  'Edit Location'
                }
                placeholderTextColor="#101010"
                // value={Bio}
                // onChangeText={text => setBio(text)}
                style={{
                  fontWeight: '400',
                  fontSize: 14,
                  fontFamily: font.normal,
                  color: '#000000',
                  left: 18,
                  width: WIDTH / 1.3,
                }}
              />
            </View>
            <Prompts />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingVertical: 10,
                alignSelf: 'center',
                width: WIDTH / 1.1,
                marginTop: 25,
                borderRadius: 15,
                border: 1,
                borderColor: '#000000',
                borderWidth: 1,
              }}>
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={styles.boxTite}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={data}
                  // selectedStyle={{backgroundColor:'red'}}
                  labelField="name"
                  selectedStyle={{backgroundColor:'transparent',borderWidth:0}}

                  valueField="name"
                  placeholder="Interests"
                  value={country}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  // selectedStyle={{borderColor: 'red'}}
                  onChange={name => {
                    setCountry(name);

                  }}
                  renderRightIcon={rendleicon}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  width: WIDTH / 1.15,
                  marginLeft: 15,
                  flexWrap: 'wrap',
                }}>
                {InterestData?.map((item, index) => (
                  <View style={{ marginHorizontal: WIDTH / 80 }} key={index}>
                    <View
                      style={{
                        ...styles.religiousbtn,
                        backgroundColor: '#000',
                      }}>
                      <Text
                        style={{
                          ...styles.btnText,
                          color: '#fff',
                        }}>
                        {/* {console.log('iii',item)} */}
                        {item?.text}  {item.hobbies}
                      </Text>
                    </View>
                  </View>
                ))}
                {country?.map((item, index) => (
                  <View style={{ marginHorizontal: WIDTH / 80 }} key={index}>
                    <View
                      style={{
                        ...styles.religiousbtn,
                        backgroundColor: '#000',
                      }}>
                      <Text
                        style={{
                          ...styles.btnText,
                          color: '#fff',
                        }}>
                        {item}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
            <Negotiables />
            <View
              style={{
                backgroundColor: '#FFFFFF',
                paddingVertical: 10,
                alignSelf: 'center',
                width: WIDTH / 1.1,
                marginTop: 25,
                borderRadius: 15,
                border: 1,
                borderColor: '#000000',
                borderWidth: 1,
              }}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 16,
                  fontFamily: font.bold,
                  color: '#000000',
                  marginTop: 10,
                  left: 20,
                }}>
                More About Me
              </Text>
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  marginTop: 30,
                  width: WIDTH / 1.2,
                  right: 10,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    left: 20,
                    alignSelf: 'center',

                    
                    paddingBottom: Platform.OS==='ios'?12:0,
                 
                  }}>
                  Name
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder={userDetail?.name ? userDetail?.name : ''}
                    onChangeText={text => setName(text)}
                    value={name}
                    placeholderTextColor="#101010"
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#101010',
                      fontFamily: font.medium,
                      right:Platform.OS==='ios'? 8:0,
                      alignSelf: 'center',
                      paddingBottom: Platform.OS==='ios'?12:0,
                    }}
                  />

                  <Image
                    source={IMAGE.blurgreaterthansign}
                    style={{
                      width: 6,
                      height: 13,
                      alignSelf: 'center',
                      right:Platform.OS==='ios'? 4:0,
                      marginBottom: Platform.OS==='ios'?12:0,


                    }}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableOpacity>
              <View style={{ ...styles.horizontalhalf, marginTop: 0 }} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                  }}
                  maxSelect={1}
                  selectedTextStyle={styles.selectedTextStyle}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  data={familyplan}
                  labelField="name"
                  valueField="name"
                  placeholder={'Family Plans'}
                  value={familyplanselect}
                  selectedStyle={{ borderColor: 'transparent',borderWidth:0 }}
                  onChange={name => {
                    setFamilyPlanselect(name);
                  }}
                  renderRightIcon={rendleiconsmall}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    right: 50,
                    top: 18,
                    position: 'absolute',
                  }}>
                  {familyplanselect
                    ? familyplanselect
                    : userDetail?.userinformation?.family_plans
                      ? userDetail?.userinformation?.family_plans
                      : 'Add'}
                </Text>
              </View>
              <View style={styles.horizontalhalf} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                  }}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  maxSelect={1}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={data}
                  labelField="name"
                  valueField="name"
                  placeholder=" Workout"
                  value={Workouts}
                  selectedStyle={{ borderColor: '#fff' }}
                  onChange={name => {
                    setWorkouts(name);
                  }}
                  renderRightIcon={rendleiconsmall}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    right: 50,
                    top: 18,
                    position: 'absolute',
                  }}>
                  {Workouts ? Workouts : 'Add'}
                </Text>
              </View>
              <View style={styles.horizontalhalf} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                  }}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  maxSelect={1}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={smokeApi}
                  labelField="name"
                  valueField="name"
                  placeholder=" Smoke"
                  value={smokes}
                  selectedStyle={{ borderColor: '#fff' }}
                  onChange={name => {
                    setSmoke(name);
                  }}
                  renderRightIcon={rendleiconsmall}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    right: 50,
                    top: 18,
                    position: 'absolute',
                  }}>
                  {smokes
                    ? smokes
                    : userDetail?.userinformation?.smoking
                      ? userDetail?.userinformation?.smoking
                      : 'Add'}
                </Text>
              </View>
              <View style={styles.horizontalhalf} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                  }}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  maxSelect={1}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={data}
                  labelField="name"
                  valueField="name"
                  placeholder=" Pets"
                  value={Pets}
                  selectedStyle={{ borderColor: '#fff' }}
                  onChange={name => {
                    // console.log('item>>>>>>>', name);
                    setPets(name);
                  }}
                  renderRightIcon={rendleiconsmall}
                />
              </View>
              <View style={styles.horizontalhalf} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                  }}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  maxSelect={1}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={language}
                  labelField="languages"
                  valueField="languages"
                  placeholder=" Language"
                  value={languageselect}
                  selectedStyle={{ borderColor: '#fff' }}
                  onChange={languages => {
                    setLanguageselect(languages);
                  }}
                  renderRightIcon={rendleiconsmall}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    right: 50,
                    top: 18,
                    position: 'absolute',
                  }}>
                  {languageselect
                    ? languageselect
                    : userDetail?.userinformation?.language
                      ? userDetail?.userinformation?.language
                      : 'Add'}
                </Text>
              </View>
              <View style={styles.horizontalhalf} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                  }}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  maxSelect={1}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={childrendata}
                  labelField="name"
                  valueField="name"
                  placeholder=" Children"
                  value={childrenselect}
                  selectedStyle={{ borderColor: '#fff' }}
                  onChange={name => {
                    setChildrenselect(name);
                  }}
                  renderRightIcon={rendleiconsmall}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    right: 50,
                    top: 18,
                    position: 'absolute',
                  }}>
                  {childrenselect
                    ? childrenselect
                    : userDetail?.userinformation?.children
                      ? userDetail?.userinformation?.children
                      : 'Add'}
                </Text>
              </View>
              <View style={styles.horizontalhalf} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                  }}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  maxSelect={1}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={Intention}
                  labelField="name"
                  valueField="name"
                  placeholder=" Intentions"
                  value={Intentionselect}
                  selectedStyle={{ borderColor: '#fff' }}
                  onChange={name => {
                    setIntentionselect(name);
                  }}
                  renderRightIcon={rendleiconsmall}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    right: 50,
                    top: 18,
                    position: 'absolute',
                  }}>
                  {Intentionselect
                    ? Intentionselect
                    : userDetail?.userinformation?.Intentions
                      ? userDetail?.userinformation?.Intentions
                      : 'Add'}
                </Text>
              </View>
              <View style={styles.horizontalhalf} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                  }}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  maxSelect={1}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={Drinkingdata}
                  labelField="name"
                  valueField="name"
                  placeholder=" Drinking"
                  value={drinkingselect}
                  selectedStyle={{ borderColor: '#fff' }}
                  onChange={name => {
                    setdrinkingselect(name);
                  }}
                  renderRightIcon={rendleiconsmall}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    right: 50,
                    top: 18,
                    position: 'absolute',
                  }}>
                  {drinkingselect
                    ? drinkingselect
                    : userDetail?.userinformation?.drinking
                      ? userDetail?.userinformation?.drinking
                      : 'Add'}
                </Text>
              </View>
              <View style={styles.horizontalhalf} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                  }}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  maxSelect={1}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={Educationdata}
                  labelField="name"
                  valueField="name"
                  placeholder=" Education"
                  value={Educationselect}
                  selectedStyle={{ borderColor: '#fff' }}
                  onChange={name => {
                    setEducationselect(name);
                  }}
                  renderRightIcon={rendleiconsmall}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    right: 50,
                    top: 18,
                    position: 'absolute',
                  }}>
                  {Educationselect
                    ? Educationselect
                    : userDetail?.userinformation?.education
                      ? userDetail?.userinformation?.education
                      : 'Add'}
                </Text>
              </View>
              <View style={styles.horizontalhalf} />
              <View
                style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <MultiSelect
                  style={styles.dropdown}
                  placeholderStyle={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                  }}
                  maxSelect={1}
                  containerStyle={{
                    backgroundColor: 'grey',
                    borderRadius: 10,
                  }}
                  selectedTextStyle={styles.selectedTextStyle}
                  data={PhysiqueData}
                  labelField="name"
                  valueField="name"
                  placeholder=" Physique"
                  value={Physiqueselect}
                  selectedStyle={{ borderColor: '#fff' }}
                  onChange={name => {
                    setPhysiqueselect(name);
                  }}
                  renderRightIcon={rendleiconsmall}
                />
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    right: 50,
                    top: 18,
                    position: 'absolute',
                  }}>
                  {Physiqueselect ? Physiqueselect : 'Add'}
                </Text>
              </View>
              <View style={styles.horizontalhalf} />
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: WIDTH / 1.2,
                  right: 15,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    left: 25,
                    alignSelf: 'center',
                    paddingVertical:18

                  }}>
                  Fitness
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder={userDetail?.userinformation?.fitness ? userDetail?.userinformation?.fitness : 'Fitness'}
                    placeholderTextColor="#101010"
                    onChangeText={text => setFitness(text)}
                    value={Fitness}
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#101010',
                      fontFamily: font.medium,
                      right: 10,
                      alignSelf: 'center',
                      
                      paddingVertical:18
                    }}
                  />

                  <Image
                    source={IMAGE.blurgreaterthansign}
                    style={{
                      width: 6,
                      height: 13,
                      alignSelf: 'center',
                    }}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.horizontalhalf} />
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: WIDTH / 1.2,
                  right: 15,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    left: 25,

                    alignSelf: 'center',
                    paddingVertical:18

                  }}>
                  Zodiac
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder={userDetail?.userinformation?.zodiac ? userDetail?.userinformation?.zodiac : 'Zodiac'}
                    onChangeText={text => setZodiac(text)}
                    value={Zodiac}
                    placeholderTextColor="#101010"
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#101010',
                      fontFamily: font.medium,
                      right: 10,
                      alignSelf: 'center',
                      paddingVertical:18

                    }}
                  />

                  <Image
                    source={IMAGE.blurgreaterthansign}
                    style={{
                      width: 6,
                      height: 13,
                      alignSelf: 'center',
                    }}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableOpacity>
              <View style={styles.horizontalhalf} />
              <TouchableOpacity
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  width: WIDTH / 1.2,
                  right: 15,
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    fontSize: 12,
                    fontWeight: '500',
                    color: '#101010',
                    fontFamily: font.medium,
                    left: 25,

                    alignSelf: 'center',
                    paddingVertical:18

                  }}>
                  Willing to relocate
                </Text>
                <View style={{ flexDirection: 'row' }}>
                  <TextInput
                    placeholder={userDetail?.userinformation?.willing_to_relocate ? userDetail?.userinformation?.willing_to_relocate : 'Willing to relocate'}
                    onChangeText={text => setrelocate(text)}
                    value={relocate}
                    placeholderTextColor="#101010"
                    style={{
                      fontSize: 12,
                      fontWeight: '500',
                      color: '#101010',
                      fontFamily: font.medium,
                      right: 10,
                      alignSelf: 'center',
                      paddingVertical:18

                    }}
                  />

                  <Image
                    source={IMAGE.blurgreaterthansign}
                    style={{
                      width: 6,
                      height: 13,
                      alignSelf: 'center',
                    }}
                    resizeMode={'contain'}
                  />
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ height: 30 }}></View>
          </ScrollView>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Yellow,
  },
  horizontalLine: {
    height: 1,
    backgroundColor: '#858585',
    marginVertical: 10,
    border: 1,
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
    color: '#A7A8AD',
    fontFamily: font.bold,
  },
  slide1: {
    paddingVertical: 10,
    width: WIDTH / 1.1,
    alignSelf: 'center',
    borderRadius: 20,
    paddingBottom: 30,
    top: 15,
  },
  Header: {
    width: WIDTH / 1.2,
    alignSelf: 'center',
    marginTop: 10,
  },
  ImageBox: {
    width: WIDTH / 3.5,
  },
  TextInput: {
    flexDirection: 'row',
    // width: WIDTH / 1.2,
    alignSelf: 'center',
  },
  horizontalhalf: {
    height: 1,
    backgroundColor: '#858585',
    border: 1,
    width: WIDTH / 1.27,
    alignSelf: 'center',
  },
  religiousbtn: {
    borderRadius: 12,
    backgroundColor: '#000000',
    width: WIDTH / 3.9,
    height: 43.2,
    border: 1,
    marginTop: 5,
  },
  btnText: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 9,
    top: 15,
    fontFamily: font.semibold,
  },
  box: {
    width: WIDTH / 1.1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,

    borderColor: '#000000',
  },
  boxTite: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: font.semibold,
  },
  boxdescription: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    fontFamily: font.normal,
    marginTop: 15,
  },
  flexseeall: {
    marginTop: 35,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH / 1.2,
    alignSelf: 'center',
  },
  imagecontain: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: WIDTH / 1.2,
    alignSelf: 'center',
    marginBottom: 5,
  },
  footer: {
    flexDirection: 'row',
    width: WIDTH / 1.6,
    alignSelf: 'center',
    justifyContent: 'space-around',
    marginVertical: 40,
  },
  interestbox: {
    width: WIDTH / 3.8,
    paddingVertical: 14,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  dropdown: {
    width: WIDTH / 1.3,
    paddingTop: 10,
    paddingBottom: 6,
    borderRadius: 10,
    left: 25,
  },
  placeholderStyle: {
    color: '#101010',
    fontWeight: '600',
    fontSize: 14,
    fontFamily: font.semibold,
  },
  selectedTextStyle: {
    fontSize: 0,
    color: '#000',
    fontWeight: '600',
    marginLeft: 0,
    fontFamily: font.semibold,
    // backgroundColor: 'red',
  },
  iconStyle: {
    width: 35,
    height: 35,
    tintColor: '#000',
    right: 5,
  },
});

export default EditProfileScreen;
