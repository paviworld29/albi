import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Platform,
  Keyboard,
  ScrollView,
} from 'react-native';
import {useContext} from 'react';
import React, {useState} from 'react';
import OTPTextView from 'react-native-otp-textinput';
import DatePicker from 'react-native-date-picker';
import {font} from '../Constant';
import AppProvider from '../providers/AppProvider';
import PhoneInput from 'react-native-phone-number-input';
import ResendOtp from './ResendOtp';

const WIDTH = Dimensions.get('window').width;
const HEIGHT = Dimensions.get('window').height;

export const PhoneNumberVerification = ({HeaderText, Decription}) => {
  const {SetPhoneNumber} = useContext(AppProvider);

  const [phone, setPhone] = useState();
  const [country_code, setCountry_code] = useState(91);
  const handlePress = val => {
    setPhone(val);
    SetPhoneNumber({
      country_code: country_code,
      mobile_number: val,
    });
  };
  const handleAddCode = val => {
    setCountry_code(val?.callingCode[0]);
    SetPhoneNumber({
      country_code: val?.callingCode[0],
      mobile_number: !phone ? null : phone,
    });
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => Keyboard.dismiss()}>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          width: WIDTH / 1.2,
          height: HEIGHT / 13,
          alignSelf: 'center',
          justifyContent: 'center',
          marginTop: HEIGHT / 10,
        }}>
        <PhoneInput
          onChangeText={handlePress}
          onChangeCountry={handleAddCode}
          defaultCode="US"
          placeholderTextColor={'#fff'}
          textInputStyle={{height: 50}}
          textInputProps={{maxLength: 16}}
          layout="first"
          defaultValue={phone}
          withShadow
          autoFocus
        />
      </View>
    </TouchableOpacity>
  );
};
export const OTPVerification = ({HeaderText, Decription, type}) => {
  const [otptx, setotptx] = useState('');
  const {setOTPVlave} = useContext(AppProvider);

  const handleOtpChange = value => {
    setotptx(value);
    setOTPVlave(value);
  };
  return (
    <TouchableOpacity activeOpacity={0.9} onPress={() => Keyboard.dismiss()}>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>
      <View style={{...styles.TextInput, marginTop: 30, marginRight: 8}}>
        <OTPTextView
          containerStyle={styles.textInputContainer}
          textInputStyle={styles.otpTextInput}
          tintColor={'#fff'}
          offTintColor={'#000'}
          focusedBorderColor="green"
          keyboardType="numeric"
          inputCount={6}
          handleTextChange={handleOtpChange}
        />
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: WIDTH / 1.2,
          alignSelf: 'center',
          bottom: 17,
        }}>
        {[...new Array(6)].map((e, s) => (
          <View
            key={s}
            style={{
              ...styles.pagination,
              backgroundColor: otptx.length - 1 >= s ? '#fff' : '#000',
            }}
          />
        ))}
      </View>
      <ResendOtp type={type} />
    </TouchableOpacity>
  );
};
export const RegisterFullName = ({HeaderText, Decription}) => {
  const {full_Name, setFull_Name, last_Name, setLast_Name} =
    useContext(AppProvider);
  return (
    <View>
      <ScrollView>
        <View style={styles.Header}>
          <Text style={styles.HeaderText}>{HeaderText}</Text>
          <Text style={styles.decription}>{Decription}</Text>
        </View>
        <View
          style={{
            ...styles.TextInput,
            marginTop: 30,
            borderBottomWidth: 1.5,
            borderBottomColor: '#000000',
          }}>
          <TextInput
            placeholder="First Name"
            placeholderTextColor={'#fff'}
            value={full_Name}
            color={'#000'}
            onChangeText={text => setFull_Name(text)}
            style={{
              color: '#000',
              fontSize: 33,
              top: 13,
              width: WIDTH / 1.6,
              fontWeight: '700',
              fontFamily: font.semibold,
              marginBottom: Platform.OS === 'ios' ? 10 : 0,
              marginBottom: 10,
            }}
          />
        </View>
        <View
          style={{
            ...styles.TextInput,
            marginTop: 30,
            borderBottomWidth: 1.5,
            borderBottomColor: '#000000',
          }}>
          <TextInput
            placeholder="Last Name"
            placeholderTextColor={'#fff'}
            value={last_Name}
            color={'#000'}
            onChangeText={text => setLast_Name(text)}
            style={{
              color: '#000',
              fontSize: 33,
              top: 13,
              width: WIDTH / 1.6,
              fontWeight: '700',
              fontFamily: font.semibold,
              marginBottom: Platform.OS === 'ios' ? 10 : 0,
            }}
          />
        </View>
      </ScrollView>
    </View>
  );
};
export const EmailComponent = ({HeaderText, Decription}) => {
  const {email, setEmail, checkValidEmail, setCheckValidEmail} =
    useContext(AppProvider);
  const handleCheckEmail = text => {
    let re = /\S+@\S+\.\S+/;
    let regex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;
    setEmail(text);
    if (re.test(text) || regex.test(text)) {
      setCheckValidEmail(false);
    } else {
      setCheckValidEmail(true);
    }
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
          borderBottomWidth: 1.5,
          borderBottomColor: '#000000',
        }}>
        <TextInput
          placeholder="Your Email"
          placeholderTextColor={'#fff'}
          value={email}
          color={'#000'}
          onChangeText={text => handleCheckEmail(text)}
          style={{
            color: '#000',
            fontSize: 33,
            top: 13,
            width: WIDTH / 1.2,
            fontWeight: '700',
            fontFamily: font.semibold,
            marginBottom: Platform.OS === 'ios' ? 10 : 0,
          }}
        />
      </View>
      {checkValidEmail ? (
        <Text style={styles.textFailed}>Wrong format email</Text>
      ) : null}
    </View>
  );
};
export const DODScreen = ({HeaderText, Decription}) => {
  const {dates, setDates} = useContext(AppProvider);
  const [date, setDate] = useState(new Date());
  const handlePress_date = val => {
    setDate(val);
    setDates(val);
  };
  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>
      <DatePicker
        date={date}
        onDateChange={handlePress_date}
        fadeToColor="none"
        style={{alignSelf: 'center', marginTop: 30}}
        mode={'date'}
        androidVariant={'iosClone'}
        theme={'light'}
      />
    </View>
  );
};
export const GenderComponet = ({HeaderText, Decription}) => {
  const {gender_select, setGender_select} = useContext(AppProvider);
  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: Platform.OS === 'ios' ? WIDTH / 1.2 : WIDTH / 1.1,
        }}>
        <TouchableOpacity
          onPress={() => setGender_select(1)}
          style={{
            ...styles.btn,
            backgroundColor: gender_select == 1 ? '#000' : '#ffff',
          }}>
          <Text
            style={{
              ...styles.btnText,
              color: gender_select == 1 ? '#fff' : '#000',
            }}>
            Man
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setGender_select(2)}
          style={{
            ...styles.btn,
            backgroundColor: gender_select == 2 ? '#000' : '#ffff',
          }}>
          <Text
            style={{
              ...styles.btnText,
              color: gender_select == 2 ? '#fff' : '#000',
            }}>
            Women
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setGender_select(3)}
        style={{
          ...styles.btn,
          width: Platform.OS === 'ios' ? WIDTH / 1.2 : WIDTH / 1.1,
          marginTop: 25,
          backgroundColor: gender_select == 3 ? '#000' : '#ffff',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            ...styles.btnText,
            color: gender_select == 3 ? '#fff' : '#000',
          }}>
          Non-binary
        </Text>
      </TouchableOpacity>
    </View>
  );
};
export const GenderPrefer = ({HeaderText, Decription}) => {
  const {gender_pefer, setgender_pefer} = useContext(AppProvider);
  return (
    <View>
      <View style={styles.Header}>
        <Text style={styles.HeaderText}>{HeaderText}</Text>
        <Text style={styles.decription}>{Decription}</Text>
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignSelf: 'center',
          width: Platform.OS === 'ios' ? WIDTH / 1.2 : WIDTH / 1.1,
        }}>
        <TouchableOpacity
          onPress={() => setgender_pefer(1)}
          style={{
            ...styles.btn,
            backgroundColor: gender_pefer == 1 ? '#000' : '#ffff',
          }}>
          <Text
            style={{
              ...styles.btnText,
              color: gender_pefer == 1 ? '#fff' : '#000',
            }}>
            Man
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setgender_pefer(2)}
          style={{
            ...styles.btn,
            backgroundColor: gender_pefer == 2 ? '#000' : '#ffff',
          }}>
          <Text
            style={{
              ...styles.btnText,
              color: gender_pefer == 2 ? '#fff' : '#000',
            }}>
            Women
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => setgender_pefer(3)}
        style={{
          ...styles.btn,
          width: Platform.OS === 'ios' ? WIDTH / 1.2 : WIDTH / 1.1,
          marginTop: 25,
          backgroundColor: gender_pefer == 3 ? '#000' : '#ffff',
          alignSelf: 'center',
        }}>
        <Text
          style={{
            ...styles.btnText,
            color: gender_pefer == 3 ? '#fff' : '#000',
          }}>
          Everyone
        </Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  Header: {
    width: WIDTH / 1.2,
    alignSelf: 'center',
    marginTop: 55,
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
    marginTop: 2,
    fontFamily: font.semibold,
  },
  TextInput: {
    flexDirection: 'row',
    width: WIDTH / 1.2,
    alignSelf: 'center',
    marginTop: HEIGHT / 10,
  },
  countrycode: {
    color: '#000',
    fontSize: 33,
    fontWeight: '600',
    alignSelf: 'center',
    textDecorationLine: 'underline',
    fontFamily: font.semibold,
    top: Platform.OS === 'android' ? 3 : 0,
  },
  textInputContainer: {},
  otpTextInput: {
    width: Platform.OS === 'ios' ? WIDTH / 8.6 : WIDTH / 8.3,
    height: 70,
    fontSize: 33,
    color: '#000',
    fontWeight: '600',
    borderBottomWidth: 0,
    right: 2,
  },
  btn: {
    width: Platform.OS === 'ios' ? WIDTH / 2.5 : WIDTH / 2.3,
    paddingVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginTop: 65,
  },
  btnText: {
    fontSize: 13,
    fontWeight: '600',
    fontFamily: font.bold,
  },
  pagination: {
    width: WIDTH / 9,
    height: 2,
    backgroundColor: '#000',
  },
  textFailed: {
    alignSelf: 'flex-start',
    color: '#D42B31',
    marginLeft: WIDTH / 12,
    marginTop: 10,
  },
});
