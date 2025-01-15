import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, RefreshControl, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CommonStyles } from '../../../themes/CommonStyles';
import { BackButton, C_Button, C_Text, C_TextInput } from '../../../components';
import { FontSize, FontsWeights } from '../../../themes/Fonts';
import { useActions } from '../../../hooks/useActions';
import { connect } from 'react-redux';

const ContactUs = ({ navigation, contactRes }) => {
  const { fetchConstchUsDetails, ContactUsRequest } = useActions();

  const contactAddress = contactRes?.data;

  const [ refreshing, setRefreshing ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState('');
  const [ message, setMessage ] = useState('');

  useEffect(() => {
    fetchConstchUsDetails();
  }, []);
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchConstchUsDetails();
    setRefreshing(false);
  }, []);



  const handlePresSendMessage = () => {

    if (message.length >= 3)
    {
      console.log(JSON.stringify(message, null, 2));
      ContactUsRequest({ message: message });
      setErrorMessage('');
      setMessage("");
      // You may want to navigate or show a success message here
    } else
    {
      setErrorMessage("Message is required!");
    }
  };

  return (
    <View style={CommonStyles.container}>
      <BackButton left text="Contact Us" />
      <View style={{ paddingHorizontal: 20, }}>
        <FlatList
          data={[ 1 ]}
          keyExtractor={(item, index) => index.toString()}
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => (
            <>
              {
                !contactRes?.loading && (
                  <>
                    <C_Text content={contactAddress?.heading} style={styles.headerbold} />
                    <C_Text content={'Address'} style={styles.headerbold} />
                    <C_Text content={contactAddress?.address} />
                    <C_Text content={` Call : ${ contactAddress?.phone }`} />
                    <C_Text content={` Email : ${ contactAddress?.email }`} />
                    <C_Text content={'Send Message'} style={[ styles.headerbold, { marginVertical: 15 } ]} />
                  </>
                )
              }

              <C_TextInput
                placeholder="Write your text"
                value={message}
                onChangeText={txt => {
                  setMessage(txt);
                }}
                multiline
                numberOfLines={4}
              />
              {errorMessage ? (
                <Text style={[ CommonStyles.errorText, { right: 20 } ]}>
                  {errorMessage}
                </Text>
              ) : null}
              {contactRes?.senderror ? (
                <Text style={[ CommonStyles.errorText, { right: 20 } ]}>
                  {contactRes?.senderror?.message}
                </Text>
              ) : null}
            </>
          )}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          ListFooterComponent={<View style={{ height: 180 }} />}
        />
      </View>

      <View style={[ CommonStyles.bottomView ,{paddingHorizontal:20}]}>
        <C_Button
          // disabled={ message.length <= 3}
          title="Send Message"
          onPress={handlePresSendMessage}
          loading={contactRes?.sendloading}
        />
      </View>
    </View>
  );
};
const mapStateToProps = state => ({
  pageRes: state?.pagebyNameReducers,
  contactRes: state?.contactUsReducer,
});
export default connect(mapStateToProps)(ContactUs);


const styles = StyleSheet.create({
  headerbold: {
    fontWeight: FontsWeights.FW500,
    fontSize: FontSize.FS22,
    marginVertical: 10
  },
});