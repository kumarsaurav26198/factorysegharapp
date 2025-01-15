import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors'; 
import { FontSize, FontsWeights } from '../../themes/Fonts'; 

const EstimatedFareDetails = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Estimated Fare Details</Text>
      
      <View style={styles.detailItem}>
        <Text style={styles.label}>Estimated Total Fare</Text>
        <Text style={styles.value}>₹150</Text>
      </View>

      <View style={styles.divider} />

      <Text style={styles.earnedText}>Earned money from trip:</Text>
      <Text style={styles.earnedAmount}>₹150</Text>
    </View>
  );
};

export default EstimatedFareDetails;

const styles = StyleSheet.create({
  container: {
    padding: 15,
    borderColor: Colors.primary, 
    borderWidth: 1,
    borderRadius: 8,
    margin: 15,
  },
  header: {
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW600,
    color: Colors.primary,
    marginBottom: 10,
  },
  detailItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  label: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW500,
    color: Colors.black,
  },
  value: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW400,
    color: Colors.black,
  },
  divider: {
    height: 1,
    backgroundColor: Colors.lightgrey,
    marginVertical: 12,
  },
  earnedText: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW400,
    color: Colors.black,
    marginBottom: 8,
    textAlign: 'center',
  },
  earnedAmount: {
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW600,
    color: Colors.primary,
    textAlign: 'center',
  },
});
