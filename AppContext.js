import React from 'react';
import AppProvider from './AppProvider';
import {useState} from 'react';

const AppContext = props => {
  const [phoneNumber, SetPhoneNumber] = useState({
    country_code: +1,
    mobile_number: '',
  });
  const [OTPverify, setOTPverify] = useState('');
  const [answers, setAnswers] = useState('');
  const [ItemIdUser, setItemIdUser] = useState('');
  const [selectImageubdated, setSelectImageubdated] = useState([]);

  const [OTPValue, setOTPVlave] = useState('');
  const [full_Name, setFull_Name] = useState('');
  const [last_Name, setLast_Name] = useState('');
  const [email, setEmail] = useState('');
  const [dates, setDates] = useState('');
  const [gender_select, setGender_select] = useState('');
  const [checkValidEmail, setCheckValidEmail] = useState(false);
  const [select, setSelect] = useState([]);
  const [showMoreInfo, setShowMoreInfo] = useState('');
  const [gender_pefer, setgender_pefer] = useState('');
  const [country, setCountry] = useState('');
  const [Secondcountry, setSecondCountry] = useState('');
  const [selectImage1, setSelectImage1] = React.useState([]);
  const [selectImage2, setSelectImage2] = React.useState('');
  const [selectImage3, setSelectImage3] = React.useState('');
  const [selectImage4, setSelectImage4] = React.useState('');
  const [selectImage5, setSelectImage5] = React.useState('');
  const [selectImage6, setSelectImage6] = React.useState('');
  const [religion_select, setreligion_select] = useState('');
  const [primary_country, setprimary_country] = useState('');
  const [secoundery_country, setsecoundery_country] = useState('');
  const [image_select, setimage_select] = useState('');
  const [capturedImage, setCapturedImage] = useState(null);
  const [signupLoader, setSignupLoader] = React.useState(false);
  const [adminreview, setAdminreview] = React.useState('');
  const [selectedCountry, setSelectedCountry] = React.useState();
  const [selectedsecondcountry, setselectedsecondcountry] = React.useState();

  return (
    <AppProvider.Provider
      value={{
        phoneNumber,
        SetPhoneNumber,
        OTPValue,
        setOTPVlave,
        full_Name,
        setFull_Name,
        last_Name,
        setLast_Name,
        email,
        setEmail,
        dates,
        setDates,
        gender_select,
        setGender_select,
        gender_pefer,
        setgender_pefer,
        religion_select,
        setreligion_select,
        primary_country,
        setprimary_country,
        secoundery_country,
        setsecoundery_country,
        image_select,
        setimage_select,
        select,
        setSelect,
        showMoreInfo,
        setShowMoreInfo,
        country,
        setCountry,
        Secondcountry,
        setSecondCountry,
        selectImage1,
        setSelectImage1,
        selectImage2,
        setSelectImage2,
        selectImage3,
        setSelectImage3,
        selectImage4,
        setSelectImage4,
        selectImage5,
        setSelectImage5,
        selectImage6,
        setSelectImage6,
        capturedImage,
        setCapturedImage,
        checkValidEmail,
        setCheckValidEmail,
        signupLoader,
        setSignupLoader,
        adminreview,
        setAdminreview,
        selectedCountry,
        setSelectedCountry,
        selectedsecondcountry,
        setselectedsecondcountry,
        OTPverify, 
        setOTPverify,
        answers, setAnswers,
        ItemIdUser, setItemIdUser,
        selectImageubdated, setSelectImageubdated
      }}>
      {props.children}
    </AppProvider.Provider>
  );
};
export default AppContext;
