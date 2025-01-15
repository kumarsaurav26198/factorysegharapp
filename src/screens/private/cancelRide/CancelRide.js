import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';
import {useNavigation} from '@react-navigation/native';
import {BackButton, DriverInfo2, LocationSelector2} from '../../../components';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BookingCancelled, ModalWrapper } from '../../../components/Modal';

const CancelRide = () => {
  const navigation = useNavigation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };


  return (
    <View style={CommonStyles.container}>
      <BackButton cancelRide bottomBorder />
      <DriverInfo2/>
      <LocationSelector2 startEditable={false} endEditable={false} />
      <ModalWrapper visible={isModalVisible} onRequestClose={toggleModal}>
   <BookingCancelled/>
      </ModalWrapper>
    </View>
  );
};

export default CancelRide;

const styles = StyleSheet.create({});
