import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_API} from '../API/Base_Api';
import {IMAGE, font} from '../Constant';
import { MultiSelect } from 'react-native-element-dropdown';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const Negotiables = () => {
  const [Negotiables, setNegotiables] = useState([]);
  const [negotiable, setNegotiable] = useState([]);
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
  // <<<<<<<<<<<<<<<<<<<<non-negotiables>>>>>>>>>>>>>>>>>>>>
  const GetNegotiablesApi = async () => {
    const Token = await AsyncStorage.getItem('token');
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');
    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}negotiables`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setNegotiables(result?.data);
      })
      .catch(error => console.log('error', error));
  };
  useEffect(() => {
    GetNegotiablesApi();
  }, []);
  return (
    // <View style={{...styles.box, borderWidth: 1}}>
    //   <Text style={styles.boxTite}>Non-negotiables </Text>

    //   <View
    //     style={{
    //       flexDirection: 'row',
    //       width: WIDTH / 1.15,
    //       flexWrap: 'wrap',
    //       marginTop:10
    //     }}>
    //     {Negotiables?.map((item, index) => (
    //       <View style={{marginHorizontal: WIDTH / 100}} key={index}>
    //         <View
    //           style={{
    //             ...styles.religiousbtn,
    //             backgroundColor: '#000',
    //           }}>
    //           <Text
    //             style={{
    //               ...styles.btnText,
    //               color: '#fff',
    //             }}>
    //             {item.name}
    //           </Text>
    //         </View>
    //       </View>
    //     ))}
    //   </View>
    // </View>
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
        hideTags // Remove the close icon

        data={Negotiables}
        selectedStyle={{backgroundColor:'transparent',borderWidth:0}}
        labelField="name"

        valueField="name"
        placeholder="Non-negotiables"
        value={negotiable}
        containerStyle={{
          backgroundColor: 'grey',
          borderRadius: 10,
          borderWidth: 0,
        }}
        // selectedStyle={{borderColor: 'red'}}
        onChange={name => {
          setNegotiable(name);

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
      {/* {InterestData?.map((item, index) => (
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
              {/* {item?.text}  {item.hobbies} */}
            {/* </Text> */}
          {/* </View> */}
        {/* </View> */}
      {/* ))} */} 
      {negotiable?.map((item, index) => (
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
  );
};
const styles = StyleSheet.create({
  box: {
    width: WIDTH / 1.1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignSelf: 'center',
    marginTop: 22,

    borderColor: '#000000',
  },
  boxTite: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
    fontFamily: font.semibold,
  },

  btnText: {
    alignSelf: 'center',
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 9,
    top: 15,
    fontFamily: font.semibold,
  },
  religiousbtn: {
    borderRadius: 12,
    backgroundColor: '#000000',
    width: WIDTH / 3.9,
    height: 43.2,
    border: 1,
    marginTop: 5,
  },
  box: {
    width: WIDTH / 1.1,
    paddingHorizontal: 15,
    paddingVertical: 15,
    backgroundColor: 'red',
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
    borderRadius: 15,
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
    backgroundColor: 'red',
  },
  iconStyle: {
    width: 35,
    height: 35,
    tintColor: '#000',
    right: 5,
  },
});
export default Negotiables;
