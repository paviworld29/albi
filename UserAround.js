import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  Platform,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect} from 'react';
import {COLORS, font} from '../Constant/index';
import {hp, wp} from '../Components/Config';
import {IMAGE} from '../Constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_API} from '../API/Base_Api';
import {useState} from 'react';
import Geolocation from '@react-native-community/geolocation';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

const UserAround = ({navigation}) => {
  const [loader, setLoder] = useState(false);
  const [latitudes, setLatitudes] = useState('');
  const [longitudes, setLongitudes] = useState('');
  // get Latitude/Longitude
  const getCountryAndState = async (latitude, longitude) => {
    const Token = await AsyncStorage.getItem('token');

    try {
      const url = `https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.address) {
        // console.log('fk,fkkfkfkf',data.address)
        var myHeaders = new Headers();
        myHeaders.append('Accept', 'application/json');
        myHeaders.append('Authorization', `Bearer ${Token}`);
        var formdata = new FormData();
        formdata.append('country', data.address.country);
        formdata.append('state', data.address.state);
        formdata.append('city', data.address.city);

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: formdata,
          redirect: 'follow',
        };

        fetch(`${BASE_API}addAddress`, requestOptions)
          .then(response => response.text())
          .then(result => 

            {}
            // console.log(result)
            )

          .catch(error => console.log('error', error));
        const {country, state, city} = data.address;
        return {country, state, city};
      }
    } catch (error) {
      // console.error('Error fetching geolocation:', error);
      return {country: 'Error', state: 'Error'};
    }
  };

  useEffect(() => {
    Geolocation.getCurrentPosition(info => {
      setLatitudes(info?.coords?.latitude),
        setLongitudes(info?.coords?.longitude);
      const latitude = latitudes; // Replace with your latitude
      const longitude = longitudes; // Replace with your longitude
      getCountryAndState(latitude, longitude)
        .then(locationData => {
          // console.log('Country:', locationData.country);
          // console.log('State:', locationData.state);
          // console.log('city:', locationData.city);
        })
        .catch(error => {
          // console.error('Error:', error);
        });
    });
  }, [latitudes, longitudes]);

  const AllowLocationApi = async () => {
    setLoder(true);

    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const Token = await AsyncStorage.getItem('token');

    myHeaders.append('Authorization', `Bearer ${Token}`);

    var formdata = new FormData();
    formdata.append('latitude', latitudes);
    formdata.append('longitude', longitudes);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: formdata,
      redirect: 'follow',
    };

    fetch(`${BASE_API}allowLocation`, requestOptions)
      .then(response => response.json())
      .then(result => {
        // console.log('alll',result)
        if (result?.success == true) {
          navigation.navigate('MyTabs', {screen: 'Home'});
          setLoder(false);
        } else {
          setLoder(false);
          navigation.navigate('MyTabs', {screen: 'Home'});

        }
      })
      .catch(error => console.log('error', error));
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.Yellow} />
      {Platform.OS === 'ios' ? (
        <TouchableOpacity onPress={() => navigation.goBack()} style={{}}>
          <Image
            source={IMAGE.goBack}
            style={{
              width: 20,
              height: 20,
              top: 60,
              left: 25,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      ) : null}
      <Image
        source={IMAGE.OnBoardingFirst}
        style={{
          width: WIDTH / 1.3,
          height: HEIGHT / 6,
          alignSelf: 'center',
          marginTop: 55,
        }}
        resizeMode={'contain'}
      />
      <View style={{marginTop: 15, alignItems: 'center'}}>
        <Text
          style={{
            color: COLORS.Black,
            fontSize: 18,
            fontWeight: '700',
            fontFamily: font.bold,
          }}>
          There's no one new around you.
        </Text>

        <Image
          source={IMAGE.Noonearound}
          style={{width: WIDTH / 1.3, height: HEIGHT / 4, marginTop: 25}}
        />

        <Text style={styles.agreementText}>
          Seems like you've scoped out all the potential matches in your area!
          Don't worry, there are plenty more out there.
        </Text>
        <Text style={{...styles.agreementText, marginTop: 25}}>
          Try widening your search radius or refining your preferences to find
          your perfect match!
        </Text>
      </View>
      <TouchableOpacity
        onPress={() => AllowLocationApi()}
        style={styles.button}>
        {loader ? (
          <ActivityIndicator />
        ) : (
          <Text style={[styles.ButtonText]}>Increase Distance</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.Yellow,
    paddingHorizontal: 20,
  },
  button: {
    paddingVertical: 18,
    width: WIDTH / 1.2,
    backgroundColor: COLORS.Black,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 60,
  },
  ButtonText: {
    fontSize: 15,
    fontWeight: '700',
    color: '#FFFFFF',
    fontFamily: font.bold,
  },

  agreementText: {
    fontSize: 14,
    color: '#000000B2',
    alignSelf: 'center',
    width: WIDTH / 1.45,
    fontWeight: '400',
    fontFamily: font.normal,
  },
});

export default UserAround;
