import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton } from '../../../components';
import { WalletIcon3, CashIcon, UpiIcon, CardIcon, BackVerctor, Phonepay, Googlepay } from '../../../assets/icons';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { useNavigation } from '@react-navigation/native';

const PaymentOption = ({ icon: Icon, title, subtitle, showUpiIcons, onPress }) => (
  <TouchableOpacity style={styles.optionContainer} onPress={onPress}>
    <Icon width={24} height={24} />
    <View style={styles.optionTextContainer}>
      <Text style={styles.optionTitle}>{title}</Text>
      {subtitle && <Text style={styles.optionSubtitle}>{subtitle}</Text>}
      {showUpiIcons && (
        <View style={styles.upiIconsContainer}>
          <Phonepay width={20} height={20} />
          <Googlepay width={20} height={20} />
        </View>
      )}
    </View>
    <BackVerctor style={styles.rotatedIcon} size={16} color={Colors.black} />
  </TouchableOpacity>
);

export default function PaymentOptions() {
  const navigation = useNavigation();


  const handlePress = (option) => {
    console.log(`${option} payment option pressed`);
  };

  return (
    <View style={CommonStyles.container}>
      <BackButton left text="Payment" />
      <ScrollView style={styles.scrollView}>
        <PaymentOption
          icon={WalletIcon3}
          title="Wallet"
          subtitle="Wallet inactive, activate from our app"
          onPress={() => handlePress('Wallet')}
        />
        <PaymentOption
          icon={CashIcon}
          title="Cash"
          subtitle="Pay via cash"
          onPress={() => handlePress('Cash')}
        />
        <PaymentOption
          icon={UpiIcon}
          title="Pay by any UPI app"
          showUpiIcons
          onPress={() => handlePress('UPI')}
        />
        <PaymentOption
          icon={CardIcon}
          title="Add a credit/Debit Card"
          onPress={() =>{navigation.navigate("cardDetail")}}
        />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    paddingTop: 10,
    marginHorizontal: 20,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    height: 70,
  },
  optionTextContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  optionTitle: {
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW500,
    color: Colors.black,
  },
  optionSubtitle: {
    fontSize: FontSize.FS14,
    color: Colors.darkgrey,
    marginTop: 4,
  },
  rotatedIcon: {
    transform: [{ rotate: '180deg' }],
  },
  upiIconsContainer: {
    flexDirection: 'row',
    marginTop: 4,
  },
});
