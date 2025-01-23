/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react-hooks/exhaustive-deps */
import React, {useCallback, useEffect, useState} from 'react';
import {
  FlatList,
  Linking,
  RefreshControl,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {CommonStyles} from '../../../themes/CommonStyles';
import {BackButton, C_Text} from '../../../components';
import {FontSize, FontsWeights} from '../../../themes/Fonts';
import {useActions} from '../../../hooks/useActions';
import {connect} from 'react-redux';
import {AddressIcon, Calling, ContactUsIcon, EmailIcon} from '../../../assets/icons';
import {capitalizeFirstLetter} from '../../../utils/validators';
import Colors from '../../../themes/Colors';

const ContactUs = ({contactRes}) => {
  const {fetchConstchUsDetails} = useActions();
  const contactAddress = contactRes?.data;
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchConstchUsDetails();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchConstchUsDetails();
    setRefreshing(false);
  }, []);

  const handleEmailPress = email => {
    if (email) {
      Linking.openURL(`mailto:${email}`).catch(err =>
        console.error('Failed to open email app', err),
      );
    }
  };

  const handlePhonePress = phoneNumber => {
    if (phoneNumber) {
      Linking.openURL(`tel:${phoneNumber}`).catch(err =>
        console.error('Failed to open dialer', err),
      );
    }
  };
  const handleAddressePress = phoneNumber => {
    // if (phoneNumber) {
    //   Linking.openURL(`tel:${phoneNumber}`).catch(err =>
    //     console.error('Failed to open dialer', err),
    //   );
    // }
  };

  const handleWhatsAppPress = phoneNumber => {
    if (phoneNumber) {
      const whatsappURL = `https://wa.me/${phoneNumber}`;
      Linking.openURL(whatsappURL).catch(err =>
        console.error('Failed to open WhatsApp', err),
      );
    }
  };

  return (
    <View style={CommonStyles.container}>
      <BackButton left text="Contact Us" />
      <View style={styles.contentContainer}>
        <FlatList
          data={[1]}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => {
            if (contactRes?.error) {
              return (
                <View
                  style={[
                    CommonStyles.container,
                    {
                      justifyContent: 'center',
                      alignItems: 'center',
                      height: '100%',
                    },
                  ]}>
                  <Text
                    style={[
                      CommonStyles.errorText,
                      {textAlign: 'center', fontSize: FontSize.FS18},
                    ]}>
                    {contactRes?.error?.message ||
                      'Something went wrong. Please try again.'}
                  </Text>
                </View>
              );
            }

            return (
              <View>
                {!contactRes?.loading && (
                  <View style={styles.card}>
                    <C_Text
                      content={contactAddress?.heading}
                      style={styles.header}
                    />

                    <View style={styles.section}>
                      <Text style={styles.sectionHeader}>Address</Text>
                      <TouchableOpacity
                        style={styles.row}
                        onPress={() =>
                          handleAddressePress(contactAddress?.address)
                        }
                      >
                        <AddressIcon
                          width={22}
                          height={22}
                          color={Colors.black}
                        />
                        <Text style={styles.linkText2}>
                         {' '} {capitalizeFirstLetter(contactAddress?.address)}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                      <Text style={styles.sectionHeader}>Call</Text>
                      <TouchableOpacity
                        style={styles.row}
                        onPress={() =>
                          handlePhonePress(contactAddress?.contactUs)
                        }>
                        <Calling />
                        <Text style={styles.linkText}>
                          {contactAddress?.contactUs}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                      <Text style={styles.sectionHeader}>Email</Text>
                      <TouchableOpacity
                        style={styles.row}
                        onPress={() => handleEmailPress(contactAddress?.email)}>
                          <EmailIcon/>
                        <Text style={styles.linkText}>
                          {contactAddress?.email}
                        </Text>
                      </TouchableOpacity>
                    </View>

                    <View style={styles.section}>
                      <Text style={styles.sectionHeader}>WhatsApp</Text>
                      <TouchableOpacity
                        style={styles.row}
                        onPress={() =>
                          handleWhatsAppPress(contactAddress?.contactUs)
                        }>
                        <ContactUsIcon />
                        <Text style={styles.linkText}>
                          Chat on WhatsApp ({contactAddress?.contactUs})
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            );
          }}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={<View style={{height: 180}} />}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  contactRes: state?.contactUsReducer,
});
export default connect(mapStateToProps)(ContactUs);

const styles = StyleSheet.create({
  contentContainer: {
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 3,
  },
  header: {
    fontSize: FontSize.FS24,
    fontWeight: FontsWeights.FW600,
    color: '#333',
    marginBottom: 10,
  },
  section: {
    marginVertical: 10,
  },
  sectionHeader: {
    fontSize: FontSize.FS20,
    fontWeight: FontsWeights.FW500,
    color: '#444',
    marginBottom: 5,
  },
  text: {
    fontSize: FontSize.FS18,
    color: '#555',
    alignItems: 'flex-start',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  linkText: {
    fontSize: FontSize.FS18,
    color: '#007AFF',
    marginLeft: 8,
    textDecorationLine: 'underline',
  },
  linkText2: {
    fontSize: FontSize.FS18,
    // marginLeft: 8,
  },
});
