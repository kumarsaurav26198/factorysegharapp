import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { BackVerctor, ClockIcon, CreditCardIcon, InterCityCab, WalletIcon2 } from '../../assets/icons';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';

const TotalFareModal = ({handlePressProceed}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Bike</Text>
        <InterCityCab size={24} color="#000" />
      </View>

      <Text style={styles.description}>
        Lorem ipsum is simply dummy text of the printing and typesetting industry.
      </Text>

      <View style={styles.features}>
        <View style={styles.featureItem}>
          <WalletIcon2 size={24} color="#000" />
          <Text style={styles.featureText}>Pocket Friendly</Text>
        </View>
        <View style={styles.featureItem}>
          <ClockIcon size={28} color="#000" />
          <Text style={styles.featureText}>Quick Service</Text>
        </View>
        <View style={styles.featureItem}>
          <CreditCardIcon size={24} color="#000" />
          <Text style={styles.featureText}>Cashless rides</Text>
        </View>
      </View>

      <View style={styles.totalFare}>
        <View>
        <Text style={styles.totalFareText}>Total fare</Text>
        <Text style={styles.includesTaxes}>Includes taxes</Text>
        </View>
     
        <Text style={styles.totalFareText}>₹90</Text>
      </View>
     

      <View style={styles.paymentMode}>
        <View style={styles.paymentModeHeader}>
          <Text style={styles.totalFareText}>Total Fare ₹90</Text>
          <View style={styles.cashSelector}>
            <Text style={styles.cashText}>Cash</Text>
            <BackVerctor style={styles.rotatedIcon} size={16} color={Colors.black} />
          </View>
        </View>
        <View style={styles.paymentModeContent}>
          <WalletIcon2 size={24} color="#000" />
          <View style={styles.paymentModeDetails}>
            <Text style={styles.paymentModeTitle}>Select payment mode</Text>
            <Text style={styles.paymentModeDescription}>Pay during the ride to avoid cash payments</Text>
          </View>
          <TouchableOpacity>
            <Text style={styles.changeMode}>Change Mode</Text>
          </TouchableOpacity>
        </View>
      </View>

      <TouchableOpacity style={styles.proceedButton} onPress={handlePressProceed}>
        <Text style={styles.proceedButtonText}>Proceed</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'space-between',
  },
  headerText: {
    fontSize: FontSize.FS20,
    fontWeight: FontsWeights.FW600,
    color: Colors.black
  },
  description: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW400,
    color: Colors.black,
    marginBottom: 20,
    marginRight: 80
  },
  features: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  featureItem: {
    alignItems: 'center',
  },
  featureText: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW400,
    color: Colors.black,
    marginTop: 5,
  },
  totalFare: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#8A2BE2',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  totalFareText: {
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
  },
  includesTaxes: {
    fontSize: FontSize.FS12,
    color: Colors.black,
    // marginBottom: 20,
  },
  paymentMode: {
    backgroundColor: '#E6E6FA',
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
  paymentModeHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  cashSelector: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cashText: {
    marginRight: 15,
  },
  paymentModeContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentModeDetails: {
    flex: 1,
    marginLeft: 10,
  },
  paymentModeTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color:Colors.gray
  },
  paymentModeDescription: {
    fontSize: 12,
    color: '#666',
  },
  changeMode: {
    color: Colors.black,
    fontSize: 12,
  },
  proceedButton: {
    backgroundColor: Colors.primary,
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  proceedButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  rotatedIcon: {
    transform: [ { rotate: '270deg' } ],
  },
});

export default TotalFareModal;