import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
const {width, height} = Dimensions.get('screen');
import react from 'react';
import {COLORS, IMAGE, font} from '../Constant';
import {TouchableOpacity} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import Swiper from 'react-native-swiper';
import {hp} from '../Components/Config';
import {useState} from 'react';
import NoticeModel from '../Components/NoticeModel';
import { useEffect } from 'react';
 const UserProfileDetail = ({navigation,route}) => {
  // console.log('route',route?.params?.item)
  const [modelVisibeOpen, modelVisibleClose] = useState(false);
  const [dataToPass, setDataToPass] = useState(null);
   const [profileOpen, setProfileOpen] = useState(false);
 
useEffect(()=>{
if(route?.params?.type == 'chat'){
  setProfileOpen(!profileOpen)
}
},[])
  const BlockReport = () => {
    const [modelBlockOpen, modelBlockClose] = useState(false);
    const [modelReportOpen, modelReportClose] = useState(false);

    return (
      <View style={styles.footer}>
          <NoticeModel
            onclose={val => {
              modelBlockClose(!modelBlockOpen);
            }}
            modelvisible={modelBlockOpen}
            modelbtnTitle={'Block'}
            Notice={'Notice'}
            description={`Are you sure you want to block?`}
            note={'This cannot be undone.'}
            onRetrun={() => {
              modelBlockClose(!modelBlockOpen);
            }}
          />
        <TouchableOpacity  onPress={() => modelBlockClose(!modelBlockOpen)}>
          <Text
            style={{
              ...styles.boxdescription,
              fontSize: 16,
              marginTop: 2,
            }}>
            Block
          </Text>
        </TouchableOpacity>
        <View
          style={{
            width: 2,
            height: 20,
            backgroundColor: '#463B34',
            alignSelf: 'center',
            marginLeft:25
          }}></View>
           <NoticeModel
            onclose={val => {
              modelReportClose(!modelReportOpen);
            }}
            modelvisible={modelReportOpen}
            modelbtnTitle={'Report'}
            Notice={'Notice'}
            description={`Report this person if needed. Remember, your feedback is kept confidential, and they won't be notified that they've been reported.`}
            note={''}
            check={'check'}
            onRetrun={() => {
              modelReportClose(!modelReportOpen);
            }}
          />
        <TouchableOpacity onPress={()=> modelReportClose(!modelReportOpen)}>
          <Text
            style={{
              ...styles.boxdescription,
              fontSize: 16,
              marginTop: 2,
            }}>
            Report
          </Text>
        </TouchableOpacity>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      {/* <View style={styles.flex}> */}
      <ScrollView>
        <View style={styles.profile}>
          <Image
            source={profileOpen ? IMAGE.profile_pic : IMAGE.ProfileAboutImg}
            style={{
              width: WIDTH,
              height: HEIGHT / 2.25,
            }}
            resizeMode="cover"
          />
          {modelVisibeOpen ? (
            <View
              style={{
                width: 2,
                height: 40,
                backgroundColor: '#fff',
                position: 'absolute',
                top: 95,
                right: 55,
              }}></View>
          ) : null}

        </View>
        <View style={styles.secondcontain}>
          {profileOpen ? null : (
            <View style={styles.actionRow}>
              <TouchableOpacity style={{alignSelf: 'center'}}>
                <Image
                  source={IMAGE.rever_icon}
                  style={{
                    width: 130,
                    height: 130,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{alignSelf: 'center'}}>
                <Image
                  source={IMAGE.unlike}
                  style={{
                    width: 140,
                    height: 140,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => setProfileOpen(!profileOpen)}
                style={{alignSelf: 'center'}}>
                <Image
                  source={IMAGE.likeprofile}
                  style={{
                    width: 140,
                    height: 140,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
              <TouchableOpacity style={{alignSelf: 'center'}}>
                <Image
                  source={IMAGE.red_heard}
                  style={{
                    width: 130,
                    height: 130,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            </View>
          )}

          <View style={{alignSelf: 'center', marginTop: 50}}>
            <Text style={styles.nameText}>{route?.params?.item?.name?route?.params?.item?.name:'Mariam,30'}</Text>
          </View>
          <Swiper
          paginationStyle={{
            position: 'absolute',
            top: -HEIGHT / 0.59,
            // top:0
          }}
          style={{marginTop: hp(6), height: HEIGHT / 0.58}}
          activeDotColor="black">
            <View>
              <View style={{height: HEIGHT / 2.5}}>
                  <View style={{...styles.box,borderWidth:profileOpen?1:0,}}>
                    <Text style={styles.boxTite}>About Me</Text>
                    <Text style={styles.boxdescription}>
                    {route?.params?.item?.about_us?route?.params?.item?.about_us:'Add about us'}
                    </Text>
                  </View>
                  {profileOpen ? null : (
                    <View style={styles.box}>
                      <Text style={styles.boxTite}>
                        My intention on here is...
                      </Text>
                      <Text style={styles.boxdescription}>
                        is too meet new people and find a life partner
                      </Text>
                    </View>
                  )}

                  <View style={{...styles.box,borderWidth:profileOpen?1:0,}}>
                    <Text style={styles.boxTite}>Interests </Text>

                    <View style={styles.imagecontain}>
                      <View style={styles.interestbox}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: '600',
                            fontFamily: font.semibold,
                            
                          }}>
                          📷 Photography
                        </Text>
                      </View>
                      <View style={styles.interestbox}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: '600',
                            fontFamily: font.semibold,
                          }}>
                          🛍️ Shopping
                        </Text>
                      </View>

                      <View style={styles.interestbox}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: '600',
                            fontFamily: font.semibold,
                          }}>
                          🍔 Eating
                        </Text>
                      </View>

                      <View style={styles.interestbox}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: '600',
                            fontFamily: font.semibold,
                            
                          }}>
                          🎤 Karaoke
                        </Text>
                      </View>

                      <View style={styles.interestbox}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: '600',
                            fontFamily: font.semibold,
                          }}>
                          🧘 Yoga
                        </Text>
                      </View>
                      <View style={styles.interestbox}>
                        <Text
                          style={{
                            color: '#fff',
                            fontSize: 11,
                            fontWeight: '600',
                            fontFamily: font.semibold,
                          }}>
                          🌷 Gardening
                        </Text>
                      </View>
                    </View>
                  </View>
                  {profileOpen ? (
                    <View style={{...styles.box,borderWidth:profileOpen?1:0,}}>
                      <Text style={styles.boxTite}>Non-negotiables </Text>

                      <View style={styles.imagecontain}>
                        <View style={styles.interestbox}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 11,
                              fontWeight: '600',
                              fontFamily: font.semibold,
                            }}>
                            Sensitive
                          </Text>
                        </View>
                        <View style={styles.interestbox}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 11,
                              fontWeight: '600',
                              fontFamily: font.semibold,
                            }}>
                            Funny
                          </Text>
                        </View>

                        <View style={styles.interestbox}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 11,
                              fontWeight: '600',
                              fontFamily: font.semibold,
                            }}></Text>
                        </View>

                        <View style={styles.interestbox}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 11,
                              fontWeight: '600',
                              fontFamily: font.semibold,
                            }}>
                            Mean
                          </Text>
                        </View>

                        <View style={styles.interestbox}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 11,
                              fontWeight: '600',
                              fontFamily: font.semibold,
                            }}>
                            Weird
                          </Text>
                        </View>
                        <View style={styles.interestbox}>
                          <Text
                            style={{
                              color: '#fff',
                              fontSize: 11,
                              fontWeight: '600',
                              fontFamily: font.semibold,
                            }}>
                            Chill
                          </Text>
                        </View>
                      </View>
                    </View>
                  ) : null}
                  <View style={{...styles.box,borderWidth:profileOpen?1:0,}}>
                    <Text style={styles.boxTite}>More About Me</Text>
                    {profileOpen ? (
                      <Image
                        source={IMAGE.palestine}
                        style={{
                          width: 32,
                          height: 18,
                          marginVertical: 10,
                        }}
                      />
                    ) : (
                      <View
                        style={{
                          flexDirection: 'row',
                          width: WIDTH / 1.1,
                          marginTop: 30,
                        }}>
                        <Image
                          source={IMAGE.home_icon}
                          style={{
                            width: 22,
                            height: 22,
                            alignSelf: 'center',
                          }}
                        />
                        <Text
                          style={{
                            ...styles.boxdescription,
                            alignSelf: 'center',
                            marginTop: 0,
                            marginLeft: 10,
                          }}>
                          Palestine & Mexico
                        </Text>
                      </View>
                    )}
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={IMAGE.located}
                        style={{
                          width: 22,
                          height: 22,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                        }}>
                        Houston, TX, USA
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={profileOpen ? IMAGE.women2 : IMAGE.woman}
                        style={{
                          width: 22,
                          height: 22,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                        }}>
                        Woman
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={IMAGE.r_icon}
                        style={{
                          width: 22,
                          height: 22,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                        }}>
                        5’ 5”
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={IMAGE.paralegal}
                        style={{
                          width: 22,
                          height: 22,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                        }}>
                        {profileOpen
                          ? 'The Law at Aramco'
                          : ' Paralegal at Sabic'}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={IMAGE.dua }
                        style={{
                          width: 23,
                          height: 18,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                        }}>
                        Muslim
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={IMAGE.university}
                        style={{
                          width: 22,
                          height: 22,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                        }}>
                        University of Texas
                      </Text>
                    </View>
                  </View>
                  <View style={styles.flexseeall}>
                    <Text style={styles.boxTite}>Gallery</Text>
                    <TouchableOpacity style={{alignSelf: 'center'}}>
                      <Text style={{...styles.boxTite, fontSize: 14}}>
                        See all
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.imagecontain}>
                    <Image
                      source={profileOpen ? IMAGE.pic_1 : IMAGE.blur_1}
                      style={{
                        width: WIDTH / 4,
                        height: HEIGHT/6,
                      }}
                      resizeMode="contain"
                    />
                    <Image
                      source={profileOpen ? IMAGE.pic_2 : IMAGE.blur_2}
                      style={{
                        width: WIDTH / 4,
                       height: HEIGHT/6,
                      }}
                      resizeMode="contain"
                    />
                    <Image
                      source={profileOpen ? IMAGE.pic_3 : IMAGE.blur_3}
                      style={{
                        width: WIDTH / 4,
                       height: HEIGHT/6,
                      }}
                      resizeMode="contain"
                    />
                    <Image
                      source={profileOpen ? IMAGE.pic_4 : IMAGE.blur_4}
                      style={{
                        width: WIDTH / 4,
                       height: HEIGHT/6,
                        marginTop:Platform.OS=== 'ios'?10:0
                      }}
                      resizeMode="contain"
                    />
                    <Image
                      source={profileOpen ? IMAGE.pic_5 : IMAGE.blur_1}
                      style={{
                        width: WIDTH / 4,
                       height: HEIGHT/6,
                        marginTop:Platform.OS=== 'ios'?10:0
                      }}
                      resizeMode="contain"
                    />
                    <Image
                      source={profileOpen ? IMAGE.pic_6 : IMAGE.blur_2}
                      style={{
                        width: WIDTH / 4,
                       height: HEIGHT/6,
                        marginTop:Platform.OS=== 'ios'?10:0
                      }}
                      resizeMode="contain"
                    />
                  </View>
                  <BlockReport />
              </View>
            </View>
            <View>
              <View style={{height: HEIGHT / 2.5}}>
                  <View style={{...styles.box, paddingVertical: 35,borderWidth:profileOpen?1:0,}}>
                    <Text style={styles.boxTite}>
                      What’s your favorite book/movie, and what do you love most
                      about it?
                    </Text>
                    {/* <TextInput
                      placeholder=" And write your owner answers"
                      style={{...styles.boxdescription, marginTop: 30}}
                      placeholderTextColor={'#000'}
                    /> */}

                    <Text  style={{...styles.boxdescription, marginTop: 30,color:'#000'}}> And write your owner answers</Text>

                    <View
                      style={{
                        borderBottomWidth: 1,
                        width: WIDTH / 1.2,
                        alignSelf: 'center',
                        borderBottomColor: '#CACACA',
                        top: 10,
                      }}></View>
                    <Text style={{...styles.boxTite, marginTop: 45}}>
                      Describe a life changing experience that has shaped who
                      you are today
                    </Text>
                    {/* <TextInput
                      placeholder=" And write your owner answers"
                      style={{...styles.boxdescription, marginTop: 30}}
                      placeholderTextColor={'#000'}
                    /> */}

<Text  style={{...styles.boxdescription, marginTop: 30,color:'#000'}}> And write your owner answers</Text>


                    <View
                      style={{
                        borderBottomWidth: 1,
                        width: WIDTH / 1.2,
                        alignSelf: 'center',
                        borderBottomColor: '#CACACA',
                        top: 10,
                      }}></View>
                    <Text style={{...styles.boxTite, marginTop: 45}}>
                      What’s the most memorable trip you’ve taken, and what made
                      it so special?
                    </Text>
                    {/* <TextInput
                      placeholder=" And write your owner answers"
                      style={{...styles.boxdescription, marginTop: 30}}
                      placeholderTextColor={'#000'}
                    /> */}

<Text  style={{...styles.boxdescription, marginTop: 30,color:'#000'}}> And write your owner answers</Text>

                  </View>
                  <BlockReport />
              </View>
            </View>
            <View>
              <View style={{height: HEIGHT / 2.5}}>
                  <View style={{...styles.box,borderWidth:profileOpen?1:0,}}>
                    {profileOpen ? (
                      <View>
                        <Text style={styles.boxTite}>
                          My intention on Albi is...
                        </Text>
                        <Text
                          style={{
                            ...styles.boxdescription,
                            fontWeight: '500',
                            fontFamily: font.medium,
                          }}>
                          hopefully find someone I can connect with on a deeper
                          level.
                        </Text>
                      </View>
                    ) : null}
                     <Text style={{...styles.boxTite, marginTop: 15}}>Languages I Know</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={IMAGE.translate}
                        style={{
                          width: 22,
                          height: 22,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                          fontWeight: '500',
                          fontFamily: font.medium,
                        }}>
                        English, Arabic, Spanish
                      </Text>
                    </View>
                    <Text style={{...styles.boxTite, marginTop: 15}}>
                      Children
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={IMAGE.children}
                        style={{
                          width: 22,
                          height: 22,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                          fontWeight: '500',
                          fontFamily: font.medium,
                        }}>
                        I want children
                      </Text>
                    </View>
                    <Text style={{...styles.boxTite, marginTop: 15}}>
                      Smoking
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={IMAGE.smoking}
                        style={{
                          width: 22,
                          height: 22,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                          fontWeight: '500',
                          fontFamily: font.medium,
                        }}>
                        Social Smoker
                      </Text>
                    </View>
                    <Text style={{...styles.boxTite, marginTop: 15}}>
                      Workout
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={IMAGE.workout}
                        style={{
                          width: 22,
                          height: 22,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                          fontWeight: '500',
                          fontFamily: font.medium,
                        }}>
                        Every day
                      </Text>
                    </View>
                    <Text style={{...styles.boxTite, marginTop: 15}}>Pets</Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.1,
                        marginTop: 15,
                      }}>
                      <Image
                        source={IMAGE.cat}
                        style={{
                          width: 22,
                          height: 22,
                          alignSelf: 'center',
                        }}
                      />
                      <Text
                        style={{
                          ...styles.boxdescription,
                          alignSelf: 'center',
                          marginTop: 0,
                          marginLeft: 10,
                          fontWeight: '500',
                          fontFamily: font.medium,
                        }}>
                        Cat
                      </Text>
                    </View>
                  </View>
                  <BlockReport />
              </View>
            </View>
          </Swiper>
        </View>
        </ScrollView>
        <View style={styles.Toprow}>
            <TouchableOpacity onPress={()=>navigation.goBack()}>
              <Image
                source={IMAGE.BtnBack}
                style={{
                  width: 52,
                  height: 52,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <NoticeModel
              onclose={val => {
                modelVisibleClose(!modelVisibeOpen);
              }}
              modelvisible={modelVisibeOpen}
              title={'Profile Currently Hidden'}
              description={"This user’s profile is currently hidden. You should interact with this user for at least 48 hours to view their photos. After that, the pictures will unlock."}
              profile={'profile'}
              onRetrun={() => {
                modelVisibleClose(!modelVisibeOpen);
              }}
            />
            {profileOpen ? null : (
              <TouchableOpacity
                onPress={() => modelVisibleClose(!modelVisibeOpen)}>
                <Image
                  source={IMAGE.LockIcon}
                  style={{
                    width: 52,
                    height: 52,
                  }}
                  resizeMode="contain"
                />
              </TouchableOpacity>
            )}
          </View>
   </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Yellow,
  },
  flex: {
    flexDirection: 'column',
    flex: 1,
  },
  profile: {
    flex: 3,
  },
  secondcontain: {
    flex: 4,
  },
  Toprow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: WIDTH / 1.2,
    alignSelf: 'center',
    position: 'absolute',
    top: 45,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: WIDTH / 1.2,
    alignSelf: 'center',
    position: 'absolute',
    top: -50,
  },
  nameText: {
    color: '#000',
    fontSize: 34,
    fontWeight: '600',
    fontFamily: font.semibold,
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
  },
  box: {
    width: WIDTH / 1.1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 15,
    
    borderColor:'#000000'
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
    marginBottom:5
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
});
export default UserProfileDetail;

