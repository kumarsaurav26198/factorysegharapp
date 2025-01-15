import {FlatList, StyleSheet, View} from 'react-native';
import React from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import BookingMap from '../../../layout/BookingMap';
import {DriverInfo, LocationSelector2, RideCancel} from '../../../components';

const RidesBooked = ({navigation}) => {
  return (
    <View style={CommonStyles.container}>
      <FlatList
        data={[1]}
        showsVerticalScrollIndicator={false}
        renderItem={() => {
          return (
            <>
              <BookingMap />
              <DriverInfo/>
              <LocationSelector2 startEditable={true} endEditable={false} />
              <RideCancel hanldePressCancel={()=>{navigation.navigate("CancelRide")}} hanldePressSupport={()=>{console.log("hanldePressSupport")}}/>
            </>
          );
        }}
        // ListFooterComponent={<View style={{height: 20}} />}
      />
    </View>
  );
};

export default RidesBooked;

const styles = StyleSheet.create({});
