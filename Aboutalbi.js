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

const Aboutalbi = ({navigation}) => {
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
          About Albi
        </Text>
        <View style={{width: 20}}></View>
      </View>
      <View style={styles.horizontalLine} />

      <Image
        source={IMAGE.OnBoardingFirst}
        style={{
          width: WIDTH / 1.3,
          height: HEIGHT / 6,
          alignSelf: 'center',
          marginTop: 15,
        }}
        resizeMode={'contain'}
      />

      <View style={styles.horizontalLinehalf} />

      <View style={{top: 20, alignItems: 'center'}}>
        <Text style={{color: COLORS.Black, fontSize: 16, fontWeight: '600',fontFamily:font.semibold}}>
          Version 5.0.1
        </Text>
        <Text style={styles.agreementText}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem is our
          one akslamas doloremque of the laudantium, totam rem aperiam as faffew
          asas waasdar.
        </Text>
        <Text style={styles.agreementText}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem is our
          one akslamas doloremque of the laudantium, totam rem aperiam
        </Text>

        <Text style={styles.agreementText}>
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem is our
          one accusantium doloremque of the Sed ut perspiciatis unde omnis iste
          natus error sit voluptatem is our one accusantium.
        </Text>
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
  horizontalLinehalf: {
    height: 1,
    backgroundColor: '#858585',
    marginTop: 25,
    border: 1,
    width: WIDTH / 1.15,

    alignSelf: 'center',
  },
  agreementText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    width:WIDTH/1.15,
    lineHeight:20,
    marginTop:25,
    fontFamily:font.normal
  },
});
export default Aboutalbi;
