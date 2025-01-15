import React from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton, C_Button } from '../../../components';
import { BackVerctor } from '../../../assets/icons';
import Colors from '../../../themes/Colors';
import { FontSize, FontsWeights } from '../../../themes/Fonts';

const Settings = ({ loginRes,navigation }) => {

  const options = [
    { label: 'Privacy Policy' ,navigate:"PrivacyPolicy"},
    { label: 'Contact us' ,navigate:"ContactUs"},
    { label: 'Delete Account' ,navigate:"DeleteAccount"},
  ];

  return (
    <View style={CommonStyles.container}>
      <BackButton left text="Setting" />
      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <FlatList
          data={options}
          keyExtractor={(item) => item.label}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.inputContainer} onPress={() => {navigation.navigate(item.navigate) }}>
              <Text style={styles.input}>{item.label}</Text>
              <BackVerctor style={styles.rotatedIcon} />
            </TouchableOpacity>
          )}
          ListFooterComponent={<View style={{ height: 150 }} />}
        />
      </View>

    </View>
  );
};

export default Settings;

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: Colors.white,
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 7,
    borderWidth: 1,
    borderColor: Colors.primary,
    marginBottom: 20,
  },
  input: {
    flex: 1,
    fontSize: FontSize.FS15,
    color: Colors.black,
    fontWeight: FontsWeights.FW500,
  },
  rotatedIcon: {
    transform: [ { rotate: '180deg' } ],
  },
});