import {FlatList, StyleSheet, Text, View} from 'react-native';
import React, {useState, useEffect} from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import BookingMap from '../../../layout/BookingMap';
import {BookingSuccessful, ModalWrapper} from '../../../components/Modal';
import {C_Button, DriverInfo, DriverWaiting, LocationSelector2} from '../../../components';
import Colors from '../../../themes/Colors';

const FindingCars = ({navigation}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [showDriverWaiting, setShowDriverWaiting] = useState(true);

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
   
    const timer = setTimeout(() => {
      setShowDriverWaiting(false);
      setIsModalVisible(true);
    }, 2500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={CommonStyles.container}>
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <BookingMap />
              {showDriverWaiting ? <DriverWaiting />:<DriverInfo/>}
            </>
          );
        }}
        ListFooterComponent={<View style={{height: 250}} />}
      />

      <View style={CommonStyles.bottomView}>
        <C_Button
          title="Cancel Ride"
          backgroundColor={Colors.white}
          text_color={Colors.black}
          borderColor={Colors.primary}
          // onPress={toggleModal} 
        />
        <LocationSelector2 startEditable={false} endEditable={false} />
      </View>

      <ModalWrapper
        visible={isModalVisible}
        onRequestClose={toggleModal}
        center={true}>
        <BookingSuccessful handlePressDone={()=>{
          toggleModal()
          navigation.navigate("RidesBooked")
          }} handlePressClose={toggleModal} />
      </ModalWrapper>
    </View>
  );
};

export default FindingCars;

const styles = StyleSheet.create({});
