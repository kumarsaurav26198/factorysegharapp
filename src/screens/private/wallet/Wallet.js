import React from 'react';
import {FlatList, StyleSheet, TouchableOpacity, View} from 'react-native';
import {CommonStyles} from '../../../themes/CommonStyles';
import {BackButton, C_Text, TransactionItem} from '../../../components';
import Colors from '../../../themes/Colors';

const Wallet = () => {
  const transactions = [
    {
      id: '1',
      name: 'John',
      amount: 300,
      timestamp: 'Today at 09:20 am',
      type: 'outgoing',
    },
    {
      id: '2',
      name: 'John',
      amount: 300,
      timestamp: 'Today at 09:20 am',
      type: 'incoming',
    },
    {
      id: '3',
      name: 'John',
      amount: 300,
      timestamp: 'Today at 09:20 am',
      type: 'outgoing',
    },
    {
      id: '4',
      name: 'John',
      amount: 300,
      timestamp: 'Today at 09:20 am',
      type: 'incoming',
    },
  ];
  return (
    <View style={CommonStyles.container}>
      <BackButton text="Wallet" left addMoney bottomBorder />
      <View style={CommonStyles.balanceContainer}>
        <View style={CommonStyles.balanceBox}>
          <C_Text content="₹500" bold />
          <C_Text content="Available Balance" style={CommonStyles.medium} />
        </View>
        <View style={CommonStyles.balanceBox}>
          <C_Text content="₹500" bold />
          <C_Text content="Total Expend" style={CommonStyles.medium} />
        </View>
      </View>
      <View
        style={[
          CommonStyles.balanceContainer,
          styles.additionalBalanceContainer,
        ]}>
        <C_Text content="Bike" bold style={styles.leftAlignedText} />
        <TouchableOpacity>
          <C_Text
            content="See All"
            style={[styles.leftAlignedText, {color: Colors.primary}]}
          />
        </TouchableOpacity>
      </View>
      <FlatList
        data={transactions}
        renderItem={({item}) => <TransactionItem item={item} />}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default Wallet;

const styles = StyleSheet.create({
  additionalBalanceContainer: {
    paddingHorizontal: 25,
    marginTop: 30,
    height: 40,
  },
  leftAlignedText: {
    textAlign: 'left',
  },
});
