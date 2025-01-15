import React, {useRef, useEffect} from 'react';
import {View, TextInput, StyleSheet, TouchableOpacity} from 'react-native';
import Colors from '../../themes/Colors';
import {FontSize} from '../../themes/Fonts';
import {Close, Magnifying} from '../../assets/icons';

const SearchBar = ({
  value,
  onChangeText,
  placeholder,
  onPress,
  greenDot,
  editable,
  clearValue,
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (editable && inputRef.current) {
      inputRef.current.focus();
    }
  }, [editable]);

  return (
    <TouchableOpacity
      style={[
        styles.inputContainer,
        greenDot ? styles.inputContainer2 : styles.inputContainer3,
      ]}
      onPress={onPress}
      activeOpacity={0.8}>
      {greenDot && (
        <View
          style={[
            styles.dot,
            editable ? styles.largeGreenDot : styles.greenDot,
          ]}
        />
      )}
      {!greenDot && <Magnifying />}
      <TextInput
        ref={inputRef}
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.gray}
        value={value}
        onChangeText={onChangeText}
        returnKeyType="search"
        onSubmitEditing={onPress}
        editable={editable}
      />
      {editable && value && (
        <TouchableOpacity onPress={clearValue} style={styles.clearValue}>
          <Close />
        </TouchableOpacity>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 8,
    paddingLeft: 16,
    marginVertical: 12,
    marginHorizontal: 16,
  },
  inputContainer2: {
    backgroundColor: Colors.white,
    borderWidth: 1,
    borderColor: Colors.primary,
  },
  inputContainer3: {
    backgroundColor: Colors.inputColor,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  greenDot: {
    backgroundColor: '#4CAF50',
  },
  largeGreenDot: {
    backgroundColor: '#4CAF50',
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  input: {
    fontSize: FontSize.FS15,
    color: Colors.black,
    height: 45,
    width: '80%',
  },
  clearValue: {
    left: 20,
  },
});
export default SearchBar;
