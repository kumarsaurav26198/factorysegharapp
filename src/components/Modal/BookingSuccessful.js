import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { FontSize, FontsWeights } from '../../themes/Fonts';
import Colors from '../../themes/Colors';
import { DoneIcon } from '../../assets/icons';

const BookingSuccessful = ({handlePressDone,handlePressClose}) => {
  return (
    <View style={styles.container}>
      <DoneIcon/>
      <Text style={styles.headerText}>Booking Successful</Text>
      <Text style={styles.description}>
        Your booking has been confirmed. Driver will pick you up in 2 minutes.
      </Text>
      <View style={styles.buttonContainer}>
      <TouchableOpacity style={styles.button} onPress={handlePressClose}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
        <View style={styles.verticalBorder} />
        <TouchableOpacity style={styles.button} onPress={handlePressDone}>
          <Text style={[styles.buttonText,{color:Colors.primary}]}>Done</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default BookingSuccessful;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    alignItems: 'center',
  },
  headerText: {
    fontSize: FontSize.FS20,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
    textAlign: 'center',
    marginTop:10
  },
  description: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW400,
    color: Colors.darkgrey,
    textAlign: 'center',
    marginTop: 10,
    paddingHorizontal: 20,
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingTop: 10,
  },
  button: {
    flex: 1,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
  },
  verticalBorder: {
    width: 1,
    height: '100%',
    backgroundColor: '#ccc',
  },
});
