import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View ,Linking} from 'react-native';
import { MobileIcon } from '../../../assets/icons';
import { C_Button, C_Text, MobileWithCountryCode, } from '../../../components';
import { validatePhoneNumber, } from '../../../utils/validators';
import { CommonStyles } from '../../../themes/CommonStyles';
import { useActions } from '../../../hooks/useActions';
import { connect } from 'react-redux';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';

const SignMobile = ({ loginRes }) => {
  const { loginRequest, logingReset } = useActions();
  const [ numbers, setNumber ] = useState('');
  const [ refreshing, setRefreshing ] = useState(false);
  const [ selectedCountryCode, setSelectedCountryCode ] = useState('91');
  const [ errorMessage, setErrorMessage ] = useState('');

  // console.log(loginRes.error)

  useEffect(() => {
    logingReset();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    logingReset();
    setRefreshing(false);
  }, [ logingReset ]);

  const handleCountryChange = code => {
    setSelectedCountryCode(code);
  };

  const handlePressContinue = () => {
    const { isValid, errorMessage } = validatePhoneNumber(
      selectedCountryCode, numbers
    );
    if (isValid)
    {
      setErrorMessage('');
      const payload = {
        "mobile": selectedCountryCode + numbers,

      };
      loginRequest(payload);
    } else
    {
      setErrorMessage(errorMessage);
    }
  };

  return (
    <View style={styles.container}>
      <MobileIcon />
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <View style={styles.textHeaderContainer}>
                <C_Text
                  content={`Welcome Back`}
                  medium
                  style={styles.medium}
                />
                <C_Text
                  content={`Payment info,  details and important updates will be sent to this number.`}
                  style={styles.otpmessage}
                />

              </View>
              {errorMessage ? <Text style={CommonStyles.errorText}>{errorMessage}</Text> : null}
              {loginRes?.error ? <Text style={CommonStyles.errorText}>{loginRes?.error?.message}</Text> : null}
              <View style={styles.phoneInputWrapper}>

                <MobileWithCountryCode
                  value={numbers}
                  onChangeText={setNumber}
                  placeholder="981xxxxxxx"
                  onCountryChange={handleCountryChange}
                />
              </View>

              <View style={[ styles.textHeaderContainer, { paddingTop: 0 } ]}>
                <Text style={styles.termCond}>
                  By continuing, you agree to Factory Se Home
                </Text>
                <TouchableOpacity onPress={() => Linking.openURL('https://factoryseghar.com/footerinfo?page=term&condition')}>
                  <Text style={[ styles.termCond, styles.termCond2 ]}>
                    Terms & Conditions
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          );
        }}
        ListFooterComponent={<View style={{ height: 150 }} />}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />

      <View style={[ CommonStyles.bottomView, { paddingHorizontal: 20 } ]}>
        <C_Button
          title="Send"
          onPress={handlePressContinue}
          loading={loginRes?.loading}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  loginRes: state?.loginReducers,
});
export default connect(mapStateToProps)(SignMobile);

const styles = StyleSheet.create({
  background: {
    width: '100%',
    height: '100%',
    resizeMode: 'stretch',
  },
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  textHeaderContainer: {
    alignItems: 'left',
    paddingVertical: 20,
    marginBottom: 10,
  },
  termCond: {
    color: Colors.primary,
    fontWeight: FontsWeights.FW400,
    fontSize: FontSize.FS14,
  },
  termCond2: {
    textDecorationLine: 'underline',
    fontWeight: FontsWeights.FW600,
  },
  medium: {
    color: Colors.black,
    fontSize: FontSize.FS20,
    fontWeight: FontsWeights.FW600,
    textAlign: 'left',
    marginBottom: 10,
  },
  otpmessage: {
    marginBottom: 10,
    textAlign: 'left',
  },
  phoneInputWrapper: {
    width: '95%',
    height: 50,
    marginBottom: 20,
  },
});
