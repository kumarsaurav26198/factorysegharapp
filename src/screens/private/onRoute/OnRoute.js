import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import {CommonStyles} from '../../../themes/CommonStyles';
import BookingMap from '../../../layout/BookingMap';
import {AtPickup, AtPickUpToStart, C_Text} from '../../../components';
import {InterCityCab} from '../../../assets/icons';
import Colors from '../../../themes/Colors';
import {FontSize} from '../../../themes/Fonts';
import {CustomBottomSheet} from '../../../components/Modal';

const OnRoute = () => {
  return (
    <View style={CommonStyles.container}>
      <FlatList
        data={[1]}
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
        <View style={styles.innercontainer}>
          <InterCityCab />
          <View style={styles.centerTextContainer}>
            <C_Text content="One Way" medium />
          </View>
          <TouchableOpacity>
            <Text style={styles.text}>Grab now</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.centerTextContainer}>
          <C_Text content="Splendor - Shine" style={{right: 20}} />
        </View>
        <AtPickUpToStart />
      </CustomBottomSheet>
    </View>
  );
};

export default OnRoute;

const styles = StyleSheet.create({
  innercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    // paddingTop: 10,
    marginHorizontal: 20,
  },
  centerTextContainer: {
    alignSelf: 'center',
  },
  text: {
    backgroundColor: Colors.primary,
    color: Colors.white,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
    fontSize: FontSize.FS17,
  },
});
