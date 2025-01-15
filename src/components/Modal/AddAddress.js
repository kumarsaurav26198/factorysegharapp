import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    FlatList,
  } from 'react-native';
  import React, { useState } from 'react';
  import { FontSize, FontsWeights } from '../../themes/Fonts';
  import Colors from '../../themes/Colors';
  import { Close } from '../../assets/icons';
  import C_TextInput from '../Common/C_TextInput';
  import C_Button from '../Common/C_Button';
  
  const AddAddress = ({ handlePressDone, handlePressClose }) => {
    const [formData, setFormData] = useState({
      addressLine1: '',
      addressLine2: '',
      city: '',
      state: '',
      zipCode: '',
      country: '',
    });
  
    const handleChange = (key, value) => {
      setFormData({
        ...formData,
        [key]: value,
      });
    };
  
    const handleSubmit = () => {
      console.log('Address Data:', formData);
      handlePressDone && handlePressDone(formData);
    };
  
    const fields = [
      { key: 'addressLine1', label: 'Address Line 1', placeholder: 'Enter address line 1' },
    //   { key: 'addressLine2', label: 'Address Line 2', placeholder: 'Enter address line 2' },
      { key: 'city', label: 'City', placeholder: 'Enter city' },
      { key: 'state', label: 'State', placeholder: 'Enter state' },
      { key: 'zipCode', label: 'Zip Code', placeholder: 'Enter zip code' },
      { key: 'country', label: 'Country', placeholder: 'Enter country' },
    ];
  
    const renderItem = ({ item }) => (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{item.label}</Text>
        <C_TextInput
          placeholder={item.placeholder}
          value={formData[item.key]}
          onChangeText={(text) => handleChange(item.key, text)}
        />
      </View>
    );
  
    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={handlePressClose} style={styles.closeButton}>
          <Close />
        </TouchableOpacity>
        <FlatList
          data={fields}
          renderItem={renderItem}
          keyExtractor={(item) => item.key}
          contentContainerStyle={styles.formContainer}
          showsVerticalScrollIndicator={false}
        />
        <View style={styles.buttonContainer}>
          <C_Button title="Add Address" onPress={handleSubmit} />
        </View>
      </View>
    );
  };
  
  export default AddAddress;
  
  const styles = StyleSheet.create({
    container: {
width:"100%",
      backgroundColor: Colors.white,
      paddingHorizontal: 10,
    },
    closeButton: {
      alignSelf: 'flex-end',
      padding: 10,
    },
    formContainer: {
    //   paddingBottom: 20,
    },
    headerText: {
      fontSize: FontSize.FS20,
      fontWeight: FontsWeights.FW600,
      color: Colors.black,
      textAlign: 'center',
      marginBottom: 20,
    },
    inputGroup: {
    },
    label: {
      fontSize: FontSize.FS14,
      fontWeight: FontsWeights.FW500,
      color: Colors.darkgrey,
      marginBottom: 8,
    },
    buttonContainer: {
      marginTop: 20,
      paddingHorizontal: 10,
    },
  });
  