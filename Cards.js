import {
  View,
  Text,
  Image,
  StyleSheet,
  Dimensions,
  Animated,
  TouchableOpacity,
  Platform,
} from 'react-native';
const { width, height } = Dimensions.get('screen');
import { Fragment, useContext, useEffect } from 'react';
import { ImageBackground } from 'react-native';
import { IMAGE, font } from '../Constant';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { BASE_API } from '../API/Base_Api';
import AppProvider from '../providers/AppProvider';
const Cards = ({ isFirst, swipe, item, titlSign, direction, index, length, ...rest }) => {
const{ItemIdUser, setItemIdUser} = useContext(AppProvider)
  const navigation = useNavigation();
  const rotate = Animated.multiply(swipe.x, titlSign).interpolate({
    inputRange: [-100, 0, 100],
    outputRange: ['10deg', '0deg', '-10deg'],
  });

  const animatedCardStyle = {
    transform: [...swipe.getTranslateTransform(), { rotate }],
  };
  const likeOpacity = swipe.x.interpolate({
    inputRange: [25, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });
  const nopeOpacity = swipe.x.interpolate({
    inputRange: [-100, -25],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const renderChoice = () => {

    return (
      <Fragment>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.likeContainer,
            { opacity: likeOpacity },
          ]}>
          <Image
            source={IMAGE.yes}
            style={{
              width: 56,
              height: 56,
            }}
          />
        </Animated.View>
        <Animated.View
          style={[
            styles.choiceContainer,
            styles.nopeContainer,
            { opacity: nopeOpacity },
          ]}>
          <Image
            source={IMAGE.no}
            style={{
              width: 56,
              height: 56,
            }}
          />
        </Animated.View>
      </Fragment>
    );
  };
  return (
    <View key={index}>
      {index == 0 && length == 1 ? (
        <View
          style={{
            width: width / 1,
            height: height / 1.5,
            alignSelf: 'center',
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              color: '#000',
              fontSize: 26,
              fontWeight: '700',
              fontFamily: font.bold,
              alignSelf: 'center',
            }}>
            No more users
          </Text>
        </View>
      ) : (
        <>
          <View style={[styles.container1]}>
            <View>
              <ImageBackground source={IMAGE.swipeImage} style={styles.image}>
                <View
                  style={{
                    alignSelf: 'center',
                    width: 60,
                    height: 60,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.8,
                    bottom: 15,
                    right: 5,
                  }}>
                  <Image
                    source={IMAGE.info_icon}
                    style={{
                      width: 35,
                      height: 35,
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <ImageBackground
                  source={IMAGE.headingBackground}
                  style={styles.userContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{ uri: item.country_image }}
                      style={{ width: 32, height: 18, alignSelf: 'center' }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 5,
                      width: width / 1.6,
                    }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.location1}
                      style={{
                        width: 14,
                        height: 14,
                        marginLeft: 5,
                        alignSelf: 'center',
                      }}
                    />
                    <Text
                      style={{
                        ...styles.name,
                        marginLeft: 5,
                        alignSelf: 'center',
                        fontWeight: '700',
                        fontFamily: font.bold,
                      }}>
                      {item.distance}
                      {' mi'}
                    </Text>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.official}
                      style={{
                        width: 18,
                        height: 18,
                        marginLeft: 10,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                  <View style={{ width: width / 1.4 }}>
                    <Text style={styles.location}>
                      {item.about_us ? item.about_us : ''}
                    </Text>
                  </View>
                </ImageBackground>
              </ImageBackground>
            </View>
            <View style={{ marginTop: 60 }}></View>
          </View>
          <Animated.View
            style={[styles.container, isFirst && animatedCardStyle]}
            {...rest}>
            <TouchableOpacity
              onPress={() => navigation.navigate('UserProfileDetail', { item })}>
              <ImageBackground source={IMAGE.swipeImage} style={styles.image}>
                <View
                  style={{
                    alignSelf: 'center',
                    width: 60,
                    height: 60,
                    backgroundColor: '#FFFFFF',
                    borderRadius: 50,
                    justifyContent: 'center',
                    alignItems: 'center',
                    opacity: 0.8,
                    bottom: 15,
                    right: 5,
                  }}>
                  <Image
                    source={IMAGE.info_icon}
                    style={{
                      width: 35,
                      height: 35,
                      alignSelf: 'center',
                    }}
                  />
                </View>
                <ImageBackground
                  source={IMAGE.headingBackground}
                  style={styles.userContainer}>
                  <View style={{ flexDirection: 'row' }}>
                    <Image
                      source={{ uri: item.country_image }}
                      style={{ width: 32, height: 18, alignSelf: 'center' }}
                    />
                  </View>
                  <View
                    style={{
                      flexDirection: 'row',
                      marginVertical: 5,
                      width: width / 1.6,
                    }}>
                    <Text style={styles.name}>{item.name}</Text>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.location1}
                      style={{
                        width: 14,
                        height: 14,
                        marginLeft: 5,
                        alignSelf: 'center',
                      }}
                    />
                    <Text
                      style={{
                        ...styles.name,
                        marginLeft: 5,
                        alignSelf: 'center',
                        fontWeight: '700',
                        fontFamily: font.bold,
                      }}>
                      {item.distance}
                      {' mi'}
                    </Text>
                    <Image
                      resizeMode="contain"
                      source={IMAGE.official}
                      style={{
                        width: 18,
                        height: 18,
                        marginLeft: 10,
                        alignSelf: 'center',
                      }}
                    />
                  </View>
                  <View style={{ width: width / 1.4 }}>
                    <Text style={styles.location}>
                      {item.about_us ? item.about_us : ''}
                    </Text>
                  </View>
                </ImageBackground>
              </ImageBackground>
            </TouchableOpacity>
            <View style={{ marginTop: 60 }}></View>
            {isFirst && renderChoice()}
            {isFirst && setItemIdUser(item?.matri_id)}
          </Animated.View>
        </>
      )}
    </View>
  );
};

export default Cards;
const styles = StyleSheet.create({
  container: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 1.2,
    height: height / 1.6,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 20,
    margin: 30,
  },
  image: {
    width: width / 1.2,
    height: height / 1.69,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'flex-end',
    marginTop: 30,
    borderTopLeftRadius: 100,
    borderRadius: 15,
    overflow: 'hidden',
    borderColor: 'transparent',
  },
  userContainer: {
    position: 'absolute',
    alignSelf: 'center',
    bottom: 0,
    width: width / 1.2,
    paddingVertical: 8.5,
    paddingHorizontal: 10,
    borderBottomLeftRadius: 15,
    borderBottomRightRadius: 15,
  },
  name: {
    fontSize: 14,
    color: '#FFFFFF',
    fontWeight: '600',
    fontFamily: font.semibold,
  },
  location: {
    fontSize: 12,
    color: '#FFFFFF',
    fontWeight: '400',
    fontFamily: font.normal,
  },
  distance: {
    fontSize: 18,
    color: '#FFFFFF',
    fontWeight: '300',
  },
  choiceContainer: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? height / 4.2 : height / 4.4,
    borderRadius: 50,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: 104,
    height: 104,
    backgroundColor: '#000',
    opacity: 0.6,
  },
  likeContainer: {
    left: 45,
  },
  likeContainer: {},
  container1: {
    position: 'absolute',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E9C4AE',
    width: width / 1.2,
    height: height / 1.6,
    borderTopLeftRadius: 120,
    borderTopRightRadius: 20,
    margin: 30,
  },
});
