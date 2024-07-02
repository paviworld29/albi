import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  Image,
  ImageBackground,
  Platform,
} from 'react-native';
import React, {useState, useRef, useMemo} from 'react';
import {SelectCountry} from 'react-native-element-dropdown';
import {IMAGE, font} from '../Constant';
import {RNCamera} from 'react-native-camera';
import {useEffect} from 'react';
import {BASE_API, ImageUrl} from '../API/Base_Api';
import {ActivityIndicator} from 'react-native';
import {useContext} from 'react';
import AppProvider from '../providers/AppProvider';
import MultipleImagePicker from '@baronha/react-native-multiple-image-picker';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const InterestsCompoenet = ({HeaderText, Decription}) => {
  const [loader, setLoader] = useState(false);
  const [data, setDate] = useState([]);
  const [selectedCards, setSelectedCards] = useState([]);
  const {setSelect} = useContext(AppProvider);
  useEffect(() => GetHobbiesApi(), []);

  const GetHobbiesApi = () => {
    setLoader(true);
    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(`${BASE_API}getHobbies`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setDate(result?.data);
        if (result?.response == true) {
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch(error => {});
  };

  const Card = ({onSelect, isSelected, item}) => {
    return (
      <TouchableOpacity
        onPress={onSelect}
        style={[styles.btn, isSelected && styles.selectedbtn]}>
        <Text style={[styles.btnText, isSelected && styles.selectedbtnText]}>
          {item.text} {item.name}
        </Text>
      </TouchableOpacity>
    );
  };

  const toggleSelect = (item, index) => {
    setSelect(prevList => {
      const updatedList = [...prevList];
      const existingIndex = updatedList.findIndex(el => el.index === index);
      if (existingIndex !== -1) {
        updatedList.splice(existingIndex, 1);
      } else {
        updatedList.push({
          index: index,
          detail: item,
        });
      }
      return updatedList;
    });

    setSelectedCards(prevSelected => {
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = !updatedSelected[index];
      return updatedSelected;
    });
  };

  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>
      <View style={{height: HEIGHT / 2.1, marginTop: 30}}>
        <ScrollView>
          {loader ? (
            <ActivityIndicator />
          ) : (
            <View
              style={{
                flexDirection: 'row',
                alignSelf: 'center',
                width: WIDTH / 1.13,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {data.map((item, index) => (
                <Card
                  index={index}
                  item={item}
                  key={index}
                  onSelect={() => toggleSelect(item, index)}
                  isSelected={selectedCards[index]}
                />
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </View>
  );
};

export const ReligionComponent = ({HeaderText, Decription}) => {
  const [religious, setReligious] = useState([]);
  const [loader, setLoader] = useState(false);

  useEffect(() => getReligious(), []);
  const getReligious = () => {
    setLoader(true);

    var requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };
    fetch(`${BASE_API}getReligion`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setReligious(result?.data);
        if (result?.response == true) {
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch(error => {});
  };
  const ShouldShowQuestion = ({item, index}) => {
    const {showMoreInfo, setShowMoreInfo} = useContext(AppProvider);

    return (
      <TouchableOpacity
        onPress={() => {
          setShowMoreInfo({
            index: index,
            detail: item,
          });
        }}>
        <View
          style={{
            ...styles.religiousbtn,
            backgroundColor: showMoreInfo.index == index ? '#000' : '#fff',
          }}>
          <Text
            style={{
              ...styles.btnText,
              color: showMoreInfo.index == index ? '#fff' : '#000',
            }}>
            {item.name}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };
  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>
      {loader ? (
        <ActivityIndicator />
      ) : (
        <View style={{height: HEIGHT / 1.8, marginTop: 55}}>
          <ScrollView>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignSelf: 'center',
                width: WIDTH / 1.13,
                flexDirection: 'row',
                flexWrap: 'wrap',
              }}>
              {religious.map((item, index) => (
                <View key={index}>
                  <ShouldShowQuestion item={item} index={index} />
                </View>
              ))}
            </View>
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export const CountrySelection = ({HeaderText, Decription}) => {
  const {
    country,
    setCountry,
    Secondcountry,
    setSecondCountry,
    selectedCountry,
    setSelectedCountry,
    setselectedsecondcountry,
  } = useContext(AppProvider);

  const [loader, setLoader] = useState(false);
  const [countrydata, setcountrydata] = useState([]);
  const [countrydata1, setcountrydata1] = useState([]);
  const [secondCountryShow, setSeconCountryShow] = useState(false);

  useEffect(() => {
    getCountry();
    getCountry1();
  }, [selectedCountry]);

  const getCountry1 = () => {
    setLoader(true);
    var formdata = new FormData();
    formdata.append('type', 1);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${BASE_API}getCountries`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setcountrydata(result?.data);
        if (result?.response == true) {
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch(error => {});
  };

  const getCountry = () => {
    setLoader(true);
    var formdata = new FormData();
    formdata.append('type', 2);
    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow',
    };
    fetch(`${BASE_API}getCountries`, requestOptions)
      .then(response => response.json())
      .then(result => {
        const newArray = result?.data.filter(
          obj => obj.id !== selectedCountry?.id,
        );
        setcountrydata1(newArray);
        if (result?.response == true) {
          setLoader(false);
        } else {
          setLoader(false);
        }
      })
      .catch(error => {});
  };

  const rendleicon = () => {
    return (
      <Image
        source={IMAGE.dropdownicon}
        style={{
          width: 15,
          height: 15,
          right: 20,
          tintColor: country ? '#fff' : '#000',
        }}
        resizeMode={'contain'}
      />
    );
  };
  const rendleicons = () => {
    return (
      <Image
        source={IMAGE.dropdownicon}
        style={{
          width: 15,
          height: 15,
          right: 20,
          tintColor: Secondcountry ? '#fff' : '#000',
        }}
        resizeMode={'contain'}
      />
    );
  };

  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>
      <View
        style={{
          ...styles.TextInput,
          marginTop: 30,
        }}>
        <Text style={{...styles.HeaderText, fontSize: 21}}>
          Primary
          <Text
            style={{
              color: 'red',
              fontWeight: '600',
              fontFamily: font.semibold,
            }}>
            {' '}
            *
          </Text>
        </Text>
      </View>
      <SelectCountry
        style={{...styles.dropdown, backgroundColor: country ? '#000' : '#fff'}}
        selectedTextStyle={{
          ...styles.selectedTextStyle,
          tintColor: country ? '#fff' : '#000',
        }}
        itemTextStyle={{color: 'red'}}
        containerStyle={{
          backgroundColor: '#fff',
          borderRadius: 2,
        }}
        placeholderStyle={styles.placeholderStyle}
        imageStyle={styles.imagestyle}
        iconStyle={{...styles.iconStyle, tintColor: country ? '#fff' : '#000'}}
        search
        searchPlaceholder="Search Country..."
        inputSearchStyle={styles.inputSearchStyle}
        maxHeight={345}
        value={country}
        data={countrydata}
        renderRightIcon={rendleicon}
        valueField="name"
        labelField="name"
        imageField="image"
        placeholder=" Select from dropdown"
        onChange={e => {
          setCountry(e.name);
          setSelectedCountry(e);
        }}
      />
      {country ? (
        <Text
          style={{
            fontSize: 16,
            color: '#fff',
            fontWeight: '600',
            marginLeft: 25,
            fontFamily: font.semibold,
            bottom: 40,
            alignSelf: 'center',
          }}>
          {country}
        </Text>
      ) : null}

      {country ? (
        <View>
          {secondCountryShow ? (
            <View>
              <View
                style={{
                  ...styles.TextInput,
                  marginTop: 30,
                }}>
                <Text style={{...styles.HeaderText, fontSize: 21}}>
                  Secondary
                </Text>
              </View>
              <SelectCountry
                style={{
                  ...styles.dropdown,
                  backgroundColor: Secondcountry ? '#000' : '#fff',
                }}
                selectedTextStyle={{
                  ...styles.selectedTextStyle,
                  color: Secondcountry ? '#000' : '#000',
                }}
                placeholderStyle={styles.placeholderStyle}
                imageStyle={styles.imagestyle}
                iconStyle={{
                  ...styles.iconStyle,
                  tintColor: Secondcountry ? '#fff' : '#000',
                }}
                search
                searchPlaceholder="Search Country..."
                inputSearchStyle={styles.inputSearchStyle}
                maxHeight={250}
                value={Secondcountry}
                data={countrydata1}
                renderRightIcon={rendleicons}
                valueField="name"
                labelField="name"
                imageField="image"
                placeholder="Select"
                onChange={e => {
                  setSecondCountry(e.name);
                  setselectedsecondcountry(e);
                }}
              />
              {Secondcountry ? (
                <Text
                  style={{
                    fontSize: 16,
                    color: '#fff',
                    fontWeight: '600',
                    marginLeft: 25,
                    fontFamily: font.semibold,
                    bottom: 40,
                    alignSelf: 'center',
                  }}>
                  {Secondcountry}
                </Text>
              ) : null}
            </View>
          ) : (
            <TouchableOpacity onPress={() => setSeconCountryShow(true)}>
              <Text
                style={{
                  ...styles.decription,
                  alignSelf: 'center',
                  color: '#000',
                  marginTop: 20,
                  fontSize: 12,
                  fontWeight: '600',
                  fontFamily: font.semibold,
                }}>
                {'+ A D D  S E C O N D A R Y  C O U N T R Y'}
              </Text>
            </TouchableOpacity>
          )}
        </View>
      ) : null}
    </View>
  );
};

export const ImageSelect = ({HeaderText, Decription}) => {
  const {selectImage1, setSelectImage1} = useContext(AppProvider);
  const [selectedCards, setSelectedCards] = useState([]);
  const openImagePicker = async (index) => {
    try {
      const multiSelectedMode = true;

      const images = await MultipleImagePicker.openPicker({
        selectedAssets: images,
        isExportThumbnail: false,
        isPreview: true,
        doneTitle: 'Done',
        multiSelectedMode,
        isCrop: false,
        mediaType: 'image',
        isPreview: false,
        maxSelectedAssets: 1,
      });
      // images.forEach(obj => {
      //   obj.selectedImagePosition = index + selectImage1.length;
      // });
      // console.log('IMAGE', images);

      setSelectImage1([...selectImage1, images]);
    } catch (e) {
      console.log('gkgkgk', e);
    }
  };
  const ImageSelected = ({onSelect, isSelected, item, index}) => {
    const handleRemove = () => {
      setSelectImage1(prevImages => {
        const updatedImages = [...prevImages];
        updatedImages.splice(index, 1);
        return updatedImages;
      });
    };
    return (
      <TouchableOpacity
        style={{
          marginHorizontal: Platform.OS === 'ios' ? 5 : 5,
        }}>
        <View>
          <Image
            style={{
              width: WIDTH / 4,
              height: HEIGHT / 8,
              marginTop: 10,
              borderRadius: 10,
            }}
            resizeMode={'cover'}
            source={{uri: item[0]?.path}}
          />
          <TouchableOpacity
            onPress={handleRemove}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              width: 20,
              height: 20,
              backgroundColor: '#fff',
              borderRadius: 50,
              position: 'absolute',
              top: 0,
              right: 0,
            }}>
            <Image
              style={{
                width: 12,
                height: 12,
              }}
              resizeMode={'contain'}
              source={IMAGE.closeicon}
            />
          </TouchableOpacity>
        </View>
        {/* )}   */}
      </TouchableOpacity>
    );
  };
  const toggleSelect = (item, index) => {
    setSelectImage1(prevList => {
      const updatedList = [...prevList];
      const existingIndex = updatedList.findIndex(el => el.index === index);
      if (existingIndex !== -1) {
        updatedList.splice(existingIndex, 1);
      } else {
        updatedList.push({
          index: index,
          detail: item,
        });
      }

      return updatedList;
    });

    setSelectedCards(prevSelected => {
      const updatedSelected = [...prevSelected];
      updatedSelected[index] = !updatedSelected[index];
      return updatedSelected;
    });
  };

  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>
      <View
        style={{
          ...styles.TextInput,
          marginTop: 30,
        }}>
        <View
          style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            width: WIDTH / 1.15,
            alignSelf: 'center',
          }}>
          <>
            {selectImage1.map((item, index) => (
              <ImageSelected
                index={index}
                item={item}
                key={index}
                onSelect={() => toggleSelect(item, index)}
                isSelected={selectedCards[index]}
              />
            ))}
          </>
          <>
            {[...new Array(6 - selectImage1.length)].map((item, index) => {
            return(
              <TouchableOpacity
                style={{marginHorizontal: 5}}
                onPress={()=> {
                  openImagePicker()
                  // openImagePicker(index+1)
                }
                }>
                <View>
                  <ImageBackground
                    source={IMAGE.emptyImage}
                    style={{
                      width: WIDTH / 4,
                      height: HEIGHT / 8,
                      marginTop: 10,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    resizeMode={'contain'}>
                    <Image
                      style={{
                        width: 60,
                        height: 60,
                      }}
                      resizeMode={'contain'}
                      source={IMAGE.empty}
                    />
                  </ImageBackground>
                </View>
              </TouchableOpacity>
            )}
            )}
          </>
        </View>
      </View>
      <Text
        style={{
          ...styles.decription,
          alignSelf: 'center',
          color: '#000',
          fontSize: 12,
          fontWeight: '400',
          marginTop: 20,
          fontFamily: font.normal,
          textDecorationLine: 'underline',
        }}>
        Review our Guidelines{' '}
      </Text>
    </View>
  );
};

export const SelfiVerification = ({HeaderText, Decription}) => {
  const {capturedImage, setCapturedImage} = useContext(AppProvider);
  const [isSelfieTaken, setIsSelfieTaken] = useState(false);
  const cameraRef = useRef(null);

  useEffect(() => {
    const captureSelfieAutomatically = async () => {
      if (cameraRef.current) {
        try {
          const options = {quality: 0.5, base64: true};
          const data = await cameraRef.current.takePictureAsync(options);
          setCapturedImage(data);
          setIsSelfieTaken(true);
        } catch (error) {
          console.error('Error capturing selfie:', error);
        }
      }
    };

    const captureTimeout = setTimeout(captureSelfieAutomatically, 5000);

    return () => {
      clearTimeout(captureTimeout);
    };
  }, [capturedImage]);

  const retakeSelfie = () => {
    setCapturedImage(null);
    setIsSelfieTaken(false);
  };

  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>

      <View
        style={{
          marginTop: 30,
          alignSelf: 'center',
          width: WIDTH / 1.2,
          height: HEIGHT / 3.5,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        {capturedImage?.uri ? (
          <Image
            style={{
              width: Platform.OS == 'android' ? WIDTH / 1.7 : WIDTH / 2,
              height: Platform.OS == 'android' ? HEIGHT / 3.25 : HEIGHT / 3.2,
            }}
            resizeMode={'cover'}
            source={{uri: capturedImage?.uri}}
          />
        ) : (
          <RNCamera
            ref={cameraRef}
            style={{
              zIndex: 0,
              width: Platform.OS == 'android' ? WIDTH / 2.9 : WIDTH / 2,
              height: Platform.OS == 'android' ? HEIGHT / 3.25 : HEIGHT / 3.2,
            }}
            type={RNCamera.Constants.Type.front}
          />
        )}

        <Image
          style={{
            width: WIDTH / 1.2,
            height: HEIGHT / 3.2,
            position: 'absolute',
            alignItems: 'center',
            borderRadius: 20,
            justifyContent: 'center',
            alignSelf: 'center',
          }}
          resizeMode={'cover'}
          source={IMAGE.selfie_01}
        />
      </View>

      <TouchableOpacity style={{alignSelf: 'center', marginTop: 20}}>
        <Text
          style={{
            ...styles.decription,
            width: WIDTH / 1.2,
            fontSize: 11,
            fontWeight: '600',
            fontFamily: font.semibold,
          }}>
          This image is kept PRIVATE and for your verification only
        </Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{alignSelf: 'center', marginTop: 10}}
        onPress={() => retakeSelfie()}>
        <Text
          style={{
            ...styles.decription,
            width: WIDTH / 1.2,
            fontSize: 11,
            fontWeight: '600',
            fontFamily: font.semibold,
          }}>
          Retake selfie
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export const LocationComponent = ({HeaderText, Decription}) => {
  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>
      <View
        style={{
          ...styles.TextInput,
          marginTop: 30,
        }}>
        <Image
          style={{
            width: WIDTH / 1.2,
            height: HEIGHT / 2.5,
            marginTop: 10,
          }}
          resizeMode={'contain'}
          source={IMAGE.locationselect}
        />
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  Header: {
    width: WIDTH / 1.2,
    alignSelf: 'center',
    marginTop: 10,
  },
  HeaderText: {
    color: '#000',
    fontSize: 28,
    fontWeight: '600',
    fontFamily: font.semibold,
  },
  decription: {
    color: '#fff',
    fontSize: 13,
    fontWeight: '600',
    fontFamily: font.semibold,
  },
  TextInput: {
    flexDirection: 'row',
    width: WIDTH / 1.2,
    alignSelf: 'center',
    marginTop: HEIGHT / 8,
  },

  btn: {
    width: WIDTH / 3.8,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    marginHorizontal: 3,
    backgroundColor: '#fff',
  },
  selectedbtn: {
    width: WIDTH / 3.8,
    paddingVertical: 15,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 8,
    marginHorizontal: 3,
    backgroundColor: '#000',
  },
  btnText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: font.semibold,
    color: '#000',
  },
  selectedbtnText: {
    fontSize: 11,
    fontWeight: '600',
    fontFamily: font.semibold,
    color: '#fff',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    borderRadius: 10,
    paddingLeft: 9,
  },
  religiousbtn: {
    paddingVertical: 15,
    width: WIDTH / 3.5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 5,
  },
  dropdown: {
    width: WIDTH / 1.2,
    paddingVertical: 11,
    backgroundColor: '#fff',
    alignSelf: 'center',
    marginTop: 10,
    borderRadius: 10,
  },
  placeholderStyle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginLeft: 15,
    fontFamily: font.semibold,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
    fontWeight: '600',
    marginLeft: 25,
    fontFamily: font.semibold,
  },
  iconStyle: {
    width: 35,
    height: 35,
    tintColor: '#000',
    right: 5,
  },
  ImageBox: {
    width: WIDTH / 3.5,
  },
  imagestyle: {
    width: 40,
    height: 40,
    left: 15,
    borderRadius: 100,
    resizeMode: 'contain',
  },
});
