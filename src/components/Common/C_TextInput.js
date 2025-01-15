import React, { useState } from 'react';
import Colors from '../../themes/Colors';
import {  FontSize, FontsWeights } from '../../themes/Fonts';
import { StyleSheet, TextInput, View,TouchableOpacity,Text } from 'react-native';

const C_TextInput = ({
  placeholder,
  value,
  onChangeText,
  secureTextEntry = false,  
  keyboardType = 'default',  
  maxLength,
  editable = true,          
  multiline = false,        
  numberOfLines = 1,
  onBlur,
  onFocus,
  showPasswordToggle = false,  
  containerStyle = {},         
  inputStyle = {},            
  borderColor = Colors.primary, 
  placeholderStyle = {},
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(!secureTextEntry);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View style={[styles.inputContainer, containerStyle, { borderColor }]}>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={placeholderStyle.color || Colors.gray} 
        style={[styles.input, inputStyle, { 
          fontSize: placeholderStyle.fontSize || FontSize.FS15, 
          fontWeight: placeholderStyle.fontWeight || FontsWeights.FW500 
        }]}
        value={value}
        onChangeText={onChangeText}
        secureTextEntry={secureTextEntry && !isPasswordVisible}
        keyboardType={keyboardType}
        maxLength={maxLength}
        editable={editable}
        multiline={multiline}
        numberOfLines={numberOfLines}
        onBlur={onBlur}
        onFocus={onFocus}
      />
      {showPasswordToggle && (
        <TouchableOpacity onPress={togglePasswordVisibility} style={styles.iconContainer}>
          <Text>{isPasswordVisible ? 'Hide' : 'Show'}</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 7,
    paddingLeft: 10,
    height: 50,
    borderWidth: 1,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: FontSize.FS15,
    color: Colors.black,
    fontWeight: FontsWeights.FW500,
  },
  iconContainer: {
    marginRight: 10,
  },
});

export default C_TextInput;
