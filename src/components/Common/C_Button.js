import { StyleSheet, Text, TouchableOpacity, ActivityIndicator } from 'react-native';
import React from 'react';
import Colors from '../../themes/Colors';
import { FontsFamilies, FontSize, FontsWeights } from '../../themes/Fonts';

function C_Button(props) {
  const {
    onPress,
    title,
    backgroundColor,
    text_color,
    disabled,
    font_Weight,
    font_Family,
    font_Size,
    borderColor,
    loading,
    marginTop
  } = props;

  return (
    <TouchableOpacity
      disabled={loading||disabled}
      activeOpacity={disabled ? 1 : 0.65}
      onPress={onPress}
      style={[
        styles.button,
        backgroundColor && { backgroundColor: backgroundColor },
        borderColor && { borderColor: borderColor },
        marginTop &&{ marginTop:marginTop}
      ]}
    >
      {loading ? (
        <ActivityIndicator size="small" color={Colors.white} />
      ) : (
        <Text style={[
          styles.text,
          {
            color: text_color ? text_color : Colors.white,
            fontWeight: font_Weight ? font_Weight : FontsWeights.FW900,
            fontFamily: font_Family ? font_Family : FontsFamilies.regular,
            fontSize: font_Size ? font_Size : FontSize.FS16,
          },
        ]}>
          {title}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf:"center",
    padding: 10,
    borderRadius: 8,
    marginVertical: 10,
    borderWidth: 0.6,
    borderColor: Colors.gray,
    backgroundColor: Colors.primary,
    width: '100%',
    marginHorizontal: 10,
    elevation: 5, 
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.3, 
    shadowRadius: 4.65, 
  },
  text: {
    textAlign: 'center',
  },
});

export default C_Button;
