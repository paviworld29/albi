import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
const {width, height} = Dimensions.get('screen');
import react from 'react';
import {COLORS, IMAGE, font} from '../Constant/index';
import ToggleSwitch from 'toggle-switch-react-native';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import Swiper from 'react-native-swiper';
import {hp} from '../Components/Config';

const Box = ({title, righitconinpremium, righitconinboost}) => {
  return (
    <View>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <Text
          style={{
            color: '#000000B2',
            fontSize: 14,
            fontWeight: '400',
            fontFamily: font.normal,
            marginLeft: 20,
            marginTop: 10,
          }}>
          {title}
        </Text>
        <View style={{flexDirection: 'row', marginTop: 10, width: WIDTH / 3.2}}>
          <Image
            source={righitconinpremium}
            style={{
              width: 11,
              height: 13,
            }}
            resizeMode={'contain'}
          />
          <Image
            source={righitconinboost}
            style={{
              width: 11,
              height: 13,
              marginLeft: 50,
            }}
            resizeMode={'contain'}
          />
        </View>
      </View>
      <View style={styles.horizontalhalf} />
    </View>
  );
};
const Premiumboostscreen = ({navigation}) => {
  const CardView = () => {
    return (
      <View>
        <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}}
          colors={['#FFBA65', '#D59951', '#BF7F38', '#D28F48']}
          style={{
            width: WIDTH / 1.15,
            borderRadius: 19,
            alignSelf: 'center',
            // marginTop: 20,
            paddingTop: 20,
            paddingBottom: 15,
            marginTop:45
          }}>
          <Text
            style={{
              alignSelf: 'center',
              color: '#fff',
              fontFamily: font.normal,
            }}>
            Your Albi Account is
          </Text>
          <Image
            source={IMAGE.whiteheartimg}
            style={{
              width: 80,
              height: 50,
              alignSelf: 'center',
              marginTop: 15,
            }}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontSize: 18,
              fontFamily: 'Poppins',
              textAlign: 'center',
              fontWeight: '700',
              margin: 10,
              color: '#ffffff',
              fontFamily: font.bold,
            }}>
            Premium +
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: WIDTH,
              alignSelf: 'center',
            }}>
            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins',
                  textAlign: 'center',
                  fontWeight: '500',
                  margin: 13,
                  textDecorationLine: 'underline',
                  color: '#ffffff',
                  fontFamily: font.medium,
                }}>
                View Features
              </Text>
            </TouchableOpacity>

            <TouchableOpacity>
              <Text
                style={{
                  fontSize: 12,
                  fontFamily: 'Poppins',
                  textAlign: 'center',
                  fontWeight: '500',
                  margin: 13,
                  textDecorationLine: 'underline',
                  color: '#ffffff',
                  fontFamily: font.medium,
                }}>
                Upgrade
              </Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      </View>
    );
  };
  return (
    <View style={styles.container}>
      <View style={styles.header}>
    {Platform.OS === 'ios' ?(
         <TouchableOpacity
         onPress={() => navigation.goBack()}
         style={{alignSelf: 'center', right: 20}}>
         <Image
           source={IMAGE.goBack}
           style={{
             width: 20,
             height: 20,
           }}
           resizeMode={'contain'}
         />
       </TouchableOpacity>
   ):(
    <View style={{width: 20}}></View>
   )}
        <Image
          source={IMAGE.Frame}
          style={{
            width: 41,
            height: 37,
          }}
          resizeMode={'contain'}
        />
        <View style={{width: 20}}></View>
       
      </View>
      <ScrollView>
      <Swiper
        style={{height: HEIGHT / 2.5}}
        activeDotColor="black"
      >
        <CardView />

        <CardView />

        <CardView />
      </Swiper>
      <View
        style={{
          backgroundColor: '#FFFFFF',
          paddingVertical: 35,
          alignSelf: 'center',
          width: WIDTH / 1.1,
          
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
          }}>
          <Text
            style={{
              marginLeft: 20,
              color: '#000000',
              fontSize: 16,
              fontWeight: '700',
              fontFamily: font.bold,
            }}>
            What you get:
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                marginRight: 10,
                color: '#000000',
                fontSize: 16,
                fontWeight: '700',
                fontFamily: font.bold,
              }}>
              Premium
            </Text>
            <Text
              style={{
                color: '#000000',
                fontSize: 16,
                fontWeight: '700',
                fontFamily: font.bold,
              }}>
              Boost
            </Text>
          </View>
        </View>
        <Box
          title="Unlimited likes"
          righitconinpremium={IMAGE.blackcolorcheck}
          righitconinboost={IMAGE.blackcolorcheck}
        />
        <Box
          title="Advanced Filters"
          righitconinpremium={IMAGE.blackcolorcheck}
        />
        <Box title="Incognito" righitconinpremium={IMAGE.blackcolorcheck} />
        <Box
          title="See who likes you"
          righitconinpremium={IMAGE.blackcolorcheck}
        />
        <Box title="Travel Mode" righitconinpremium={IMAGE.blackcolorcheck} />
        <Box
          title="5 SuperSwipes a week"
          righitconinpremium={IMAGE.blackcolorcheck}
        />
        <Box righitconinpremium={IMAGE.blackcolorcheck} />
        <Box
          title=" Unlimited Backtracks "
          righitconinpremium={IMAGE.blackcolorcheck}
        />
      </View>
     
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
    justifyContent: 'space-around',
    alignSelf: 'center',
    width: WIDTH / 1,
    marginTop: 60,
  },

  horizontalhalf: {
    height: 1,
    backgroundColor: '#858585',

    border: 1,
    width: WIDTH / 1.2,

    alignSelf: 'center',
  },
});

export default Premiumboostscreen;
