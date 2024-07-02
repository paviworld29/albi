import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  Platform,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import React, {useRef, useState} from 'react';
import {hp, wp} from '../Components/Config';
import Modal from 'react-native-modal';
import {COLORS, IMAGE, font} from '../Constant';
import Pagination from './Pagination';
import moment from 'moment';
import {useEffect} from 'react';
const data = [
  {
    id: 1,
    title: 'Fake Profile',
  },
  {
    id: 2,
    title: 'Inappropriate content',
  },
  {
    id: 3,
    title: 'Possible Scams',
  },
  {
    id: 4,
    title: 'Identity-based Issues',
  },
  {
    id: 5,
    title: 'Policy Violations',
  },
  {
    id: 6,
    title: 'Age Concerns',
  },
  {
    id: 7,
    title: 'Simply Not Feeling a Connection',
  },
];
const Data = [
  {
    id: 1,
    title: 'Swipe Right',
    description:
      'Express interest in someone by swiping right to potentially match with them.',
  },
  {
    id: 2,
    title: 'Swipe Left',
    description:
      " If someone isn't the right fit, simply swipe left to pass on the profile.",
  },
  {
    id: 3,
    title: 'Super Heart',
    description:
      'Show extra enthusiasm by sending a Super Heart to someone special.',
  },
  {
    id: 4,
    title: 'Backtrack',
    description:
      'Made a hasty swipe decision? Use Backtrack to undo it and reconsider.',
  },
];
const NoticeModel = ({
  profile,
  onclose,
  modelvisible,
  modelbtnTitle,
  Notice,
  description,
  note,
  onRetrun,
  title,
  check,
}) => {
  const [select, setSelect] = useState({
    index: -1,
    detail: {},
  });
  // console.log('fkjfj', select);
  return (
    <View>
      {profile == 'profile' ? (
        <View>
          <Modal
            animationType="slide"
            backdropOpacity={0.6}
            transparent={true}
            backdropColor={'rgba(0, 0, 0, 0.8)'}
            visible={modelvisible}
            style={{
              position: 'absolute',
              alignSelf: 'center',
              top: Platform.OS === 'ios' ? 110 : 80,
            }}
            onBackdropPress={() => {
              if (onRetrun) {
                onRetrun();
              }
            }}
            onRequestClose={() => {
              if (onRetrun) {
                onRetrun();
              }
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 19,
                paddingVertical: 30,
                justifyContent: 'center',
                alignItems: 'center',
                width: WIDTH / 1.15,
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 18,
                  fontWeight: '600',
                  fontFamily: font.semibold,
                }}>
                {title}
              </Text>

              <Text
                style={{
                  color: '#000000',
                  fontSize: 14,
                  fontWeight: '400',
                  textAlign: 'center',
                  marginTop: 10,
                  width: WIDTH / 1.35,
                  alignSelf: 'center',
                  ontFamily: font.normal,
                }}>
                {description}
              </Text>
            </View>
          </Modal>
        </View>
      ) : (
        <View>
          <Modal
            animationType="slide"
            backdropOpacity={0.6}
            transparent={true}
            backdropColor={'rgba(0, 0, 0, 0.8)'}
            visible={modelvisible}
            onRequestClose={() => {
              if (onRetrun) {
                onRetrun();
              }
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 19,
                paddingVertical: 25,
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  flexDirection: 'row',
                  justifyContent: 'space-around',
                  width: WIDTH / 1.2,
                }}>
                <View></View>
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 16,
                    fontWeight: '700',
                    fontFamily: font.bold,
                  }}>
                  {Notice}
                </Text>
                <TouchableOpacity
                  onPress={() => {
                    if (onclose) {
                      onclose();
                    }
                  }}>
                  <View style={{left: 20, height: 25, width: 25}}>
                    <Image
                      source={IMAGE.closesecond}
                      style={{
                        width: 10,
                        height: 10,
                        // left: 20,
                      }}
                      resizeMode={'contain'}
                    />
                  </View>
                </TouchableOpacity>
              </View>

              <Text
                style={{
                  color: '#000000',
                  fontSize: 15,
                  fontWeight: '400',
                  textAlign: 'center',
                  marginTop: 20,
                  width: WIDTH / 1.4,
                  alignSelf: 'center',
                  fontFamily: font.normal,
                }}>
                {description}
              </Text>
              {check == 'check' ? (
                <View style={{marginTop: 25, marginLeft: 15}}>
                  {data?.map((item, index) => (
                    <TouchableOpacity
                      onPress={() =>
                        setSelect({
                          index: index,
                          detail: item,
                        })
                      }
                      key={index}
                      style={{
                        flexDirection: 'row',
                        width: WIDTH / 1.2,
                        alignSelf: 'center',
                        marginVertical: 5,
                      }}>
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 50,
                          alignSelf: 'center',
                          backgroundColor:
                            select.index == index ? '#000' : '#D9D9D9',
                        }}></View>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 15,
                          fontWeight: '500',
                          alignSelf: 'center',
                          fontFamily: font.medium,
                          marginLeft: 10,
                        }}>
                        {item.title}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              ) : (
                <Text
                  style={{
                    color: '#000000',
                    fontSize: 15,
                    fontWeight: '400',
                    textAlign: 'center',
                    marginTop: 25,
                    width: WIDTH / 1.4,
                    alignSelf: 'center',
                    fontFamily: font.normal,
                  }}>
                  {note}
                </Text>
              )}

              <TouchableOpacity
                onPress={() => {
                  if (onclose) {
                    onclose();
                  }
                }}
                style={styles.button}>
                <Text style={[styles.ButtonText]}>{modelbtnTitle}</Text>
              </TouchableOpacity>
            </View>
          </Modal>
        </View>
      )}
    </View>
  );
};

export default NoticeModel;
export const GuidAppIntro = ({
  profile,
  onclose,
  modelvisible,
  modelbtnTitle,
  note,
  onRetrun,
  title,
  check,
}) => {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);

  const handlePress = () => {
    // console.log('fdnhfdh', Data.length - 1, index);
    if (Data.length - 1 > index) {
      setIndex(index + 1);
      ref.current.scrollToIndex({animated: true, index: parseInt(index) + 1});
    } else {
    }
  };
  return (
    <View>
      <View>
        <Modal
          animationType="slide"
          backdropOpacity={0.6}
          transparent={true}
          backdropColor={'rgba(0, 0, 0, 0.8)'}
          visible={modelvisible}
          style={{marginTop: HEIGHT / 8}}
          onRequestClose={() => {
            if (onRetrun) {
              onRetrun();
            }
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 19,
              paddingVertical: 25,
            }}>
            <Pagination data={Data} index={index} />

            <View>
              <Animated.FlatList
                ref={ref}
                data={Data}
                horizontal
                pagingEnabled
                snapToAlignment="center"
                showsHorizontalScrollIndicator={false}
                onScroll={e => {
                  const x = e.nativeEvent.contentOffset.x;
                  setIndex((x / WIDTH).toFixed(0));
                }}
                renderItem={({item, index}) => (
                  <Animated.View key={index}>
                    <View
                      style={{
                        alignSelf: 'center',
                        width: WIDTH / 1.15,
                      }}>
                      <Text
                        style={{
                          color: '#000000',
                          fontSize: 18,
                          fontWeight: '700',
                          fontFamily: font.bold,
                          alignSelf: 'center',
                          // right: 10,
                        }}>
                        {item.title}
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: '#000000',
                        fontSize: 14,
                        fontWeight: '400',
                        textAlign: 'center',
                        marginTop: 10,
                        width: WIDTH / 1.8,
                        alignSelf: 'center',
                        fontFamily: font.normal,
                      }}>
                      {item.description}
                    </Text>
                  </Animated.View>
                )}
              />
            </View>

            {Data.length - 1 == index ? (
              <TouchableOpacity
                onPress={() => {
                  if (onRetrun) {
                    onRetrun();
                    setIndex(0);
                  }
                }}
                style={{...styles.button, marginTop: 20}}>
                <Text style={[styles.ButtonText]}>Done</Text>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  handlePress();
                }}
                style={{...styles.button, marginTop: 20}}>
                <Text style={[styles.ButtonText]}>Next</Text>
              </TouchableOpacity>
            )}
            <TouchableOpacity
              onPress={() => {
                if (onRetrun) {
                  onRetrun();
                  setIndex(0);
                }
              }}>
              <Text
                style={{
                  color: '#000000',
                  fontSize: 12,
                  fontWeight: '400',
                  textAlign: 'center',
                  marginTop: 15,
                  width: WIDTH / 1.4,
                  alignSelf: 'center',
                  fontFamily: font.normal,
                  textDecorationLine: 'underline',
                }}>
                {note}
              </Text>
            </TouchableOpacity>
            {index == 2 ? (
              <Image
                source={IMAGE.downArrow}
                style={{
                  width: 30,
                  height: 60,
                  bottom: -50,
                  position: 'absolute',
                  right: 15,
                }}
                resizeMode={'contain'}
              />
            ) : null}
            {index == 3 ? (
              <Image
                source={IMAGE.downArrow}
                style={{
                  width: 30,
                  height: 60,
                  bottom: -50,
                  position: 'absolute',
                  left: 15,
                }}
                resizeMode={'contain'}
              />
            ) : null}
          </View>
        </Modal>
      </View>
    </View>
  );
};
export const DODModel = ({
  profile,
  onclose,
  modelvisible,
  modelbtnTitle,
  note,
  onRetrun,
  dates,
  check,
}) => {
  const [index, setIndex] = useState(0);
  const ref = useRef(null);
  const handlePress = () => {
    // console.log('fdnhfdh', Data.length - 1, index);
    if (Data.length - 1 > index) {
      setIndex(index + 1);
      ref.current.scrollToIndex({animated: true, index: parseInt(index) + 1});
    } else {
    }
  };
  return (
    <View>
      <View>
        <Modal
          animationType="slide"
          backdropOpacity={0.6}
          transparent={true}
          backdropColor={'rgba(0, 0, 0, 0.8)'}
          visible={modelvisible}
          style={{marginTop: HEIGHT / 8}}
          onRequestClose={() => {
            if (onRetrun) {
              onRetrun();
            }
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 19,
              // paddingVertical: 25,
            }}>
            <View style={{paddingTop: 25, paddingHorizontal: 20}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 26,
                  fontWeight: '700',
                  fontFamily: font.bold,
                }}>
                You're{' '}
                {`${moment().format('YYYY')}` -
                  `${moment(dates).format('YYYY')}`}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 18,
                  fontWeight: '600',
                  fontFamily: font.semibold,
                  marginTop: 10,
                }}>
                Born {`${moment(dates).format('LL')}`}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                  fontFamily: font.bold,
                  marginTop: 20,
                }}>
                Confirm your age is correct.{' '}
                <Text
                  style={{
                    color: '#000',
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: font.medium,
                  }}>
                  Let's keep our community authentic.
                </Text>
              </Text>
            </View>
            <View
              style={{
                borderTopWidth: 1,
                borderTopColor: 'grey',
                marginTop: 25,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  width: WIDTH / 1.3,
                  alignSelf: 'center',
                }}>
                <TouchableOpacity
                  onPress={() => {
                    if (onclose) {
                      onclose();
                    }
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontWeight: '500',
                      fontFamily: font.medium,
                      width: WIDTH / 3,
                      textAlign: 'center',
                    }}>
                    Edit
                  </Text>
                </TouchableOpacity>
                <View
                  style={{
                    width: 2,
                    height: HEIGHT / 14,
                    backgroundColor: 'grey',
                  }}></View>
                <TouchableOpacity
                  onPress={() => {
                    if (onRetrun) {
                      onRetrun();
                    }
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 16,
                      fontWeight: '700',
                      fontFamily: font.bold,
                      width: WIDTH / 3,
                      textAlign: 'center',
                    }}>
                    Confirm
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </View>
  );
};
export const Popup = ({
  profile,
  onclose,
  modelvisible,
  alerts,
  message,
  onRetrun,
  single,
  check,
}) => {
  return (
    <View>
      <View>
        <Modal
          animationType="slide"
          backdropOpacity={0.6}
          transparent={true}
          backdropColor={'rgba(0, 0, 0, 0.8)'}
          visible={modelvisible}
          style={{marginTop: HEIGHT / 8}}
          onRequestClose={() => {
            if (onRetrun) {
              onRetrun();
            }
          }}>
          <View
            style={{
              backgroundColor: '#FFFFFF',
              borderRadius: 19,
              // paddingVertical: 25,
            }}>
            <View style={{paddingTop: 25, paddingHorizontal: 20}}>
              <Text
                style={{
                  color: '#000',
                  fontSize: 26,
                  fontWeight: '700',
                  fontFamily: font.bold,
                  alignSelf: 'center',
                }}>
                {alerts}
              </Text>
              <Text
                style={{
                  color: '#000',
                  fontSize: 16,
                  fontWeight: '700',
                  fontFamily: font.bold,
                  marginTop: 20,
                  alignSelf: 'center',
                  textAlign: 'center',
                }}>
                {message}
              </Text>
            </View>
            <View
              style={{
                borderTopColor: 'grey',
                marginTop: 25,
              }}>
              {single == 'single' ? (
                <TouchableOpacity
                  onPress={() => {
                    if (onclose) {
                      onclose();
                    }
                  }}
                  style={{
                    ...styles.button,
                    bottom: 20,
                    width: WIDTH / 2.7,
                    borderRadius: 30,
                  }}>
                  <Text style={[styles.ButtonText]}>{'Ok'}</Text>
                </TouchableOpacity>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    width: WIDTH / 1.3,
                    alignSelf: 'center',
                  }}>
                  <TouchableOpacity
                   style={{
                    ...styles.button,
                    bottom: 20,
                    width: WIDTH / 2.7,
                    borderRadius: 30,
                  }}
                    onPress={() => {
                      if (onRetrun) {
                        onRetrun();
                      }
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '700',
                        fontFamily: font.bold,
                        width: WIDTH / 3,
                        textAlign: 'center',
                      }}>
                      Cancel
                    </Text>
                  </TouchableOpacity>
                  <View
                    style={{
                      width: 0,
                      height: HEIGHT / 14,
                      backgroundColor: 'grey',
                    }}></View>

                  <TouchableOpacity
                   style={{
                    ...styles.button,
                    bottom: 20,
                    width: WIDTH / 2.7,
                    borderRadius: 30,
                  }}
                    onPress={() => {
                      if (onclose) {
                        onclose();
                      }
                    }}>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 16,
                        fontWeight: '700',
                        fontFamily: font.bold,
                        width: WIDTH / 3,
                        textAlign: 'center',
                      }}>
                      Ok
                    </Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </View>
        </Modal>
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
    marginTop: 30,
  },
  ButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: font.semibold,
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
