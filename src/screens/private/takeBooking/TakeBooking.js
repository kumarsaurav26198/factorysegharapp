import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CommonStyles } from '../../../themes/CommonStyles';
import BookingMap from '../../../layout/BookingMap';
import { RecommendedCon, AcceptBookingCon } from '../../../container';
import { CustomBottomSheet } from '../../../components/Modal';


const TakeBooking = () => {
  return (
    <View style={CommonStyles.container}>
      <FlatList
        data={[ 1 ]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <BookingMap />
            </>
          );
        }}
      />
      <CustomBottomSheet>
        <AcceptBookingCon />
      </CustomBottomSheet>

    </View>
  );
};

export default TakeBooking;

const styles = StyleSheet.create({});