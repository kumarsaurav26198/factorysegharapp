/* eslint-disable react/react-in-jsx-scope */
import {createStackNavigator} from '@react-navigation/stack';
import {
  Choosevehicle,
  DrivingLicense,
  DrivingLicenseNumber,
  OperationalCities,
  OtpScreen,
  Profilepicture,
  Register,
  RegistrationRC,
  SignMobile,
  UploadDocuments,
  Welcome,
  WelcomeBack,
} from '../screens/public';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  AboutUs,
  AddAmount,
  Address,
  AllProduct,
  BookRide,
  CancelRide,
  cardDetail,
  Complain,
  ContactUs,
  DriverDetail,
  EditProfile,
  FindingCars,
  HelpSupport,
  History,
  HistoryDetails,
  On_the_way,
  OnRoute,
  PayOption,
  PickDestination,
  PickUp,
  PrivacyPolicy,
  Profile,
  Referral,
  RequiredAuthentication,
  RidesBooked,
  Settings,
  ShowAllBooking,
  Summary,
  TakeBooking,
  Wallet,
} from '../screens/private';
import {useEffect, useState} from 'react';
import BottomNavigator from './Bottomnavigator';

const Stack = createStackNavigator();

const Navigator = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const mobile = await AsyncStorage.getItem('mobile');
        // console.log("mobile",mobile)
        setInitialRoute(mobile ? 'BottomNavigator' : 'SignMobile');
      } catch (error) {
        console.error('Error reading _id from AsyncStorage:', error);
        setInitialRoute('SignMobile'); // Navigate to SignMobile in case of error
      }
    };

    checkLoginStatus();
  }, []);

  if (initialRoute === null) {
    // Render a placeholder screen or loading spinner until the initial route is determined
    return null;
  }

  const commonOptions = {
    headerShown: true,
    headerBackTitleVisible: false,
    headerTransparent: true,
    headerTitleAlign: 'center',
    headerTitleStyle: {
      color: 'transparent',
    },
    headerStyle: {
      backgroundColor: 'transparent',
      elevation: 0,
      shadowOpacity: 0,
    },
  };

  return (
    <Stack.Navigator
      screenOptions={{headerShown: false}}
      initialRouteName={initialRoute}>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="SignMobile" component={SignMobile} />
      <Stack.Screen name="Register" component={Register} />
      <Stack.Screen name="WelcomeBack" component={WelcomeBack} />
      <Stack.Screen name="OperationalCities" component={OperationalCities} />
      <Stack.Screen name="Choosevehicle" component={Choosevehicle} />
      <Stack.Screen name="UploadDocuments" component={UploadDocuments} />
      <Stack.Screen name="DrivingLicense" component={DrivingLicense} />
      <Stack.Screen
        name="DrivingLicenseNumber"
        component={DrivingLicenseNumber}
      />
      <Stack.Screen name="Profilepicture" component={Profilepicture} />
      <Stack.Screen name="RegistrationRC" component={RegistrationRC} />
      <Stack.Screen name="OtpScreen" component={OtpScreen} />
      <Stack.Screen name="BottomNavigator" component={BottomNavigator} />
      <Stack.Screen name="AllProduct" component={AllProduct} />


      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="Address" component={Address} />
      <Stack.Screen name="History" component={History} />
      <Stack.Screen name="HistoryDetails" component={HistoryDetails} />
      <Stack.Screen name="Complain" component={Complain} />
      <Stack.Screen name="Referral" component={Referral} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="ContactUs" component={ContactUs} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="HelpSupport" component={HelpSupport} />
      <Stack.Screen name="PickUp" component={PickUp} />
      <Stack.Screen name="PickDestination" component={PickDestination} />
      <Stack.Screen
        name="BookRide"
        component={BookRide}
        options={{...commonOptions}}
      />
      <Stack.Screen
        name="FindingCars"
        component={FindingCars}
        options={{...commonOptions}}
      />
      <Stack.Screen
        name="RidesBooked"
        component={RidesBooked}
        options={{...commonOptions}}
      />
      <Stack.Screen name="DriverDetail" component={DriverDetail} />
      <Stack.Screen name="PayOption" component={PayOption} />
      <Stack.Screen name="cardDetail" component={cardDetail} />
      <Stack.Screen name="Wallet" component={Wallet} />
      <Stack.Screen name="AddAmount" component={AddAmount} />
      <Stack.Screen name="CancelRide" component={CancelRide} />
      <Stack.Screen name="ShowAllBooking" component={ShowAllBooking} />
      <Stack.Screen
        name="TakeBooking"
        component={TakeBooking}
        options={{...commonOptions}}
      />
      <Stack.Screen
        name="On_the_way"
        component={On_the_way}
        options={{...commonOptions}}
      />
      <Stack.Screen
        name="RequiredAuthentication"
        component={RequiredAuthentication}
      />
      <Stack.Screen
        name="OnRoute"
        component={OnRoute}
        options={{...commonOptions}}
      />
      <Stack.Screen name="Summary" component={Summary} />
      {/* <Stack.Screen name="Profile" component={Profile} /> */}
    </Stack.Navigator>
  );
};
export default Navigator;
