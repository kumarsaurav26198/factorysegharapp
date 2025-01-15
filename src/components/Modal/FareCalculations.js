import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { CommonStyles } from '../../themes/CommonStyles';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';

const FareCalculations = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Fare Calculations</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Driver Fee:</Text>
        <Text style={styles.amount}>+₹430.8</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Convenience Fee:</Text>
        <Text style={styles.amount}>+₹111.94</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>GoChauffeurs Secure Fee:</Text>
        <Text style={styles.amount}>+₹15.0</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>GST:</Text>
        <Text style={styles.amount}>+₹22.85</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.subTotalLabel}>Sub Total:</Text>
        <Text style={styles.subTotalAmount}>₹580.59</Text>
      </View>

      <View style={styles.row}>
        <Text style={styles.label}>Rounding up:</Text>
        <Text style={styles.amount}>+₹20.41</Text>
      </View>
      <View style={styles.divider} />
      <View style={styles.row}>
        <Text style={styles.grandTotalLabel}>Grand Total</Text>
        <Text style={styles.grandTotalAmount}>₹581</Text>
      </View>
    </View>
  );
};

export default FareCalculations;

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 12,
    paddingHorizontal: 20,
    width: '100%',
  },
  divider: {
    marginVertical: 10,
    borderWidth: 0.6,
    borderColor:Colors.lightgrey
  },
  heading: {
    fontSize: FontSize.FS18,
    fontWeight: FontsWeights.FW500,
    color: '#4E1EC4',
    marginBottom: 10,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
    width: '100%',
  },
  label: {
    fontSize: FontSize.FS16,
    color: Colors.black,
    fontWeight: FontsWeights.FW400
  },
  amount: {
    fontSize: FontSize.FS16,
    color: Colors.black,
    fontWeight: FontsWeights.FW500
  },
  subTotalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E1EC4',
  },
  subTotalAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4E1EC4',
  },
  grandTotalLabel: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E1EC4',
    marginTop: 10,
  },
  grandTotalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#4E1EC4',
  },
});
