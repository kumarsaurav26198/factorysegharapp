import {FlatList, StyleSheet, View, Alert, Text, Share, Button} from 'react-native';
import React, {useState} from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import {BackButton, C_Button} from '../../../components';
import Clipboard from '@react-native-clipboard/clipboard';
import Colors from '../../../themes/Colors';
import {connect} from 'react-redux';

const Referral = ({usersRes}) => {
  const refcode = usersRes[0]?.referralCode;

  const writeToClipboard = async () => {
    Clipboard.setString(refcode);
    Alert.alert('Copied to Clipboard', 'Referral code copied successfully!');
  };

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: `Use my referral code: ${refcode} to get benefits! Here is the link: https://yourapp.com/referral?code=${refcode}`,
      });
      if (result.action === Share.sharedAction) {
        console.log('Shared successfully');
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    } catch (error) {
      Alert.alert('Error', error.message);
    }
  };

  return (
    <View style={CommonStyles.container}>
      <BackButton left={true} text="Referral" cashback={usersRes[0]?.cashback} />
      <View style={styles.referralCodeContainer}>
        <Text style={styles.referralCodeText}>Your Referral Code:</Text>
        <View style={styles.codeRow}>
          <Text style={styles.referralCode}>{refcode}</Text>
          <Button
            title="Copy"
            onPress={writeToClipboard}
            small
            style={styles.copyButton}
          />
        </View>
      </View>

      <View style={[CommonStyles.bottomView, {padding: 15}]}>
        <C_Button title="Invite" onPress={onShare} />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  usersRes: state?.userReducers?.data,
});

export default connect(mapStateToProps)(Referral);

const styles = StyleSheet.create({
  referralCodeContainer: {
    padding: 20,
    backgroundColor: Colors.lightgrey,
    borderRadius: 10,
    margin: 10,
    alignItems: 'center',
  },
  referralCodeText: {
    fontSize: 16,
    color: Colors.black,
    marginBottom: 10,
  },
  codeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
  },
  referralCode: {
    fontSize: 18,
    fontWeight: 'bold',
    color: Colors.primary,
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
    overflow: 'hidden',
  },
  copyButton: {
    marginLeft: 10,
    backgroundColor: Colors.primary,
    paddingHorizontal: 15,
    paddingVertical: 5,
    borderRadius: 5,
  },
});
