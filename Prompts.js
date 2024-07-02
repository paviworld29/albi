import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  Platform,
  StyleSheet,
  TextInput,
  Image,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';

import React, {useEffect, useState} from 'react';
import {IMAGE, font} from '../Constant';
import {BASE_API} from '../API/Base_Api';
import AsyncStorage from '@react-native-async-storage/async-storage';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const Prompts = () => {
  const [getPrompts, setGetPrompts] = useState([]);
  const [answer, setAnswer] = useState([]);
  const [showAllQuestion, setShowAllQuestion] = useState(false);

  const getPromptsApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}prompts`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setGetPrompts(result?.data);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    getPromptsApi();
  }, []);
  const PromptPopup = () => {
    return (
      <View>
        <View>
          <Modal
            isVisible={showAllQuestion}
            onRequestClose={() => {
              setShowAllQuestion(!showAllQuestion);
            }}>
            <View
              style={{
                backgroundColor: '#FFFFFF',
                borderRadius: 19,
                width: WIDTH / 1.05,
                height: HEIGHT / 1.3,
                borderWidth: 1,
                borderColor: '#000',
                alignSelf: 'center',
              }}>
              <View style={{paddingTop: 10, paddingHorizontal: 10}}>
                <Text
                  style={{
                    color: '#000',
                    fontSize: 26,
                    fontWeight: '700',
                    fontFamily: font.bold,
                    alignSelf: 'center',
                  }}>
                  {'Written Prompts'}
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
                  {'3 answers required'}
                </Text>
              </View>
              <View style={{height: HEIGHT / 1.9}}>
                <ScrollView>
                  <View
                    style={{
                      ...styles.horizontalhalf,
                      width: WIDTH / 1.25,
                      marginTop: 10,
                    }}
                  />
                  {getPrompts?.map((item, index) => (
                    <View key={index}>
                      <Text
                        style={{
                          fontSize: 14,
                          fontWeight: '600',
                          color: '#101010',
                          fontFamily: font.bold,
                          left: 20,
                          width: WIDTH / 1.3,
                          marginTop: 10,
                        }}>
                        {item?.question}
                      </Text>
                      <TextInput
                        placeholder="And write your owner answers"
                        placeholderTextColor="#101010"
                        value={answer[index]}
                        onChangeText={text =>
                          handleAnswerChange(index, {
                            answer: text,
                            question: item?.question,
                            id: item?.id,
                          })
                        }
                        style={{
                          left: 20,
                          marginTop: 15,
                          width: WIDTH / 1.5,
                        }}
                      />
                      {getPrompts.length ? null : (
                        <View
                          style={{
                            ...styles.horizontalhalf,
                            width: WIDTH / 1.25,
                            marginTop: 10,
                          }}
                        />
                      )}
                    </View>
                  ))}
                </ScrollView>
              </View>
              <View
                style={{
                  position: 'absolute',
                  bottom: 15,
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignSelf: 'center',
                  width: WIDTH / 1.3,
                }}>
                <TouchableOpacity
                  onPress={() => setShowAllQuestion(!showAllQuestion)}
                  style={{
                    backgroundColor: '#fff',
                    borderRadius: 30,
                    paddingVertical: 10,
                    width: WIDTH / 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                    borderWidth: 1,
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontWeight: '700',
                      fontFamily: font.bold,
                    }}>
                    Cancel
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => setShowAllQuestion(!showAllQuestion)}
                  style={{
                    backgroundColor: '#E9C4AE',
                    borderRadius: 30,
                    paddingVertical: 10,
                    width: WIDTH / 4,
                    justifyContent: 'center',
                    alignItems: 'center',
                    alignSelf: 'center',
                  }}>
                  <Text
                    style={{
                      color: '#000',
                      fontSize: 18,
                      fontWeight: '700',
                      fontFamily: font.bold,
                    }}>
                    Add
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </View>
      </View>
    );
  };
  const handleAnswerChange = (index, detail) => {
    const newAnswers = [...answer];
    newAnswers[index] = detail;
    setAnswer(newAnswers);
  };
  return (
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
        height: HEIGHT / 1.55,
      }}>
      <TouchableOpacity
        onPress={() => {
          setShowAllQuestion(!showAllQuestion);
        }}
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 20,
          width: WIDTH / 1.12,
          marginVertical: 10,
        }}>
        <View>
          <Text
            style={{
              fontSize: 16,
              fontWeight: '700',
              color: '#101010',
              fontFamily: font.semibold,
              alignSelf: 'center',
              left: Platform.OS === 'ios' ? 15 : 11,
            }}>
            Written Prompts
          </Text>
          <Text
            style={{
              fontWeight: '400',
              fontSize: 14,
              fontFamily: font.normal,
              color: '#000000',
              marginTop: 5,

              left: 18,
            }}>
            3 answers required
          </Text>
        </View>
        <Image
          source={IMAGE.blurgreaterthansign}
          style={{
            width: 21.3,
            height: 20,
            alignSelf: 'center',
            right: 10,
          }}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
      <View
        style={{
          ...styles.horizontalhalf,
          width: WIDTH / 1.25,
          marginTop: 10,
        }}
      />
      {getPrompts?.map((item, index) => (
        // <PromptsData item={item} index={index} />
        <View key={index}>
          <Text
            style={{
              fontSize: 14,
              fontWeight: '600',
              color: '#101010',
              fontFamily: font.bold,
              left: 20,
              width: WIDTH / 1.3,
              marginTop: 10,
            }}>
            {index == 0
              ? item?.question
              : index == 1
              ? item?.question
              : index == 2
              ? item?.question
              : null}
          </Text>
          {index == 0 || index == 1 || index == 2 ? (
            <TextInput
              placeholder="And write your owner answers"
              placeholderTextColor="#101010"
              value={answer[index]}
              onChangeText={text =>
                handleAnswerChange(index, {
                  answer: text,
                  question: item?.question,
                  id: item?.id,
                })
              }
              style={{
                left: 20,
                marginTop: 15,
                width: WIDTH / 1.5,
              }}
            />
          ) : null}
          {getPrompts.length ? null : (
            <View
              style={{
                ...styles.horizontalhalf,
                width: WIDTH / 1.25,
                marginTop: 10,
              }}
            />
          )}
        </View>
      ))}
      <PromptPopup />
    </View>
  );
};

export default Prompts;
const styles = StyleSheet.create({
  horizontalhalf: {
    height: 1,
    backgroundColor: '#858585',
    border: 1,
    width: WIDTH / 1.27,
    alignSelf: 'center',
  },
});
