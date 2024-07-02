import React from 'react';
import {
  DODScreen,
  EmailComponent,
  GenderComponet,
  GenderPrefer,
  OTPVerification,
  PhoneNumberVerification,
  RegisterFullName,
} from './AuthDetailVerificationScreens';
import {
  CountrySelection,
  ImageSelect,
  InterestsCompoenet,
  LocationComponent,
  ReligionComponent,
  SelfiVerification,
} from './AuthAnotherDetail';

const ComponentManager = ({components, type}) => {
  switch (components) {
    case 1:
      return (
        <PhoneNumberVerification
          HeaderText={"What's \nYour Phone Number?"}
          Decription={
            'Albi will send you a text with a verification code. Message and data rates may apply.'
          }
        />
      );
    case 2:
      return (
        <OTPVerification
          type={type}
          HeaderText={'Enter \nverification code'}
          Decription={'We’ve sent you a code. '}
        />
      );
    case 3:
      return (
        <RegisterFullName
          HeaderText={"What's \nyour name?"}
          Decription={'Introduce yourself.'}
        />
      );
    case 4:
      return (
        <EmailComponent HeaderText={"What's \nyour email?"} Decription={''} />
      );
    case 5:
      return (
        <DODScreen
          HeaderText={"What's your \nbirthday?"}
          Decription={
            "Confirm this information is correct because you won't be able to change it later."
          }
        />
      );
    case 6:
      return (
        <GenderComponet
          HeaderText={"What's \nyour gender?"}
          Decription={'Select one'}
        />
      );
    case 7:
      return (
        <GenderPrefer
          HeaderText={'Who are \nyou interested in?'}
          Decription={'Select one'}
        />
      );
    case 8:
      return (
        <InterestsCompoenet
          HeaderText={'What are your \ninterests?'}
          Decription={'Select up to 5'}
        />
      );
    case 9:
      return (
        <ReligionComponent
          HeaderText={'What are your \nreligious beliefs?'}
          Decription={'Select one'}
        />
      );
    case 10:
      return (
        <CountrySelection
          HeaderText={"What's your family\nbackground"}
          Decription={'Select countries you belong to.'}
        />
      );
    case 11:
      return (
        <ImageSelect
          HeaderText={'Let’s upload some \nimages for your profile'}
          Decription={'Minimum 4 required.'}
        />
      );
    case 12:
      return (
        <SelfiVerification
          HeaderText={'Selfie \nVerification'}
          Decription={
            'We use selfies to verify that this profile is yours to keep our community safe and authentic.'
          }
        />
      );
    case 13:
      return (
        <LocationComponent
          HeaderText={'Enable Location \nServices'}
          Decription={
            "You'll need to enable your location in \norder to use Albi."
          }
        />
      );
  }
};

export default ComponentManager;
