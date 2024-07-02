import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;
import React from 'react';
import {COLORS, IMAGE, font} from '../Constant/index';
import LinearGradient from 'react-native-linear-gradient';

const Mysubscription = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack('ContactScreen')}
          style={{alignSelf: 'center', right: 10}}>
          <Image
            source={IMAGE.goBack}
            style={{
              width: 20,
              height: 20,
            }}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight: '600', color: '#101010',fontFamily:font.semibold}}>
          My Subscription
        </Text>
        <View style={{width: 20}}></View>
      </View>
      <View style={styles.horizontalLine} />

      <LinearGradient  start={{x: 0, y: 0}} end={{x: 1, y: 0}}
        colors={['#FFBA65', '#D59951', '#BF7F38', '#D28F48']}
        style={{
          // height: HEIGHT / 1.6
          width: WIDTH / 1.15,
          borderRadius: 19,
          alignSelf: 'center',
          marginTop: 25,
          paddingTop: 20,
          paddingBottom: 45,
        }}>
        <Text style={styles.Text}>Your Albi Account is</Text>
        <Image
          source={IMAGE.whiteheartimg}
          style={{
            width: 80,
            height: 50,
            alignSelf: 'center',
            marginTop: 20,
          }}
          resizeMode={'contain'}
        />
        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Poppins',
            textAlign: 'center',
            fontWeight: '700',
            margin: 5,
            color: '#ffffff',
            fontFamily:font.bold
          }}>
          Premium +
        </Text>

        <Text
          style={{
            fontSize: 18,
            fontFamily: 'Poppins',
            textAlign: 'center',
            fontWeight: '400',
            marginTop: 25,
            textDecorationLine: 'underline',
            color: '#ffffff',
            fontFamily:font.normal
          }}>
          Upgrade
        </Text>

        <View
          style={{
            //   alignSelf: 'center',

            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 40,
            //   width: WIDTH / 1.1,
          }}>
          <Image
            source={IMAGE.linecheck}
            style={{
              width: 21.3,
              height: 15,
              left: 20,
            }}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#FFFFFF',
              left: 35,
            fontFamily:font.normal

            }}>
            Send Unmetered Likes
          </Text>
        </View>
        <View
          style={{
            //   alignSelf: 'center',

            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 10,
            //   width: WIDTH / 1.1,
          }}>
          <Image
            source={IMAGE.linecheck}
            style={{
              width: 21.3,
              height: 15,
              left: 20,
            }}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#FFFFFF',
              left: 35,
            fontFamily:font.normal

            }}>
            See Who Likes you
          </Text>
        </View>
        <View
          style={{
            //   alignSelf: 'center',

            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 10,
            //   width: WIDTH / 1.1,
          }}>
          <Image
            source={IMAGE.linecheck}
            style={{
              width: 21.3,
              height: 15,
              left: 20,
            }}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#FFFFFF',
              left: 35,
            fontFamily:font.normal

            }}>
            Undo and Send Super Likes
          </Text>
        </View>
        <View
          style={{
            //   alignSelf: 'center',

            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 10,
            //   width: WIDTH / 1.1,
          }}>
          <Image
            source={IMAGE.linecheck}
            style={{
              width: 21.3,
              height: 15,
              left: 20,
            }}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#FFFFFF',
              left: 35,
            fontFamily:font.normal

            }}>
            Get listed first
          </Text>
        </View>
        <View
          style={{
            //   alignSelf: 'center',

            flexDirection: 'row',
            justifyContent: 'flex-start',
            marginTop: 10,
            //   width: WIDTH / 1.1,
          }}>
          <Image
            source={IMAGE.linecheck}
            style={{
              width: 21.3,
              height: 15,
              left: 20,
            }}
            resizeMode={'contain'}
          />
          <Text
            style={{
              fontSize: 14,
              fontWeight: '500',
              color: '#FFFFFF',
              left: 35,
            fontFamily:font.normal

            }}>
            Ability to change location
          </Text>
        </View>
      </LinearGradient>

      <Text
        style={{
          fontSize: 13,
          fontFamily: 'Poppins',
          textAlign: 'center',
          fontWeight: '500',
          // margin: 15,
          marginTop: 15,
          color: '#ffffff',
          fontFamily:font.medium

        }}>
        Subscription ends on: 5 - 8 -2023
      </Text>
     <TouchableOpacity>
     <Text
        style={{
          fontSize: 14,
          fontFamily: 'Poppins',
          textAlign: 'center',
          fontWeight: '600',
          color: '#ffffff',
          textDecorationLine: 'underline',
        }}>
        EXTEND
      </Text>
     </TouchableOpacity>
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
  horizontalLine: {
    height: 1,
    backgroundColor: '#858585',
    marginVertical: 10,
    border: 1,
    // width: WIDTH / 1.1,

    // alignSelf: 'center',
  },
  Text: {
    fontSize: 13,
    fontFamily: 'Poppins',
    textAlign: 'center',
    fontWeight: '400',
    // margin: 15,
    color: '#ffffff',
    fontFamily:font.normal
  },
});
export default Mysubscription;
