import {FlatList, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import {BackButton, BookingItem, BookingItem2} from '../../../components';

const ShowAllBooking = () => {
  return (
    <View style={CommonStyles.container}>
      <BackButton left text="Bookings" />
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <BookingItem />
              <BookingItem2 />
            </>
          );
        }}
        ListFooterComponent={<View style={{height:20}}/>}
      />
    </View>
  );
};

export default ShowAllBooking;

const styles = StyleSheet.create({});
