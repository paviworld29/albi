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
import ToggleSwitch from 'toggle-switch-react-native';
import { useState } from 'react';
import { Button } from 'react-native';

const Notifications = ({navigation}) => {
  const [on ,of] = useState(false)
  const [ons ,off] = useState(false)

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
        <Text style={{fontSize: 18, fontWeight: '600',color:'#101010',fontFamily:font.semibold}}>Notifications</Text>
        <View style={{width: 20}}></View>
      </View>
      <View style={styles.horizontalLine} />

      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 40,
          width: WIDTH / 1.2,
        }}>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#101010',fontFamily:font.semibold}}>
          In-app notification
        </Text>

        <ToggleSwitch
          isOn={on}
          onColor="#000000"
          offColor="grey"
          labelStyle={{color: 'black', fontWeight: '900'}}
          size="medium"
          onToggle={()=>of(!on)}
        />
      </View>
      <View
        style={{
          alignSelf: 'center',
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 15,
          width: WIDTH / 1.2,
        }}>
        <Text style={{fontSize: 16, fontWeight: '600', color: '#101010',fontFamily:font.semibold}}>
        Push notifications
        </Text>

        <ToggleSwitch
         isOn={ons}
         onColor="#000000"
         offColor="grey"
         labelStyle={{color: 'black', fontWeight: '900'}}
         size="medium"
         onToggle={()=>off(!ons)}
        />
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
});
export default Notifications;
