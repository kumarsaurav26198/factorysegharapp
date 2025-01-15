import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import Colors from '../../themes/Colors';
import {  FontSize } from '../../themes/Fonts';

const C_SmallButton = ({ title, onPress, style, textStyle,disabled }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress} disabled={disabled}>
      <Text style={[styles.text, textStyle]}>{title}</Text>
    </TouchableOpacity>
  );
};

export default C_SmallButton;

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.gray, 
    paddingVertical: 3, 
    paddingHorizontal: 16, 
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: FontSize.FS14, 
    color: Colors.white, 
  },
});
