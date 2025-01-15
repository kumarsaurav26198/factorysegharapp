import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, {useState} from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import {BackVerctor, RegisterIcon} from '../../../assets/icons';
import {connect} from 'react-redux';
import {
  C_Button,
  C_Text,
  C_TextInput,
  MobileWithCountryCode,
} from '../../../components';
import {useActions} from '../../../hooks/useActions';
import Colors from '../../../themes/Colors';
import {FontSize, FontsWeights} from '../../../themes/Fonts';
import {useRoute} from '@react-navigation/native';
import { reset } from '../../../services/navigationService';

const WelcomeBack = ({loginRes, navigation}) => {
  const route = useRoute();
  const {loginRequest} = useActions();
  const {selectedCity} = route?.params;
  const [errorMessage, setErrorMessage] = useState('');
  const [name, setName] = useState('');
  const [refcode, setRefcode] = useState('');
  const [numbers, setNumber] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('91');

  const handleCountryChange = code => {
    setSelectedCountryCode(code);
  };

  // const [ selectedCity, setSelectedCity ] = useState('');

  const handlePressNext = () => {
    reset([{ name: 'DrawerNavigation' }]);

    // const {isValid, errorMessage} = validateNameAndCity(name, selectedCity);
    // if (isValid) {
    //   setErrorMessage('');
    //   navigation.navigate('Choosevehicle');
    // } else {
    //   setErrorMessage(errorMessage);
    // }
  };

  return (
    <View style={[CommonStyles.container]}>
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <View style={styles.container}>
              <RegisterIcon />
              <C_Text content={`Welcome Back`} style={styles.medium} />
              {/* <View style={styles.textHeaderContainer}>
                                <C_Text content={`Full Name`} style={styles.otpmessage} />
                                <C_TextInput
                                    placeholder="John Smith"
                                    // value={name}
                                    onChangeText={(txt) => setName(txt)}
                                />
                            </View> */}
              <View style={styles.textHeaderContainer}>
                <C_Text
                  content={`Enter Phone number `}
                  style={styles.otpmessage}
                />
                <MobileWithCountryCode
                  value={numbers}
                  onChangeText={setNumber}
                  placeholder="981xxxxxxx"
                  onCountryChange={handleCountryChange}
                />
                {/* <C_TextInput
                                    placeholder="johnsmith99@gmail.com"
                                    // value={name}
                                    onChangeText={(txt) => setName(txt)}
                                /> */}
              </View>
              <View style={styles.textHeaderContainer}>
                <C_Text content={`Password`} style={styles.otpmessage} />
                <C_TextInput
                  placeholder=". . . . . . . ."
                  // value={name}
                  onChangeText={txt => setName(txt)}
                  showPasswordToggle={true}
                  secureTextEntry={true}
                />
              </View>

              {/* <TouchableOpacity style={styles.inputContainer} onPress={()=>{navigation.navigate("OperationalCities",{name})}}>
                                <Text style={styles.input}>{selectedCity || 'City'}</Text>
                                <BackVerctor style={styles.rotatedIcon} />
                            </TouchableOpacity> */}
              {/* <C_TextInput
                                placeholder="Your Email"
                                value={refcode}
                                onChangeText={(txt) => setRefcode(txt)}
                            /> */}
              {/* <C_TextInput
                                placeholder="Referral code (optional)"
                                value={refcode}
                                onChangeText={(txt) => setRefcode(txt)}
                            /> */}
              {errorMessage ? (
                <Text style={CommonStyles.errorText}>{errorMessage}</Text>
              ) : null}
              {loginRes?.error ? (
                <Text style={CommonStyles.errorText}>
                  {loginRes?.error?.message}
                </Text>
              ) : null}
              <View style={[styles.textHeaderContainer, {paddingTop: 0}]}>
                <Text style={styles.termCond}>
                  {' '}
                  By continuing, you agree to Janta’s
                </Text>
                <TouchableOpacity>
                  <Text style={[styles.termCond, styles.termCond2]}>
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListFooterComponent={<View style={{height: 150}} />}
      />

      <View style={[CommonStyles.bottomView, {paddingHorizontal: 20}]}>
        <C_Button
          title="Login"
          onPress={handlePressNext}
          loading={loginRes?.loading}
        />
        {/* <TouchableOpacity
          onPress={() => {
            navigation.navigate('SignMobile', {selectedCity: ''});
          }}>
          <C_Text
            content={'Already an account? Login'}
            style={styles.registerText}
          />
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  loginRes: state?.loginReducers,
});
export default connect(mapStateToProps)(WelcomeBack);

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 50,
    alignItems: 'center',
  },
  textHeaderContainer: {
    alignItems: 'flex-start',
    width: '100%',
    // paddingVertical: 20,
    // marginBottom: 10,
  },
  medium: {
    marginTop: 10,
    textAlign: 'left',
    marginBottom: 10,
    fontSize: FontSize.FS20,
    fontWeight: FontsWeights.FW500,
    marginBottom: 50,
  },
  otpmessage: {
    marginBottom: 10,
    textAlign: 'left',
    color: Colors.darkgrey,
  },
  termCond: {
    textAlign: 'left',
    color: Colors.primary,
    fontWeight: FontsWeights.FW400,
    fontSize: FontSize.FS14,
  },
  termCond2: {
    textDecorationLine: 'underline',
    fontWeight: FontsWeights.FW600,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    width: '100%',
    borderRadius: 7,
    paddingHorizontal: 10,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
    borderColor: Colors.primary,
  },
  input: {
    flex: 1,
    fontSize: FontSize.FS15,
    color: Colors.black,
    fontWeight: FontsWeights.FW500,
  },
  rotatedIcon: {
    transform: [{rotate: '270deg'}],
    right: 10,
  },
});
