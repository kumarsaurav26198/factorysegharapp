import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Colors from '../../themes/Colors';
import {  FontSize, FontsWeights } from '../../themes/Fonts';

const C_Text = ({ content, style, bold, medium }) => {
  const textStyle = [
    styles.text,
    bold && styles.bold,
    medium && styles.medium,
    style, 
  ];

  return <Text style={textStyle}>{content}</Text>;
};

const styles = StyleSheet.create({
  text: {
    color: Colors.black, 
    fontSize: FontSize.FS15,
    textAlign: 'center',
    letterSpacing:0.4,
    fontWeight:FontsWeights.FW400,

    
  },
  bold: {
    fontWeight: FontsWeights.FW800,
    fontSize: FontSize.FS22,
  },
  medium: {
    // fontWeight: FontsWeights.FW500,
    fontSize: FontSize.FS22,
  },
});

export default C_Text;
