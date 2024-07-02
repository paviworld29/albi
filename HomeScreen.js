import {
  PanResponder,
  View,
  Animated,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
  ScrollView,
  StatusBar,
  Platform,
  RefreshControl,
  BackHandler,
  ActivityIndicator,
} from 'react-native';
import React, {useCallback, useContext, useEffect, useRef, useState} from 'react';
import Cards from '../Components/Cards';
import Footer from '../Components/Footer';
import {COLORS, IMAGE, font} from '../Constant';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ImageBackground} from 'react-native';
import {TextInput} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {GuidAppIntro} from '../Components/NoticeModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_API} from '../API/Base_Api';
import AppProvider from '../providers/AppProvider';

const {width, height} = Dimensions.get('screen');

const HomeScreen = ({navigation}) => {
  const [user, setUsers] = useState([]);
  const [swipedCards, setSwipedCards] = useState([]);
  const [previous, setPrevious] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [Loader, setLoader] = useState(false);
  const [firstbutton, setFirstButton] = useState(true);

  const [direction, setdirection] = useState('');
  const [itemId, setItenid] = useState('');
  const{ItemIdUser, setItemIdUser} = useContext(AppProvider)
  const [exitApp, setExitApp] = useState(0);
  const filterrbsheets = useRef();
  const swipe = new Animated.ValueXY();
  const titlSign = new Animated.Value(1);
  const ref = useRef(null);
  const [index, setIndex] = useState(1);
  const [previousselect, setPreviousselect] = useState([]);
  const reverseData = () => {
    setPreviousselect([swipedCards[swipedCards.length - 1]]);
  };
  useEffect(() => {
    reverseData();
  }, [swipedCards]);
  const [modelswipeRightOpen, modelswipeRightClose] = useState(false);

  const guidpopudata = async () => {
    const data = await AsyncStorage.getItem('guidpopup');
    if (data == 'popup') {
      modelswipeRightClose(false);
    } else {
      modelswipeRightClose(true);
    }
  };
  useEffect(async () => {
    guidpopudata();
    await AsyncStorage.setItem('@homeScreen', 'home');
  }, []);
  const backAction = () => {
    if (navigation.isFocused() === true) {
      setTimeout(() => {
        setExitApp(0);
      }, 2000);
      if (exitApp === 0) {
        setExitApp(exitApp + 1);
        BackHandler.exitApp();
      }
      return true;
    }
  };
  const GetUserApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    console.log('Tokem',Token)
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
        // console.log('hhhh>>>',result?.data?.matri_id)
        if (result?.success == true) {
        AsyncStorage.setItem('@MatriId', result?.data?.matri_id);
        } else {
        }
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backAction);
    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backAction);
  }, []);
  const getalluserApi = async () => {
    setLoader(true);
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var raw = '';

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };
    fetch(`${BASE_API}getAllUsers`, requestOptions)
      .then(response => response.json())
      .then(result => {
        if (result.success == true) {
          setUsers(result?.data);
          setLoader(false);
        }
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    getalluserApi();
    GetUserApi()
  }, []);
  const FilterRbsheets = () => {
    const [date, setDate] = useState('');
    const [values, setValues] = useState([0, 100]); // Initial positions for the two cursors
    const [value, setValue] = useState([0]); // Initial positions for the two cursors
    const [show, hide] = useState(false);

    const CustomMarker = ({currentValue}) => {
      return (
        <View
          style={{
            width: 50,
            height: 50,
            backgroundColor: 'red',
            borderRadius: 25,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>{currentValue}</Text>
        </View>
      );
    };

    const multiSliderValuesChange = newValues => {
      setValues(newValues);
    };
    const singleValuesChange = newValues => {
      setValue(newValues);
    };
    return (
      <RBSheet
        ref={filterrbsheets}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            height: height / 1.1,
            backgroundColor: 'transparent',
            position: 'absolute',
            bottom: 0,
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          },
          draggableIcon: {
            backgroundColor: 'transparent',
          },
        }}>
        <ImageBackground
          source={IMAGE.filtersheets}
          style={{
            width: width,
            height: height / 1.45,
            marginTop: 10,
          }}
          resizeMode={'stretch'}>
          <View
            style={{
              width: 30,
              height: 8,
              backgroundColor: '#fff',
              borderTopLeftRadius: 12,
              borderTopRightRadius: 12,
              alignSelf: 'center',
              borderRadius: 5,
              top: -5,
            }}></View>
          <ScrollView>
            <View
              style={{
                alignSelf: 'center',
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-around',
                width: width,
              }}>
              <View style={{width: 40}}></View>
              <Text
                style={{
                  color: '#000',
                  fontSize: 24,
                  fontWeight: '700',
                  alignSelf: 'center',
                  fontFamily: font.bold,
                }}>
                Filters
              </Text>
              <TouchableOpacity
                style={{alignSelf: 'center'}}
                onPress={() => filterrbsheets.current.close()}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '700',
                    fontFamily: font.bold,
                  }}>
                  Clear
                </Text>
              </TouchableOpacity>
            </View>
            <View style={{marginHorizontal: 25, marginTop: 25}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                  fontFamily: font.bold,
                }}>
                Interested in
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-around',
                alignSelf: 'center',
                width: width / 1.1,
                marginBottom: 40,
              }}>
              <TouchableOpacity
                onPress={() => setDate(1)}
                style={{
                  ...styles.btn,
                  backgroundColor: date == 1 ? '#000' : '#ffff',
                }}>
                <Text
                  style={{
                    ...styles.btnText,
                    color: date == 1 ? '#fff' : '#000',
                  }}>
                  Women
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setDate(2)}
                style={{
                  ...styles.btn,
                  backgroundColor: date == 2 ? '#000' : '#ffff',
                }}>
                <Text
                  style={{
                    ...styles.btnText,
                    color: date == 2 ? '#fff' : '#000',
                  }}>
                  Men
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => setDate(3)}
                style={{
                  ...styles.btn,
                  backgroundColor: date == 3 ? '#000' : '#ffff',
                  alignSelf: 'center',
                }}>
                <Text
                  style={{
                    ...styles.btnText,
                    color: date == 3 ? '#fff' : '#000',
                  }}>
                  All
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: width / 1.12,
                  borderWidth: 1,
                  borderRadius: 10,
                }}>
                <TextInput
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: '400',
                    alignSelf: 'center',
                    fontFamily: font.normal,
                    left: 20,
                    width: width / 1.4,
                    paddingVertical: Platform.OS === 'ios' ? 15 : 10,
                  }}
                  placeholder="Dubai, United Arab Emirates"
                  placeholderTextColor={'#000'}
                />

                <Image
                  source={IMAGE.backicon}
                  style={{
                    width: 24,
                    height: 24,
                    alignSelf: 'center',
                    right: 20,
                  }}
                />
              </View>
              <View
                style={{
                  position: 'absolute',
                  top: -14,
                  left: 45,
                  backgroundColor: '#fff',
                  padding: 5,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 12,
                    fontWeight: '400',
                    fontFamily: font.normal,
                  }}>
                  Location
                </Text>
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: width / 1.13,
                  marginTop: 30,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '700',
                    fontFamily: font.bold,
                  }}>
                  Distance Preference
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: '400',
                    fontFamily: font.normal,
                  }}>
                  {value[0]}mi
                </Text>
              </View>
              <View style={{alignSelf: 'center'}}>
                <MultiSlider
                  values={value}
                  onValuesChange={singleValuesChange}
                  markerStyle={{
                    ...Platform.select({
                      android: {
                        height: 23,
                        width: 23,
                        borderRadius: 50,
                        backgroundColor: '#000',
                        borderColor: '#fff',
                        borderWidth: 2,
                        marginTop: 10,
                      },
                    }),
                  }}
                  pressedMarkerStyle={{
                    ...Platform.select({
                      android: {
                        height: 23,
                        width: 23,
                        borderRadius: 20,
                        backgroundColor: '#000',
                        borderColor: '#fff',
                        borderWidth: 2,
                      },
                    }),
                  }}
                  selectedStyle={{
                    backgroundColor: '#BCBCBC',
                    height: 8,
                    borderRadius: 20,
                  }}
                  trackStyle={{
                    backgroundColor: '#000',
                    height: 8,
                    borderRadius: 20,
                  }}
                  touchDimensions={{
                    height: 20,
                    width: 25,
                    borderRadius: 20,
                    slipDisplacement: 40,
                  }}
                  sliderLength={width / 1.15}
                  min={0}
                  max={100}
                />
              </View>
            </View>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: width / 1.13,
                  marginTop: 30,
                }}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '700',
                    fontFamily: font.bold,
                  }}>
                  Age Preference
                </Text>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: '400',
                    fontFamily: font.normal,
                  }}>
                  {values[0]} - {values[1]}
                </Text>
              </View>
              <View style={{alignSelf: 'center'}}>
                <MultiSlider
                  values={values} // Set the initial positions
                  onValuesChange={multiSliderValuesChange}
                  min={0} // Minimum value
                  max={100} // Maximum value
                  step={1} // Step value for each movement
                  allowOverlap={false} // Prevent cursors from overlapping
                  customMarkerLeft={e => (
                    <CustomMarker currentValue={e.currentValue} />
                  )}
                  customMarkerRight={e => (
                    <CustomMarker currentValue={e.currentValue} />
                  )}
                  markerStyle={{
                    ...Platform.select({
                      android: {
                        height: 23,
                        width: 23,
                        borderRadius: 50,
                        backgroundColor: '#000',
                        borderColor: '#fff',
                        borderWidth: 2,
                        marginTop: 10,
                      },
                    }),
                  }}
                  pressedMarkerStyle={{
                    ...Platform.select({
                      android: {
                        height: 23,
                        width: 23,
                        borderRadius: 20,
                        backgroundColor: '#000',
                        borderColor: '#fff',
                        borderWidth: 2,
                      },
                    }),
                  }}
                  selectedStyle={{
                    backgroundColor: '#BCBCBC',
                    height: 8,
                    borderRadius: 20,
                  }}
                  trackStyle={{
                    backgroundColor: '#000',
                    height: 8,
                    borderRadius: 20,
                  }}
                  touchDimensions={{
                    height: 20,
                    width: 25,
                    borderRadius: 20,
                    slipDisplacement: 40,
                  }}
                  sliderLength={width / 1.15}
                />
              </View>
            </View>
            <TouchableOpacity
              onPress={() => hide(!show)}
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: width / 1.1,
                marginTop: 30,
                marginBottom: 15,
              }}>
              {show ? (
                <Image
                  source={IMAGE.hideicon}
                  style={{
                    width: 24,
                    height: 24,
                    alignSelf: 'center',
                  }}
                />
              ) : (
                <Image
                  source={IMAGE.add}
                  style={{
                    width: 24,
                    height: 24,
                    alignSelf: 'center',
                  }}
                />
              )}

              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                  marginLeft: 15,
                  fontFamily: font.bold,
                }}>
                Advanced
              </Text>
            </TouchableOpacity>
            {show ? (
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: width / 1.1,
                    borderBottomWidth: 1,
                    borderBottomColor: '#CACACA',
                  }}>
                  <TextInput
                    style={{
                      color: '#000',
                      fontSize: 15,
                      fontWeight: '400',
                      alignSelf: 'center',
                      fontFamily: font.normal,
                      left: 10,
                      width: width / 1.4,
                      paddingVertical: Platform.OS === 'ios' ? 15 : 10,
                    }}
                    placeholder="Languages"
                    placeholderTextColor={'#858585'}
                  />

                  <Image
                    source={IMAGE.backicon}
                    style={{
                      width: 24,
                      height: 24,
                      alignSelf: 'center',
                      right: 10,
                      tintColor: '#858585',
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: width / 1.1,
                    borderBottomWidth: 1,
                    borderBottomColor: '#CACACA',
                  }}>
                  <TextInput
                    style={{
                      color: '#000',
                      fontSize: 15,
                      fontWeight: '400',
                      alignSelf: 'center',
                      fontFamily: font.normal,
                      left: 10,
                      width: width / 1.4,
                      paddingVertical: Platform.OS === 'ios' ? 15 : 10,
                    }}
                    placeholder="Family"
                    placeholderTextColor={'#858585'}
                  />

                  <Image
                    source={IMAGE.backicon}
                    style={{
                      width: 24,
                      height: 24,
                      alignSelf: 'center',
                      right: 10,
                      tintColor: '#858585',
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: width / 1.1,

                    borderBottomWidth: 1,
                    borderBottomColor: '#CACACA',
                  }}>
                  <TextInput
                    style={{
                      color: '#000',
                      fontSize: 15,
                      fontWeight: '400',
                      alignSelf: 'center',
                      fontFamily: font.normal,
                      paddingVertical: Platform.OS === 'ios' ? 15 : 10,
                      left: 10,
                      width: width / 1.4,
                    }}
                    placeholder="Pets"
                    placeholderTextColor={'#858585'}
                  />

                  <Image
                    source={IMAGE.backicon}
                    style={{
                      width: 24,
                      height: 24,
                      alignSelf: 'center',
                      right: 10,
                      tintColor: '#858585',
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: width / 1.1,
                    borderBottomWidth: 1,
                    borderBottomColor: '#CACACA',
                  }}>
                  <TextInput
                    style={{
                      color: '#000',
                      fontSize: 15,
                      fontWeight: '400',
                      alignSelf: 'center',
                      left: 10,
                      width: width / 1.4,
                      fontFamily: font.normal,
                      paddingVertical: Platform.OS === 'ios' ? 15 : 10,
                    }}
                    placeholder="Workout"
                    placeholderTextColor={'#858585'}
                  />

                  <Image
                    source={IMAGE.backicon}
                    style={{
                      width: 24,
                      height: 24,
                      alignSelf: 'center',
                      right: 10,
                      tintColor: '#858585',
                    }}
                  />
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignSelf: 'center',
                    width: width / 1.1,
                    borderBottomWidth: 1,
                    borderBottomColor: '#CACACA',
                  }}>
                  <TextInput
                    style={{
                      color: '#000',
                      fontSize: 15,
                      fontWeight: '400',
                      alignSelf: 'center',
                      left: 10,
                      width: width / 1.4,
                      paddingVertical: Platform.OS === 'ios' ? 15 : 10,
                    }}
                    placeholder="Children"
                    placeholderTextColor={'#858585'}
                  />

                  <Image
                    source={IMAGE.backicon}
                    style={{
                      width: 24,
                      height: 24,
                      alignSelf: 'center',
                      right: 10,
                      tintColor: '#858585',
                    }}
                  />
                </View>
              </View>
            ) : null}
          </ScrollView>
        </ImageBackground>
        <View style={{backgroundColor: '#fff', flex: 1}}>
          <TouchableOpacity
            onPress={() => filterrbsheets.current.close()}
            style={styles.btns}>
            <Text style={styles.btnTexts}>{'Done'}</Text>
          </TouchableOpacity>
        </View>
      </RBSheet>
    );
  };

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderMove: (_, {dx, dy, y0}) => {
      swipe.setValue({x: dx, y: dy});
      titlSign.setValue(y0 > (height * 0.9) / 2 ? 1 : -1);
    },
    onPanResponderRelease: (_, {dx, dy}) => {
      const direction = Math.sign(dx);
      const isActionActive = Math.abs(dx) > 100;

      if (isActionActive) {
        // Handle left or right swipe based on the direction
        if (direction === 1) {
          // Right swipe action
          Animated.timing(swipe, {
            duration: 50,
            toValue: {
              x: direction * 1000,
              y: dy,
            },
            useNativeDriver: true,
          }).start(removeTopCard);
          // setdirection('Right');
          swipeRightApi()
          setIndex(index + 1);
          setPrevious(false);
          setFirstButton(false);
        } else if (direction === -1) {
          // Left swipe action
          Animated.timing(swipe, {
            duration: 50,
            toValue: {
              x: direction * 1000,
              y: dy,
            },
            useNativeDriver: true,
          }).start(removeTopCard);
          // setdirection('Left');
          swipeLeftApi()
          setIndex(index + 1);
          setPrevious(false);
          setFirstButton(false);
        }
      } else {
        // If the swipe distance is not enough, reset the card position
        Animated.spring(swipe, {
          toValue: {
            x: 0,
            y: 0,
          },
          useNativeDriver: true,
          friction: 5,
        }).start();
      }
    },
    create: (config, gestureState) => ({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: () => true,
      onPanResponderMove: () => {},
      onPanResponderRelease: () => {},
      gestureVelocityImpact: 0.1, // Adjust this value
    }),
  });

  const removeTopCard = useCallback(() => {
    setUsers(prevState => prevState.slice(1));
    setSwipedCards(prevSwipedCards => [...prevSwipedCards, user[0]]);

    swipe.setValue({x: 0, y: 0});
  }, [swipe, user]);

  // const handleChoice = useCallback(
  //   direction => {
  //     Animated.timing(swipe, {
  //       toValue: direction * 1000,
  //       duration: 50,
  //       useNativeDriver: true,
  //     }).start(removeTopCard);
  //   },
  //   [removeTopCard, swipe],
  // );
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
      getalluserApi();
    }, 2000);
  }, []);
  const showPreviousCard = () => {
    if (firstbutton) {
      null;
    } else {
      if (previous) {
      } else {
        let previousData = swipedCards[swipedCards.length - 1];
        let myArray = user;
        myArray.unshift(previousData); // Adds 1 to the beginning
        setUsers(myArray);
        setPrevious(true);
        swipe.setValue({x: 0, y: 0});
      }
    }
  };
  const swipeRightApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var formdata = new FormData();
    formdata.append('user_id',ItemIdUser);
    formdata.append('status', '1');
    // console.log('ggg', formdata)

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${BASE_API}swipeLeftRight`, requestOptions)
      .then(response => response.json())
      .then(result =>
        {}
        // console.log('like', result)
        )
      .catch(error => console.log('error', error));
  };
  const swipeLeftApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var formdata = new FormData();
    formdata.append('user_id', ItemIdUser);
    formdata.append('status', '0');
    // console.log('Liked', formdata)
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${BASE_API}swipeLeftRight`, requestOptions)
      .then(response => response.json())
      .then(result => 
        // console.log('like', result)
        {}
        )
      .catch(error => console.log('error', error));
  };
  const renderUser = ({item, index}) => {
    const isFirst = index == 0;
    const dragHandlers = isFirst ? panResponder.panHandlers : {};
    // if(item?.matri_id){
    //   setItenid(item)
    // }
    return (
      <Animated.View>
        <Cards
          item={item}
          isFirst={isFirst}
          swipe={swipe}
          titlSign={titlSign}
          direction={direction}
          index={index}
          length={user.length}
          {...dragHandlers}
        />
        {user.length == 1 ? null : (
          <Footer handleChoice={showPreviousCard} data={item} />
        )}
      </Animated.View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: COLORS.Yellow}}>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        translucent
        backgroundColor={'transparent'}
      />
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => modelswipeRightClose(!modelswipeRightOpen)}
          style={{alignSelf: 'center', right: 10}}>
          <Image
            source={IMAGE.help}
            style={{
              width: 34,
              height: 34,
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
        <TouchableOpacity
          onPress={() => {
            filterrbsheets.current.open();
          }}
          style={{alignSelf: 'center', right: 10}}>
          <Image
            source={IMAGE.headerthird}
            style={{
              width: 35,
              height: 35,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      {/* <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }> */}
      <View style={{height: height / 1.3}}>
        {Loader ? (
          <ActivityIndicator
            style={{
              justifyContent: 'center',
              alignSelf: 'center',
              marginTop: height / 4,
            }}
          />
        ) : (
          <Animated.FlatList
            ref={ref}
            data={!previous ? user : previousselect}
            horizontal
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
            renderItem={renderUser}
          />
        )}
        <FilterRbsheets />
        <GuidAppIntro
          onclose={val => {
            modelswipeRightClose(!modelswipeRightOpen);
            AsyncStorage.setItem('guidpopup', 'popup');
          }}
          modelvisible={modelswipeRightOpen}
          modelbtnTitle={'Next'}
          note={'Skip Guide'}
          onRetrun={() => {
            modelswipeRightClose(!modelswipeRightOpen);
            AsyncStorage.setItem('guidpopup', 'popup');
          }}
        />
      </View>
      {/* </ScrollView> */}
    </View>
  );
};

export default HomeScreen;
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: width / 1,
    marginTop: 60,
  },
  btn: {
    width: width / 3.5,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 25,
    borderWidth: 1,
    borderColor: '#000',
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: font.semibold,
  },
  btns: {
    backgroundColor: '#000',
    width: width / 1.2,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    borderRadius: 10,
    position: 'absolute',
    bottom: 25,
  },
  btnTexts: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '700',
    fontFamily: font.bold,
  },
});
