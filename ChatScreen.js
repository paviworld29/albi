import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  Image,
  FlatList,
  StatusBar,
  ImageBackground,
  ScrollView,
  Platform,
} from 'react-native';
import React, {useCallback, useEffect} from 'react';
import {IMAGE, font} from '../Constant';
import {TouchableOpacity} from 'react-native';
import {useRef} from 'react';
import RBSheet from 'react-native-raw-bottom-sheet';
import {useState} from 'react';
import moment from 'moment';
import NoticeModel from '../Components/NoticeModel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API } from '../API/Base_Api';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const users = [
  {
    id: 1,
    name: 'Albi',
    lastMassage: 'Hello, welcome to Albi!',
    time: '23 min',
    image: IMAGE.photo,
    count: 1,
  },
  {
    id: 2,
    name: 'Abigail',
    typing: 'Typing..',
    time: '27 min',
    image: IMAGE.photo1,
    count: 2,
  },
  {
    id: 3,
    name: 'Elizabeth',
    expired: 'Chat Expired',
    time: '33 min',
    image: IMAGE.photo2,
  },
  {
    id: 4,
    name: 'Penelope',
    mymessage: 'Hey! What’s up, long time...',
    time: '50 min',
    image: IMAGE.photo,
  },
  {
    id: 5,
    name: 'Chloe',
    mymessage: 'Hey! What’s up, long time...',
    time: '55 min',
    image: IMAGE.photo1,
  },
  {
    id: 6,
    name: 'Grace',
    mymessage: 'Hey! What’s up, long time...',
    time: '1 hour',
    image: IMAGE.photo2,
  },
  
];
const ChatScreen = ({navigation}) => {
  const messagesheets = useRef();
  const scrollViewRef = useRef(null);
  const menusheet = useRef();
  const [dataToPass, setDataToPass] = useState(null);
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState('');
  const [modelVisibeOpen, modelVisibleClose] = useState(false);
  const [modelBlockOpen, modelBlockClose] = useState(false);
  const [modelReportOpen, modelReportClose] = useState(false);
  const [show, setShow] = useState(false);

  const openSheet = item => {
    setDataToPass(item); // Set the data you want to pass
    messagesheets.current.open(); // Open the RBSheets
MessagesApi()
  };

  const scrollToBottom = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({animated: true});
    }
  };
  const sendMessage = () => {
    if (text.trim() === '') return;
    const newComment = {
      id: messages.length + 1,
      text: text,
      timestamp: new Date(),
      user: {
        _id: dataToPass ? dataToPass.id : 1, // Sender's user ID
        name: dataToPass ? dataToPass.name : '', // Sender's name
      },
    };

    setMessages([...messages, newComment]);
    setText('');
  };
const MessagesApi = async()=>{
  const Token = await AsyncStorage.getItem('token');
  var myHeaders = new Headers();
  myHeaders.append('Accept', 'application/json');
  myHeaders.append('Authorization', `Bearer ${Token}`);
var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

fetch(`${BASE_API}messageList`, requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
}
  const RenderItem = ({item}) => {
    return (
      <TouchableOpacity onPress={() => openSheet(item)}>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            width: WIDTH / 1.15,
            marginVertical: 14,
            marginTop:16
          }}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={item.image}
              style={{
                width: 48,
                height: 48,
                alignSelf: 'center',
              }}
            />
            <View style={{marginLeft: 15}}>
              <Text
                style={{...styles.Message, fontSize: 14, fontWeight: '700'}}>
                {item.name}
              </Text>
              {item.typing ? (
                <Text
                  style={{
                    ...styles.Message,
                    fontSize: 14,
                    fontWeight: '400',
                    width: WIDTH / 2,
                    fontFamily: font.normal,
                  }}>
                  {item.typing}
                </Text>
              ) : (
                <View>
                  {item.expired ? (
                    <Text
                      style={{
                        ...styles.Message,
                        fontSize: 14,
                        fontWeight: '400',
                        width: WIDTH / 2,
                        color: 'red',
                        fontFamily: font.normal,
                      }}>
                      {item.expired}
                    </Text>
                  ) : (
                    <View>
                      {item.mymessage ? (
                        <Text
                          style={{
                            ...styles.Message,
                            fontSize: 14,
                            fontWeight: '400',
                            width: WIDTH / 2,
                            fontFamily: font.normal,
                          }}>
                          <Text
                            style={{
                              ...styles.Message,
                              fontSize: 14,
                              fontWeight: '400',
                              width: WIDTH / 2,
                              color: '#E8E6EA',
                              fontFamily: font.normal,
                            }}>
                            You:{' '} 
                          </Text>
                          {item.mymessage}
                        </Text>
                      ) : (
                        <Text
                          style={{
                            ...styles.Message,
                            fontSize: 14,
                            fontWeight: '400',
                            width: WIDTH / 2,
                            fontFamily: font.normal,
                          }}>
                          {item.lastMassage}
                        </Text>
                      )}
                    </View>
                  )}
                </View>
              )}
            </View>
          </View>
          <View>
            <Text style={{...styles.Message, fontSize: 12, fontWeight: '500'}}>
              {item.time}
            </Text>
            {item.count && (
              <View
                style={{
                  width: 20,
                  height: 20,
                  borderRadius: 50,
                  backgroundColor: '#000',
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  marginTop: 5,
                }}>
                <Text
                  style={{
                    ...styles.Message,
                    fontSize: 12,
                    fontWeight: '600',
                    color: '#fff',
                  }}>
                  {item.count}
                </Text>
              </View>
            )}
          </View>
        </View>
        <View
          style={{
            borderBottomWidth: 1,
            borderBottomColor: '#E8E6EA',
            width: WIDTH / 1.4,
            alignSelf: 'flex-end',
            right: 25,
          }}></View>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.contanier}>
      <StatusBar
        barStyle="dark-content"
        animated={true}
        translucent
        backgroundColor="transparent"
      />

      <View style={{padding: 18, marginLeft: 10, marginTop: 35}}>
        <Text style={styles.Message}>Messages</Text>
      </View>
      <View style={styles.search}>
        <Image
          source={IMAGE.search}
          style={{
            width: 20,
            height: 20,
            alignSelf: 'center',
            marginLeft: 20,
          }}
        />
        <TextInput
          style={styles.seachText}
          placeholder="Search"
          placeholderTextColor={'#000'}
        />
      </View>
      
      <View style={{marginTop:15}}></View>
      <FlatList
        showsVerticalScrollIndicator={false}
        renderItem={item => <RenderItem {...item} />}
        data={users}
      />
      <RBSheet
        ref={messagesheets}
        closeOnDragDown={true}
        closeOnPressMask={true}
        customStyles={{
          container: {
            flex: 10,
            backgroundColor: 'transparent',
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
            width: WIDTH,
            height: HEIGHT / 1.1,
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
              top: -3,
            }}></View>
          <View
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: WIDTH / 1.1,
              justifyContent: 'space-around',
              marginTop: 25,
            }}>
         <TouchableOpacity onPress={()=>
         {navigation.navigate('UserProfileDetail',{type:'chat'})
         messagesheets.current.close()
        }
        }>
         <Image
              source={dataToPass ? dataToPass.image : IMAGE.photo}
              style={{
                width: 48,
                height: 48,
                alignSelf: 'center',
              }}
            />
         </TouchableOpacity>
         <TouchableOpacity onPress={()=>{navigation.navigate('UserProfileDetail',{type:'chat'})
         messagesheets.current.close()
        
        }}>
              <Text
                numberOfLines={1}
                style={{
                  ...styles.Message,
                  fontSize: 24,
                  fontWeight: '700',
                  width: 100,
                }}>
                {dataToPass ? dataToPass.name : ''}
              </Text>
              <Text
                style={{
                  ...styles.Message,
                  fontSize: 12,
                  fontWeight: '400',
                  fontFamily: font.normal,
                }}>
                online
              </Text>
          </TouchableOpacity>
            <TouchableOpacity style={{alignSelf: 'center'}}>
              <Image
                source={IMAGE.videocall}
                style={{
                  width: 18,
                  height: 16,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity 
            style={{alignSelf: 'center'}}>
              <Image
                source={IMAGE.voicecall}
                style={{
                  width: 16,
                  height: 16,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => menusheet.current.open()}>
              <Image
                source={IMAGE.menu}
                style={{
                  width: 52,
                  height: 52,
                  alignSelf: 'center',
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              width: WIDTH / 1.1,
              alignSelf: 'center',
              height: HEIGHT / 1.4,
            }}>
            {/* <FlatList
              data={messages}
              keyExtractor={item => item.id.toString()}
              style={{
                width: WIDTH / 1.1,
                height: HEIGHT / 1.6,
                alignSelf: 'center',
              }}
              renderItem={({item}) => ( */}
            <ScrollView
              ref={scrollViewRef}
              onContentSizeChange={() => scrollToBottom()}>
              {messages &&
                messages.map((item,index) => (
                  <View key={index}>
                    <TouchableOpacity
                      style={{
                        paddingHorizontal: 18,
                        paddingVertical: 8,
                        backgroundColor:
                          item?.user?._id == dataToPass.id ? '#F3F3F3' : '#000',
                        margin: 10,
                        borderBottomLeftRadius:
                          item?.user?._id == dataToPass.id ? 15 : 0,
                        borderBottomRightRadius:
                          item?.user?._id == dataToPass.id ? 0 : 15,
                        borderTopLeftRadius: 15,
                        borderTopRightRadius: 15,

                        alignSelf:
                          item?.user?._id == dataToPass.id
                            ? 'flex-end'
                            : 'flex-start',
                      }}>
                      <Text
                        style={{
                          color:
                            item?.user?._id == dataToPass.id ? '#000' : '#fff',
                          fontSize: 14,
                          fontWeight: '400',
                          fontFamily:font.normal,
                          alignSelf:
                            item?.user?._id == dataToPass.id
                              ? 'flex-end'
                              : 'flex-start',
                        }}>
                        {item.text}
                      </Text>
                    </TouchableOpacity>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignSelf:
                          item?.user?._id == dataToPass.id
                            ? 'flex-end'
                            : 'flex-start',
                        marginRight: item?.user?._id == dataToPass.id ? 10 : 0,
                        marginLeft: item?.user?._id == dataToPass.id ? 0 : 10,
                      }}>
                      <Text
                        style={{
                          color: '#000',
                          fontSize: 14,
                          fontWeight: '400',
                          marginRight: 5,
                          fontFamily:font.normal,
                          textAlign:
                            item?.user?._id == dataToPass.id ? 'right' : 'left',
                        }}>
                        {moment(item.timestamp).format('LT')}
                      </Text>
                      {item?.user?._id == dataToPass.id ? (
                        <Image
                          source={IMAGE.tick}
                          style={{
                            width: 16,
                            height: 16,
                            alignSelf: 'center',
                          }}
                          resizeMode="contain"
                        />
                      ) : null}
                    </View>
                  </View>
                ))}
            </ScrollView>
          {/* <View style={{height:HEIGHT/1.55}}>
          <ScrollView>
              <TouchableOpacity activeOpacity={1} >
                <TouchableOpacity
                  style={{
                    paddingHorizontal: 18,
                    paddingVertical: 16,
                    backgroundColor: '#000',
                    margin: 10,
                    // borderBottomLeftRadius: 15,
                    borderBottomRightRadius: 15,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,

                    alignSelf: 'flex-start',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      fontWeight: '400',
                      fontFamily: font.normal,
                      alignSelf: 'flex-start',
                    }}>
                    Hi Jake, how are you? I saw on the app that we’ve crossed
                    paths several times this week.
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf: 'flex-start',
                    marginRight: 0,
                    marginLeft: 10,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontWeight: '400',
                      marginRight: 5,
                      fontFamily: font.normal,
                      textAlign: 'left',
                    }}>
                    2:55 PM
                  </Text>
                </View>
               {show?(
                <View>
                   <TouchableOpacity
                  style={{
                    paddingHorizontal: 18,
                    paddingVertical: 16,
                    backgroundColor:'#F3F3F3',
                    margin: 10,
                    borderBottomLeftRadius: 15,
                    // borderBottomRightRadius: 15,
                    borderTopLeftRadius: 15,
                    borderTopRightRadius: 15,

                    alignSelf:'flex-end',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontWeight: '400',
                      fontFamily: font.normal,
                      alignSelf: 'flex-start',
                    }}>
                    Haha truly! Nice to meet you Grace! What about a cup of coffee today evening? ☕️ 
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    flexDirection: 'row',
                    alignSelf:'flex-end',
                    marginRight: 0,
                    marginLeft:  10,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontWeight: '400',
                      marginRight: 5,
                      fontFamily: font.normal,
                      textAlign: 'right',
                    }}>
                   2:56 PM
                  </Text>
                 
                </View>
                <View style={styles.acceptBox}>
                <Text
                    style={{
                      color: '#000',
                      fontSize: 14,
                      fontWeight: '400',
                      fontFamily: font.normal,
                      textAlign: 'center',
                      alignSelf: 'center',
                      width: WIDTH / 1.4,
                    }}>
                   It's Showtime for Your Stunning Self!
                  </Text>
                  <TouchableOpacity style={{...styles.btn,marginTop:35}}>
                    <Text style={styles.btnText}>Reveal your photos</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.btn}>
                    <Text style={styles.btnText}>Unmatch</Text>
                  </TouchableOpacity>
                </View>
                </View>
               ):(
                <View style={styles.acceptBox}>
                <Image
                  source={IMAGE.unlock_icon}
                  style={{
                    width: 149,
                    height: 149,
                    alignSelf: 'center',
                  }}
                  resizeMode="contain"
                />
                <Text
                  style={{
                    color: '#000',
                    fontSize: 14,
                    fontWeight: '400',
                    fontFamily: font.normal,
                    textAlign: 'center',
                    alignSelf: 'center',
                    width: WIDTH / 1.4,
                  }}>
                  Ready to reveal your profile photos and take your connection
                  to the next level with [Match's Name]?
                </Text>
                <TouchableOpacity 
                onPress={()=>setShow(!show)}
                style={styles.btn}>
                  <Text style={styles.btnText}>Reveal your photos</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn}>
                  <Text style={styles.btnText}>Unmatch</Text>
                </TouchableOpacity>
              </View>
               )}
              
              </TouchableOpacity>
            </ScrollView>
          </View> */}
          </View>
        </ImageBackground>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignSelf: 'center',
            width: WIDTH / 1.15,
            position: 'absolute',
            bottom: 15,
            backgroundColor: '#fff',
          }}>
          <View style={styles.sendMessage}>
            <TextInput
              style={styles.sendtext}
              value={text}
              placeholder="Your message"
              onChangeText={text => setText(text)}
              placeholderTextColor={'#000'}
            />
            <TouchableOpacity
              style={{alignSelf: 'center'}}
              onPress={sendMessage}>
              <Image
                source={IMAGE.sendicon}
                style={{
                  width: 20,
                  height: 20,
                  alignSelf: 'center',
                  right: 20,
                }}
                resizeMode="contain"
              />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={{
              width: 48,
              height: 48,
              borderWidth: 1,
              borderRadius: 15,
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <Image
              source={IMAGE.voice}
              style={{
                width: 20,
                height: 20,
                alignSelf: 'center',
              }}
              resizeMode="contain"
            />
          </TouchableOpacity>
        </View>
        <RBSheet
        ref={menusheet}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          container: {
            height: 270,
            backgroundColor: '#fff',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
          
          },
          draggableIcon: {
            backgroundColor: '#000',
            width: 60,
            bottom: 10,
          },
        }}>
        <View>
          <TouchableOpacity
            onPress={() => modelVisibleClose(!modelVisibeOpen)}
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: WIDTH / 1.2,
              marginTop: 25,
            }}>
            <Image
              source={IMAGE.unmatchsecond}
              style={{
                width: 18,
                height: 18,
                
              }}
              resizeMode="contain"
            />
            <View
              style={{
                marginLeft: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#E8E6EA',
                width: WIDTH / 1.4,
              }}>
              <Text
                style={{
                  ...styles.Message,
                  fontSize: 16,
                  fontWeight: '500',
                  fontFamily: font.medium,
                }}>
                Unmatch with "{dataToPass ? dataToPass.name : ''}"
              </Text>
              <Text
                style={{
                  ...styles.Message,
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#A4A4A4',
                  marginBottom: 15,
                  fontFamily: font.normal,
                }}>
                No longer interested? Unmatch them.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => modelBlockClose(!modelBlockOpen)}
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: WIDTH / 1.2,
              marginTop: 25,
            }}>
            <Image
              source={IMAGE.block}
              style={{
                width: 18,
                height: 18,
                top: 3,
              }}
              resizeMode="contain"
            />
            <View
              style={{
                marginLeft: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#E8E6EA',
                width: WIDTH / 1.4,
              }}>
              <Text
                style={{
                  ...styles.Message,
                  fontSize: 16,
                  fontWeight: '500',
                  fontFamily: font.medium,
                }}>
                Block "{dataToPass ? dataToPass.name : ''}"
              </Text>
              <Text
                style={{
                  ...styles.Message,
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#A4A4A4',
                  marginBottom: 15,
                  fontFamily: font.normal,
                }}>
                Block them, you won’t match again.
              </Text>
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => modelReportClose(!modelReportOpen)}
            style={{
              flexDirection: 'row',
              alignSelf: 'center',
              width: WIDTH / 1.2,
              marginTop: 25,
            }}>
            <Image
              source={IMAGE.report}
              style={{
                width: 13,
                height: 15,
                top: 3,
              }}
              resizeMode="contain"
            />
            <View
              style={{
                marginLeft: 15,
                borderBottomWidth: 1,
                borderBottomColor: '#E8E6EA',
                width: WIDTH / 1.4,
              }}>
              <Text
                style={{
                  ...styles.Message,
                  fontSize: 16,
                  fontWeight: '500',
                  fontFamily: font.medium,
                }}>
                Report "{dataToPass ? dataToPass.name : ''}"
              </Text>
              <Text
                style={{
                  ...styles.Message,
                  fontSize: 12,
                  fontWeight: '400',
                  color: '#A4A4A4',
                  marginBottom: 15,
                  fontFamily: font.normal,
                }}>
                Account looks suspicious? Report them.
              </Text>
            </View>
          </TouchableOpacity>
          <NoticeModel
            onclose={val => {
              modelVisibleClose(!modelVisibeOpen);
            }}
            modelvisible={modelVisibeOpen}
            modelbtnTitle={'Unmatch'}
            Notice={'Notice'}
            description={`Are you sure you want to unmatch with"${
              dataToPass ? dataToPass.name : ''
            }"?`}
            note={'This cannot be undone.'}
            onRetrun={() => {
              modelVisibleClose(!modelVisibeOpen);
            }}
          />
          <NoticeModel
            onclose={val => {
              modelBlockClose(!modelBlockOpen);
            }}
            modelvisible={modelBlockOpen}
            modelbtnTitle={'Block'}
            Notice={'Notice'}
            description={`Are you sure you want to block"${
              dataToPass ? dataToPass.name : ''
            }"?`}
            note={'This cannot be undone.'}
            onRetrun={() => {
              modelBlockClose(!modelBlockOpen);
            }}
          />
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
        </View>
      </RBSheet>
      </RBSheet>

     
    </View>
  );
};

export default ChatScreen;
const styles = StyleSheet.create({
  contanier: {
    flex: 1,
    backgroundColor: '#fff',
  },
  Message: {
    color: '#000',
    fontSize: 34,
    fontWeight: '700',
    fontFamily: font.bold,
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: WIDTH / 1.12,
    borderWidth: 1,
    borderRadius: 15,
  },
  seachText: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    width: WIDTH / 1.4,
    fontFamily: font.normal,
    paddingVertical:Platform.OS==='ios'?15:10
  },
  sendMessage: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignSelf: 'center',
    width: WIDTH / 1.4,
    borderWidth: 1,
    borderRadius: 15,
  },
  sendtext: {
    color: '#000',
    fontSize: 14,
    fontWeight: '400',
    width: WIDTH / 1.9,
    marginLeft: 15,
    paddingVertical:Platform.OS==='ios'?15:10
  },
  acceptBox: {
    borderWidth: 1,
    borderColor: '#000',
    width: WIDTH / 1.15,
    alignSelf: 'center',
    borderRadius: 10,
    paddingTop: 10,
    paddingBottom: 30,
    marginTop:15
  },
  btn:{
    width:WIDTH/1.4,
    alignSelf:'center',
    backgroundColor:'#000',
    borderRadius:15,
    justifyContent:'center',
    alignItems:'center',
    marginTop:15,
    paddingVertical:12
  },
  btnText:{
    color:'#fff',
    fontSize:14,
    fontWeight:'600',
    fontFamily:font.semibold
  }
});
