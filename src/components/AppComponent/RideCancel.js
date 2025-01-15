import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import {  Close, Help } from '../../assets/icons';
import Colors from '../../themes/Colors';
import { FontSize, FontsWeights } from '../../themes/Fonts';

const RideCancel = ({hanldePressCancel,hanldePressSupport}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.iconContainer} onPress={hanldePressCancel}>
        <Close style={styles.icon}/>
        <Text style={styles.cancelText}>Cancel</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.iconContainer} onPress={hanldePressSupport}>
        <Help style={styles.icon} height={27} width={25}/>
        <Text style={styles.cancelText}>Help and support</Text>
      </TouchableOpacity>
    </View>
  )
}

export default RideCancel

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    borderRadius: 10,
  },
  iconContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal:20
  },
  icon: {
    marginRight: 10,
  },
  cancelText: {
    fontSize: FontSize.FS16,
    fontWeight: FontsWeights.FW600,
    color: Colors.black,
  },

});
