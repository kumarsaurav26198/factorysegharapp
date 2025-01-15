import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { WalletIcon } from '../../assets/icons';
import Colors from '../../themes/Colors';
import { useNavigation } from '@react-navigation/native';

export default function SetupPayment() {
  const navigation=useNavigation()
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={styles.text}>Setup a payment mode for your rides</Text>
          <WalletIcon/>
        </View>
        <TouchableOpacity style={styles.button} onPress={()=>{navigation.navigate("PayOption")}}>
          <Text style={styles.buttonText}>Setup Payment</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
  },
  content: {
    borderRadius: 10,
    paddingTop: 16,
    paddingLeft: 16,
    paddingBottom: 16,
    borderWidth:1
  },
  textContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
    // marginRight: 10,
    color: Colors.black,
  },
  icon: {
    marginLeft: 10,
  },
  button: {
    borderRadius: 5,
    paddingVertical: 10,
    alignItems: 'center',
    width:150,
    borderWidth:1
  },
  buttonText: {
    color: Colors.black,
    fontSize: 16,
    fontWeight: '600',
  },
});