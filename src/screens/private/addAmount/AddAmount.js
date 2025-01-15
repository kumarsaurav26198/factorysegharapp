import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton, C_Button, C_Text } from '../../../components';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { CardIcon } from '../../../assets/icons';
import { AddSuccess, ModalWrapper } from '../../../components/Modal';

const AddAmount = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };
  return (
    <View style={CommonStyles.container}>
      <BackButton text="Amount" left bottomBorder />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Enter Amount"
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity>
        <C_Text
          content="Add payment Method"
          style={[ styles.leftAlignedText, { color: Colors.primary } ]}
        />
      </TouchableOpacity>
      <C_Text
        content="Select Payment Method"
        medium
        style={[
          {
            textAlign: 'left',
            left: 20,
            fontWeight: FontsWeights.FW600,
            fontSize: FontSize.FS17,
          },
        ]}
      />
      <TouchableOpacity style={styles.paymentMethod}>
        <CardIcon />
        <View style={styles.cardDetails}>
          <Text style={styles.cardNumber}>**** **** **** 8970</Text>
          <Text style={styles.expiryDate}>11/25</Text>
        </View>

      </TouchableOpacity>
      <View style={CommonStyles.bottomView}>
        <C_Button title="Confirm"  onPress={toggleModal} />
      </View>

      <ModalWrapper
        visible={isModalVisible}
        onRequestClose={toggleModal}
        center={true}>
        <AddSuccess handlePressClose ={toggleModal} handlePressDone={toggleModal}/>
      </ModalWrapper>
    </View>
  );
};

export default AddAmount;

const styles = StyleSheet.create({
  additionalBalanceContainer: {
    paddingHorizontal: 25,
    marginTop: 30,
  },
  leftAlignedText: {
    textAlign: 'right',
    paddingHorizontal: 20,
  },
  inputContainer: {
    margin: 20,
    marginTop: 25,
  },
  input: {
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  addPaymentMethod: {
    color: '#4F46E5',
    fontSize: 14,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary,
    borderRadius: 8,
    padding: 12,
    margin: 20,
    marginTop: 25,
  },
  cardDetails: {
    marginLeft: 12,
    flex: 1,
  },
  cardType: {
    fontSize: 14,
    fontWeight: '600',
  },
  cardNumber: {
    fontSize: 12,
    color: '#6B7280',
  },
  expiryDate: {
    fontSize: 12,
    color: '#6B7280',
  },
});
