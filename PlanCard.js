import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image,
  FlatList,
  Animated,
  ActivityIndicator,
} from 'react-native';
const WIDTH = Dimensions.get('window').width;
import react, {useEffect, useRef} from 'react';
import {COLORS, IMAGE, font} from '../Constant/index';
import {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_API} from '../API/Base_Api';
import PlanPaginations from './PlanPagination';
import {useNavigation} from '@react-navigation/native';

const PlanCard = ({data, onPress}) => {
  const navigation = useNavigation();
  const [getplan, setGetplan] = useState([]);
  const [index, setIndex] = useState(0);
  const [Loader, setLoader] = useState(false);

  const scrollX = useRef(new Animated.Value(0)).current;
  const PlanListApi = async () => {
    // setLoader(true);
    var myHeaders = new Headers();
    myHeaders.append('Accept', 'application/json');

    const Token = await AsyncStorage.getItem('token');

    myHeaders.append('Authorization', `Bearer ${Token}`);

    var requestOptions = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
    };

    fetch(`${BASE_API}planlist`, requestOptions)
      .then(response => response.json())
      .then(result => {
        setGetplan(result?.data);
        setLoader(false);
      })
      .catch(error => setLoader(false));
  };
  useEffect(() => {
    PlanListApi();
  }, []);
  const handleOnScroll = event => {
    Animated.event([{nativeEvent: {contentOffset: {x: scrollX}}}], {
      useNativeDriver: false,
    })(event);
  };

  const handleOnViewableItemsChanged = useRef(({viewableItems}) => {}).current;

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current;

  return (
    <View>
      {Loader ? (
        <ActivityIndicator
          style={{justifyContent: 'center', alignItems: 'center',marginTop:30}}
        />
      ) : (
        <>
          <FlatList
            data={getplan}
            horizontal
            pagingEnabled
            snapToAlignment="center"
            showsHorizontalScrollIndicator={false}
            onScroll={handleOnScroll}
            onViewableItemsChanged={handleOnViewableItemsChanged}
            viewabilityConfig={viewabilityConfig}
            renderItem={({item, index}) => (
              <View key={index}>
                <View>
                  <LinearGradient
                    start={{x: 1, y: 0}}
                    end={{x: 0, y: 0}}
                    colors={
                      index == 0
                        ? ['#A3A4A8', '#A6A7AC', '#C6C5C3', '#FAF5F2']
                        : index == 1
                        ? ['#FFBA65', '#D59951', '#D59951', '#D28F48']
                        : ['#F6E1A8', '#EFC66B', '#D9B554', '#BA8529']
                    }
                    style={styles.slide1}>
                    <Text
                      style={{
                        marginTop: 20,
                        marginLeft: 35,
                        color: '#FFFFFF',
                        fontSize: 16,
                        fontWeight: '500',
                        fontFamily: font.medium,
                      }}>
                      Upgrade to
                    </Text>
                    <View
                      style={{
                        top: 10,
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        marginLeft: 35,
                      }}>
                      <Image
                        source={IMAGE.whiteheartimg}
                        style={{
                          width: 30,
                          height: 26,
                          //   marginLeft: 20,
                        }}
                        resizeMode={'contain'}
                      />
                      <Text
                        style={{
                          color: '#FFFFFF',
                          fontSize: 16,
                          fontWeight: '700',
                          marginLeft: 15,
                          fontFamily: font.bold,
                        }}>
                        {item?.plandisplayname}
                        {' +'}
                      </Text>
                    </View>
                    <Text
                      style={{
                        marginTop: 25,
                        marginLeft: 35,
                        color: '#FFFFFF',
                        fontSize: 14,
                        fontWeight: '400',
                        fontFamily: font.normal,
                      }}>
                      {index == 0
                        ? 'See who likes you and more!'
                        : index == 1
                        ? 'Get unlimited likes and more!'
                        : 'Level up every action you take!'}
                    </Text>
                    <TouchableOpacity
                      onPress={() =>
                        onPress == 'edit'
                          ? navigation.navigate('Premiumboostscreen')
                          : navigation.navigate('ViewFeaturesScreen', {
                              detail: item,
                              index,
                              data,
                            })
                      }
                      style={styles.button}>
                      <Text
                        style={[
                          styles.ButtonText,
                          {
                            color:
                              index == 0
                                ? '#A3A4A8'
                                : index == 1
                                ? '#D59951'
                                : '#BA8529',
                          },
                        ]}>
                        {'Get Albi' + ' ' + item?.plandisplayname}
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>
              </View>
            )}
          />

          <PlanPaginations data={getplan} scrollX={scrollX} index={index} />
        </>
      )}
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
    justifyContent: 'center',

    marginTop: 40,
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
    // color: '#A7A8AD',
    fontFamily: font.bold,
  },
  slide1: {
    paddingVertical: 10,
    width: WIDTH / 1.1,
    alignSelf: 'center',
    borderRadius: 20,
    paddingBottom: 30,
    margin: WIDTH / 22,
    marginTop: 40,
  },
});
export default PlanCard;
