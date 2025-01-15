import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import {FontSize, FontsWeights} from '../../themes/Fonts';
import {
  EndPoints,
  MaterialIconsProcess,
  OneWay,
  StartingPoints,
} from '../../assets/icons';

const BookingItem2 = ({handlePressRemove, handlePressAccept}) => {
  return (
    <View style={styles.container}>
      <View style={styles.inercontainer}>
        <View style={styles.leftSection}>
          <OneWay height={25} width={25} />
        </View>
        <View style={styles.middleSection}>
          <Text style={styles.vehicleNumber}>4 Hours</Text>
          <Text style={styles.vehicleModel}>One way trip</Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.ratingValue}>{'17-09-2024'}</Text>
          <Text style={styles.vehicleModel}>Today</Text>
        </View>
      </View>
      
      <View style={styles.pointsDescriptionContainer}>
        <TouchableOpacity style={styles.btnCon}>
          <Text style={styles.btnText}>Min Earn: ₹250</Text>
        </TouchableOpacity>
        <MaterialIconsProcess />
      </View>

      <View style={styles.pointsDescriptionContainer}>
        <StartingPoints />
        <Text style={styles.description}>
          RR22, Block, Mianwali Nagar, paschim...
        </Text>
      </View>

      <View style={styles.pointsDescriptionContainer}>
        <EndPoints />
        <Text style={styles.description}>
          Main Rd, Block 1, West Patel Nagar, Patel...
        </Text>
      </View>
    </View>
  );
};

export default BookingItem2;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    borderRadius: 8,
    marginHorizontal: 20,
    padding: 10,
    paddingTop: 20,
    paddingHorizontal: 15,
    shadowColor: Colors.black,
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  inercontainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    bottom: 5,
    borderRadius: 8,
    marginBottom: 16,
  },
  leftSection: {
    backgroundColor: Colors.lightP,
    borderRadius: 40,
    padding: 10,
  },
  middleSection: {
    flex: 1,
    justifyContent: 'flex-start',
    marginLeft: 10,
  },
  vehicleNumber: {
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
  },
  vehicleModel: {
    fontWeight: FontsWeights.FW500,
    color: Colors.black,
  },
  rightSection: {
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  ratingValue: {
    fontSize: FontSize.FS15,
    fontWeight: '600',
    color: Colors.primary,
  },
  btnCon: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    paddingVertical: 6,
    paddingHorizontal: 15,
    alignSelf: 'flex-start',
  },
  pointsDescriptionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  description: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW400,
    color: Colors.darkgrey,
    marginLeft: 5,
  },
  btnText: {
    color: Colors.white,
    fontWeight: FontsWeights.FW600,
    fontSize: FontSize.FS14,
  },
});
