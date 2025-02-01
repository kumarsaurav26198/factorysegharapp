import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from 'react-native';
import React, {useState} from 'react';
import {FontSize, FontsWeights} from '../../themes/Fonts';
import Colors from '../../themes/Colors';
import {Close} from '../../assets/icons';
import C_TextInput from '../Common/C_TextInput';
import C_Button from '../Common/C_Button';
import C_Text from '../Common/C_Text';
import MobileWithCountryCode from '../Common/MobileWithCountryCode';
import {addressValidiadtion} from '../../utils/validators';
import {CommonStyles} from '../../themes/CommonStyles';
import {useActions} from '../../hooks/useActions';
import {connect} from 'react-redux';

const AddAddress = ({ handlePressClose, email, addressRes}) => {
  const {addAddressRequest} = useActions();
  const [numbers, setNumber] = useState('');
  const [selectedCountryCode, setSelectedCountryCode] = useState('91');
  const [errorMessage, setErrorMessage] = useState('');

  const handleCountryChange = code => {
    setSelectedCountryCode(code);
  };

  const [formData, setFormData] = useState({
    // name: '',
    // addressLine1: '',
    // addressLine2: '',
    // city: '',
    // state: '',
    // zipCode: '',
    // country: '',
    name: 'Testing user',
    addressLine1: 'Thatha,Word No:11',
    addressLine2: 'Near By shivala',
    city: 'Khagaria',
    state: 'Bihar',
    zipCode: '851214',
    country: 'India',
    email,
    phone: selectedCountryCode + numbers,
  });

  const handleChange = (key, value) => {
    setFormData({
      ...formData,
      [key]: value,
    });
  };

  const handleSubmit = () => {
    // eslint-disable-next-line no-shadow
    const {isValid, errorMessage} = addressValidiadtion({
      ...formData,
      selectedCountryCode,
      numbers,
    });
    if (isValid) {
      addAddressRequest(formData);

    } else {
      setErrorMessage(errorMessage); // Show error message
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handlePressClose} style={styles.closeButton}>
        <Close />
      </TouchableOpacity>
      <C_Text content="Add New Address" medium={true} style={{margin: 10}} />
      {errorMessage ? (
        <Text style={CommonStyles.errorText}>{errorMessage}</Text>
      ) : null}
      {addressRes?.addError ? (
        <Text style={CommonStyles.errorText}>
          {addressRes?.addError?.message}
        </Text>
      ) : null}

      <ScrollView
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Name</Text>
          <C_TextInput
            placeholder="Enter Name"
            value={formData.name}
            onChangeText={text => handleChange('name', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Number</Text>
          <MobileWithCountryCode
            value={numbers}
            onChangeText={setNumber}
            placeholder="981xxxxxxx"
            onCountryChange={handleCountryChange}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Address</Text>
          <C_TextInput
            placeholder="Enter address"
            value={formData.addressLine1}
            onChangeText={text => handleChange('addressLine1', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Landmark </Text>
          <C_TextInput
            placeholder="Near by place"
            value={formData.addressLine2}
            onChangeText={text => handleChange('addressLine2', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>City</Text>
          <C_TextInput
            placeholder="Enter city"
            value={formData.city}
            onChangeText={text => handleChange('city', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>State</Text>
          <C_TextInput
            placeholder="Enter state"
            value={formData.state}
            onChangeText={text => handleChange('state', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Zip Code</Text>
          <C_TextInput
            placeholder="Enter zip code"
            value={formData.zipCode}
            onChangeText={text => handleChange('zipCode', text)}
          />
        </View>
        <View style={styles.inputGroup}>
          <Text style={styles.label}>Country</Text>
          <C_TextInput
            placeholder="Enter country"
            value={formData.country}
            onChangeText={text => handleChange('country', text)}
          />
        </View>
      </ScrollView>
        <C_Button title="Add Address" onPress={handleSubmit}  loading={addressRes?.addLoading}/>
    </View>
  );
};

// export default AddAddress;
const mapStateToProps = state => ({
  addressRes: state?.addressReducers,
});

export default connect(mapStateToProps)(AddAddress);

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    height: 380,
    width: '100%',
  },
  closeButton: {
    alignSelf: 'flex-end',
    // padding: 10,
  },
  inputGroup: {},
  label: {
    fontSize: FontSize.FS14,
    fontWeight: FontsWeights.FW500,
    color: Colors.darkgrey,
  },
});
