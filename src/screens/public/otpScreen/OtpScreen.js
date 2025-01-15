import { StyleSheet, TouchableOpacity, View, Text, FlatList } from 'react-native';
import React, { useRef, useState, useEffect } from 'react';
import { C_Button, C_Text } from '../../../components';
import Colors from '../../../themes/Colors';
import OTPTextView from 'react-native-otp-textinput';
import { formatTime } from '../../../utils/helpers';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { validateOtp } from '../../../utils/validators';
import { CommonStyles } from '../../../themes/CommonStyles';
import { useActions } from '../../../hooks/useActions';
import { connect } from 'react-redux';
import { OtpIcon } from '../../../assets/icons';

const OtpScreen = ({ route, verifyRes, loginRes }) => {
  const { mobile } = route?.params;
  const { verifyReq, loginRequest } = useActions();
  const otpInputRef = useRef(null);
  const [ otp, setOtp ] = useState('');
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ timer, setTimer ] = useState(10);

  useEffect(() => {
    if (timer > 0)
    {
      const interval = setInterval(() => {
        setTimer(prevTimer => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    }
  }, [ timer ]);

  const handleOtpChange = value => {
    setOtp(value);
  };

  const handlePressContinue = () => {
    const { isValid, errorMessage } = validateOtp(otp);
    if (isValid)
    {
      setErrorMessage("")
      const payload = {mobile,otp};
      verifyReq(payload);
    } else
    {
      setErrorMessage(errorMessage);
      setOtp('');
      otpInputRef.current?.clear();
    }
  };

  return (
    <View style={styles.container}>
      <OtpIcon />
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <View>
              <View style={styles.textHeaderContainer}>
                <C_Text content="Enter OTP" bold style={styles.loremText} />
                <C_Text
                  content="We have sent the verification code to your mobile number!"
                  style={styles.loremText}
                />
              </View>
              {timer > 0 && (
                <C_Text
                  content={timer > 0 ? `${ formatTime(timer) }` : ''}
                  style={styles.timerText}
                />
              )}

              <View style={styles.otpWrapper}>
                {
                  <OTPTextView
                    inputCount={4}
                    handleTextChange={handleOtpChange}
                    ref={otpInputRef}
                    offTintColor={'#4A00E0'}
                    containerStyle={styles.otpContainer}
                    textInputStyle={styles.otpBox}
                    autoFocus={true}
                  />
                }
              </View>
              {errorMessage ? (<Text style={[ CommonStyles.errorText, { alignSelf: 'center' } ]}>{errorMessage}</Text>) : null}
              {verifyRes?.error ? (
                <Text style={[ CommonStyles.errorText, { alignSelf: 'center' } ]}>
                  {verifyRes?.error?.message}
                </Text>
              ) : null}
              <View style={styles.resendContainer}>
                <C_Text
                  content="Didn’t receive OTP ?"
                  style={styles.loremText}
                />
                <TouchableOpacity
                  disabled={timer !== 0 || loginRes.loading}
                  onPress={() => {
                    setOtp('');
                    loginRequest({ mobile: mobile });
                    setTimer(10);
                  }}>
                  <C_Text content="Resend" style={styles.resendText} />
                </TouchableOpacity>
              </View>
            </View>
          );
        }}
        ListFooterComponent={<View style={{ height: 150 }} />}
      />

      <View style={[ CommonStyles.bottomView, { paddingHorizontal: 20 } ]}>
        <C_Button
          title="Continue"
          onPress={handlePressContinue}
          loading={verifyRes?.loading}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  verifyRes: state?.verifyReducers,
  loginRes: state?.loginReducers,
});

export default connect(mapStateToProps)(OtpScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    alignItems: 'center',
    padding: 20,
  },
  bold: {
    color: Colors.primary,
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 10,
  },
  loremText: {
    color: Colors.black,
    marginVertical: 5,
    paddingHorizontal: 20,
    textAlign: 'left',
    fontSize: 16,
    lineHeight: 22,
  },
  timerText: {
    fontSize: FontSize.FS20,
    textAlign: 'center',
    marginBottom: 10,
  },
  otpWrapper: {
    justifyContent: 'center',
    maxWidth: 450,
    alignSelf: 'center',
    marginBottom: 20,
  },
  otpContainer: {
    width: '100%',
    paddingHorizontal: 20,
  },
  otpBox: {
    borderWidth: 2,
    borderColor: '#4A00E0',
    padding: 10,
    width: 50,
    height: 50,
    borderRadius: 10,
    textAlign: 'center',
    fontSize: FontSize.FS20,
    color: '#4A00E0',
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  resendText: {
    color: Colors.primary,
    left: -15,
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW700,
  },
  textHeaderContainer: {
    alignItems: 'flex-start',
    paddingVertical: 20,
    marginBottom: 10,
    width: '100%',
  },
});
